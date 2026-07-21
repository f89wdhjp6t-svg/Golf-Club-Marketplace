export const VACCINES_INTRO =
  "Vaccination is a personal medical decision, and families land in different places on it for real, considered reasons. This page lays out what's generally true, why many parents follow the standard schedule, why some parents delay, space out, or decline some or all vaccines, and questions worth bringing to your pediatrician either way. It's meant to help you have that conversation — not to make the decision for you.";

export interface ProsCons {
  title: string;
  pros: string[];
  cons: string[];
}

export const CHOICE_BREAKDOWN: ProsCons[] = [
  {
    title: "Following the standard schedule",
    pros: [
      "Protection lines up with when a baby's risk from each disease is highest",
      "Contributes to community/'herd' immunity, which helps protect newborns, pregnant people, and immunocompromised people who can't be vaccinated themselves",
      "The recommended schedule is the most extensively studied — its safety and effectiveness has been tracked across huge populations for decades",
      "One consistent schedule is simpler to follow and required by many schools/daycares without needing an exemption",
      "Reduces the (now rare, but not zero) risk of outbreaks of diseases like measles or pertussis in under-vaccinated communities",
    ],
    cons: [
      "Multiple shots at one visit can mean more short-term fussiness, soreness, or low fever for a day or two",
      "Some parents feel rushed by a standard schedule and want more time to research each vaccine individually",
      "Doesn't leave room for a personalized pace if a parent has specific concerns about a particular ingredient or timing",
    ],
  },
  {
    title: "Delaying or spacing out (alternative schedule)",
    pros: [
      "Lets a parent research and feel comfortable with each vaccine individually",
      "Fewer injections per visit, which some parents and kids find easier",
      "Still results in a fully vaccinated child eventually, if followed through",
    ],
    cons: [
      "Leaves a baby unprotected against a specific disease for longer, during a window when they may be more vulnerable to it",
      "Requires more office visits, which means more scheduling, cost, and missed work for parents",
      "Alternative schedules aren't tested the way the standard schedule is, so their specific risk/benefit tradeoffs are less well studied",
      "Some daycares, schools, and travel destinations require proof of specific vaccines by a certain age",
    ],
  },
  {
    title: "Declining some or all vaccines",
    pros: [
      "Avoids any injection-related side effects entirely",
      "Aligns with personal, religious, or philosophical beliefs some families hold strongly",
      "May feel right for a specific child with a documented medical contraindication (in consultation with a doctor)",
    ],
    cons: [
      "No protection against diseases that can be serious or fatal in infants and young children — some of which (like pertussis and measles) still circulate",
      "Relies on other people around your child being vaccinated for indirect protection, which isn't guaranteed and is becoming less reliable as more people opt out",
      "Many schools, daycares, and some countries require vaccination or a formal exemption to enroll or travel",
      "If an outbreak occurs, unvaccinated children are often excluded from school/daycare temporarily as a precaution",
    ],
  },
];

export interface Concern {
  concern: string;
  response: string;
}

export const COMMON_CONCERNS: Concern[] = [
  {
    concern: "\"That's a lot of vaccines for such a young immune system.\"",
    response:
      "Babies' immune systems encounter far more antigens from everyday life (food, germs on surfaces, their own gut bacteria) than from a full round of vaccines at once. Studies looking at combined and simultaneous vaccination haven't found it overwhelms or weakens the immune system.",
  },
  {
    concern: "\"I'm worried about vaccine ingredients like aluminum or preservatives.\"",
    response:
      "This is worth discussing directly with your pediatrician — they can walk through what's in a specific vaccine and why. Thimerosal (a mercury-based preservative some parents worry about) was removed from almost all childhood vaccines in the US by 2001 except some flu vaccines, where a thimerosal-free option is generally available on request.",
  },
  {
    concern: "\"I've heard vaccines are linked to autism.\"",
    response:
      "This claim traces back to a single 1998 study that was later found to be fraudulent and was retracted by the journal that published it; the author lost his medical license. Numerous large studies since, involving millions of children, haven't found a link between vaccines and autism. If this is a concern for you, it's worth raising directly with your pediatrician.",
  },
  {
    concern: "\"My baby/family member had a bad reaction before.\"",
    response:
      "This is exactly the kind of history to bring to your pediatrician or an allergist — some reactions mean a specific vaccine or ingredient should be avoided or given differently, which is a real medical conversation, not something to guess about alone.",
  },
  {
    concern: "\"I'd rather build natural immunity through the disease itself.\"",
    response:
      "For diseases like measles, chickenpox, and pertussis, natural infection does often produce strong immunity — but it comes with the real risk of severe illness, hospitalization, or complications that the vaccine is designed to avoid. This tradeoff is worth weighing with your pediatrician for each specific disease.",
  },
];

export const VACCINE_QUESTIONS_FOR_YOUR_DOCTOR: string[] = [
  "What does each vaccine on the schedule protect against, and how common/severe is that disease currently in our area?",
  "What are the possible side effects, and how do we manage them at home?",
  "Is a delayed or alternative schedule an option you'd support, and what are the tradeoffs specifically for my child?",
  "Are there any medical reasons my child specifically should or shouldn't get a particular vaccine?",
  "What are our state/country's school and daycare requirements and exemption options?",
  "Where can I see the actual studies or safety data behind a vaccine I have questions about?",
];

export const VACCINES_DISCLAIMER =
  "This page summarizes commonly cited arguments on different sides of vaccination decisions for general awareness — it is not medical advice and isn't exhaustive. Recommended schedules, disease prevalence, and exemption rules vary by country and region and change over time. Please make this decision together with your child's pediatrician, who knows your family's specific medical history.";
