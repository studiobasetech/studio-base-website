"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { contact } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { LINES, initialState, reply, type ConvState, type Lead, type LineId } from "@/data/receptionist";

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
export type EvaMsg = { who: "eva" | "you"; text: string; id: number };

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
const getSR = (): (new () => SR) | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
};

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

  const push = useCallback((who: EvaMsg["who"], text: string) => {
    const id = ++msgId.current;
    setMsgs((m) => [...m, { who, text, id }]);
    return id;
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
    r.continuous = false;
    let finalText = "";
    r.onresult = (e) => {
      let txt = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finalText += res[0].transcript;
        else txt += res[0].transcript;
      }
      setInterim((finalText + " " + txt).trim());
    };
    r.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setMicOn(false);
        micOnRef.current = false;
      }
    };
    r.onend = () => {
      if (rec.current !== r) return;
      const said = finalText.trim();
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

  /* ---------- speaking ---------- */
  const speak = useCallback(
    (id: LineId, after?: () => void) => {
      const text = LINES[id][langRef.current];
      const mid = push("eva", text);
      setCaption({ id: mid, shown: 0 });
      setStatus("speaking");
      stopListening();
      const a = audio.current;
      const done = () => {
        setCaption(null);
        level.current = 0;
        if (!inCallRef.current) return;
        if (after) after();
        else if (conv.current.step === "email") {
          setStatus("listening");
          focusInput();
        } else startListening();
      };
      if (!a) return done();
      a.onended = done;
      a.onerror = done;
      a.ontimeupdate = () => {
        if (a.duration) setCaption({ id: mid, shown: Math.min(1, a.currentTime / (a.duration * 0.92)) });
      };
      a.src = `/audio/eva/${langRef.current}/${id}.mp3`;
      a.currentTime = 0;
      a.play().catch(done);
    },
    [push, startListening, stopListening, focusInput],
  );

  /* ---------- call controls ---------- */
  const endCall = useCallback(() => {
    inCallRef.current = false;
    setInCall(false);
    stopListening();
    if (audio.current) {
      audio.current.onended = null;
      audio.current.pause();
    }
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
      const data = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
      return res.ok && (data?.success === true || data?.success === "true");
    } catch {
      return false;
    }
  }, []);

  const handleUser = useCallback(
    async (text: string) => {
      const said = text.trim();
      if (!said || !inCallRef.current) return;
      stopListening();
      audio.current?.pause();
      push("you", said);
      const r = reply(conv.current, said);
      conv.current = r.state;
      setStep(r.state.step);
      if (r.submit) {
        setStatus("thinking");
        const ok = await submitLead(r.submit);
        if (!inCallRef.current) return;
        speak(ok ? "booked" : "sendFail");
        return;
      }
      setStatus("thinking");
      setTimeout(() => {
        if (!inCallRef.current) return;
        if (r.end) speak(r.line, endCall);
        else speak(r.line);
      }, 350);
    },
    [push, speak, stopListening, submitLead, endCall],
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

  const startCall = useCallback(() => {
    langRef.current = lang;
    setMicSupported(!!getSR());
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
    conv.current = initialState();
    setStep("chat");
    setMsgs([]);
    inCallRef.current = true;
    setInCall(true);
    setStatus("connecting");
    setTimeout(() => {
      if (inCallRef.current) speak("greet");
    }, 900);
  }, [lang, speak]);

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
    }),
    [status, inCall, msgs, caption, interim, micOn, micSupported, step, startCall, endCall, send, toggleMic, registerInput, widgetOpen, sectionVisible, markSectionVisible],
  );

  return <EvaContext.Provider value={api}>{children}</EvaContext.Provider>;
}
