import type { Post } from "./types";

const post: Post = {
  slug: "ransomware-resilience-backups",
  title: "Backups That Actually Work: Ransomware Resilience for Growing Teams",
  excerpt:
    "Having backups is not the same as being able to recover. How to build copies attackers can’t touch, test them properly and know exactly what to do on a bad day.",
  category: "Cybersecurity",
  date: "2026-07-21",
  image: "/images/blog/backups-v4.jpg",
  imageAlt: "A backup and recovery console showing immutable snapshots, a successful restore test and recovery time targets",
  takeaways: [
    "Keep several copies of important data, in different places, with at least one offline or immutable.",
    "A backup only counts once you have restored from it successfully.",
    "Agree on how much data you can lose and how long you can be down before an incident, not during one.",
    "Write a short recovery playbook and rehearse it, so a bad day follows a plan instead of panic.",
  ],
  body: [
    {
      type: "p",
      text: "Most organizations believe they have backups. A server copies files somewhere every night, a cloud service promises to keep everything safe, and a green tick appears in a dashboard nobody looks at very often. It feels like enough, until the day someone opens the wrong attachment and every file on the shared drive is suddenly encrypted and renamed.",
    },
    {
      type: "p",
      text: "Ransomware has changed what a backup needs to do. Attackers no longer just lock your files; they actively look for your backups and destroy them first, because a business that can restore has no reason to pay. Resilience is therefore not about whether copies exist, but whether you can get your operations running again, quickly and confidently, when the worst happens.",
    },
    { type: "h2", text: "The 3-2-1 rule, updated" },
    {
      type: "p",
      text: "A long-standing rule of thumb still holds up well: keep three copies of your data, on two different types of storage, with one copy kept off-site. The idea is simple. A single failure, whether a broken disk, a flooded office or a mistaken deletion, should never be able to take out every copy at once.",
    },
    {
      type: "p",
      text: "Ransomware adds one more requirement. At least one of those copies must be out of an attacker’s reach, either physically disconnected or stored in a way that cannot be altered or deleted for a set period. Many teams now describe this as 3-2-1-1: three copies, two media, one off-site and one offline or immutable.",
    },
    { type: "h2", text: "Copies attackers can’t touch" },
    {
      type: "p",
      text: "If your backup system can be reached with the same administrator account an attacker has just stolen, it is not really a separate copy. Immutable storage solves this by locking each backup for a fixed retention period; during that time, nobody can change or delete it, not even an administrator. Offline copies achieve the same thing the old-fashioned way, by being physically disconnected from the network.",
    },
    {
      type: "p",
      text: "A few practical habits make these protections far stronger:",
    },
    {
      type: "list",
      items: [
        "Separate credentials: backup systems use their own accounts, protected with multi-factor authentication and never shared with everyday admin work.",
        "Retention long enough: keep enough history to go back to a point before an attacker quietly got in, which can be weeks rather than days.",
        "Alerts on changes: get notified when backup jobs fail, retention settings change or large amounts of data are deleted.",
        "Cloud data included: email, shared documents and online applications need their own backups, as providers mainly protect against their failures, not yours.",
        "Configuration as well as files: back up system settings, so you can rebuild servers and services, not just restore documents.",
      ],
    },
    { type: "h2", text: "A backup you haven’t restored is a hope" },
    {
      type: "p",
      text: "The most common surprise during an incident is discovering that backups were incomplete, corrupted or far slower to restore than anyone expected. A job that reported success every night may have been skipping a folder for months. The only way to know is to restore regularly and check the result.",
    },
    {
      type: "quote",
      text: "Nobody really cares whether the backup ran. What matters is whether you can restore from it.",
    },
    {
      type: "p",
      text: "Start with small, frequent tests: restore a single file or mailbox each month and confirm it opens correctly. A few times a year, go further and restore a complete system into a separate environment, timing how long it takes. Those timings are often the most valuable thing you will learn, because they reveal whether your recovery plan is realistic.",
    },
    { type: "h2", text: "Decide how much you can afford to lose" },
    {
      type: "p",
      text: "Two simple questions shape every backup decision. The first is how much data you can afford to lose, often called the recovery point objective. If you back up once a night, a failure late in the afternoon could cost a full day of work. The second is how long you can afford to be down, the recovery time objective. Some systems can wait a few days; others stop the business within an hour.",
    },
    {
      type: "p",
      text: "These answers are business decisions, not technical ones, and they differ by system. Order processing and customer records may need frequent backups and fast recovery, while an archive of old projects can tolerate much more. Agreeing on them in advance lets you spend money where it matters, and it gives everyone a clear priority list when several systems are down at once.",
    },
    {
      type: "callout",
      title: "A quarterly check",
      text: "Pick one critical system every quarter. Restore it from backup into a test environment, time the process and compare the result with your agreed recovery targets. Record what went wrong and fix it before the next test.",
    },
    { type: "h2", text: "Write the playbook before you need it" },
    {
      type: "p",
      text: "During an attack, people are stressed, systems are unavailable and the usual communication channels may be compromised. That is the worst moment to work out who does what. A short incident playbook, ideally kept on paper as well as online, removes much of the confusion.",
    },
    {
      type: "p",
      text: "It should cover how to isolate affected machines, who makes decisions, which outside help to call, how staff and customers will be informed, and the order in which systems are restored. Include contact details that do not depend on your own email or phone systems. Then walk through it once or twice a year as a tabletop exercise, talking through a realistic scenario and noting where the plan breaks down.",
    },
    { type: "h2", text: "Resilience is a habit" },
    {
      type: "p",
      text: "None of this requires a large security team. It requires a few clear decisions, a backup setup that keeps at least one copy out of reach, and the discipline to test it regularly. The cost is modest compared with days of downtime, lost data and the difficult choice of whether to pay a criminal.",
    },
    {
      type: "p",
      text: "When backups are tested, protected and paired with a rehearsed plan, ransomware becomes a serious disruption rather than an existential threat. That shift, from hoping to knowing, is what real resilience looks like.",
    },
  ],
};

export default post;
