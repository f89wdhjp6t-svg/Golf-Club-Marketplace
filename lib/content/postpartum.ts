export interface RecoveryTopic {
  title: string;
  detail: string;
}

export const PHYSICAL_RECOVERY: RecoveryTopic[] = [
  { title: "Vaginal bleeding (lochia)", detail: "Bleeding that starts heavy like a period and tapers over roughly 4–6 weeks, changing from red to pink to white/yellow." },
  { title: "Perineal or incision soreness", detail: "Common after both vaginal delivery (tearing/episiotomy) and C-section. Ice packs, sitz baths, and pain medication your provider approves can help." },
  { title: "Afterpains", detail: "Cramping as your uterus contracts back down to size — often stronger with each subsequent baby and during breastfeeding." },
  { title: "Engorged or leaking breasts", detail: "Milk 'coming in' around day 2–5 can cause fullness and tenderness whether or not you're breastfeeding." },
  { title: "Swelling and night sweats", detail: "Your body is shedding the extra fluid it built up during pregnancy — very normal in the first couple of weeks." },
  { title: "Hair shedding", detail: "Increased hair loss around 3–6 months postpartum as hormone levels normalize; it regrows over time." },
];

export const EMOTIONAL_RECOVERY: RecoveryTopic[] = [
  { title: "'Baby blues'", detail: "Tearfulness, mood swings, and overwhelm in the first two weeks, affecting most new parents. It should ease on its own by around day 10–14." },
  { title: "Postpartum depression or anxiety", detail: "If low mood, anxiety, intrusive thoughts, or feeling disconnected last beyond two weeks or feel severe, this isn't 'just the blues' — it's common, treatable, and worth telling your provider about right away." },
  { title: "Identity shift", detail: "Feeling like a different person, grieving your old routine or body, or feeling surprisingly unbothered by the change — all of these are normal reactions." },
  { title: "Partners can struggle too", detail: "Non-birthing partners can also experience postpartum depression and anxiety. It's worth checking in with each other, not just the parent who gave birth." },
];

export const POSTPARTUM_WARNING_SIGNS: string[] = [
  "Heavy bleeding — soaking a pad in an hour or passing large clots",
  "Fever over 100.4°F (38°C)",
  "Severe headache, vision changes, or swelling that doesn't improve",
  "Red, hot, or painful area on your leg (possible blood clot) or chest (possible mastitis)",
  "A C-section or perineal incision that's increasingly red, swollen, or draining",
  "Thoughts of harming yourself or your baby — this is a medical emergency; call your provider, a crisis line, or 911/emergency services immediately",
  "Chest pain, trouble breathing, or a racing heart",
];

export interface NewbornTopic {
  title: string;
  detail: string;
}

export const NEWBORN_BASICS: NewbornTopic[] = [
  { title: "Feeding frequency", detail: "Newborns typically eat every 2–3 hours, roughly 8–12 times a day, whether breastfed or formula-fed — their stomachs are tiny." },
  { title: "Sleep", detail: "Newborns sleep 14–17 hours a day but in short stretches (2–4 hours), since they don't yet have a day/night rhythm. This is normal, if exhausting." },
  { title: "Diapers", detail: "Expect 6+ wet diapers and several dirty ones a day once feeding is established — output is one of the best signs a newborn is getting enough milk." },
  { title: "Umbilical cord stump", detail: "Keep it clean and dry until it falls off on its own, usually within 1–3 weeks. Fold diapers below it if needed." },
  { title: "Jaundice", detail: "A yellowish tint to the skin/eyes is common in the first week as the liver matures. Your care team will check bilirubin levels — most cases resolve on their own." },
  { title: "Soft spots (fontanelles)", detail: "The gaps between skull bones are normal and let the brain grow; they're covered by a tough membrane and safe to touch gently." },
  { title: "Crying", detail: "Newborns cry to communicate hunger, discomfort, overstimulation, or just to release tension — it's not a sign you're doing something wrong." },
];

export const CALL_PEDIATRICIAN_SIGNS: string[] = [
  "A fever of 100.4°F (38°C) or higher in a baby under 3 months — this needs prompt medical attention",
  "Fewer wet diapers than expected, or signs of dehydration",
  "Yellowing that's getting worse, spreading, or shows up in the first 24 hours of life",
  "Trouble breathing, grunting, or bluish lips/skin",
  "Unusual lethargy or difficulty waking for feeds",
  "Vomiting forcefully (not just spit-up) or blood/dark green in vomit or stool",
];
