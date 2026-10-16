import Link from "next/link";
import ParticleField from "@/components/ParticleField";
import { contact, navLinks, socials } from "@/data/site";

// These pages don't exist yet. Point each href at the real page once it does.
const resources = [
  { label: "Case Studies", href: "/portfolio" },
  { label: "Careers", href: "#" },
  { label: "FAQ", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-16 lg:px-12">
      {/* Constellation effect: dots connect to each other and to the mouse */}
      <ParticleField density={0.6} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <Link href="/">
              <img
                src="/images/studio-base-logo.png"
                alt="Studio Base"
                className="h-12 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-500">
              A technology and creative company building digital
              infrastructure for forward-thinking businesses.
            </p>

            <div className="mt-6 flex gap-5 text-sm text-zinc-400">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-yellow-400"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="text-sm font-semibold text-white">Navigation</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-500 transition hover:text-yellow-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="mt-5 space-y-3">
              {resources.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-500 transition hover:text-yellow-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <a
              href={`mailto:${contact.email}`}
              className="mt-5 block text-sm text-zinc-500 transition hover:text-yellow-400"
            >
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="mt-2 block text-sm text-zinc-500 transition hover:text-yellow-400"
            >
              {contact.phone}
            </a>
            <p className="mt-2 text-sm text-zinc-500">{contact.location}</p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-600 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Studio Base. All rights reserved.</p>
          <div className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
