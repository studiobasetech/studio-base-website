import type { Post } from "./types";

const post: Post = {
  slug: "the-art-of-the-prompt",
  title: "The Art of the Prompt: A Practical Guide to Working With Language Models",
  excerpt:
    "Getting great results from AI is less about magic words and more about clear thinking. A field guide to context, examples, constraints and iteration.",
  category: "Artificial Intelligence",
  date: "2026-09-22",
  image: "/images/blog/prompting-v2.jpg",
  imageAlt: "A laptop showing a chat conversation between a person and an AI assistant",
  takeaways: [
    "Treat the model like a capable new colleague: give it context, not just commands.",
    "Show what good looks like with an example; it beats paragraphs of description.",
    "State the format, length and audience you want, and what to avoid.",
    "Iterate: the first answer is a draft, and your feedback is part of the process.",
  ],
  body: [
    {
      type: "p",
      text: "Ask two people to get the same result from the same AI model and you will often see very different outcomes. One gets a vague, generic paragraph. The other gets something precise, well structured and immediately useful. The model did not change. What changed was the request. Writing good prompts is a skill, and like any skill it can be learned.",
    },
    {
      type: "p",
      text: "The good news is that it has little to do with secret phrases or clever tricks. The habits that produce great prompts are the same habits that produce great briefs for human colleagues: clarity about the goal, enough background to make good decisions, and a shared picture of what the finished work should look like.",
    },
    { type: "h2", text: "Start with context, not commands" },
    {
      type: "p",
      text: "Language models know a great deal about the world but nothing about your situation unless you tell them. “Write a product announcement” forces the model to guess the product, the audience, the tone and the length. “Write a short announcement for existing customers of an accounting app, explaining that invoices can now be exported to spreadsheet format; the tone is friendly and plain, around 120 words” leaves far less to chance.",
    },
    {
      type: "p",
      text: "A useful mental model is the capable new hire. They are smart and fast, but it is their first day. What would you need to tell them for the task to go well? Who is the audience, why does the task matter, what has already been tried, and what constraints exist? Most of that information takes a few sentences to write and saves several rounds of correction.",
    },
    {
      type: "quote",
      text: "The quality of the answer rarely exceeds the clarity of the question.",
    },
    { type: "h2", text: "Show, don’t just tell" },
    {
      type: "p",
      text: "Describing a style in words is surprisingly hard. Showing an example is easy. If you want summaries in a particular format, paste one you like and ask for the same structure. If you want a certain voice, include a short sample of writing in that voice. Models are excellent at picking up patterns from examples, often better than they are at interpreting abstract instructions like “make it punchy”.",
    },
    {
      type: "p",
      text: "One caution: models can copy examples too literally. If every example you give is about the same topic, the output may drift toward that topic. Two or three varied examples usually teach the pattern without locking in the content.",
    },
    { type: "h2", text: "Be explicit about the shape of the answer" },
    {
      type: "p",
      text: "Many disappointing results are actually formatting problems. The content is fine, but it arrives as a wall of text when you needed a table, or as ten bullet points when you needed two sentences. Say what you want:",
    },
    {
      type: "list",
      items: [
        "Format: a table, a numbered list, an email, a short paragraph, a structured outline.",
        "Length: a word count or a number of items, rather than “brief” or “detailed”.",
        "Audience: executives, technical teams, customers or beginners each need a different level of detail.",
        "Boundaries: topics to avoid, claims not to make, and what to do when information is missing.",
      ],
    },
    {
      type: "p",
      text: "The last point deserves attention. Telling a model “if you are not sure, say so instead of guessing” is one of the simplest ways to reduce confident but wrong answers.",
    },
    { type: "h2", text: "Break big tasks into steps" },
    {
      type: "p",
      text: "Complex requests work better as a sequence. Instead of asking for a finished market report in one go, ask first for an outline, review it, then ask for each section. Instead of asking for a final decision, ask the model to list the options, then the pros and cons of each, then a recommendation. Each step gives you a chance to correct course before errors compound.",
    },
    {
      type: "p",
      text: "Asking the model to reason before answering can also help with analytical tasks. A request such as “first list the facts from the document that are relevant, then answer the question” encourages it to ground its answer in the material rather than in general assumptions.",
    },
    {
      type: "callout",
      title: "Try this",
      text: "Before sending a long prompt, ask yourself: if a person received this message, would they know exactly what to deliver? If not, the model won’t either.",
    },
    { type: "h2", text: "Iterate like an editor" },
    {
      type: "p",
      text: "The first response is a draft. Treat it the way an editor treats a first version: point to what works, name what does not, and ask for a revision. Specific feedback such as “the second paragraph repeats the first; cut it and add a concrete example” produces much better revisions than “make it better”.",
    },
    {
      type: "p",
      text: "Over time you will notice that certain instructions keep coming back. Save them. A small personal library of prompts for recurring tasks, such as meeting summaries, email replies or document reviews, turns individual experiments into a reliable team practice.",
    },
    { type: "h2", text: "Know the limits" },
    {
      type: "p",
      text: "Good prompting improves results, but it does not change what a model fundamentally is. Models can produce plausible statements that are not true, especially about recent events, niche facts or numbers. They do not automatically know your internal data unless it is provided. Important outputs, such as figures, legal wording or anything published under your name, still deserve a human check.",
    },
    {
      type: "p",
      text: "Prompting is best seen as a form of communication. The clearer you are about what you want and why, the more useful the model becomes. That is good news, because clear communication is a skill that pays off far beyond AI.",
    },
  ],
};

export default post;
