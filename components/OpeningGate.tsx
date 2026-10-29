"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { wedding } from "@/config/wedding";
import { formatDateSpan, isCompleteDate } from "@/lib/format";
import { ArchFrame, FloralDivider } from "@/components/ornaments/Ornaments";
import { PearlGarland, Seal } from "@/components/ornaments/Festive";

const EASE = [0.22, 1, 0.36, 1] as const;

const SPARKS = [
  { left: "12%", top: "30%", delay: "0s" },
  { left: "84%", top: "24%", delay: "1.2s" },
  { left: "8%", top: "62%", delay: "2.1s" },
  { left: "90%", top: "58%", delay: "0.6s" },
  { left: "22%", top: "86%", delay: "3s" },
  { left: "76%", top: "82%", delay: "1.8s" },
  { left: "50%", top: "94%", delay: "2.6s" },
];

function fadeUp(delay: number, reduced: boolean): Variants {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { delay: reduced ? 0 : delay, duration: reduced ? 0.2 : 1, ease: EASE },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };
}

export function OpeningGate({ onOpen }: { onOpen: () => void }) {
  const reduced = useReducedMotion() ?? false;
  const sealRef = useRef<HTMLButtonElement>(null);
  const { couple, invitation, ui } = wedding;
  const dates = wedding.ceremonies.map((c) => c.date);

  useEffect(() => {
    sealRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.div
      className="opening-gate fixed inset-0 z-50 overflow-hidden bg-royal-950 text-white"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gate-title"
      initial="hidden"
      animate="show"
      exit="exit"
      variants={{
        hidden: { opacity: 1 },
        show: { opacity: 1 },
        exit: { opacity: 0, transition: { delay: reduced ? 0 : 1.25, duration: 0.5 } },
      }}
    >
      {/* Velvet backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#563285_0%,#2F1B4C_55%,#1E0F33_100%)]" aria-hidden="true" />
      <div className="bg-jali absolute inset-0 opacity-[0.16] mix-blend-screen" aria-hidden="true" />
      {SPARKS.map((s, i) => (
        <span key={i} className="spark" style={{ left: s.left, top: s.top, animationDelay: s.delay }} aria-hidden="true" />
      ))}

      {/* Gold arch framing the card */}
      <div className="absolute inset-x-3 bottom-3 top-[5.5rem] sm:inset-x-[max(1.5rem,calc(50%-17rem))] sm:top-24" aria-hidden="true">
        <ArchFrame inner="rgba(197,168,229,0.45)" />
      </div>

      <PearlGarland className="absolute inset-x-0 top-0 h-[clamp(90px,17vh,170px)] w-full" />

      <div className="relative h-full overflow-y-auto">
        <div className="mx-auto flex min-h-full max-w-sm flex-col items-center justify-center px-8 pb-8 pt-[calc(clamp(90px,17vh,170px)+0.5rem)] text-center">
          <motion.p variants={fadeUp(0.2, reduced)} lang="ur" className="urdu text-[clamp(1.4rem,5.5vw,1.9rem)]">
            <span className="text-gold text-gold-shimmer py-1">{wedding.bismillah}</span>
          </motion.p>
          <motion.p variants={fadeUp(0.5, reduced)} lang="ur" className="urdu mt-1 text-lg text-gold-200">
            {invitation.eyebrowUr}
          </motion.p>

          <motion.p variants={fadeUp(0.8, reduced)} className="mt-3 text-[1.05rem] italic text-royal-100">
            {invitation.gateLine}
          </motion.p>

          <motion.h1 id="gate-title" variants={fadeUp(1.1, reduced)} className="mt-2 flex flex-col items-center">
            <span className="text-gold font-script text-[clamp(2.6rem,11vw,3.6rem)] leading-[1.15]">{couple.bride}</span>
            <span className="text-base italic text-royal-200">{couple.joiner}</span>
            <span className="text-gold font-script text-[clamp(2.6rem,11vw,3.6rem)] leading-[1.15]">{couple.groom}</span>
          </motion.h1>

          <motion.div variants={fadeUp(1.4, reduced)} className="mt-2 flex flex-col items-center gap-1">
            <FloralDivider className="w-44" />
            <p className="eyebrow text-gold-100">{formatDateSpan(dates)}</p>
            {!dates.every(isCompleteDate) && (
              <p className="text-sm italic text-royal-200">{wedding.pendingDateNote}</p>
            )}
          </motion.div>

          <motion.div
            variants={{
              ...fadeUp(1.8, reduced),
              exit: { scale: reduced ? 1 : 1.25, opacity: 0, transition: { duration: 0.4 } },
            }}
            className="mt-6 flex flex-col items-center gap-3"
          >
            <button
              ref={sealRef}
              type="button"
              onClick={onOpen}
              aria-label={ui.openInvitation}
              className="seal-pulse rounded-full transition-transform hover:scale-105 active:scale-95"
            >
              <Seal monogram={couple.monogram} className="w-[clamp(88px,24vw,108px)] text-[clamp(14px,3.6vw,16px)]" />
            </button>
            <span className="eyebrow text-royal-100" aria-hidden="true">
              {ui.openInvitation}
            </span>
          </motion.div>
        </div>
      </div>

      {/* White paper that unrolls from the centre when the seal is opened */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 origin-center bg-white"
        variants={{
          hidden: { scaleY: 0 },
          show: { scaleY: 0 },
          exit: { scaleY: reduced ? 0 : 1, transition: { delay: 0.3, duration: 0.95, ease: [0.65, 0, 0.35, 1] } },
        }}
      >
        <div className="absolute inset-x-0 top-0 h-2 bg-gold-400" />
        <div className="absolute inset-x-0 bottom-0 h-2 bg-gold-400" />
      </motion.div>
    </motion.div>
  );
}
