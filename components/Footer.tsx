import { wedding } from "@/config/wedding";
import { FallingPetals, Seal } from "@/components/ornaments/Festive";

export function Footer() {
  const { footer, couple, ui } = wedding;

  return (
    <footer className="relative z-[2] overflow-hidden bg-[radial-gradient(ellipse_at_bottom,#F0E7FA_0%,#FFFFFF_65%)] px-6 pb-12 pt-20 text-center">
      <FallingPetals colors={["#C5A8E5", "#A27AD2", "#E2CA96"]} count={14} />
      <div className="relative mx-auto flex max-w-sm flex-col items-center">
        <Seal monogram={couple.monogram} className="w-24 text-[15px]" />
        <p lang="ur" className="urdu mt-6 whitespace-nowrap text-[clamp(1.25rem,5.2vw,1.9rem)]">
          <span className="text-gold">{footer.messageUr}</span>
        </p>
        <p className="mt-1 text-lg italic text-royal-700">{footer.message}</p>
        <p className="mt-6 flex flex-wrap justify-center gap-x-3 font-script text-[2.4rem] leading-tight text-royal-800">
          <span className="whitespace-nowrap">{couple.bride} &amp;</span>
          <span className="whitespace-nowrap">{couple.groom}</span>
        </p>
        <p className="eyebrow mt-2 text-gold-700">{footer.signature}</p>

        <a href="#top" className="eyebrow mt-10 inline-flex min-h-[44px] items-center text-royal-600 hover:text-royal-900">
          {ui.labels.backToTop}
        </a>
      </div>
    </footer>
  );
}
