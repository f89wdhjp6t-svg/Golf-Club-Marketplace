export interface LaborSign {
  title: string;
  detail: string;
}

export const LABOR_SIGNS: LaborSign[] = [
  { title: "Regular, strengthening contractions", detail: "Unlike Braxton Hicks, true labor contractions get closer together, last longer, and don't stop when you change position or rest." },
  { title: "Water breaking", detail: "A gush or steady trickle of fluid. Call your provider right away when this happens, even without contractions yet." },
  { title: "Bloody show", detail: "Loss of the mucus plug, often streaked with blood, as the cervix starts to change." },
  { title: "Lower back or pelvic pressure", detail: "A heavy, constant pressure low in the pelvis as the baby settles down." },
  { title: "'Nesting' burst of energy", detail: "Some people notice a sudden urge to clean or organize in the day or two before labor starts." },
];

export interface LaborStage {
  stage: string;
  title: string;
  detail: string;
}

export const LABOR_STAGES: LaborStage[] = [
  {
    stage: "Stage 1 — Early labor",
    title: "Cervix dilates 0–6cm",
    detail: "Mild, irregular contractions that gradually become more regular. This is usually the longest part and often best spent at home resting, hydrating, and moving around.",
  },
  {
    stage: "Stage 1 — Active labor",
    title: "Cervix dilates 6–10cm",
    detail: "Contractions become stronger, closer together (often 3–5 minutes apart), and harder to talk through. Most people head to their birth location during this phase.",
  },
  {
    stage: "Stage 1 — Transition",
    title: "Final centimeters to 10cm",
    detail: "The shortest but usually most intense phase. Contractions come close together with little rest between. Feeling shaky, nauseous, or like you 'can't do this' is common right before pushing.",
  },
  {
    stage: "Stage 2 — Pushing & birth",
    title: "From full dilation to delivery",
    detail: "Can take anywhere from a few minutes to a few hours, especially for a first birth. Your care team will guide pushing timing with your contractions.",
  },
  {
    stage: "Stage 3 — Delivering the placenta",
    title: "After the baby is born",
    detail: "Usually happens within 5–30 minutes after birth, with a few more mild contractions. Many hospitals now offer immediate skin-to-skin contact during this stage.",
  },
];

export interface PainOption {
  name: string;
  detail: string;
}

export const PAIN_MANAGEMENT_OPTIONS: PainOption[] = [
  { name: "Epidural", detail: "Regional anesthesia that numbs from the belly down while you stay alert. The most common medical pain relief option in hospital births." },
  { name: "IV or injected medication", detail: "Can take the edge off contractions without fully numbing; effects vary and can make you or baby drowsy." },
  { name: "Nitrous oxide", detail: "Self-administered gas that reduces pain perception; wears off quickly and lets you keep moving." },
  { name: "Unmedicated / 'natural' labor", detail: "Using breathing techniques, movement, water immersion, massage, and support people instead of medication." },
  { name: "Water birth or labor in water", detail: "Warm water can ease contraction pain and help with relaxation and mobility during labor." },
];

export const BIRTH_PLAN_TOPICS: string[] = [
  "Who you want in the room, and who (if anyone) you don't",
  "Pain management preferences, and how flexible you want to be about changing your mind",
  "Positions you want to try for labor and pushing",
  "Preferences around monitoring, IV fluids, and moving around freely",
  "Delayed cord clamping, skin-to-skin, and who cuts the cord",
  "Feeding plan (breastfeeding, formula, or both) and whether you want lactation support",
  "Preferences if a C-section becomes necessary",
  "Whether you want visitors right after birth, or time alone first as a family",
];

export const CESAREAN_OVERVIEW =
  "A C-section is major abdominal surgery where the baby is delivered through an incision in the abdomen and uterus. It may be planned in advance (breech position, placenta previa, a prior C-section, multiples) or become necessary during labor (stalled labor, fetal distress, or other complications). Recovery generally takes longer than a vaginal birth — typically a few days in the hospital and several weeks of activity restrictions afterward. It's normal to have complicated feelings about a C-section, whether planned or unplanned, and support (from a partner, a therapist, or other parents who've been through it) can help.";

export const IMMEDIATELY_AFTER_BIRTH: string[] = [
  "Your baby is usually placed on your chest for skin-to-skin contact right away, if both of you are stable",
  "The umbilical cord is clamped and cut, sometimes after a delay of a minute or more",
  "Your baby gets quick assessments (often called Apgar scores) at 1 and 5 minutes",
  "You'll deliver the placenta, and any tearing or an episiotomy will be repaired if needed",
  "Your care team will check your bleeding and your baby's temperature, breathing, and feeding in the first hour",
  "Many hospitals encourage breastfeeding or bottle feeding within the first hour, sometimes called 'the golden hour'",
];
