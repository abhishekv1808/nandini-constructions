export type FamilyMomentCategory = 'all' | 'housewarming' | 'handover' | 'family-life' | 'construction';

export interface FamilyMoment {
  id: string;
  title: string;
  kannadaTitle: string;
  subtitle: string;
  category: Exclude<FamilyMomentCategory, 'all'>;
  categoryLabel: string;
  image: string;
  alt: string;
  familyName: string;
  locality: string;
  packageSlug: 'rental' | 'medium' | 'premium';
  packageName: string;
  plotOrSize: string;
  completionTime: string;
  story: string;
  quote: string;
  quoteAuthor: string;
  keyMilestone: string;
  tags: string[];
}

export const FAMILY_MOMENT_CATEGORIES: { value: FamilyMomentCategory; label: string; description: string }[] = [
  { value: 'all', label: 'All Celebrations', description: 'Every milestone from foundation to housewarming' },
  {
    value: 'housewarming',
    label: 'Gruha Pravesha',
    description: 'Auspicious housewarming ceremonies & milk-boiling rituals',
  },
  {
    value: 'handover',
    label: 'Key Handover',
    description: 'Proud handover moments on promised delivery dates',
  },
  {
    value: 'family-life',
    label: 'Living The Dream',
    description: 'Families happily living together in their custom homes',
  },
  {
    value: 'construction',
    label: 'Building With Trust',
    description: 'Confidence, site visits & stage-by-stage quality checks',
  },
];

export const FAMILY_MOMENTS: FamilyMoment[] = [
  {
    id: 'gruha-pravesha-sit-extension',
    title: 'Auspicious Gruha Pravesha at SIT Extension',
    kannadaTitle: 'ಹೊಸ ಮನೆ ಪ್ರವೇಶ — ಮರೆಯಲಾಗದ ಸಂಭ್ರಮ',
    subtitle: 'Stepping into their custom independent home on the scheduled Muhurtham',
    category: 'housewarming',
    categoryLabel: 'Gruha Pravesha',
    image: '/images/families/gruha-pravesha-ceremony.jpg',
    alt: 'South Indian family dressed in traditional festive attire celebrating Gruha Pravesha at the decorated doorstep of their newly constructed home in Tumakuru',
    familyName: 'The Murthy Family',
    locality: 'SIT Extension, Tumakuru',
    packageSlug: 'premium',
    packageName: 'Premium Package',
    plotOrSize: '30×50 (2,450 sq.ft)',
    completionTime: '8 Months (Delivered 12 days before Muhurtham)',
    story:
      'The Murthy family had dreamed of building an independent home in Tumakuru for over a decade. With Nandini Constructions managing the complete architectural drawings, structural engineering, and turnkey execution, the home was handed over 12 days ahead of their auspicious Gruha Pravesha date.',
    quote:
      'Holding the brass deepam and walking through our carved teakwood doorway with our parents and daughter was the most emotional moment of our lives. Nandini Constructions delivered everything promised with zero compromise.',
    quoteAuthor: 'Naveen Murthy & Soundarya',
    keyMilestone: 'Delivered before auspicious Muhurtham',
    tags: ['Auspicious Muhurtham', 'Teakwood Doors', 'Turnkey Handover', 'Tumakuru'],
  },
  {
    id: 'key-handover-batawadi',
    title: 'Proud Key Handover — 30×40 Modern Duplex',
    kannadaTitle: 'ಕನಸಿನ ಮನೆ ಕೀಲಿ ಕೈ ಹಸ್ತಾಂತರ',
    subtitle: 'Young working couple receiving keys to their contemporary 3 BHK home',
    category: 'handover',
    categoryLabel: 'Key Handover',
    image: '/images/families/key-handover-celebration.jpg',
    alt: 'Proud Indian couple with their smiling young daughter holding keys in front of their newly completed duplex home in Tumakuru',
    familyName: 'Suresh & Priya Gowda',
    locality: 'Batawadi, Tumakuru',
    packageSlug: 'medium',
    packageName: 'Medium Package',
    plotOrSize: '30×40 (1,850 sq.ft)',
    completionTime: '7.5 Months',
    story:
      'Living and working with hectic schedules, Suresh and Priya were worried that building a home would require daily site visits and stressful contractor arguments. With Nandini Constructions’ fixed-package pricing, transparent milestone tracking, and dedicated engineer updates on WhatsApp, the entire journey was seamless.',
    quote:
      'Zero cost escalations, genuine branded materials, and our keys handed over on the exact week agreed in the contract. Our 6-year-old daughter is already in love with her new room!',
    quoteAuthor: 'Suresh Gowda',
    keyMilestone: 'Fixed-Price Handover · Zero Escalations',
    tags: ['Fixed Package', 'On-Time Handover', '3 BHK Duplex', 'Milestone Billing'],
  },
  {
    id: 'living-room-kuvempunagar',
    title: 'Three Generations Under One Happy Roof',
    kannadaTitle: 'ಮೂರು ತಲೆಮಾರುಗಳ ಸುಖಿ ಸಂಸಾರ',
    subtitle: 'Vastu-harmonious living with teakwood accents, pooja mandir and ample sunlight',
    category: 'family-life',
    categoryLabel: 'Living The Dream',
    image: '/images/families/living-room-happiness.jpg',
    alt: 'Three generations of an Indian family laughing together in their spacious, sunlit living room with teak woodwork and modern interiors',
    familyName: 'Ranganath & Anasuya Family',
    locality: 'Kuvempunagar, Tumakuru',
    packageSlug: 'premium',
    packageName: 'Premium Package',
    plotOrSize: '40×60 (3,100 sq.ft)',
    completionTime: '9 Months',
    story:
      'Building a multi-generational home means honoring different generations: the grandparents desired a serene, traditional Vastu-compliant pooja mandir and peaceful garden access, while the working parents and kids wanted modern open-plan living, UPVC sound-insulated glass, and cove lighting. Nandini Constructions harmonized every requirement into an architectural masterpiece.',
    quote:
      'Every morning when my father sits with the newspaper in our sunlit living room and the kids play around the pooja mandir, we thank Nandini Constructions for listening to every small detail of our family’s needs.',
    quoteAuthor: 'Anand Ranganath',
    keyMilestone: '100% Vastu Compliant · Premium Finishes',
    tags: ['Multi-generational', 'Vastu Compliant', 'Teak Pooja Mandir', 'Natural Sunlight'],
  },
  {
    id: 'site-trust-sit-12th-cross',
    title: 'Confidence On-Site — Engineering You Can Verify',
    kannadaTitle: 'ಗುಣಮಟ್ಟದ ನಿರ್ಮಾಣ — ಸದಾ ವಿಶ್ವಾಸ',
    subtitle: 'Reviewing structural drawings and certified materials with our dedicated site engineer',
    category: 'construction',
    categoryLabel: 'Building With Trust',
    image: '/images/families/construction-site-trust.jpg',
    alt: 'Delighted Indian couple and their son reviewing structural drawings with a certified site engineer on their residential building site',
    familyName: 'Chethan & Dr. Rashmi',
    locality: 'SIT 12th Cross, Tumakuru',
    packageSlug: 'medium',
    packageName: 'Medium Package (ACC / Ramco)',
    plotOrSize: '30×45 (2,100 sq.ft)',
    completionTime: 'In Progress (On Schedule)',
    story:
      'Chethan and Rashmi had heard horror stories from acquaintances about builders swapping out promised cement brands or skimping on TMT steel grades. When they visited their Nandini Constructions site, the dedicated site engineer walked them through the test certificates, bar-bending schedules, and verified brand packaging.',
    quote:
      'Seeing the exact Ramco cement and Kamdhenu steel promised in our agreement right here on site gave us 100% peace of mind. We feel proud bringing our son to see his future home being built with such care.',
    quoteAuthor: 'Chethan Kumar',
    keyMilestone: 'Stage-Wise Quality Checks · Real Brand Verification',
    tags: ['Quality Checks', 'Dedicated Site Engineer', 'Certified Brands', 'Transparency'],
  },
  {
    id: 'milk-boiling-prosperity',
    title: 'Haalu Ubbisuvudu — Prosperity & New Beginnings',
    kannadaTitle: 'ಹಾಲು ಉಕ್ಕಿಸುವ ಶಾಸ್ತ್ರ — ಮನೆ ತುಂಬಿದ ಸಂತೋಷ',
    subtitle: 'The auspicious milk boiling ceremony in their new modern granite kitchen',
    category: 'housewarming',
    categoryLabel: 'Gruha Pravesha',
    image: '/images/families/milk-boiling-ritual.jpg',
    alt: 'Happy South Indian couple with folded hands and elders praying as milk boils over from brass pot on granite kitchen counter during Gruha Pravesha',
    familyName: 'Kiran & Deepa',
    locality: 'Kyathsandra, Tumakuru',
    packageSlug: 'medium',
    packageName: 'Medium Package',
    plotOrSize: '30×40 (1,950 sq.ft)',
    completionTime: '7 Months',
    story:
      'In Karnataka tradition, the kitchen is where family health and prosperity reside. During their Gruha Pravesha, Kiran and Deepa performed the auspicious milk-boiling ceremony (ಹಾಲು ಉಕ್ಕಿಸುವುದು) in their newly installed granite modular kitchen, surrounded by their elders with prayers for abundance.',
    quote:
      'When the milk boiled over on our brand new granite counter and our parents chanted blessings, our hearts were filled with gratitude. Nandini Constructions treated our house not as a contract, but as our family temple.',
    quoteAuthor: 'Deepa Kiran',
    keyMilestone: 'Auspicious Kitchen Vastu · Granite Finishes',
    tags: ['Gruha Pravesha Ritual', 'Kitchen Vastu', 'Granite Finishes', 'Family Blessings'],
  },
];
