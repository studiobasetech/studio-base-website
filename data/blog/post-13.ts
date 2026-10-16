import type { Post } from "./types";

const post: Post = {
  slug: "phishing-in-the-age-of-ai",
  title: "Phishing in the Age of AI: Protecting Your Team from Smarter Scams",
  excerpt:
    "AI has made scam emails fluent and fake voices convincing. Why the old warning signs no longer work, and the habits and controls that still protect your team.",
  category: "Cybersecurity",
  date: "2026-09-15",
  image: "/images/blog/phishing-v4.jpg",
  imageAlt: "An email security panel flagging a suspicious payment request with risk signals and a verification checklist",
  takeaways: [
    "Spelling mistakes and clumsy wording are no longer reliable signs of a scam.",
    "Verify unusual requests through a separate, known channel, especially anything involving money or credentials.",
    "Short, regular training and a blame-free reporting culture catch attacks early.",
    "Back habits with controls: email authentication, phishing-resistant sign-in and payment approval rules.",
  ],
  body: [
    {
      type: "p",
      text: "For years, spotting a phishing email was almost a game. The grammar was awkward, the greeting was generic and the sender claimed to be a prince with a fortune to share. Security training taught people to look for spelling mistakes and strange formatting, and for a while that advice worked reasonably well.",
    },
    {
      type: "p",
      text: "Those days are over. Language models now let attackers write fluent, polished messages in any language, tailored to a specific person and company in seconds. Voice cloning can imitate a manager’s voice from a short recording. Fake video calls are becoming possible. The scams have become smarter, and the defences need to change accordingly.",
    },
    { type: "h2", text: "What AI has changed" },
    {
      type: "p",
      text: "The biggest change is scale combined with personalization. Previously, a carefully researched, convincing attack took time, so attackers reserved it for high-value targets. Now the same level of tailoring can be produced cheaply for thousands of people. A message can reference a real project, mention a colleague by name and mimic the writing style of a supplier, all gathered from public websites and social media.",
    },
    {
      type: "p",
      text: "The second change is that attacks now move across channels. An email about an urgent payment may be followed by a phone call from someone who sounds exactly like the finance director. A message on a chat app may confirm what the email said. Each channel makes the others seem more credible, and that is precisely the point.",
    },
    {
      type: "quote",
      text: "When anyone can sound like anyone, the question is no longer “does this look real?” but “how do I know it is?”",
    },
    { type: "h2", text: "The warning signs that still work" },
    {
      type: "p",
      text: "If wording and appearance are unreliable, attention has to shift to the request itself. Scams, however polished, still try to make people act before they think. The signals worth watching for are about behaviour, not grammar:",
    },
    {
      type: "list",
      items: [
        "Urgency: pressure to act immediately, often before a deadline or outside working hours.",
        "Secrecy: a request to keep something confidential or to bypass the usual process.",
        "Money or access: any request to pay, change bank details, share codes or sign in through a link.",
        "Channel switching: a push to move the conversation to a personal phone or a new app.",
        "Unusual routes: a known person asking for something through a channel they normally don’t use.",
      ],
    },
    {
      type: "p",
      text: "None of these prove a message is fraudulent. Real colleagues do sometimes need things urgently. But when two or more of these signals appear together, it is time to slow down and verify.",
    },
    { type: "h2", text: "Verification habits beat detection" },
    {
      type: "p",
      text: "The most effective defence against AI-powered scams is a simple habit: verify unusual requests through a separate channel that you already trust. If an email asks you to change a supplier’s bank details, call the supplier using the number in your own records, not the one in the email. If your manager calls asking for an urgent transfer, hang up and call them back on their known number, or confirm in person.",
    },
    {
      type: "p",
      text: "Some teams agree on a verbal code word for high-risk requests, which a cloned voice will not know. Others adopt a rule that no payment or access change is ever approved on the strength of a single message or call. These habits only work if leaders follow them too, and if nobody is criticized for taking a few minutes to check.",
    },
    {
      type: "callout",
      title: "Make it normal to check",
      text: "Tell your team explicitly that verifying a request from a senior person is expected, not rude. Attackers rely on people being afraid to question authority. Remove that fear and many scams fail.",
    },
    { type: "h2", text: "Training that actually sticks" },
    {
      type: "p",
      text: "An annual presentation is easily forgotten. Effective awareness is short, frequent and based on realistic examples. Share recent scam attempts, including ones aimed at your own organization, and talk through what gave them away. Explain that polished language is no longer a sign of legitimacy, and that voices and even faces can be faked.",
    },
    {
      type: "p",
      text: "Simulated phishing exercises can help, provided they are used to teach rather than to shame. The most important metric is not how many people clicked, but how many reported the message and how quickly. Make reporting a single, easy step, thank people who do it and respond quickly. Someone who says “I think I clicked something I shouldn’t have” within minutes has given you the best possible chance to contain the damage.",
    },
    { type: "h2", text: "Technical controls that back people up" },
    {
      type: "p",
      text: "People will occasionally be fooled, however good their training. Technical controls reduce the chance of a scam reaching them and limit the damage when one succeeds. Start with email authentication: publish the records that tell receiving servers which systems are allowed to send email from your domain, and set a policy to reject messages that fail. This makes it much harder for attackers to send email that appears to come from your own address.",
    },
    {
      type: "p",
      text: "Next, strengthen sign-in. Multi-factor authentication blocks many attacks that rely on stolen passwords, and phishing-resistant methods, such as physical security keys or device-based passkeys, cannot be tricked into working on a fake login page. Prioritize administrators, finance staff and anyone with access to sensitive data.",
    },
    {
      type: "p",
      text: "Finally, build verification into your payment process. Require two people to approve new payees and changes to bank details, add a waiting period for large or unusual transfers and flag external emails clearly. These controls turn a single successful deception into an attempt that a second person is likely to catch.",
    },
    { type: "h2", text: "Staying a step ahead" },
    {
      type: "p",
      text: "AI has given attackers powerful new tools, but the fundamentals of defence remain the same: slow down, verify through trusted channels and design processes so that no single message can cause serious harm. Those principles hold no matter how convincing the next scam becomes.",
    },
    {
      type: "p",
      text: "The organizations that cope best are not the ones with the most sophisticated technology. They are the ones where checking is normal, reporting is easy and important decisions never rest on one unverified request.",
    },
  ],
};

export default post;
