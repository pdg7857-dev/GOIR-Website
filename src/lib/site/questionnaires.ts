/**
 * Schemas for the on-site intake forms: a short quick-qualify form and the full
 * client questionnaire. Both are bilingual (English + Quebec French) and render
 * through the same QuestionnaireForm component, which posts to /api/intake.
 *
 * Known ids (contactName, companyName, email, phone, website, trade, region)
 * are lifted out by the form so the CRM gets clean contact + sizing fields; the
 * rest land in the lead notes.
 */
export type Bi = { en: string; fr: string };

export type Field = {
  id: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "multi";
  label: Bi;
  options?: Bi[];
  required?: boolean;
};

export type Section = { title: Bi; fields: Field[] };

const b = (en: string, fr: string): Bi => ({ en, fr });

// Reusable option sets.
const TRADE = [
  b("Construction", "Construction"),
  b("Janitorial", "Conciergerie"),
  b("Facilities maintenance", "Entretien des installations"),
  b("Industrial supplies", "Fournitures industrielles"),
  b("MRO supplies", "Fournitures MRO"),
  b("Security", "Sécurité"),
  b("Landscaping", "Aménagement paysager"),
  b("Other", "Autre"),
];
const YEARS = [b("Under 2 years", "Moins de 2 ans"), b("2-5 years", "2 à 5 ans"), b("6-15 years", "6 à 15 ans"), b("15+ years", "Plus de 15 ans")];
const TEAM = [b("Just me", "Juste moi"), b("2-10", "2 à 10"), b("11-30", "11 à 30"), b("31-100", "31 à 100"), b("100+", "Plus de 100")];
const CONCURRENT = [b("1", "1"), b("2-3", "2 à 3"), b("4-6", "4 à 6"), b("7+", "7 et plus")];
const MIN_JOB = [b("Under $25k", "Moins de 25 000 $"), b("$25k-$100k", "25 000 à 100 000 $"), b("$100k-$500k", "100 000 à 500 000 $"), b("$500k+", "Plus de 500 000 $")];
const MAX_JOB = [b("Under $100k", "Moins de 100 000 $"), b("$100k-$500k", "100 000 à 500 000 $"), b("$500k-$2M", "500 000 à 2 M$"), b("$2M-$10M", "2 à 10 M$"), b("$10M+", "Plus de 10 M$")];
const CAPACITY = [b("Lots of room to grow", "Beaucoup de marge pour croître"), b("Some room", "Un peu de marge"), b("Near capacity right now", "Près de la pleine capacité")];
const BONDING = [b("Not bonded", "Pas cautionné"), b("Up to $500k", "Jusqu'à 500 000 $"), b("Up to $2M", "Jusqu'à 2 M$"), b("Up to $5M", "Jusqu'à 5 M$"), b("$5M+", "Plus de 5 M$"), b("Not sure", "Pas certain")];
const SET_ASIDE = [b("Indigenous-owned", "Propriété autochtone"), b("Women-owned", "Propriété féminine"), b("Small business", "Petite entreprise"), b("Veteran-owned", "Propriété d'ancien combattant"), b("Minority-owned", "Propriété de minorité"), b("None", "Aucun"), b("Not sure", "Pas certain")];
const EXPERIENCE = [b("Never", "Jamais"), b("Tried a few", "Quelques essais"), b("Bid regularly", "Je soumissionne régulièrement"), b("It's most of our work", "C'est la majorité de notre travail")];
const BIDS_YEAR = [b("0", "0"), b("1-5", "1 à 5"), b("6-20", "6 à 20"), b("20+", "Plus de 20")];
const REVENUE_GOAL = [b("Just getting started", "Je débute"), b("A steady side stream", "Un flux d'appoint stable"), b("A major share", "Une part importante"), b("The bulk of our work", "La majorité de notre travail")];
const FIND_WORK = [b("I don't actively", "Pas activement"), b("Keyword alerts", "Alertes par mot-clé"), b("I check portals myself", "Je vérifie les portails moi-même"), b("A staff member checks", "Un employé vérifie"), b("A service does it", "Un service s'en occupe"), b("Word of mouth", "Bouche-à-oreille")];
const PLATFORMS = ["MERX", "CanadaBuys", "Biddingo", "bids&tenders", "SEAO", "BC Bid", "BidNet Direct", "SAM.gov", "Other / Autre", "None / Aucune"].map((n) => b(n, n));
const TRAVEL = [b("Local only", "Local seulement"), b("Regional", "Régional"), b("Anywhere in my province or state", "Partout dans ma province ou mon État"), b("Anywhere, including cross-border", "Partout, y compris transfrontalier")];
const COUNTRIES = [b("Canada", "Canada"), b("United States", "États-Unis"), b("Both", "Les deux")];
const HOURS = [b("0-2", "0 à 2"), b("3-5", "3 à 5"), b("6-10", "6 à 10"), b("10+", "Plus de 10")];
const LANGUAGE = [b("English", "Anglais"), b("French", "Français")];

// Contact fields shared by both forms.
const CONTACT: Field[] = [
  { id: "companyName", type: "text", label: b("Company name", "Nom de l'entreprise"), required: true },
  { id: "contactName", type: "text", label: b("Your name and role", "Votre nom et fonction") },
  { id: "email", type: "email", label: b("Best email", "Meilleur courriel"), required: true },
  { id: "phone", type: "tel", label: b("Phone", "Téléphone") },
  { id: "website", type: "text", label: b("Website", "Site web") },
];

export const QUICK_FORM: Section[] = [
  {
    title: b("About you", "À votre sujet"),
    fields: [
      ...CONTACT,
      { id: "trade", type: "select", label: b("What trade or service best describes you?", "Quel métier ou service vous décrit le mieux?"), options: TRADE, required: true },
      { id: "region", type: "text", label: b("Where do you bid? (provinces, states or regions)", "Où soumissionnez-vous? (provinces, États ou régions)"), required: true },
    ],
  },
  {
    title: b("Your size", "Votre taille"),
    fields: [
      { id: "minJob", type: "select", label: b("Smallest contract worth your time", "Plus petit contrat qui vaut votre temps"), options: MIN_JOB },
      { id: "maxJob", type: "select", label: b("Largest contract you can comfortably deliver", "Plus gros contrat que vous pouvez livrer aisément"), options: MAX_JOB },
      { id: "bonding", type: "select", label: b("Can you get bonded, and up to how much?", "Pouvez-vous être cautionné, et jusqu'à combien?"), options: BONDING },
      { id: "experience", type: "select", label: b("How much government bidding have you done?", "Combien d'appels d'offres publics avez-vous faits?"), options: EXPERIENCE },
    ],
  },
  {
    title: b("What you want", "Ce que vous voulez"),
    fields: [
      { id: "services", type: "textarea", label: b("List the services you offer", "Énumérez les services que vous offrez") },
      { id: "goals", type: "textarea", label: b("What do you want government contracts to do for your business?", "Que voulez-vous que les contrats publics fassent pour votre entreprise?") },
    ],
  },
];

export const FULL_FORM: Section[] = [
  {
    title: b("Your company", "Votre entreprise"),
    fields: [
      ...CONTACT,
      { id: "based", type: "text", label: b("Where are you based? (city, province or state)", "Où êtes-vous établi? (ville, province ou État)") },
      { id: "years", type: "select", label: b("How long have you been in business?", "Depuis combien de temps êtes-vous en affaires?"), options: YEARS },
    ],
  },
  {
    title: b("What you do", "Ce que vous faites"),
    fields: [
      { id: "trade", type: "select", label: b("What trade or service best describes you?", "Quel métier ou service vous décrit le mieux?"), options: TRADE, required: true },
      { id: "services", type: "textarea", label: b("List the specific services you offer", "Énumérez les services précis que vous offrez") },
      { id: "bestWork", type: "textarea", label: b("What work do you do best, the jobs you wish you got more of?", "Quel travail faites-vous le mieux, les contrats que vous aimeriez avoir plus souvent?") },
      { id: "avoidWork", type: "textarea", label: b("What work do you NOT want, even if you could do it?", "Quel travail ne voulez-vous PAS, même si vous pourriez le faire?") },
    ],
  },
  {
    title: b("Where you bid", "Où vous soumissionnez"),
    fields: [
      { id: "region", type: "text", label: b("Which provinces, territories or states do you work in or want to?", "Dans quelles provinces, territoires ou États travaillez-vous ou voulez-vous travailler?"), required: true },
      { id: "travel", type: "select", label: b("Will you travel for the right job, or stay local?", "Voyagerez-vous pour le bon contrat, ou restez-vous local?"), options: TRAVEL },
      { id: "countries", type: "select", label: b("Canadian opportunities, US, or both?", "Opportunités canadiennes, américaines, ou les deux?"), options: COUNTRIES },
    ],
  },
  {
    title: b("Your capacity", "Votre capacité"),
    fields: [
      { id: "team", type: "select", label: b("How many people are on your team?", "Combien de personnes dans votre équipe?"), options: TEAM },
      { id: "concurrent", type: "select", label: b("How many projects can you run at once?", "Combien de projets pouvez-vous mener en même temps?"), options: CONCURRENT },
      { id: "minJob", type: "select", label: b("Smallest contract worth your time", "Plus petit contrat qui vaut votre temps"), options: MIN_JOB },
      { id: "maxJob", type: "select", label: b("Largest single contract you can deliver today", "Plus gros contrat unique que vous pouvez livrer aujourd'hui"), options: MAX_JOB },
      { id: "sweetSpot", type: "text", label: b("Your sweet-spot contract size (the jobs you most want)", "Votre taille de contrat idéale (les contrats que vous voulez le plus)") },
      { id: "headroom", type: "select", label: b("Room to scale up, or near capacity?", "De la marge pour croître, ou près de la capacité?"), options: CAPACITY },
    ],
  },
  {
    title: b("Bonding, insurance and credentials", "Cautionnement, assurance et accréditations"),
    fields: [
      { id: "bonding", type: "select", label: b("Can you get bonded, and up to how much?", "Pouvez-vous être cautionné, et jusqu'à combien?"), options: BONDING },
      { id: "insurance", type: "text", label: b("What insurance coverage do you carry?", "Quelle couverture d'assurance détenez-vous?") },
      { id: "certs", type: "textarea", label: b("Licenses, trade certifications or safety certs (COR, ISN, etc.)?", "Licences, certifications de métier ou de sécurité (COR, ISN, etc.)?") },
      { id: "setAside", type: "multi", label: b("Do you qualify for any set-aside or special status?", "Êtes-vous admissible à un statut réservé ou particulier?"), options: SET_ASIDE },
      { id: "prequal", type: "textarea", label: b("Already prequalified or registered with any agencies or programs?", "Déjà préqualifié ou inscrit auprès d'organismes ou de programmes?") },
    ],
  },
  {
    title: b("Your history with bids", "Votre historique de soumissions"),
    fields: [
      { id: "experience", type: "select", label: b("How much government bidding have you done?", "Combien d'appels d'offres publics avez-vous faits?"), options: EXPERIENCE },
      { id: "bidsYear", type: "select", label: b("Roughly how many bids do you submit a year?", "Environ combien de soumissions déposez-vous par année?"), options: BIDS_YEAR },
      { id: "wins", type: "textarea", label: b("Won government contracts before? What kind and what size?", "Déjà gagné des contrats publics? De quel type et de quelle taille?") },
      { id: "blockers", type: "textarea", label: b("What has stopped you from bidding more, or winning more?", "Qu'est-ce qui vous a empêché de soumissionner ou de gagner davantage?") },
    ],
  },
  {
    title: b("Your goals", "Vos objectifs"),
    fields: [
      { id: "goals", type: "textarea", label: b("What do you want government contracts to do for you this year?", "Que voulez-vous que les contrats publics fassent pour vous cette année?") },
      { id: "revenueGoal", type: "select", label: b("How much of your revenue would you like from government work?", "Quelle part de vos revenus aimeriez-vous tirer du travail public?"), options: REVENUE_GOAL },
      { id: "winLooksLike", type: "textarea", label: b("A year from now, what would make working with me a clear win?", "Dans un an, qu'est-ce qui ferait de notre collaboration une vraie réussite?") },
    ],
  },
  {
    title: b("How you find work today", "Comment vous trouvez du travail aujourd'hui"),
    fields: [
      { id: "findWork", type: "multi", label: b("How do you find government opportunities right now?", "Comment trouvez-vous les opportunités publiques en ce moment?"), options: FIND_WORK },
      { id: "platforms", type: "multi", label: b("Which procurement platforms do you use today?", "Quelles plateformes d'approvisionnement utilisez-vous aujourd'hui?"), options: PLATFORMS },
      { id: "hours", type: "select", label: b("Hours a week your team spends searching and reviewing bids?", "Heures par semaine que votre équipe passe à chercher et examiner des soumissions?"), options: HOURS },
    ],
  },
  {
    title: b("Anything else", "Autre chose"),
    fields: [
      { id: "anythingElse", type: "textarea", label: b("Anything else I should know to find you the right work?", "Autre chose que je devrais savoir pour vous trouver le bon travail?") },
      { id: "language", type: "select", label: b("Preferred language for opportunities and updates", "Langue préférée pour les opportunités et les suivis"), options: LANGUAGE },
    ],
  },
];
