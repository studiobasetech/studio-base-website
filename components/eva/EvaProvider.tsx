"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { contact } from "@/data/site";
import { EVA_AI_ENDPOINT } from "@/lib/integrations";
import { track } from "@/lib/analytics";
import { asksForArticles, BLOG_LINK, findArticle, type ArticleLink } from "@/data/evaArticles";
import { useLang } from "@/lib/i18n";
import {
  LINES,
  cleanCompany,
  cleanName,
  confirmAnswer,
  detectLang,
  initialState,
  isSkip,
  parseProjectTypes,
  reply,
  spokenEmail,
  type ConvState,
  type Lead,
  type LineId,
  type ProjectTypeId,
} from "@/data/receptionist";

/* ------------------------------------------------------------------ */
/*  Eva, the AI receptionist: the call itself (voice, listening,       */
/*  conversation, booking). It lives in app/layout.tsx so ONE call is  */
/*  shared by the home page section and the floating button, and it    */
/*  keeps going while the visitor moves between pages.                 */
/*  Wording + logic: data/receptionist.ts                              */
/*  Voice clips: public/audio/eva/<en|es>/<line>.mp3                   */
/* ------------------------------------------------------------------ */

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${contact.email}`;

export type EvaStatus = "idle" | "connecting" | "speaking" | "listening" | "thinking";
export type EvaMsg = { who: "eva" | "you"; text: string; id: number; link?: ArticleLink };

/* minimal typing for the browser speech recognition API */
type SRResult = { isFinal: boolean; 0: { transcript: string } };
type SREvent = { resultIndex: number; results: ArrayLike<SRResult> };
type SR = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: SREvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
/** true when this browser can listen (Chrome, Edge, Safari) */
export const speechSupported = () => !!getSR();
const getSR = (): (new () => SR) | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
};

/** what the contact form gives Eva so she can fill it in by voice */
export type FormFillHooks = {
  setField: (field: "name" | "email" | "company" | "message", value: string) => void;
  setTypes: (ids: ProjectTypeId[]) => void;
  getEmail: () => string;
  /** sends the form; resolves true when it was delivered */
  send: () => Promise<boolean>;
};
type FormStep = "name" | "email" | "company" | "types" | "message" | "confirm";
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type EvaApi = {
  status: EvaStatus;
  inCall: boolean;
  msgs: EvaMsg[];
  caption: { id: number; shown: number } | null;
  interim: string;
  micOn: boolean;
  micSupported: boolean;
  step: ConvState["step"];
  level: React.MutableRefObject<number>;
  startCall: () => void;
  endCall: () => void;
  send: (text: string) => void;
  toggleMic: () => void;
  /** text inputs register themselves so Eva can focus one when she asks for an email */
  registerInput: (el: HTMLInputElement | null) => void;
  /** floating panel open/closed */
  widgetOpen: boolean;
  setWidgetOpen: (open: boolean) => void;
  /** true while the home page section is on screen (the floating button hides then) */
  sectionVisible: boolean;
  setSectionVisible: (v: boolean) => void;
  /** "chat" = receptionist call, "form" = helping fill out the contact form */
  mode: "chat" | "form";
  startFormFill: (hooks: FormFillHooks) => void;
};

const EvaContext = createContext<EvaApi | null>(null);

export function useEva() {
  const ctx = useContext(EvaContext);
  if (!ctx) throw new Error("useEva must be used inside <EvaProvider>");
  return ctx;
}

export function EvaProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  const [status, setStatus] = useState<EvaStatus>("idle");
  const [inCall, setInCall] = useState(false);
  const [msgs, setMsgs] = useState<EvaMsg[]>([]);
  const [caption, setCaption] = useState<{ id: number; shown: number } | null>(null);
  const [interim, setInterim] = useState("");
  const [micOn, setMicOn] = useState(true);
  const [micSupported, setMicSupported] = useState(false);
  const [step, setStep] = useState<ConvState["step"]>("chat");
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);

  const conv = useRef<ConvState>(initialState());
  const audio = useRef<HTMLAudioElement | null>(null);
  const actx = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const level = useRef(0);
  const rec = useRef<SR | null>(null);
  const listening = useRef(false);
  const inCallRef = useRef(false);
  const micOnRef = useRef(true);
  const msgId = useRef(0);
  const inputs = useRef(new Set<HTMLInputElement>());
  const langRef = useRef(lang);
  const handleUserRef = useRef<(text: string) => void>(() => {});
  const [mode, setMode] = useState<"chat" | "form">("chat");
  const modeRef = useRef<"chat" | "form">("chat");
  const formHooks = useRef<FormFillHooks | null>(null);
  const formStep = useRef<FormStep>("name");
  const typesRetried = useRef(false);
  const emailPoll = useRef<ReturnType<typeof setInterval> | null>(null);
  /** longer pauses allowed while the visitor describes their project */
  const longTurn = useRef(false);
  const startListeningRef = useRef<() => void>(() => {});

  const registerInput = useCallback((el: HTMLInputElement | null) => {
    if (el) inputs.current.add(el);
    // remove inputs that left the page
    inputs.current.forEach((i) => {
      if (!i.isConnected) inputs.current.delete(i);
    });
  }, []);

  const focusInput = useCallback(() => {
    const visible = [...inputs.current].filter((i) => i.isConnected && i.offsetParent !== null);
    visible[visible.length - 1]?.focus({ preventScroll: true });
  }, []);

  /** what was said so far, for the AI (Eva = "model", visitor = "user") */
  const history = useRef<{ role: "user" | "model"; text: string }[]>([]);
  const push = useCallback((who: EvaMsg["who"], text: string) => {
    const id = ++msgId.current;
    history.current.push({ role: who === "you" ? "user" : "model", text });
    setMsgs((m) => [...m, { who, text, id }]);
    return id;
  }, []);

  /** a blog article card under Eva's answer (one suggestion per article per call) */
  const suggested = useRef<Set<string>>(new Set());
  const pushLink = useCallback((link: ArticleLink) => {
    const id = ++msgId.current;
    setMsgs((m) => [...m, { who: "eva", text: link.title, id, link }]);
  }, []);

  /* ---------- listening ---------- */
  const stopListening = useCallback(() => {
    listening.current = false;
    try {
      rec.current?.abort();
    } catch {
      /* not running */
    }
    setInterim("");
  }, []);

  const startListening = useCallback(() => {
    const Ctor = getSR();
    if (!Ctor || !inCallRef.current || !micOnRef.current) {
      setStatus("listening");
      return;
    }
    stopListening();
    const r = new Ctor();
    r.lang = langRef.current === "es" ? "es-US" : "en-US";
    r.interimResults = true;
    // keep listening through short pauses ("Hello… what does Studio Base do?") and
    // end the turn ourselves after ~1.2 s of silence
    r.continuous = true;
    let finalText = "";
    let interimText = "";
    let silence: ReturnType<typeof setTimeout> | null = null;
    const finish = () => {
      try {
        r.stop();
      } catch {
        /* already stopped */
      }
    };
    const maxTurn = setTimeout(finish, 20000);
    r.onresult = (e) => {
      let fin = "";
      let inter = "";
      for (let i = 0; i < e.results.length; i++) {
        const res = e.results[i];
        const t = res[0].transcript.trim();
        if (!t) continue;
        if (res.isFinal) {
          // some phones repeat the whole sentence in each result: keep the longest version
          fin = t.toLowerCase().startsWith(fin.toLowerCase()) ? t : `${fin} ${t}`.trim();
        } else inter = `${inter} ${t}`.trim();
      }
      finalText = fin;
      interimText = inter;
      setInterim(`${fin} ${inter}`.trim());
      if (silence) clearTimeout(silence);
      silence = setTimeout(finish, longTurn.current ? 2600 : inter ? 1800 : 1200);
    };
    r.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setMicOn(false);
        micOnRef.current = false;
      }
    };
    r.onend = () => {
      if (silence) clearTimeout(silence);
      clearTimeout(maxTurn);
      if (rec.current !== r) return;
      const said = (finalText || interimText).trim();
      setInterim("");
      if (!listening.current) return;
      listening.current = false;
      if (said) handleUserRef.current(said);
      else if (inCallRef.current && micOnRef.current) {
        // silence: keep listening
        setTimeout(() => {
          if (inCallRef.current && !listening.current) startListeningRef.current();
        }, 250);
      }
    };
    rec.current = r;
    listening.current = true;
    setStatus("listening");
    try {
      r.start();
    } catch {
      listening.current = false;
    }
  }, [stopListening]);
  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  /* ---------- speaking: one voice for everything (Thalia in English, Celeste in Spanish) ---------- */
  const voiceCache = useRef(new Map<string, Promise<string | null>>());
  /** Eva's voice for a sentence, made by her AI helper (cached, so a line is only fetched once per visit) */
  const fetchVoice = useCallback((text: string, lang: "en" | "es") => {
    const key = `${lang}|${text}`;
    let p = voiceCache.current.get(key);
    if (!p) {
      p = (async () => {
        if (!EVA_AI_ENDPOINT) return null;
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 10000);
        try {
          const res = await fetch(EVA_AI_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tts: text, lang }),
            signal: ctrl.signal,
          });
          if (!res.ok || !(res.headers.get("content-type") || "").includes("audio")) return null;
          return URL.createObjectURL(await res.blob());
        } catch {
          return null;
        } finally {
          clearTimeout(timer);
        }
      })();
      voiceCache.current.set(key, p);
      p.then((u) => {
        if (!u) voiceCache.current.delete(key);
      });
    }
    return p;
  }, []);

  const speakSeq = useRef(0);
  const sayText = useCallback(
    async (text: string, after?: () => void) => {
      const seq = ++speakSeq.current;
      stopListening();
      setStatus("thinking");
      const url = await fetchVoice(text, langRef.current);
      // the call ended, or the visitor spoke again while the voice was loading
      if (!inCallRef.current || seq !== speakSeq.current) return;
      const mid = push("eva", text);
      const a = audio.current;
      const done = () => {
        if (seq !== speakSeq.current) return;
        setCaption(null);
        level.current = 0;
        if (!inCallRef.current) return;
        if (after) after();
        else if (modeRef.current === "chat" && conv.current.step === "email") {
          setStatus("listening");
          focusInput();
        } else startListening();
      };
      // voice not available right now: show the words only (never a different voice)
      if (!a || !url) return done();
      setCaption({ id: mid, shown: 0 });
      setStatus("speaking");
      a.onended = done;
      a.onerror = done;
      a.ontimeupdate = () => {
        if (a.duration) setCaption({ id: mid, shown: Math.min(1, a.currentTime / (a.duration * 0.92)) });
      };
      a.src = url;
      a.currentTime = 0;
      a.play().catch(done);
    },
    [push, fetchVoice, startListening, stopListening, focusInput],
  );
  const speak = useCallback((id: LineId, after?: () => void) => void sayText(LINES[id][langRef.current], after), [sayText]);
  const speakText = useCallback((text: string) => void sayText(text), [sayText]);

  /** Ask Eva's AI helper (Cloudflare Worker → Gemini). Resolves null if it isn't set up or fails. */
  const askAI = useCallback(async () => {
    if (!EVA_AI_ENDPOINT) return null;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);
    try {
      const res = await fetch(EVA_AI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang: langRef.current, messages: history.current.slice(-12) }),
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { reply?: string; offerBooking?: boolean; wantsToBook?: boolean };
      return data.reply ? { reply: data.reply, offerBooking: !!data.offerBooking, wantsToBook: !!data.wantsToBook } : null;
    } catch (err) {
      console.warn("Eva AI unavailable, using her scripted answer:", err);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }, []);

  /* ---------- call controls ---------- */
  const endCall = useCallback(() => {
    inCallRef.current = false;
    if (emailPoll.current) clearInterval(emailPoll.current);
    emailPoll.current = null;
    modeRef.current = "chat";
    setMode("chat");
    formHooks.current = null;
    longTurn.current = false;
    setInCall(false);
    stopListening();
    if (audio.current) {
      audio.current.onended = null;
      audio.current.pause();
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setCaption(null);
    setStatus("idle");
    level.current = 0;
  }, [stopListening]);

  /* ---------- the conversation ---------- */
  const submitLead = useCallback(async (lead: Lead) => {
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Name: lead.name,
          Email: lead.email,
          Message: lead.need,
          Source: "Eva, AI receptionist",
          Page: typeof window !== "undefined" ? window.location.href : "",
          Language: langRef.current === "es" ? "Spanish" : "English",
          _subject: `Consultation request (Eva, AI receptionist) — ${lead.name}`,
          _template: "table",
          _captcha: "false",
          _replyto: lead.email,
        }),
      });
      const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
      const ok = res.ok && (data?.success === true || data?.success === "true");
      if (!ok) console.warn("Eva booking not delivered:", res.status, data?.message ?? data);
      return ok;
    } catch {
      return false;
    }
  }, []);

  /* ---------- filling out the contact form by voice ---------- */
  const goFormStep = useCallback(
    (next: FormStep, line: LineId) => {
      formStep.current = next;
      longTurn.current = next === "message";
      speak(line);
    },
    [speak],
  );

  const waitForTypedEmail = useCallback(() => {
    if (emailPoll.current) clearInterval(emailPoll.current);
    let last = "";
    // move on once a valid email has been typed and left unchanged for a moment
    emailPoll.current = setInterval(() => {
      const h = formHooks.current;
      if (!h || !inCallRef.current || formStep.current !== "email") {
        if (emailPoll.current) clearInterval(emailPoll.current);
        return;
      }
      const v = h.getEmail().trim();
      if (EMAIL_OK.test(v) && v === last) {
        if (emailPoll.current) clearInterval(emailPoll.current);
        stopListening();
        goFormStep("company", "formCompany");
      }
      last = v;
    }, 1200);
  }, [goFormStep, stopListening]);

  const handleForm = useCallback(
    async (said: string) => {
      const h = formHooks.current;
      if (!h) return;
      switch (formStep.current) {
        case "name":
          h.setField("name", cleanName(said) || said);
          return goFormStep("email", "formEmail");
        case "email": {
          // already typed in the field ("done", "ok", "listo")?
          if (EMAIL_OK.test(h.getEmail().trim())) return goFormStep("company", "formCompany");
          const e = EMAIL_OK.test(said.trim()) ? said.trim() : spokenEmail(said);
          if (!EMAIL_OK.test(e)) {
            speak("formBadEmail");
            waitForTypedEmail();
            return;
          }
          h.setField("email", e);
          return goFormStep("company", "formCompany");
        }
        case "company":
          if (!isSkip(said)) h.setField("company", cleanCompany(said));
          return goFormStep("types", "formTypes");
        case "types": {
          const ids = parseProjectTypes(said);
          if (ids.length) h.setTypes(ids);
          else if (!typesRetried.current) {
            typesRetried.current = true;
            return speak("formTypesAgain");
          }
          return goFormStep("message", "formMessage");
        }
        case "message":
          h.setField("message", said);
          return goFormStep("confirm", "formConfirm");
        case "confirm": {
          const a = confirmAnswer(said);
          if (a === "edit") return speak("formEdit", endCall);
          if (a !== "send") return speak("formConfirm");
          setStatus("thinking");
          const ok = await h.send();
          if (!inCallRef.current) return;
          return speak(ok ? "formSent" : "formFail", endCall);
        }
      }
    },
    [goFormStep, speak, waitForTypedEmail, endCall],
  );

  const handleUser = useCallback(
    async (text: string) => {
      const said = text.trim();
      if (!said || !inCallRef.current) return;
      stopListening();
      audio.current?.pause();
      speakSeq.current++;
      push("you", said);
      if (modeRef.current === "form") {
        setStatus("thinking");
        return handleForm(said);
      }
      // answer in the language the visitor is using (English or Spanish), not only the site's language
      if (conv.current.step === "chat") {
        const spoken = detectLang(said);
        if (spoken && spoken !== langRef.current) langRef.current = spoken;
      }
      const wasChat = conv.current.step === "chat";
      const r = reply(conv.current, said);
      conv.current = r.state;
      setStep(r.state.step);
      if (r.submit) {
        setStatus("thinking");
        const ok = await submitLead(r.submit);
        track("eva_booking", { delivered: ok });
        if (ok) track("generate_lead", { source: "eva" });
        if (!inCallRef.current) return;
        speak(ok ? "booked" : "sendFail");
        return;
      }
      // still chatting (not booking, not saying goodbye)
      const inChat = wasChat && r.state.step === "chat" && !r.end;
      const es = langRef.current === "es";

      // a matching blog article, shown as a card under Eva's answer
      const article = inChat ? findArticle(said, langRef.current, suggested.current) : null;
      const wantsArticles = inChat && asksForArticles(said);
      const showArticle = () => {
        if (article) {
          suggested.current.add(article.slug);
          pushLink(article.link);
          track("eva_article_suggested", { article: article.slug });
        } else if (wantsArticles) pushLink(BLOG_LINK(langRef.current));
      };

      // "do you have articles about…?" → point to the blog
      if (wantsArticles) {
        setStatus("thinking");
        setTimeout(() => {
          if (!inCallRef.current) return;
          speakText(
            article
              ? es
                ? "Sí, escribimos un artículo sobre eso. Te dejé el enlace aquí en el chat."
                : "Yes, we wrote an article about that. I've put the link here in the chat."
              : es
                ? "Encontrarás todos nuestros artículos en el blog. Te dejé el enlace aquí en el chat."
                : "You'll find all our articles on our blog. I've put the link here in the chat.",
          );
          showArticle();
        }, 350);
        return;
      }

      // while chatting, the AI answers every question (the script is the backup if it's down)
      if (inChat && EVA_AI_ENDPOINT) {
        setStatus("thinking");
        const ai = await askAI();
        if (!inCallRef.current) return;
        if (ai?.wantsToBook) {
          conv.current = { ...conv.current, step: "name", offered: false };
          setStep("name");
          return speak("bookName");
        }
        if (ai) {
          conv.current = { ...conv.current, offered: ai.offerBooking };
          track("eva_ai_answer");
          speakText(ai.reply);
          showArticle();
          return;
        }
      }
      setStatus("thinking");
      setTimeout(() => {
        if (!inCallRef.current) return;
        if (r.end) speak(r.line, endCall);
        else {
          speak(r.line);
          showArticle();
        }
      }, 350);
    },
    [push, pushLink, speak, speakText, askAI, stopListening, submitLead, endCall, handleForm],
  );
  useEffect(() => {
    handleUserRef.current = handleUser;
  }, [handleUser]);

  const send = useCallback((text: string) => void handleUser(text), [handleUser]);

  // when the home page section scrolls into view it takes over from the floating panel
  const markSectionVisible = useCallback((v: boolean) => {
    setSectionVisible(v);
    if (v) setWidgetOpen(false);
  }, []);

  /** create the audio player + analyser (must run inside a click) */
  const ensureAudio = useCallback(() => {
    if (!audio.current) {
      const a = new Audio();
      a.preload = "auto";
      audio.current = a;
      try {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new Ctx();
        const src = ctx.createMediaElementSource(a);
        const an = ctx.createAnalyser();
        an.fftSize = 512;
        src.connect(an);
        an.connect(ctx.destination);
        actx.current = ctx;
        analyser.current = an;
      } catch {
        /* no Web Audio: the orb just breathes */
      }
    }
    actx.current?.resume().catch(() => {});
  }, []);

  const startCall = useCallback(() => {
    langRef.current = lang;
    setMicSupported(!!getSR());
    ensureAudio();
    conv.current = initialState();
    history.current = [];
    suggested.current = new Set();
    track("eva_call_start", { language: lang });
    setStep("chat");
    setMsgs([]);
    inCallRef.current = true;
    setInCall(true);
    setStatus("connecting");
    void fetchVoice(LINES.greet[lang], lang);
    setTimeout(() => {
      if (inCallRef.current) speak("greet");
    }, 900);
  }, [lang, speak, ensureAudio, fetchVoice]);

  /** Eva helps fill out the contact form: asks each field by voice and types the answers in */
  const startFormFill = useCallback(
    (hooks: FormFillHooks) => {
      if (inCallRef.current) endCall();
      langRef.current = lang;
      setMicSupported(!!getSR());
      ensureAudio();
      formHooks.current = hooks;
      history.current = [];
      suggested.current = new Set();
      track("eva_form_fill_start", { language: lang });
      formStep.current = "name";
      typesRetried.current = false;
      longTurn.current = false;
      modeRef.current = "form";
      setMode("form");
      setWidgetOpen(false);
      setMsgs([]);
      inCallRef.current = true;
      setInCall(true);
      setStatus("connecting");
      void fetchVoice(LINES.formIntro[lang], lang);
      setTimeout(() => {
        if (inCallRef.current) speak("formIntro");
      }, 600);
    },
    [lang, endCall, ensureAudio, speak, fetchVoice],
  );

  const toggleMic = useCallback(() => {
    const next = !micOnRef.current;
    setMicOn(next);
    micOnRef.current = next;
    if (!next) stopListening();
    else if (inCallRef.current && status === "listening") startListening();
  }, [status, startListening, stopListening]);

  // voice level for the orb
  useEffect(() => {
    if (status !== "speaking") return;
    let raf = 0;
    const buf = new Uint8Array(256);
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const an = analyser.current;
      if (!an) return;
      an.getByteTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) {
        const v = (buf[i] - 128) / 128;
        sum += v * v;
      }
      level.current = Math.min(1, Math.sqrt(sum / buf.length) * 4.5);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [status]);

  // a language switch hangs up (the voice and recognition are per language)
  useEffect(() => {
    if (langRef.current !== lang) {
      langRef.current = lang;
      if (inCallRef.current) endCall();
      setMsgs([]);
    }
  }, [lang, endCall]);

  // hang up if the whole app unmounts
  useEffect(
    () => () => {
      inCallRef.current = false;
      try {
        rec.current?.abort();
      } catch {
        /* ignore */
      }
      audio.current?.pause();
      actx.current?.close().catch(() => {});
    },
    [],
  );

  const api = useMemo<EvaApi>(
    () => ({
      status,
      inCall,
      msgs,
      caption,
      interim,
      micOn,
      micSupported,
      step,
      level,
      startCall,
      endCall,
      send,
      toggleMic,
      registerInput,
      widgetOpen,
      setWidgetOpen,
      sectionVisible,
      setSectionVisible: markSectionVisible,
      mode,
      startFormFill,
    }),
    [status, inCall, msgs, caption, interim, micOn, micSupported, step, startCall, endCall, send, toggleMic, registerInput, widgetOpen, sectionVisible, markSectionVisible, mode, startFormFill],
  );

  return <EvaContext.Provider value={api}>{children}</EvaContext.Provider>;
}
