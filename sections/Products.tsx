"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const products = [
  {
    title: "HCRM AI",
    subtitle: "AI-Powered Client & Workforce Management",

    description:
      "Automate client management, communication, project tracking, and team operations with artificial intelligence.",

    features: [
      "Client Management",
      "Automated Communication",
      "Lead Qualification",
      "CRM Automation",
      "Workflow Optimization",
    ],

    image: "/images/hcrm-ai.png",
    accent: "purple",
  },

  {
    title: "BaseLead AI",
    subtitle: "AI-Powered Client Acquisition & Sales Intelligence",

    description:
      "Find and connect with potential clients using artificial intelligence, identify business opportunities, and amplify your sales process.",

    features: [
      "Find Potential Clients",
      "Identify Business Opportunities",
      "AI-Powered Outreach",
      "Manage Your Pipeline",
      "Sales Analytics & Insights",
    ],

    image: "/images/baselead-ai-blue.png",
    accent: "blue",
  },
];

const styles = {
  blue: {
    border: "border-blue-500/40 hover:border-blue-500",
    borderOn: "border-blue-500",
    text: "text-blue-500",
    glow: "bg-blue-500/30",
    dot: "bg-blue-500",
    rgb: "59,130,246",
  },

  purple: {
    border: "border-purple-500/40 hover:border-purple-500",
    borderOn: "border-purple-500",
    text: "text-purple-400",
    glow: "bg-purple-500/30",
    dot: "bg-purple-400",
    rgb: "168,85,247",
  },
};

type Product = (typeof products)[number];

function ProductCard({
  product,
  index,
  selected,
  dimmed,
  onSelect,
}: {
  product: Product;
  index: number;
  selected: boolean;
  dimmed: boolean;
  onSelect: () => void;
}) {
  const style = styles[product.accent as keyof typeof styles];

  /* 3D tilt that follows the mouse */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    // Outer wrapper: changes size (this is what makes the selected card bigger)
    <motion.div
      initial={false}
      animate={{
        flexGrow: selected ? 1.6 : 1,
        opacity: dimmed ? 0.55 : 1,
        scale: dimmed ? 0.97 : 1,
      }}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
      className="min-w-0 flex-1 basis-0"
    >
      {/* Inner card: floats, tilts and glows */}
      <motion.div
        data-cursor
        onClick={onSelect}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ scale: selected ? 1 : 1.03 }}
        whileTap={{ scale: 0.98 }}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        animate={{
          y: selected ? 0 : [0, -12, 0],
          boxShadow: selected
            ? `0 0 70px -10px rgba(${style.rgb},0.55)`
            : `0 0 0px 0px rgba(${style.rgb},0)`,
        }}
        transition={{
          y: selected
            ? { duration: 0.4 }
            : {
                duration: 5 + index * 1.2,
                delay: index * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              },
          boxShadow: { duration: 0.4 },
        }}
        className={`
          group/card
          relative
          h-full
          cursor-pointer
          overflow-hidden
          rounded-xl
          border
          bg-[#090909]
          p-6
          transition-colors
          duration-300
          ${selected ? style.borderOn : style.border}
        `}
      >
        {/* Background glow */}
        <motion.div
          animate={{ scale: selected ? 2 : 1 }}
          transition={{ duration: 0.6 }}
          className={`pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full blur-3xl ${style.glow}`}
        />

        {/* Small hint in the corner */}
        <span
          className={`absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-widest backdrop-blur-sm ${
            selected ? style.text : "text-zinc-400"
          }`}
        >
          {selected ? (
            <>
              Close <X size={10} />
            </>
          ) : (
            "Click to expand"
          )}
        </span>

        <div className="relative grid items-stretch gap-6 sm:grid-cols-[1fr_1fr]">
          {/* TEXT */}

          <div>
            <h3 className="text-xl font-semibold text-white">
              {product.title}
            </h3>

            <p className={`mt-2 text-xs font-medium ${style.text}`}>
              {product.subtitle}
            </p>

            <p className="mt-4 text-xs leading-relaxed text-zinc-400">
              {product.description}
            </p>

            <ul className="mt-5 space-y-2">
              {product.features.map((feature, i) => (
                <motion.li
                  key={feature}
                  animate={{ x: selected ? [0, 6, 0] : 0 }}
                  transition={{ delay: selected ? i * 0.06 : 0, duration: 0.4 }}
                  className="flex items-center gap-2 text-xs text-zinc-300"
                >
                  <span
                    className={`
                      h-2
                      w-2
                      shrink-0
                      rounded-full
                      ${style.dot}
                      shadow-[0_0_8px_currentColor]
                    `}
                  />

                  {feature}
                </motion.li>
              ))}
            </ul>

            <Link
              href={`/products-services#${product.title.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={(e) => e.stopPropagation()}
              className={`
                group
                mt-6
                flex
                items-center
                gap-2
                text-xs
                font-semibold
                ${style.text}
              `}
            >
              Learn More
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* PRODUCT IMAGE RIGHT: same look as the Products & Services
              cards (large, bleeds to the card edge, floats, zooms on hover) */}

          <div className="relative -mx-6 -mb-6 h-64 overflow-hidden sm:my-[-1.5rem] sm:ml-0 sm:h-auto sm:min-h-[340px]">
            <motion.img
              src={product.image}
              alt={`${product.title} dashboard`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, delay: index, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 h-[105%] w-full object-cover object-center transition-transform duration-700 group-hover/card:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#090909] via-transparent to-transparent sm:bg-gradient-to-r" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Products() {
  const [selected, setSelected] = useState<number | null>(null);

  const total = products.length;

  const toggle = (i: number) => setSelected(selected === i ? null : i);

  const next = () =>
    setSelected(selected === null ? 0 : (selected + 1) % total);

  const prev = () =>
    setSelected(selected === null ? total - 1 : (selected - 1 + total) % total);

  return (
    <section className="bg-black px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-[300px_1fr]">
          {/* LEFT INTRO */}

          <div>
            <p className="text-xs tracking-[0.4em] text-zinc-500">
              OUR PROPRIETARY PRODUCTS
            </p>

            {/* Each line is nowrap so the title stays on exactly two lines */}
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">
              <span className="block whitespace-nowrap">Innovative Tools</span>

              <span className="block whitespace-nowrap text-blue-500">
                Built for Growth.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-zinc-400">
              Our AI-powered platforms are designed to help businesses find
              opportunities, automate processes, and drive measurable results.
            </p>

            <Link
              href="/products-services#our-products"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-blue-500 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400"
            >
              Explore Our Products
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* PRODUCTS (carousel) */}

          <div>
            <div className="flex flex-col gap-6 py-4 lg:flex-row">
              {products.map((product, i) => (
                <ProductCard
                  key={product.title}
                  product={product}
                  index={i}
                  selected={selected === i}
                  dimmed={selected !== null && selected !== i}
                  onSelect={() => toggle(i)}
                />
              ))}
            </div>

            {/* Carousel controls */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                aria-label="Previous product"
                onClick={prev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition hover:border-white/40 hover:text-white"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                {products.map((product, i) => {
                  const style =
                    styles[product.accent as keyof typeof styles];

                  return (
                    <button
                      key={product.title}
                      aria-label={`Select ${product.title}`}
                      onClick={() => toggle(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        selected === i
                          ? `w-8 ${style.dot}`
                          : "w-2 bg-zinc-700 hover:bg-zinc-500"
                      }`}
                    />
                  );
                })}
              </div>

              <button
                aria-label="Next product"
                onClick={next}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-zinc-300 transition hover:border-white/40 hover:text-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}