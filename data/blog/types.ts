/**
 * Blog content types.
 *
 * Each article lives in its own file in this folder (post-01.ts …) and is
 * listed in index.ts. An article body is a list of blocks, so the page can
 * style headings, quotes, lists and callouts consistently.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: string; // the URL: /blog/<slug>
  title: string;
  excerpt: string; // short summary for cards and link previews
  category: string;
  date: string; // YYYY-MM-DD
  image: string; // /images/blog/<file>.jpg (1600×900)
  imageAlt: string;
  takeaways: string[]; // "Key takeaways" box at the end
  body: Block[];
};
