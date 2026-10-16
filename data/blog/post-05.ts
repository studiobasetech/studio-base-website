import type { Post } from "./types";

const post: Post = {
  slug: "zero-trust-explained",
  title: "Never Trust, Always Verify: Zero Trust Security Explained",
  excerpt:
    "The office firewall used to be the castle wall. With cloud apps and remote work, that wall is gone. Why zero trust became the new baseline, and how to start.",
  category: "Cybersecurity",
  date: "2026-08-11",
  image: "/images/blog/zero-trust.jpg",
  imageAlt: "A golden shield with a keyhole surrounded by a hexagonal grid",
  takeaways: [
    "Zero trust replaces “inside the network is safe” with “verify every request”.",
    "Identity is the new perimeter: strong sign-in and multi-factor authentication come first.",
    "Give people and systems only the access they need, for only as long as they need it.",
    "Assume breaches will happen and design so a single compromise can’t spread.",
  ],
  body: [
    {
      type: "p",
      text: "For decades, company security followed a simple idea: build a strong wall around the office network and trust whatever is inside it. Firewalls guarded the gate, and once you were in, you could reach most systems. That model made sense when employees worked at desks in one building and applications lived on servers in the basement.",
    },
    {
      type: "p",
      text: "That world has largely disappeared. People work from home, from cafés and from airports. Applications live in the cloud. Partners, contractors and devices connect from everywhere. There is no longer a clear inside and outside, and attackers have learned that once they get past the wall, often with a single stolen password, they can move freely. Zero trust is the response.",
    },
    { type: "h2", text: "The core idea" },
    {
      type: "p",
      text: "Zero trust can be summarized in four words: never trust, always verify. No user, device or system is trusted by default simply because of where it connects from. Every request to access data or an application is checked based on who is asking, what device they are using, what they are trying to reach and whether the request makes sense in context.",
    },
    {
      type: "quote",
      text: "In a zero trust world, being on the network proves nothing. Every door checks every visitor.",
    },
    {
      type: "p",
      text: "This sounds strict, and it is, but it does not have to be inconvenient. Well-designed zero trust systems do most of their checking automatically and invisibly. Legitimate users experience smooth access; suspicious requests meet extra hurdles or are blocked.",
    },
    { type: "h2", text: "The building blocks" },
    {
      type: "list",
      items: [
        "Strong identity: every person and service has a verified identity, protected by multi-factor authentication.",
        "Device health: access depends partly on whether the device is updated, managed and free of known threats.",
        "Least privilege: people get access only to what their role requires, and elevated access expires.",
        "Segmentation: systems are divided into smaller zones, so a breach in one doesn’t open the others.",
        "Continuous monitoring: unusual behaviour, such as a login from a new country at 3 a.m., triggers checks or alerts.",
      ],
    },
    { type: "h2", text: "Why identity comes first" },
    {
      type: "p",
      text: "Stolen and weak credentials remain one of the most common ways attackers get in. That is why most zero trust journeys begin with identity. Consolidating logins through a single sign-on system, enforcing multi-factor authentication and removing shared accounts dramatically reduces risk, often at modest cost.",
    },
    {
      type: "p",
      text: "Not all second factors are equally strong. Codes sent by text message are better than nothing, but authenticator apps and physical security keys resist phishing far more effectively. Where possible, move the most sensitive accounts, such as administrators and finance teams, to the strongest methods first.",
    },
    { type: "h2", text: "Assume breach" },
    {
      type: "p",
      text: "A key mindset shift in zero trust is to assume that some part of your environment is already compromised, or will be. Instead of investing everything in keeping attackers out, you also design so that an attacker who gets in can do as little damage as possible.",
    },
    {
      type: "p",
      text: "In practice this means limiting how far any single account can reach, keeping backups that cannot be altered or deleted from the main network, logging important actions and actually reviewing those logs. It also means practising your response, so that if something happens, people know who to call and what to do in the first hour.",
    },
    {
      type: "callout",
      title: "Quick wins",
      text: "Turn on multi-factor authentication everywhere it is available, remove access for people who have left, review who has administrator rights, and test that you can restore from backup. These four steps close a large share of common gaps.",
    },
    { type: "h2", text: "The human layer" },
    {
      type: "p",
      text: "Technology alone does not make an organization secure. Many successful attacks begin with a convincing email, a phone call that sounds urgent or a fake login page that looks exactly like the real one. Zero trust reduces the damage these attacks can do, but people remain the first line of defence.",
    },
    {
      type: "p",
      text: "Effective security awareness is short, regular and practical. Instead of an annual training session that everyone forgets, share brief examples of real phishing attempts, explain the warning signs and make it easy to report something suspicious. Reward people for reporting, even when it turns out to be a false alarm. A culture where people feel safe saying “I think I clicked something I shouldn’t have” catches incidents early, when they are still easy to contain.",
    },
    {
      type: "p",
      text: "Security should also be designed around how people actually work. When protections are so cumbersome that staff find workarounds, such as sharing passwords or forwarding documents to personal accounts, the organization ends up less safe, not more. The goal of zero trust is strong security that feels nearly invisible to legitimate users.",
    },
    { type: "h2", text: "A journey, not a product" },
    {
      type: "p",
      text: "Vendors sometimes present zero trust as something you can buy in a box. It is better understood as an architecture and a set of principles that you apply progressively. Most organizations adopt it in stages: identity first, then devices, then applications and data, with monitoring improving throughout.",
    },
    {
      type: "p",
      text: "The payoff is resilience. In a zero trust environment, a single phished password or infected laptop is an incident to contain, not a disaster that exposes everything. In a world without walls, that is the kind of security that actually holds.",
    },
  ],
};

export default post;
