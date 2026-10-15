"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  FileText,
  Code2,
  Rocket,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { motion, useInView, type Variants } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We understand your goals and opportunities.",
    icon: Search,
    color: "text-yellow-400",
    fill: "bg-yellow-400",
  },
  {
    number: "02",
    title: "Strategy",
    description: "We design the right solution and roadmap.",
    icon: FileText,
    color: "text-purple-500",
    fill: "bg-purple-500",
  },
  {
    number: "03",
    title: "Development",
    description: "We build, test, and refine your solution.",
    icon: Code2,
    color: "text-blue-500",
    fill: "bg-blue-500",
  },
  {
    number: "04",
    title: "Deployment",
    description: "We launch and ensure optimal performance.",
    icon: Rocket,
    color: "text-cyan-400",
    fill: "bg-cyan-400",
  },
  {
    number: "05",
    title: "Growth",
    description: "We provide ongoing support to help you scale.",
    icon: BarChart3,
    color: "text-yellow-400",
    fill: "bg-yellow-400",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Entrance animations */

const headerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const stepsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
};

const stepItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const lineDraw: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, delay: 0.4, ease: EASE } },
};

const CYCLE_MS = 2200;
// 0..4 = a step is active, 5 = every step finished (short pause), then restart
const FINISHED = steps.length;

export default function Process() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stepsRef, { once: true, amount: 0.4 });

  const [active, setActive] = useState(-1);
  const [paused, setPaused] = useState(false);

  /* Start the step-by-step highlight once the section is on screen */
  useEffect(() => {
    if (!inView) return;

    setActive((current) => (current === -1 ? 0 : current));

    if (paused) return;

    const timer = setInterval(() => {
      setActive((current) => (current >= FINISHED ? 0 : current + 1));
    }, CYCLE_MS);

    return () => clearInterval(timer);
  }, [inView, paused]);

  return (
    <section className="bg-black px-6 py-20 text-white lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header: title left, description right */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <motion.p
              variants={headerItem}
              className="mb-4 text-xs tracking-[0.35em] text-zinc-400"
            >
              OUR PROCESS
            </motion.p>

            <motion.h2
              variants={headerItem}
              className="text-4xl font-medium leading-tight md:text-5xl"
            >
              From Strategy
              <br />
              to Real Results.
            </motion.h2>
          </div>

          <motion.p
            variants={headerItem}
            className="max-w-md text-sm leading-relaxed text-zinc-400 lg:pb-2"
          >
            We follow a structured and collaborative process to ensure every
            project is aligned with your goals, delivered efficiently, and built
            for long-term success.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          ref={stepsRef}
          variants={stepsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            const isActive = active === index;
            const isDone = active > index;

            return (
              <motion.div
                key={step.number}
                variants={stepItem}
                onMouseEnter={() => {
                  setActive(index);
                  setPaused(true);
                }}
                onMouseLeave={() => setPaused(false)}
                className="flex justify-center lg:justify-start"
              >
                <div className="relative flex flex-col items-center text-center">
                  {/* Number badge + icon */}
                  <div className="mb-5 flex items-center gap-3">
                    {/* Badge */}
                    <motion.div
                      animate={{ scale: isActive ? 1.15 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full border bg-black text-[11px] transition-colors duration-300 ${
                        isActive
                          ? `${step.color} border-current shadow-[0_0_14px_currentColor]`
                          : "border-zinc-700 text-zinc-300"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full border border-current"
                          initial={{ scale: 1, opacity: 0.7 }}
                          animate={{ scale: 2, opacity: 0 }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      )}
                      <span className="relative">{step.number}</span>
                    </motion.div>

                    {/* Icon (floats gently, reacts when active) */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 3 + index * 0.4,
                        delay: index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`relative ${step.color}`}
                    >
                      {/* Glow */}
                      <motion.div
                        animate={{
                          opacity: isActive ? 0.7 : 0.3,
                          scale: isActive ? [1, 1.35, 1] : 1,
                        }}
                        transition={{
                          opacity: { duration: 0.4 },
                          scale: isActive
                            ? { duration: 1.6, repeat: Infinity }
                            : { duration: 0.4 },
                        }}
                        className="absolute -inset-2 rounded-full bg-current blur-xl"
                      />

                      <motion.div
                        animate={{
                          scale: isActive ? 1.18 : 1,
                          rotate: isActive ? [0, -10, 10, 0] : 0,
                        }}
                        transition={{
                          scale: { type: "spring", stiffness: 250, damping: 14 },
                          rotate: { duration: 0.7 },
                        }}
                        className="relative"
                      >
                        <Icon
                          size={40}
                          strokeWidth={1.5}
                          className="drop-shadow-[0_0_8px_currentColor]"
                        />
                      </motion.div>
                    </motion.div>
                  </div>

                  <h3 className="text-base font-medium">{step.title}</h3>

                  <p
                    className={`mt-2 max-w-[160px] text-xs leading-relaxed transition-colors duration-300 ${
                      isActive ? "text-zinc-200" : "text-zinc-400"
                    }`}
                  >
                    {step.description}
                  </p>

                  {/* Connector line with arrow (desktop only) */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="absolute left-full top-4 ml-4 hidden w-14 items-center text-zinc-600 lg:flex xl:w-20"
                    >
                      {/* Line draws itself on entrance */}
                      <motion.span
                        variants={lineDraw}
                        className="relative h-px flex-1 origin-left bg-zinc-700"
                      >
                        {/* Colored fill once this step is complete */}
                        <motion.span
                          initial={false}
                          animate={{ scaleX: isDone ? 1 : 0 }}
                          transition={{ duration: 0.8, ease: EASE }}
                          className={`absolute inset-0 origin-left ${step.fill}`}
                        />

                        {/* Light traveling along the line while this step is active */}
                        {isActive && (
                          <motion.span
                            className={`absolute -top-[2px] h-[5px] w-[5px] rounded-full ${step.fill} shadow-[0_0_10px_currentColor] ${step.color}`}
                            initial={{ left: "0%", opacity: 1 }}
                            animate={{ left: "100%", opacity: [1, 1, 0] }}
                            transition={{ duration: 1.6, ease: "easeInOut" }}
                          />
                        )}
                      </motion.span>

                      <ChevronRight
                        size={16}
                        className={`-ml-2.5 transition-colors duration-500 ${
                          isDone ? step.color : "text-zinc-600"
                        }`}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}