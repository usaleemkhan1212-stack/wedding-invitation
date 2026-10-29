import { wedding } from "@/config/wedding";
import { Reveal } from "@/components/Reveal";
import { FallingPetals } from "@/components/ornaments/Festive";

export function Family() {
  const { family } = wedding;

  return (
    <section
      id="family"
      aria-labelledby="family-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#2F1B4C_0%,#1E0F33_100%)] px-6 py-24 text-white"
    >
      <div className="bg-jali pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-screen" aria-hidden="true" />
      <FallingPetals colors={["#E2CA96", "#FFFFFF", "#C5A8E5"]} count={14} />

      <Reveal className="relative mx-auto flex max-w-sm flex-col items-center text-center">
        <p lang="ur" className="urdu text-[1.9rem] text-gold-300">
          {family.eyebrowUr}
        </p>
        <h2 id="family-title" className="-mt-1 font-script text-[3.2rem] leading-tight">
          <span className="text-gold">{family.heading}</span>
        </h2>
        <p className="text-lg italic text-royal-100">{family.tagline}</p>

        <ul className="mt-8 w-full border-t border-white/10">
          {family.members.map((name) => (
            <li key={name} className="border-b border-white/10 py-3 text-xl tracking-wide text-white/95">
              {name}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
