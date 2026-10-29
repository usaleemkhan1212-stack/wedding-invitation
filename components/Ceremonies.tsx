import { wedding, type Ceremony } from "@/config/wedding";
import { dateParts, formatTime, isCompleteDate } from "@/lib/format";
import { Reveal } from "@/components/Reveal";
import { ArchFrame } from "@/components/ornaments/Ornaments";
import { FairyLights, FallingPetals, PearlGarland } from "@/components/ornaments/Festive";

const THEMES = {
  light: {
    section: "bg-[linear-gradient(180deg,#F0E7FA_0%,#E6D8F5_55%,#F0E7FA_100%)] text-royal-900",
    jali: "opacity-[0.07]",
    archFill: "rgba(255,255,255,0.85)",
    archInner: "#C5A8E5",
    urdu: "text-gold-600",
    title: "text-royal-800",
    soft: "text-royal-700",
    muted: "text-royal-600",
    rule: "border-royal-300",
    petals: ["#A27AD2", "#C5A8E5", "#E2CA96", "#FFFFFF"],
  },
  dark: {
    section: "bg-[radial-gradient(ellipse_at_50%_30%,#563285_0%,#2F1B4C_60%,#1E0F33_100%)] text-white",
    jali: "opacity-[0.12] mix-blend-screen",
    archFill: "rgba(30,15,51,0.35)",
    archInner: "rgba(197,168,229,0.45)",
    urdu: "text-gold-300",
    title: "text-white",
    soft: "text-royal-100",
    muted: "text-royal-200",
    rule: "border-gold-400/50",
    petals: ["#FFFFFF", "#E2CA96", "#C5A8E5", "#F0E7FA"],
  },
} as const;

function CeremonySection({ ceremony }: { ceremony: Ceremony }) {
  const t = THEMES[ceremony.theme];
  const { labels } = wedding.ui;
  const parts = dateParts(ceremony.date);
  const headingId = `${ceremony.id}-title`;

  return (
    <section
      id={ceremony.id}
      aria-labelledby={headingId}
      className={`relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-14 pt-28 ${t.section}`}
    >
      <div className={`bg-jali pointer-events-none absolute inset-0 ${t.jali}`} aria-hidden="true" />
      {ceremony.theme === "dark" ? (
        <PearlGarland className="absolute inset-x-0 top-0 h-[clamp(110px,17vh,170px)] w-full" strands={17} />
      ) : (
        <FairyLights className="absolute inset-x-0 top-6 h-20 w-full" color="#FFF8E6" />
      )}
      <FallingPetals colors={[...t.petals]} count={16} />

      <Reveal className="relative w-full max-w-[24rem]">
        <article className="relative">
          <ArchFrame fill={t.archFill} inner={t.archInner} />
          <div className="relative flex flex-col items-center px-10 pb-10 pt-[27%] text-center">
            <p lang="ur" className={`urdu text-[2.1rem] ${t.urdu}`}>
              {ceremony.titleUr}
            </p>
            <h2 id={headingId} className={`-mt-2 font-script text-[3.4rem] leading-tight ${t.title}`}>
              {ceremony.title}
            </h2>
            <p className={`mt-1 text-lg italic leading-snug ${t.soft}`}>{ceremony.tagline}</p>

            {/* Date block: month on top, weekday | day | time, year below */}
            <div className="mt-7 flex w-full flex-col items-center gap-2">
              <p className={`eyebrow ${t.muted}`}>{parts.month ?? labels.inshaAllah}</p>
              <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3">
                <span className={`eyebrow border-y py-2 ${t.rule}`}>{parts.weekday ?? labels.day}</span>
                <span className="w-[4.5rem] text-[3.6rem] font-medium leading-none">{parts.day}</span>
                <span className={`eyebrow border-y py-2 ${t.rule}`}>{formatTime(ceremony.time)}</span>
              </div>
              {parts.year ? (
                <p className={`eyebrow ${t.muted}`}>{parts.year}</p>
              ) : (
                !isCompleteDate(ceremony.date) && <p className={`text-base italic ${t.muted}`}>{wedding.pendingDateNote}</p>
              )}
            </div>

            <div className="mt-7 flex flex-col items-center">
              <p className="text-2xl font-semibold">{ceremony.venue.name}</p>
              {ceremony.venue.address && <p className={`text-balance text-lg ${t.soft}`}>{ceremony.venue.address}</p>}
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}

export function Ceremonies() {
  return (
    <>
      {wedding.ceremonies.map((ceremony) => (
        <CeremonySection key={ceremony.id} ceremony={ceremony} />
      ))}
    </>
  );
}
