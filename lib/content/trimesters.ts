export interface TrimesterInfo {
  id: 1 | 2 | 3;
  label: string;
  weeks: string;
  overview: string;
  normalToFeel: string[];
  emotional: string[];
}

export const TRIMESTERS: TrimesterInfo[] = [
  {
    id: 1,
    label: "First trimester",
    weeks: "Weeks 1–13",
    overview:
      "Your body is doing enormous work you can't see yet — hormone levels are climbing fast, which drives most of the early symptoms. It's common to feel more tired and more emotional than usual, even before you look pregnant at all.",
    normalToFeel: [
      "Nausea with or without vomiting ('morning sickness'), any time of day",
      "Extreme fatigue, even after a full night's sleep",
      "Sore, tender, or swelling breasts",
      "Frequent urination",
      "Food aversions or sudden cravings",
      "Mild cramping or light spotting around implantation",
      "Bloating and constipation",
      "A heightened sense of smell",
    ],
    emotional: [
      "Mood swings from hormone shifts — this is physiological, not a personal failing",
      "Anxiety about miscarriage risk, especially before 12 weeks",
      "Feeling ambivalent or not yet 'attached,' even in a wanted pregnancy — very common and not a sign anything is wrong",
    ],
  },
  {
    id: 2,
    label: "Second trimester",
    weeks: "Weeks 14–27",
    overview:
      "Often called the 'honeymoon' trimester — nausea and fatigue typically ease for many people, energy comes back, and you'll likely start feeling the baby move. Your bump becomes visible and an anatomy scan usually happens around weeks 18–22.",
    normalToFeel: [
      "'Quickening' — first flutters of fetal movement, usually weeks 16–25",
      "Increasing appetite",
      "Round ligament pain (sharp, brief twinges in the lower belly/groin)",
      "Lower back pain as your center of gravity shifts",
      "Skin changes: stretch marks, a dark line down the belly (linea nigra), darkening nipples",
      "Nasal congestion or occasional nosebleeds",
      "Leg cramps, especially at night",
      "Mild swelling in feet and ankles",
    ],
    emotional: [
      "Feeling more 'like yourself' as early symptoms fade for many",
      "New anxieties as the pregnancy feels more real — this is normal too",
      "Body image adjustments as your shape visibly changes",
    ],
  },
  {
    id: 3,
    label: "Third trimester",
    weeks: "Weeks 28–40+",
    overview:
      "The final stretch is about growth and getting ready. Many of the second-trimester symptoms intensify simply because there's less room, and you'll likely feel Braxton Hicks (practice) contractions as your body prepares for labor.",
    normalToFeel: [
      "Braxton Hicks contractions — irregular, usually painless tightening",
      "Shortness of breath as the uterus pushes up on your diaphragm",
      "Heartburn and indigestion",
      "Swelling in feet, ankles, and hands",
      "Trouble sleeping and finding a comfortable position",
      "Frequent urination as the baby drops lower",
      "Pelvic pressure, hip and back pain",
      "Nesting instinct — a sudden urge to organize and prepare",
    ],
    emotional: [
      "A mix of excitement and anxiety about labor is extremely common",
      "Impatience, especially past your due date — most people deliver within 1–2 weeks of it either way",
      "Worry about 'being ready' — very few parents feel fully ready, and that's normal",
    ],
  },
];

export const WHEN_TO_CALL_YOUR_PROVIDER: string[] = [
  "Vaginal bleeding, especially heavy or with cramping",
  "Severe or persistent abdominal pain",
  "A sudden, severe headache, vision changes, or swelling in your face/hands (possible signs of preeclampsia)",
  "Fever over 100.4°F (38°C)",
  "Fluid leaking or your water breaking",
  "A noticeable decrease in your baby's movement after you'd normally feel it regularly",
  "Painful or burning urination",
  "Severe vomiting where you can't keep fluids down",
  "Any symptom that feels sudden, severe, or just 'not right' to you — trust your instincts and call",
];
