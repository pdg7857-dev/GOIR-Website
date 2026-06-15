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
  type: "text" | "email" | "tel" | "textarea" | "select" | "multi" | "services" | "areas";
  label: Bi;
  options?: Bi[];
  required?: boolean;
};

export type Section = { title: Bi; fields: Field[] };

const b = (en: string, fr: string): Bi => ({ en, fr });

// Reusable option sets.
const TRADE = [
  b("Construction", "Construction"),
  b("HVAC and mechanical", "CVC et mécanique"),
  b("Plumbing", "Plomberie"),
  b("Electrical", "Électricité"),
  b("Roofing", "Toiture"),
  b("Painting", "Peinture"),
  b("Flooring", "Revêtements de sol"),
  b("Concrete and paving", "Béton et pavage"),
  b("Carpentry and millwork", "Menuiserie"),
  b("Glazing and windows", "Vitrerie et fenêtres"),
  b("Fencing", "Clôtures"),
  b("Fire protection and life safety", "Protection incendie"),
  b("Landscaping", "Aménagement paysager"),
  b("Janitorial", "Conciergerie"),
  b("Facilities maintenance", "Entretien des installations"),
  b("Pest control", "Lutte antiparasitaire"),
  b("Security", "Sécurité"),
  b("Industrial supplies", "Fournitures industrielles"),
  b("MRO supplies", "Fournitures MRO"),
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

/**
 * Services offered within each industry, keyed by the industry option's English
 * value (the canonical value stored by the form). Lets a contractor pick their
 * industry, then check every service that applies, so bids cross-match cleanly.
 * "Other" has no preset list and falls back to a free-text field.
 */
export const INDUSTRY_SERVICES: Record<string, Bi[]> = {
  Construction: [
    b("General contracting", "Entrepreneur général"),
    b("Concrete and foundations", "Béton et fondations"),
    b("Excavation and site work", "Excavation et travaux de site"),
    b("Framing and structural", "Charpente et structure"),
    b("Roofing", "Toiture"),
    b("Renovations and fit-outs", "Rénovations et aménagements"),
    b("Demolition", "Démolition"),
    b("Masonry", "Maçonnerie"),
    b("Drywall and finishing", "Cloisons sèches et finition"),
    b("Painting", "Peinture"),
    b("Flooring", "Revêtements de sol"),
    b("Windows and doors", "Portes et fenêtres"),
    b("Carpentry and millwork", "Menuiserie"),
    b("Paving and asphalt", "Pavage et asphalte"),
  ],
  Janitorial: [
    b("Office and commercial cleaning", "Nettoyage de bureaux et commercial"),
    b("School and daycare cleaning", "Nettoyage d'écoles et de garderies"),
    b("Healthcare cleaning", "Nettoyage en milieu de santé"),
    b("Floor care", "Entretien des planchers"),
    b("Carpet cleaning", "Nettoyage de tapis"),
    b("Window cleaning", "Lavage de vitres"),
    b("Post-construction cleanup", "Nettoyage après construction"),
    b("Disinfection and sanitization", "Désinfection et assainissement"),
    b("Waste and recycling", "Déchets et recyclage"),
    b("Day porter services", "Service de préposé de jour"),
  ],
  "Facilities maintenance": [
    b("HVAC maintenance", "Entretien CVC"),
    b("Electrical maintenance", "Entretien électrique"),
    b("Plumbing maintenance", "Entretien de plomberie"),
    b("Building automation and controls", "Automatisation du bâtiment"),
    b("Preventive maintenance", "Entretien préventif"),
    b("General repairs and handyman", "Réparations générales"),
    b("Grounds upkeep", "Entretien des terrains"),
    b("Snow removal", "Déneigement"),
    b("Pest control", "Lutte antiparasitaire"),
    b("Fire and life safety", "Sécurité incendie"),
    b("Elevator maintenance", "Entretien d'ascenseurs"),
  ],
  "Industrial supplies": [
    b("Tools and hardware", "Outils et quincaillerie"),
    b("Safety equipment and PPE", "Équipement de sécurité et EPI"),
    b("Fasteners", "Attaches"),
    b("Electrical supplies", "Fournitures électriques"),
    b("Plumbing supplies", "Fournitures de plomberie"),
    b("HVAC parts", "Pièces CVC"),
    b("Packaging materials", "Matériel d'emballage"),
    b("Material handling equipment", "Équipement de manutention"),
    b("Lubricants and chemicals", "Lubrifiants et produits chimiques"),
    b("Welding supplies", "Fournitures de soudage"),
  ],
  "MRO supplies": [
    b("Maintenance parts", "Pièces d'entretien"),
    b("Repair components", "Composants de réparation"),
    b("Operating supplies", "Fournitures d'exploitation"),
    b("Bearings and power transmission", "Roulements et transmission"),
    b("Pneumatics and hydraulics", "Pneumatique et hydraulique"),
    b("Motors and drives", "Moteurs et entraînements"),
    b("Filters", "Filtres"),
    b("Facility supplies", "Fournitures d'installation"),
    b("Lab and testing supplies", "Fournitures de laboratoire"),
  ],
  Security: [
    b("Manned guarding", "Gardiennage"),
    b("Mobile patrol", "Patrouille mobile"),
    b("Access control systems", "Systèmes de contrôle d'accès"),
    b("Video surveillance (CCTV)", "Vidéosurveillance"),
    b("Alarm monitoring", "Surveillance d'alarmes"),
    b("Event security", "Sécurité d'événements"),
    b("Loss prevention", "Prévention des pertes"),
    b("Security consulting", "Conseil en sécurité"),
    b("Locksmith services", "Services de serrurerie"),
  ],
  Landscaping: [
    b("Grounds maintenance", "Entretien des terrains"),
    b("Lawn care and mowing", "Entretien de pelouse"),
    b("Snow and ice management", "Gestion de la neige et de la glace"),
    b("Tree and shrub care", "Entretien d'arbres et d'arbustes"),
    b("Irrigation", "Irrigation"),
    b("Hardscaping", "Aménagement minéral"),
    b("Planting and horticulture", "Plantation et horticulture"),
    b("Sports field maintenance", "Entretien de terrains sportifs"),
    b("Trail and park maintenance", "Entretien de sentiers et de parcs"),
  ],
  "HVAC and mechanical": [
    b("Heating systems", "Systèmes de chauffage"),
    b("Air conditioning", "Climatisation"),
    b("Ventilation", "Ventilation"),
    b("Rooftop units", "Unités sur toit"),
    b("Boilers", "Chaudières"),
    b("Chillers", "Refroidisseurs"),
    b("Ductwork", "Conduits"),
    b("Controls and building automation", "Contrôles et automatisation"),
    b("Refrigeration", "Réfrigération"),
    b("Preventive maintenance", "Entretien préventif"),
  ],
  Plumbing: [
    b("Commercial plumbing", "Plomberie commerciale"),
    b("Drainage and sewer", "Drainage et égouts"),
    b("Water heaters", "Chauffe-eau"),
    b("Backflow prevention", "Prévention des refoulements"),
    b("Fixture installation", "Installation d'appareils"),
    b("Pipe repair and replacement", "Réparation de tuyauterie"),
    b("Hydronic systems", "Systèmes hydroniques"),
    b("Gas fitting", "Raccordement au gaz"),
    b("Drain cleaning", "Débouchage de drains"),
  ],
  Electrical: [
    b("Commercial wiring", "Câblage commercial"),
    b("Lighting and retrofits", "Éclairage et rénovations"),
    b("Panel upgrades", "Mise à niveau de panneaux"),
    b("Generators and backup power", "Génératrices et alimentation de secours"),
    b("Fire alarm systems", "Systèmes d'alarme incendie"),
    b("Data and low voltage", "Données et basse tension"),
    b("Controls and automation", "Contrôles et automatisation"),
    b("EV charging", "Bornes de recharge"),
    b("Electrical maintenance", "Entretien électrique"),
  ],
  Roofing: [
    b("Flat and low-slope roofing", "Toiture plate et à faible pente"),
    b("Metal roofing", "Toiture métallique"),
    b("Shingle roofing", "Toiture en bardeaux"),
    b("Roof repair", "Réparation de toiture"),
    b("Roof replacement", "Remplacement de toiture"),
    b("Waterproofing", "Imperméabilisation"),
    b("Inspection and maintenance", "Inspection et entretien"),
    b("Eavestrough and drainage", "Gouttières et drainage"),
  ],
  Painting: [
    b("Interior painting", "Peinture intérieure"),
    b("Exterior painting", "Peinture extérieure"),
    b("Industrial coatings", "Revêtements industriels"),
    b("Line painting and markings", "Marquage et lignage"),
    b("Drywall repair", "Réparation de cloisons sèches"),
    b("Surface preparation", "Préparation des surfaces"),
    b("Specialty finishes", "Finitions spécialisées"),
  ],
  Flooring: [
    b("Commercial flooring", "Revêtements commerciaux"),
    b("Carpet and tile", "Tapis et carrelage"),
    b("Vinyl and resilient", "Vinyle et souple"),
    b("Hardwood", "Bois franc"),
    b("Epoxy and resin", "Époxy et résine"),
    b("Concrete polishing", "Polissage de béton"),
    b("Floor repair", "Réparation de planchers"),
  ],
  "Concrete and paving": [
    b("Sidewalks and curbs", "Trottoirs et bordures"),
    b("Foundations", "Fondations"),
    b("Asphalt paving", "Pavage d'asphalte"),
    b("Concrete repair", "Réparation de béton"),
    b("Parking lots", "Stationnements"),
    b("Line painting", "Marquage"),
    b("Sealing and crack repair", "Scellement et fissures"),
  ],
  "Carpentry and millwork": [
    b("Finish carpentry", "Menuiserie de finition"),
    b("Custom millwork", "Menuiserie sur mesure"),
    b("Cabinetry", "Armoires"),
    b("Doors and frames", "Portes et cadres"),
    b("Framing", "Charpente"),
    b("Casework", "Mobilier intégré"),
  ],
  "Glazing and windows": [
    b("Window installation", "Installation de fenêtres"),
    b("Curtain wall", "Mur-rideau"),
    b("Storefront systems", "Devantures"),
    b("Glass replacement", "Remplacement de verre"),
    b("Door hardware", "Quincaillerie de porte"),
    b("Sealing and weatherproofing", "Scellement et étanchéité"),
  ],
  Fencing: [
    b("Chain link fencing", "Clôture à mailles"),
    b("Ornamental fencing", "Clôture ornementale"),
    b("Security fencing", "Clôture de sécurité"),
    b("Gates and access", "Portails et accès"),
    b("Guardrails", "Glissières"),
    b("Fence repair", "Réparation de clôtures"),
  ],
  "Fire protection and life safety": [
    b("Sprinkler systems", "Systèmes de gicleurs"),
    b("Fire alarm systems", "Systèmes d'alarme incendie"),
    b("Extinguishers", "Extincteurs"),
    b("Inspection and testing", "Inspection et essais"),
    b("Suppression systems", "Systèmes de suppression"),
    b("Emergency lighting", "Éclairage d'urgence"),
  ],
  "Pest control": [
    b("General pest control", "Lutte antiparasitaire générale"),
    b("Rodent control", "Contrôle des rongeurs"),
    b("Insect control", "Contrôle des insectes"),
    b("Wildlife removal", "Retrait de la faune"),
    b("Bird control", "Contrôle des oiseaux"),
    b("Inspection and prevention", "Inspection et prévention"),
  ],
};

// Province / state dropdown. Canada-forward, with national and US options.
export const PROVINCES = [
  b("Ontario", "Ontario"),
  b("Quebec", "Québec"),
  b("British Columbia", "Colombie-Britannique"),
  b("Alberta", "Alberta"),
  b("Manitoba", "Manitoba"),
  b("Saskatchewan", "Saskatchewan"),
  b("Nova Scotia", "Nouvelle-Écosse"),
  b("New Brunswick", "Nouveau-Brunswick"),
  b("Newfoundland and Labrador", "Terre-Neuve-et-Labrador"),
  b("Prince Edward Island", "Île-du-Prince-Édouard"),
  b("Northwest Territories", "Territoires du Nord-Ouest"),
  b("Yukon", "Yukon"),
  b("Nunavut", "Nunavut"),
  b("Across Canada", "Partout au Canada"),
  b("United States", "États-Unis"),
];

/**
 * Sub-areas within a province, keyed by the province option's English value.
 * Lets a contractor narrow to where they actually work (for example the GTA in
 * Ontario). Provinces without a list fall back to a free-text field.
 */
export const PROVINCE_AREAS: Record<string, Bi[]> = {
  Ontario: [
    b("Greater Toronto Area (GTA)", "Grand Toronto (RGT)"),
    b("Ottawa region", "Région d'Ottawa"),
    b("Hamilton and Niagara", "Hamilton et Niagara"),
    b("Kitchener-Waterloo", "Kitchener-Waterloo"),
    b("London and Southwest", "London et Sud-Ouest"),
    b("Windsor-Essex", "Windsor-Essex"),
    b("Eastern Ontario", "Est de l'Ontario"),
    b("Central Ontario", "Centre de l'Ontario"),
    b("Northern Ontario", "Nord de l'Ontario"),
    b("All of Ontario", "Tout l'Ontario"),
  ],
  Quebec: [
    b("Greater Montreal", "Grand Montréal"),
    b("Quebec City region", "Région de Québec"),
    b("Gatineau and Outaouais", "Gatineau et Outaouais"),
    b("Laval and Laurentians", "Laval et Laurentides"),
    b("Monteregie", "Montérégie"),
    b("Eastern Townships", "Cantons-de-l'Est"),
    b("Saguenay-Lac-Saint-Jean", "Saguenay-Lac-Saint-Jean"),
    b("All of Quebec", "Tout le Québec"),
  ],
  "British Columbia": [
    b("Metro Vancouver", "Grand Vancouver"),
    b("Fraser Valley", "Vallée du Fraser"),
    b("Greater Victoria", "Grand Victoria"),
    b("Vancouver Island", "Île de Vancouver"),
    b("Okanagan", "Okanagan"),
    b("Kamloops and Interior", "Kamloops et Intérieur"),
    b("Northern BC", "Nord de la C.-B."),
    b("All of BC", "Toute la C.-B."),
  ],
  Alberta: [
    b("Calgary region", "Région de Calgary"),
    b("Edmonton region", "Région d'Edmonton"),
    b("Red Deer and Central", "Red Deer et Centre"),
    b("Southern Alberta", "Sud de l'Alberta"),
    b("Northern Alberta", "Nord de l'Alberta"),
    b("All of Alberta", "Toute l'Alberta"),
  ],
  Manitoba: [
    b("Winnipeg region", "Région de Winnipeg"),
    b("Brandon and Western", "Brandon et Ouest"),
    b("Northern Manitoba", "Nord du Manitoba"),
    b("All of Manitoba", "Tout le Manitoba"),
  ],
  Saskatchewan: [
    b("Regina region", "Région de Regina"),
    b("Saskatoon region", "Région de Saskatoon"),
    b("Northern Saskatchewan", "Nord de la Saskatchewan"),
    b("All of Saskatchewan", "Toute la Saskatchewan"),
  ],
  "Nova Scotia": [
    b("Halifax region", "Région d'Halifax"),
    b("Cape Breton", "Cap-Breton"),
    b("Rest of Nova Scotia", "Reste de la Nouvelle-Écosse"),
    b("All of Nova Scotia", "Toute la Nouvelle-Écosse"),
  ],
  "New Brunswick": [
    b("Moncton", "Moncton"),
    b("Saint John", "Saint John"),
    b("Fredericton", "Fredericton"),
    b("All of New Brunswick", "Tout le Nouveau-Brunswick"),
  ],
  "Newfoundland and Labrador": [
    b("St. John's region", "Région de St. John's"),
    b("Labrador", "Labrador"),
    b("All of Newfoundland and Labrador", "Toute Terre-Neuve-et-Labrador"),
  ],
};

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
    fields: [...CONTACT],
  },
  {
    title: b("What you do", "Ce que vous faites"),
    fields: [
      { id: "trade", type: "select", label: b("What industry do you work in?", "Dans quel secteur travaillez-vous?"), options: TRADE, required: true },
      { id: "services", type: "services", label: b("Which services do you offer? (check all that apply)", "Quels services offrez-vous? (cochez tout ce qui s'applique)") },
      { id: "province", type: "select", label: b("Where do you bid?", "Où soumissionnez-vous?"), options: PROVINCES, required: true },
      { id: "areas", type: "areas", label: b("Which areas? (check all that apply)", "Quelles régions? (cochez tout ce qui s'applique)") },
    ],
  },
  {
    title: b("Your size", "Votre taille"),
    fields: [
      { id: "minJob", type: "select", label: b("Smallest contract worth your time", "Plus petit contrat qui vaut votre temps"), options: MIN_JOB },
      { id: "maxJob", type: "select", label: b("Largest contract you can comfortably deliver", "Plus gros contrat que vous pouvez livrer aisément"), options: MAX_JOB },
      { id: "experience", type: "select", label: b("How much government bidding have you done?", "Combien d'appels d'offres publics avez-vous faits?"), options: EXPERIENCE },
    ],
  },
  {
    title: b("What you want", "Ce que vous voulez"),
    fields: [
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
      { id: "province", type: "select", label: b("Where do you bid?", "Où soumissionnez-vous?"), options: PROVINCES, required: true },
      { id: "areas", type: "areas", label: b("Which areas? (check all that apply)", "Quelles régions? (cochez tout ce qui s'applique)") },
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
