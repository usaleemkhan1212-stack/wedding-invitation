/**
 * Central configuration for the wedding invitation.
 *
 * Every piece of editable content lives here: names, ceremony details,
 * family members, contact numbers and optional features. The invitation is
 * bilingual: English is the main language, and fields ending in `Ur` hold
 * the Urdu accents shown alongside it.
 *
 * Dates: only the day is confirmed so far. When the month and year are
 * confirmed, fill in `month` (1–12) and `year` for each ceremony. The full
 * date (with weekday) and the countdown then appear automatically.
 */

export type CeremonyDate = {
  /** Day of the month (confirmed). */
  day: number;
  /** 1–12, or null while not yet confirmed. */
  month: number | null;
  /** Four-digit year, or null while not yet confirmed. */
  year: number | null;
};

export type Ceremony = {
  id: "mehndi" | "baraat";
  title: string;
  titleUr: string;
  tagline: string;
  date: CeremonyDate;
  /** 24-hour time in Pakistan Standard Time, e.g. "19:00". */
  time: string;
  /** Visual theme of the ceremony's section. */
  theme: "light" | "dark";
  venue: {
    name: string;
    /** Second address line, or null if not needed. */
    address: string | null;
  };
};

export type Contact = {
  name: string;
  /** Local Pakistani format, e.g. "0308 9875977". */
  phone: string;
  /** Show a WhatsApp button for this number (only once confirmed). */
  whatsapp: boolean;
};

export const wedding = {
  couple: {
    bride: "Iqra Maheen",
    groom: "Abdul Rahman",
    brideUr: "اقراء ماہین",
    groomUr: "عبدالرحمن",
    /** Word placed between the names. */
    joiner: "with",
    /** Initials shown on the wax seal: [bride, groom]. */
    monogram: ["I", "A"] as const,
    /**
     * Optional couple photo shown in an arch, e.g. "/couple.jpg" after
     * placing the file in the `public/` folder. Leave null to hide it.
     */
    photo: null as string | null,
  },

  /** Shown in Urdu Nastaliq calligraphy. */
  bismillah: "بسم اللہ الرحمن الرحیم",

  verse: {
    translation: "And We created you in pairs.",
    reference: "Quran 78:8",
  },

  invitation: {
    eyebrowUr: "شادی خانہ آبادی",
    blessing: "With the blessings of Allah Almighty",
    lead: "we joyfully invite you and your entire family to the wedding celebrations of",
    closing: "Your presence and prayers will make our happiness complete.",
    familyBadge: "You and your family are warmly invited",
    gateLine: "You and your family are cordially invited to the wedding of",
  },

  ceremonies: [
    {
      id: "mehndi",
      title: "Mehndi",
      titleUr: "مہندی",
      tagline: "An evening of henna, colour and songs.",
      date: { day: 12, month: 11, year: 2026 },
      time: "19:00",
      theme: "light",
      venue: {
        name: "Bagh-e-Iram",
        address: "House No. 154, Block B1, Lahore, Pakistan",
      },
    },
    {
      id: "baraat",
      title: "Baraat",
      titleUr: "بارات",
      tagline: "A new journey begins, under the shade of your prayers.",
      date: { day: 13, month: 11, year: 2026 },
      time: "18:30",
      theme: "dark",
      venue: {
        name: "Leeds Marriage Hall",
        address: "Wapda Town, Lahore, Pakistan",
      },
    },
  ] satisfies Ceremony[],

  /** Shown while the month/year is unconfirmed. */
  pendingDateNote: "Month & year to be announced",

  family: {
    eyebrowUr: "منجانب اہلِ خانہ",
    heading: "Looking forward",
    tagline: "We will be waiting at the door to welcome you.",
    members: [
      "Shakeel Ahmed",
      "Saleem Ahmed",
      "Nadeem Ahmed",
      "Shabbir Khan",
      "Abdul Qadir",
      "Hasnain Shabbir",
      "Hassan Raza",
    ],
  },

  contacts: {
    /** Set to false to hide the contact section entirely. */
    visible: true,
    eyebrowUr: "رابطہ",
    heading: "Get in touch",
    tagline: "For directions, timings or anything else, we are just a call away.",
    people: [
      { name: "Hassan Raza", phone: "0308 9875977", whatsapp: false },
      { name: "Shakeel Ahmed", phone: "0300 6705692", whatsapp: false },
    ] satisfies Contact[],
  },

  /**
   * Optional RSVP via WhatsApp. Keep disabled until the family confirms
   * which number should receive replies.
   */
  rsvp: {
    enabled: false,
    /** Local format, e.g. "0308 9875977". */
    whatsappNumber: null as string | null,
    buttonLabel: "Confirm attendance",
    message: "Assalam-o-Alaikum! In sha Allah, we will attend the wedding of Iqra Maheen and Abdul Rahman.",
  },

  /**
   * Background music, played through YouTube's embedded player. It starts
   * when the guest taps the seal (browsers block sound before a tap) and
   * loops; a floating button pauses and resumes it.
   */
  music: {
    enabled: true,
    /** The `v=` value from the YouTube link. */
    youtubeId: "YBFKmH3aWo0",
    /** Second to start from (useful to skip a video intro). */
    startSeconds: 0,
    volume: 60,
    playLabel: "Play music",
    pauseLabel: "Pause music",
  },

  /** Countdown shows only when this is true AND the target ceremony has a full date. */
  countdown: {
    enabled: true,
    targetCeremony: "mehndi" as Ceremony["id"],
    caption: "until the Mehndi",
  },

  footer: {
    messageUr: "آپ کی آمد ہمارے لیے باعثِ مسرت ہوگی",
    message: "Your presence and your prayers are the most precious gifts to us.",
    signature: "With love, the family",
  },

  ui: {
    openInvitation: "Tap the seal to open",
    scrollCue: "Scroll for details",
    programmeHeading: "Programme, In sha Allah",
    labels: {
      inshaAllah: "In sha Allah",
      day: "Date",
      call: "Call",
      whatsapp: "WhatsApp",
      days: "days",
      hours: "hours",
      minutes: "minutes",
      seconds: "seconds",
      backToTop: "Back to top",
    },
  },

  meta: {
    title: "Iqra Maheen & Abdul Rahman | Wedding Invitation",
    description:
      "You and your family are warmly invited to the Mehndi and Baraat of Iqra Maheen and Abdul Rahman.",
  },
} as const;

export type WeddingConfig = typeof wedding;
