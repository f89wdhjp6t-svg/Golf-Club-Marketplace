export interface WeekEntry {
  week: number;
  trimester: 1 | 2 | 3;
  size: string;
  development: string;
  symptoms: string[];
}

export const WEEKS: WeekEntry[] = [
  { week: 4, trimester: 1, size: "a poppy seed", development: "The fertilized egg implants in the uterus and starts producing the hCG hormone that shows up on pregnancy tests.", symptoms: ["Missed period", "Mild cramping or spotting", "Fatigue"] },
  { week: 5, trimester: 1, size: "a sesame seed", development: "The neural tube — which becomes the brain and spinal cord — starts to form, along with the earliest heart tissue.", symptoms: ["Fatigue", "Sore or swollen breasts", "Nausea starting"] },
  { week: 6, trimester: 1, size: "a lentil", development: "The heart begins beating and can sometimes be seen on an early ultrasound. Arm and leg buds start forming.", symptoms: ["Morning sickness (any time of day)", "Food aversions", "Frequent urination"] },
  { week: 7, trimester: 1, size: "a blueberry", development: "Arms and legs are growing, and the beginnings of hands and feet appear as small paddles.", symptoms: ["Nausea, often at its strongest", "Fatigue", "Mood swings"] },
  { week: 8, trimester: 1, size: "a raspberry", development: "Fingers and toes are forming (still webbed), and facial features like the nose and eyelids are taking shape.", symptoms: ["Bloating", "Breast tenderness", "Nausea and food aversions"] },
  { week: 9, trimester: 1, size: "a cherry", development: "The embryo is officially called a fetus now. The tail-like structure is gone and the body is straightening out.", symptoms: ["Nausea and fatigue", "Heightened sense of smell", "Constipation"] },
  { week: 10, trimester: 1, size: "a strawberry", development: "Vital organs are formed and starting to function. Fingernails and hair follicles begin forming.", symptoms: ["Visible bump may start for some", "Nausea (may begin easing for some)", "Heartburn"] },
  { week: 11, trimester: 1, size: "a fig", development: "The baby can hiccup and stretch. The body is starting to grow faster than the head, which was proportionally large.", symptoms: ["Energy may start to return", "Round ligament twinges", "Bloating"] },
  { week: 12, trimester: 1, size: "a lime", development: "Reflexes are developing — fingers can curl, toes can flex. This is often the end of the highest miscarriage-risk window.", symptoms: ["Nausea often starts easing", "More energy", "Visible bump for some"] },
  { week: 13, trimester: 1, size: "a lemon", development: "Vocal cords are forming. This marks the end of the first trimester for most pregnancy-dating conventions.", symptoms: ["Entering the 'honeymoon' second trimester", "Possible relief from nausea", "Increasing appetite"] },
  { week: 14, trimester: 2, size: "a peach", development: "Fine, downy hair (lanugo) grows on the skin, and the baby can start making facial expressions.", symptoms: ["Increased appetite", "Less fatigue for many", "Nasal congestion"] },
  { week: 15, trimester: 2, size: "an apple", development: "The baby can sense light even though eyes are still fused shut. Bones are hardening, including tiny ear bones.", symptoms: ["Nasal congestion or nosebleeds", "Gum sensitivity", "Lower backache"] },
  { week: 16, trimester: 2, size: "an avocado", development: "The heart is pumping more blood daily as it grows. Many parents find out the baby's sex around an anatomy scan.", symptoms: ["First flutters ('quickening') may start soon", "Back pain", "Round ligament pain"] },
  { week: 17, trimester: 2, size: "a turnip", development: "The skeleton is changing from soft cartilage to bone, and the umbilical cord is growing thicker and stronger.", symptoms: ["Dizziness", "Growing appetite", "Leg cramps"] },
  { week: 18, trimester: 2, size: "a bell pepper", development: "Ears are in their final position and the baby may start responding to sounds from outside the womb.", symptoms: ["Quickening — first felt movements", "Leg cramps", "Lower back pain"] },
  { week: 19, trimester: 2, size: "a mango", development: "A waxy coating called vernix caseosa covers the skin to protect it. The five senses are actively developing.", symptoms: ["Round ligament pain", "Heartburn", "Stretch marks may appear"] },
  { week: 20, trimester: 2, size: "a banana", development: "The halfway point. A detailed anatomy ultrasound is typically done around now to check growth and organs.", symptoms: ["Regular movement felt", "Backaches", "Mild swelling in feet"] },
  { week: 21, trimester: 2, size: "a carrot", development: "Movements are getting stronger and more coordinated. Eyebrows and eyelids are fully formed.", symptoms: ["Stretch marks", "Varicose veins", "Increased hunger"] },
  { week: 22, trimester: 2, size: "a spaghetti squash", development: "The baby's senses are sharpening, though the skin still looks wrinkled since fat hasn't filled in yet.", symptoms: ["Braxton Hicks (practice) contractions may start", "Backache", "Skin changes"] },
  { week: 23, trimester: 2, size: "a large mango", development: "Hearing is improving — the baby may startle or react to loud, sudden noises.", symptoms: ["Swelling in feet and ankles", "Itchy belly skin", "Trouble sleeping"] },
  { week: 24, trimester: 2, size: "an ear of corn", development: "The lungs start producing surfactant, a substance needed to breathe air. This is often called the viability milestone.", symptoms: ["Glucose screening test usually happens around now", "Leg cramps", "Hemorrhoids"] },
  { week: 25, trimester: 2, size: "a cauliflower", development: "The baby is gaining more fat under the skin, and hair color and texture are starting to form.", symptoms: ["Backaches", "Trouble sleeping", "Restless legs"] },
  { week: 26, trimester: 2, size: "a head of lettuce", development: "Eyes are starting to open, and the baby may respond to a familiar voice or music.", symptoms: ["Swelling", "Braxton Hicks contractions", "Mood swings"] },
  { week: 27, trimester: 2, size: "a head of cauliflower", development: "End of the second trimester. Brain tissue is developing rapidly and the baby has regular sleep-wake cycles.", symptoms: ["Shortness of breath", "Restless leg syndrome", "Rib discomfort"] },
  { week: 28, trimester: 3, size: "an eggplant", development: "Third trimester begins. The baby can blink and is thought to start dreaming during REM sleep.", symptoms: ["Heartburn", "Trouble sleeping", "Backaches", "Prenatal visits often become every 2 weeks"] },
  { week: 29, trimester: 3, size: "a butternut squash", development: "Muscles and lungs continue maturing quickly, and movement may feel stronger and more frequent.", symptoms: ["Shortness of breath", "Constipation", "Hemorrhoids"] },
  { week: 30, trimester: 3, size: "a cabbage", development: "The brain is developing rapidly and eyes can open and close. The baby is gaining weight steadily.", symptoms: ["Fatigue returning", "Forgetfulness ('pregnancy brain')", "Frequent urination"] },
  { week: 31, trimester: 3, size: "a coconut", development: "All five senses are now functioning, and the baby is gaining weight quickly.", symptoms: ["Braxton Hicks contractions", "Trouble sleeping", "Swelling"] },
  { week: 32, trimester: 3, size: "a squash", development: "Practice breathing movements continue, and bones are hardening — except the skull, which stays soft for delivery.", symptoms: ["Shortness of breath", "Heartburn", "More frequent Braxton Hicks"] },
  { week: 33, trimester: 3, size: "a pineapple", development: "The immune system is developing, picking up antibodies. The skull bones stay soft and flexible for now.", symptoms: ["Pelvic pressure", "Swelling", "Trouble sleeping"] },
  { week: 34, trimester: 3, size: "a cantaloupe", development: "The central nervous system is maturing and fingernails reach the fingertips.", symptoms: ["Increased Braxton Hicks", "Waddling gait", "Fatigue"] },
  { week: 35, trimester: 3, size: "a honeydew melon", development: "The kidneys are fully developed and most major physical development is complete — the rest is about gaining weight.", symptoms: ["Frequent urination returns", "Difficulty sleeping", "Pelvic pressure"] },
  { week: 36, trimester: 3, size: "a head of romaine lettuce", development: "The baby is likely settling head-down and shedding the fine lanugo hair.", symptoms: ["Pelvic pressure ('lightning crotch')", "Weekly prenatal visits often start", "Trouble sleeping"] },
  { week: 37, trimester: 3, size: "a bunch of swiss chard", development: "Considered 'early term.' The baby practices grasping, breathing, and sucking reflexes.", symptoms: ["Nesting instinct", "Frequent Braxton Hicks", "Possible loss of the mucus plug"] },
  { week: 38, trimester: 3, size: "a leek", development: "Lungs and brain are still finishing development — full term is considered 39 weeks.", symptoms: ["Watch for labor signs", "Swelling", "Fatigue"] },
  { week: 39, trimester: 3, size: "a mini watermelon", development: "Full term. The baby continues building fat layers to help regulate temperature after birth.", symptoms: ["Increased pelvic pressure", "Contractions may begin", "Trouble sleeping"] },
  { week: 40, trimester: 3, size: "a small pumpkin", development: "Your due date — though it's completely normal, especially with a first pregnancy, to go past it.", symptoms: ["Strong pelvic pressure", "Contractions", "Anticipation and impatience are both normal"] },
];

export function weekForDueDate(dueDateStr: string): number {
  const due = new Date(dueDateStr);
  const now = new Date();
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const totalWeeks = 40 - Math.round((due.getTime() - now.getTime()) / msPerWeek);
  return Math.min(42, Math.max(1, totalWeeks));
}
