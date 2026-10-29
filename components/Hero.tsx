"use client";

import { motion, type Variants } from "framer-motion";
import { wedding } from "@/config/wedding";
import { formatShortDate } from "@/lib/format";
import { Countdown } from "@/components/Countdown";
import { ArchFrame, FloralDivider } from "@/components/ornaments/Ornaments";
import { FallingPetals, ScallopBand } from "@/components/ornaments/Festive";

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ opened }: { opened: boolean }) {
  const { couple, verse, invitation, ui } = wedding;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,#F8F4FC_0%,#FFFFFF_60%)] px-6 pb-20 pt-16"
    >
      <ScallopBand />
      <FallingPetals colors={["#DFCDF2", "#C5A8E5", "#E2CA96"]} count={10} />

      <motion.div
        className="relative mx-auto flex max-w-md flex-col items-center text-center"
        initial="hidden"
        animate={opened ? "show" : "hidden"}
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } } }}
      >
        <motion.p variants={item} lang="ur" className="urdu text-[clamp(1.8rem,7vw,2.4rem)]">
          <span className="text-gold text-gold-shimmer">{wedding.bismillah}</span>
        </motion.p>
        <motion.p variants={item} className="-mt-1 text-[1.05rem] italic text-royal-700">
          “{verse.translation}” <span className="not-italic text-gold-700">{verse.reference}</span>
        </motion.p>

        <motion.div variants={item} className="mt-8 flex w-full flex-col items-center gap-3">
          <p className="text-lg italic text-gold-700">{invitation.blessing}</p>
          <div className="hairline w-32" aria-hidden="true" />
          <p className="text-xl leading-snug text-royal-900">{invitation.lead}</p>
        </motion.div>

        <motion.h1 id="hero-title" tabIndex={-1} variants={item} className="mt-6 flex flex-col items-center outline-none">
          <span className="font-script text-[clamp(3rem,13vw,4.25rem)] leading-[1.15] text-royal-800">{couple.bride}</span>
          <span className="my-1 text-lg italic text-gold-700">{couple.joiner}</span>
          <span className="font-script text-[clamp(3rem,13vw,4.25rem)] leading-[1.15] text-royal-800">{couple.groom}</span>
        </motion.h1>
        <motion.p variants={item} lang="ur" className="urdu mt-2 text-lg text-royal-600">
          {couple.brideUr} <span className="text-gold-600">❀</span> {couple.groomUr}
        </motion.p>

        <motion.p variants={item} className="mt-5 text-lg italic text-royal-700">
          {invitation.closing}
        </motion.p>

        {couple.photo && (
          <motion.div variants={item} className="relative mt-10 aspect-[4/5] w-[min(78vw,20rem)]">
            <ArchFrame fill="#F0E7FA" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={couple.photo}
              alt={`${couple.bride} and ${couple.groom}`}
              className="absolute bottom-[1.5%] left-[7.5%] h-[86%] w-[85%] object-cover [border-radius:50%_50%_0_0/32%_32%_0_0]"
            />
          </motion.div>
        )}

        <motion.p
          variants={item}
          className="mt-8 rounded-full border border-gold-400/70 bg-royal-50 px-6 py-2 text-lg font-semibold text-royal-800"
        >
          {invitation.familyBadge}
        </motion.p>

        <motion.div variants={item} className="mt-12 flex w-full flex-col items-center gap-3">
          <h2 className="eyebrow text-royal-700">{ui.programmeHeading}</h2>
          <FloralDivider className="w-40" />
          <ul className="grid w-full max-w-xs grid-cols-2 gap-3">
            {wedding.ceremonies.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className={`flex min-h-[48px] w-full items-center justify-center rounded-full border text-[1.05rem] transition hover:-translate-y-0.5 ${
                    c.theme === "dark"
                      ? "border-royal-800 bg-royal-800 text-white hover:bg-royal-900"
                      : "border-royal-400 bg-white text-royal-800 hover:bg-royal-50"
                  }`}
                >
                  <span className="font-semibold">{c.title}</span>
                  <span className="mx-1.5 opacity-50">·</span>
                  <span>{formatShortDate(c.date)}</span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <Countdown />

        <motion.a
          variants={item}
          href={`#${wedding.ceremonies[0].id}`}
          className="eyebrow mt-12 inline-flex flex-col items-center text-royal-600 transition hover:text-royal-800"
        >
          {ui.scrollCue}
          <span className="mt-2 block h-10 w-px bg-gradient-to-b from-royal-400 to-transparent" aria-hidden="true" />
        </motion.a>
      </motion.div>
    </section>
  );
}
