import { wedding } from "@/config/wedding";
import { formatPhone, telHref, whatsappHref } from "@/lib/format";
import { Reveal } from "@/components/Reveal";
import { ScallopBand } from "@/components/ornaments/Festive";

export function Contact() {
  const { contacts, rsvp, ui } = wedding;
  if (!contacts.visible) return null;

  const rsvpReady = rsvp.enabled && rsvp.whatsappNumber;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-royal-50/60 px-6 pb-20 pt-24">
      <ScallopBand dark />
      <Reveal className="mx-auto max-w-sm">
        <div className="flex flex-col items-center text-center">
          <p lang="ur" className="urdu text-[1.9rem] text-gold-600">
            {contacts.eyebrowUr}
          </p>
          <h2 id="contact-title" className="-mt-1 font-script text-[3.2rem] leading-tight text-royal-800">
            {contacts.heading}
          </h2>
          <p className="text-lg italic text-royal-700">{contacts.tagline}</p>
        </div>

        <ul className="mt-8 flex flex-col gap-4">
          {contacts.people.map((person) => (
            <li
              key={person.phone}
              className="flex items-center justify-between gap-4 rounded-2xl border border-gold-300/70 bg-white px-5 py-4 shadow-[0_12px_30px_-20px_rgba(86,50,133,0.5)]"
            >
              <div className="min-w-0">
                <p className="text-xl font-semibold text-royal-900">{person.name}</p>
                <p className="text-base tracking-wide text-royal-600">{formatPhone(person.phone)}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-2">
                <a
                  href={telHref(person.phone)}
                  className="btn-royal min-h-[42px] px-6"
                  aria-label={`${ui.labels.call} ${person.name}`}
                >
                  {ui.labels.call}
                </a>
                {person.whatsapp && (
                  <a
                    href={whatsappHref(person.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline min-h-[42px] px-6"
                    aria-label={`${ui.labels.whatsapp} ${person.name}`}
                  >
                    {ui.labels.whatsapp}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        {rsvpReady && (
          <div className="mt-8 text-center">
            <a href={whatsappHref(rsvp.whatsappNumber!, rsvp.message)} target="_blank" rel="noopener noreferrer" className="btn-royal">
              {rsvp.buttonLabel}
            </a>
          </div>
        )}
      </Reveal>
    </section>
  );
}
