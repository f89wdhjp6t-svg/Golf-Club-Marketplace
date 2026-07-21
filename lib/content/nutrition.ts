export type SafetyLevel = "safe" | "caution" | "avoid";

export interface FoodItem {
  name: string;
  level: SafetyLevel;
  note: string;
}

export const FOOD_ITEMS: FoodItem[] = [
  // Safe
  { name: "Pasteurized dairy (milk, yogurt, hard cheeses)", level: "safe", note: "A good source of calcium and protein." },
  { name: "Well-cooked meat, poultry, and eggs", level: "safe", note: "Cook to a safe internal temperature to avoid bacteria." },
  { name: "Cooked seafood low in mercury", level: "safe", note: "Salmon, shrimp, cod, tilapia, canned light tuna — aim for 2–3 servings/week." },
  { name: "Washed fresh fruits and vegetables", level: "safe", note: "Rinse well to reduce pesticide residue and bacteria." },
  { name: "Whole grains", level: "safe", note: "Good source of fiber, which helps with pregnancy constipation." },
  { name: "Pasteurized fruit juice", level: "safe", note: "Avoid unpasteurized ('raw') juice — see below." },
  { name: "Nuts and peanuts", level: "safe", note: "Current guidance doesn't support avoiding these unless you have an allergy." },
  { name: "Caffeine, in moderation", level: "caution", note: "Most guidelines suggest staying under about 200mg/day (roughly one 12oz cup of coffee)." },
  { name: "Fish higher in mercury (tuna steak, mahi-mahi)", level: "caution", note: "Limit to one small serving a week; lower-mercury options are a safer default." },
  { name: "Deli meat and hot dogs", level: "caution", note: "Safe if heated until steaming hot (kills listeria); risky cold from the package." },
  { name: "Herbal teas", level: "caution", note: "Many haven't been well studied in pregnancy — ginger and peppermint are generally considered fine in moderation, but check with your provider before others." },
  { name: "Unpasteurized ('raw') milk and soft cheeses (brie, feta, blue cheese) made from it", level: "avoid", note: "Risk of listeria. Soft cheeses made with pasteurized milk are fine — check the label." },
  { name: "Raw or undercooked meat, poultry, and eggs", level: "avoid", note: "Risk of salmonella, listeria, and toxoplasmosis (sushi, rare steak, runny yolks, cookie dough)." },
  { name: "High-mercury fish (shark, swordfish, king mackerel, tilefish, bigeye tuna)", level: "avoid", note: "Mercury can affect fetal nervous system development." },
  { name: "Raw sprouts (alfalfa, clover, radish)", level: "avoid", note: "Hard to wash bacteria out of the seed hull; higher contamination risk." },
  { name: "Unwashed produce", level: "avoid", note: "Can carry toxoplasmosis or listeria from soil." },
  { name: "Alcohol", level: "avoid", note: "No amount of alcohol has been proven safe during pregnancy; major health bodies recommend avoiding it entirely." },
  { name: "Raw or unpasteurized honey", level: "caution", note: "Low risk for the pregnant person, but many choose to avoid it as a habit before feeding it to a baby under 1 (infant botulism risk applies after birth, not in pregnancy)." },
];

export interface MedicationItem {
  name: string;
  level: SafetyLevel;
  note: string;
}

export const MEDICATION_ITEMS: MedicationItem[] = [
  { name: "Acetaminophen (Tylenol)", level: "safe", note: "Generally considered the go-to for pain/fever in pregnancy — still confirm dose with your provider." },
  { name: "Most prenatal vitamins", level: "safe", note: "Look for one with folic acid, iron, and DHA; your provider may recommend a specific brand or dose." },
  { name: "NSAIDs (ibuprofen, aspirin, naproxen)", level: "avoid", note: "Generally avoided, especially in the third trimester — ask your provider before taking any." },
  { name: "Most antibiotics", level: "caution", note: "Some are considered safe in pregnancy and some aren't — always let a prescriber know you're pregnant." },
  { name: "Herbal supplements", level: "caution", note: "Largely unregulated and understudied in pregnancy — check with your provider before starting any new supplement." },
  { name: "Certain acne medications (isotretinoin/Accutane, high-dose vitamin A/retinoids)", level: "avoid", note: "Linked to serious birth defects — stop and talk to your provider immediately if you're taking one." },
  { name: "Decongestants (pseudoephedrine)", level: "caution", note: "Often advised against in the first trimester; ask your provider or pharmacist about timing and alternatives." },
];

export const NUTRITION_DISCLAIMER =
  "This is general educational information, not medical advice, and it isn't exhaustive. Guidelines vary by country and update over time. Always check with your OB, midwife, or pharmacist before starting, stopping, or continuing any food, supplement, or medication — especially anything not listed here.";
