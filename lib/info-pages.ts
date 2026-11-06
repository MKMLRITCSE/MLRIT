/**
 * Content for the secondary nav-bar pages (About sub-pages, Admissions,
 * Campus, Messages, etc.). One shared data shape so a single component
 * can render every page consistently.
 */

import { DEFAULT_BROCHURE } from '@/lib/content/documents-shared';

export type InfoBlock =
  | { kind: 'lead'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'figure'; src: string; alt: string; width: number; height: number }
  | { kind: 'bullets'; title?: string; items: string[] }
  | { kind: 'bullet-groups'; items: { title: string; items: string[] }[] }
  | { kind: 'stat-grid'; items: { num: string; label: string }[] }
  | { kind: 'cards'; items: { title: string; body: string; href?: string }[] }
  | { kind: 'quote'; text: string; attribution: string; role?: string }
  | { kind: 'cta'; label: string; href: string; external?: boolean }
  // ── Rich blocks (used by the About sub-pages) ──
  | { kind: 'heading'; eyebrow?: string; title: string; italic?: string }
  | { kind: 'stat-strip'; variant?: 'ink' | 'green'; items: { num: string; label: string }[] }
  | { kind: 'feature-cards'; items: { icon?: string; title: string; body: string; href?: string }[] }
  | { kind: 'numbered-cards'; items: { title: string; body: string }[] }
  | { kind: 'ranking-cards'; items: { icon?: string; eyebrow?: string; title: string; body: string; badge?: string }[] }
  | { kind: 'pillars'; items: { variant: 'green' | 'light'; icon?: string; eyebrow: string; title: string; body?: string; bullets?: string[] }[] }
  | { kind: 'leadership'; items: { name: string; role: string; quote: string; href?: string; accent?: 'green' | 'orange' }[] }
  | { kind: 'roster'; items: { name: string; detail?: string; tag?: string; photo?: string }[] }
  | { kind: 'chips'; items: { label: string; sub?: string }[] }
  | { kind: 'pill-band'; video?: string; image?: string; title?: string; items: { label: string }[] }
  | { kind: 'brochure-card'; title: string; subtitle?: string; meta?: string; href: string; external?: boolean }
  | { kind: 'button-group'; items: { label: string; href: string; variant?: 'solid' | 'outline'; external?: boolean }[] }
  // fitMobile: below md, drop the 640px min-width so a narrow table fits the
  // screen without sideways scrolling. md+ renders exactly as without it.
  | { kind: 'table'; columns: string[]; rows: string[][]; caption?: string; fitMobile?: boolean }
  | { kind: 'timeline'; eyebrow?: string; title?: string; items: { y: string; t: string; d: string }[] };

export type InfoPage = {
  eyebrow: string;        // "About · Vision & Mission" etc.
  title: string;          // "Introduction"
  italic?: string;        // "to MLRIT" — appended after title
  dek: string;            // Sub-headline / lede
  crumbs: { label: string; href?: string }[];
  blocks: InfoBlock[];
};

export const INFO_PAGES: Record<string, InfoPage> = {
  /* ──────────────────── ABOUT ──────────────────── */

  'about/vision-mission/introduction': {
    eyebrow: 'About MLRIT',
    title: 'Built Beyond',
    italic: 'Classrooms',
    dek: 'Since 2005, MLR Institute of Technology has been shaping engineers, thinkers, and leaders — through academics, innovation, and the culture of a campus that never stops growing.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Introduction' }],
    blocks: [
      {
        kind: 'lead',
        text:
          'Somewhere between deadlines, hackathons, placements, sports practice, and team projects — college becomes more than a degree. At MLRIT, it always was.',
      },
      {
        kind: 'stat-strip',
        variant: 'ink',
        items: [
          { num: '2005', label: 'Established at Dundigal, Hyderabad' },
          { num: 'JNTUH', label: 'Affiliated university' },
          { num: 'AICTE', label: 'Approved programmes' },
        ],
      },
      {
        kind: 'paragraph',
        text:
          'MLR Institute of Technology (MLRIT) is an engineering and technology institution located in Dundigal, Hyderabad, Telangana. Established in 2005, the institute was founded with the vision of delivering quality technical education and producing industry-ready, socially responsible engineers and professionals.',
      },
      {
        kind: 'paragraph',
        text:
          'Affiliated to Jawaharlal Nehru Technological University Hyderabad (JNTUH) and approved by the All India Council for Technical Education (AICTE), MLRIT offers undergraduate (B.Tech), postgraduate (M.Tech, MBA), and other programs across core and emerging disciplines such as Computer Science (CSE), Electronics & Communication (ECE), Electrical & Electronics (EEE), Mechanical (ME), Artificial Intelligence & Machine Learning (AI&ML), Aeronautical Engineering (AE), and CSE — Data Science.',
      },
      { kind: 'heading', eyebrow: 'Why MLRIT', title: 'A trusted name in', italic: 'engineering education.' },
      {
        kind: 'paragraph',
        text:
          'MLR Institute of Technology is a trusted name in engineering education, offering AICTE-approved, JNTUH-affiliated programs across core and emerging fields like Computer Science, AI/ML, Data Science, and Electronics. Guided by experienced and dedicated faculty, students learn through an industry-aligned curriculum supported by modern laboratories, smart classrooms, and well-equipped infrastructure.',
      },
      {
        kind: 'paragraph',
        text:
          'With strong placements through leading recruiters, a focus on research, innovation, and skill development, and a vibrant campus life filled with technical and cultural activities, MLRIT empowers students to become skilled, confident, and industry-ready professionals prepared to succeed in a competitive world.',
      },
      {
        kind: 'feature-cards',
        items: [
          { icon: 'academics', title: 'Academics', body: 'An industry-aligned curriculum across core and emerging engineering disciplines, taught by experienced and dedicated faculty.' },
          { icon: 'innovation', title: 'Innovation', body: 'A focus on research, innovation and skill development — supported by modern laboratories and smart classrooms.' },
          { icon: 'employability', title: 'Employability', body: 'Strong placements through leading recruiters, shaping confident, industry-ready professionals.' },
          { icon: 'sports', title: 'Campus Life', body: 'A vibrant campus filled with technical and cultural activities, sports, and student community.' },
        ],
      },
    ],
  },

  'about/vision-mission/vision-mission': {
    eyebrow: 'Our Purpose',
    title: 'Vision &',
    italic: 'Mission',
    dek: 'The foundational beliefs that guide every decision, programme, and experience at MLR Institute of Technology.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Vision & Mission' }],
    blocks: [
      {
        kind: 'pillars',
        items: [
          {
            variant: 'green',
            icon: 'vision',
            eyebrow: 'Vision',
            title: 'Academic Excellence, Research & Innovation',
            body:
              'Promote academic excellence, research, innovation, and entrepreneurial skills to produce graduates with human values and leadership qualities to serve the nation.',
          },
          {
            variant: 'light',
            icon: 'mission',
            eyebrow: 'Mission',
            title: 'Student-Centric. Globally Competitive. Socially Responsible.',
            bullets: [
              'Provide student-centric education and training on cutting-edge technologies to make the students globally competitive and socially responsible citizens.',
              'Create an environment to strengthen the research, innovation and entrepreneurship to solve societal problems.',
            ],
          },
        ],
      },

    ],
  },

  'about/legacy': {
    eyebrow: 'Two Decades',
    title: 'The MLRIT',
    italic: 'Legacy',
    dek: 'From a single campus in Dundigal to a nationally recognised institution — a timeline of milestones and the leadership that built them.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Legacy' }],
    blocks: [
      {
        kind: 'lead',
        text:
          'MLRIT was founded by Sri Marri Laxman Reddy Garu and his family under the KMR Educational Society — with the conviction that engineering education in Telangana needed an institution that combined depth with discipline.',
      },
      {
        kind: 'timeline',
        eyebrow: 'Institutional Timeline',
        title: 'Milestones that shaped MLRIT',
        items: [
          { y: '2005', t: 'Founding of MLRIT', d: 'Established under the KMR Educational Society at Dundigal, Hyderabad — an inaugural intake of 240 across CSE, ECE, MECH and EEE.' },
          { y: '2008', t: 'First Graduation', d: 'The inaugural batch of B.Tech graduates step out — placed across Wipro, Infosys and TCS. CSE earns its first NBA cycle.' },
          { y: '2011', t: 'M.Tech Programmes', d: 'Postgraduate programmes launched across CSE, ECE, MECH and EEE, with JNTUH-recognised research centres.' },
          { y: '2017', t: 'IPFC Established', d: 'The Intellectual Property Facilitation Centre opens — anchoring patent filings, IPR workshops and student-led invention.' },
          { y: '2019', t: 'NAAC Accreditation', d: 'Institutional NAAC accreditation granted — formal recognition of quality, governance and learning outcomes.' },
          { y: '2022', t: 'Autonomous Status — UGC', d: 'UGC grants autonomous status, allowing MLRIT to design its own curriculum and conduct independent examinations.' },
          { y: '2024', t: 'AI, ML & Aerospace', d: 'New-age programmes launched — AIML, CSE-CS, CSE-DS, CSIT and Aerospace engineering.' },
          { y: '2025', t: '20 Years of Excellence', d: '11,000+ students, 7,000+ alumni placed worldwide — capped by Trishna 2K26 with 621 offers and a ₹51 LPA top package.' },
        ],
      },
      { kind: 'heading', eyebrow: 'Governance', title: 'The MLRIT', italic: 'Governing Body.' },
      {
        kind: 'roster',
        items: [
          { name: 'Shri M. Laxman Reddy', detail: 'Chairman, KMR Educational Society', tag: 'Chairman' },
          { name: 'Ms. M. Anushreya Reddy', detail: 'Secretary, KMR Educational Society', tag: 'Member' },
          { name: 'Smt. M. Mamtha Reddy', detail: 'Treasurer, KMR Educational Society', tag: 'Member' },
          { name: 'Mr. M. Dhiren Reddy', detail: 'Vice Chairman, KMR Educational Society', tag: 'Member' },
          { name: 'Dr. K. Siva Kumar', detail: 'Professor, Electrical Engineering, IIT Hyderabad', tag: 'UGC Nominee' },
          { name: 'Dr. D. Ramesh', detail: 'Professor of CSE, JNTUH University', tag: 'University Nominee' },
          { name: 'Prof. Ch. Subramanyam', detail: 'Dean of Academic Affairs, IIT Hyderabad', tag: 'Academician' },
          { name: 'Shri M. Murali Mohan Reddy', detail: 'Managing Director, Previlage Estates', tag: 'Member' },
          { name: 'Shri D. Narendar Reddy', detail: 'SVS Food Processors Pvt. Ltd.', tag: 'Member' },
          { name: 'Shri Ch. Satti Reddy', detail: 'Managing Director, Machine Tools Equipment Ltd.', tag: 'Member' },
          { name: 'Dr. K. Srinivasa Rao', detail: 'MLRIT', tag: 'Member Secretary' },
          { name: 'Dr. V. Radhika Devi', detail: 'Dean S&H & IQAC, MLRIT — Faculty Representative', tag: 'Member' },
        ],
      },
    ],
  },

  'about/rankings-awards': {
    eyebrow: 'Recognition',
    title: 'Rankings &',
    italic: 'Awards',
    dek: 'National rankings, institutional accreditations, research achievements, and recognitions that reflect the quality MLRIT delivers.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Rankings & Awards' }],
    blocks: [
      {
        kind: 'stat-strip',
        variant: 'green',
        items: [
          { num: 'NAAC', label: 'Accredited institution' },
          { num: 'NBA', label: 'Accredited programmes' },
          { num: '20+', label: 'Years of excellence' },
          { num: '621+', label: 'Placements in 2025-26' },
        ],
      },
      { kind: 'heading', eyebrow: 'National Rankings', title: 'Nationally Ranked &', italic: 'Recognised' },
      {
        kind: 'ranking-cards',
        items: [
          { icon: 'excellence', eyebrow: 'Category', title: 'Top Engineering Institutions — T-School Ranking', body: 'Recognised among India\'s top technical schools for academic quality, placements, and infrastructure.', badge: 'Top T' },
          { icon: 'building', eyebrow: 'NIRF — Ministry of Education', title: 'National Institutional Ranking Framework', body: 'MLRIT participates in the NIRF rankings, evaluated across teaching, research, graduation outcomes, and perception.', badge: 'NIRF' },
          { icon: 'award', eyebrow: 'Times Engineering Survey', title: 'Top Engineering Colleges — Telangana', body: 'Ranked among the leading private engineering colleges in Telangana for academic outcomes and student satisfaction.', badge: 'Top 10' },
          { icon: 'star', eyebrow: 'Silicon India', title: 'Most Promising Engineering Colleges', body: 'Recognised as one of the most promising engineering colleges in Andhra Pradesh & Telangana for innovation and excellence.', badge: '★★★★' },
        ],
      },
      { kind: 'heading', eyebrow: 'Accreditations', title: 'Quality Certified at', italic: 'Every Level' },
      {
        kind: 'chips',
        items: [
          { label: 'NAAC', sub: 'National Assessment & Accreditation Council' },
          { label: 'NBA', sub: 'National Board of Accreditation — multiple programmes' },
          { label: 'AICTE', sub: 'All India Council for Technical Education' },
          { label: 'JNTUH', sub: 'Affiliated to JNTU Hyderabad' },
          { label: 'UGC Autonomous', sub: 'Autonomous status since 2015' },
        ],
      },
    ],
  },

  'about/brochure': {
    eyebrow: 'Official Brochure',
    title: 'Everything about MLRIT,',
    italic: 'in one document',
    dek: 'Programmes, campus life, research, sports, facilities, admissions — the complete MLRIT story, ready to download.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Brochure' }],
    blocks: [
      {
        kind: 'brochure-card',
        title: 'MLR Institute of Technology',
        subtitle: 'Institutional Brochure 2026',
        meta: 'PDF · English',
        href: DEFAULT_BROCHURE,
        external: true,
      },
      { kind: 'heading', eyebrow: "What's Inside", title: 'A complete look at', italic: 'campus life.' },
      {
        kind: 'feature-cards',
        items: [
          { icon: 'academics', title: 'Academic Programmes', body: 'Complete list of UG, PG and Ph.D. programmes with curriculum highlights across departments.' },
          { icon: 'building', title: 'Campus & Facilities', body: 'Libraries, sporting grounds, laboratories, cafeteria, and campus infrastructure detailed with photos.' },
          { icon: 'employability', title: 'Placement & Careers', body: 'Placement statistics, top recruiters, salary trends, and career development programmes offered at MLRIT.' },
          { icon: 'research', title: 'Research & Innovation', body: 'Research centres, funded projects, patents, publications, and the IPFC ecosystem at MLRIT.' },
          { icon: 'graduation', title: 'Admissions & Scholarships', body: 'Eligibility criteria, application process, fee structure, and available scholarship programmes.' },
          { icon: 'sports', title: 'Sports & Student Life', body: 'Sports scholarships, clubs, annual events, student organisations, and life on the MLRIT campus.' },
        ],
      },
      {
        kind: 'button-group',
        items: [
          { label: 'Apply Now', href: '/admissions/how-to-apply', variant: 'solid' },
          { label: 'Explore Programmes', href: '/academics', variant: 'solid' },
          { label: 'Rankings & Awards', href: '/about/rankings-awards', variant: 'outline' },
        ],
      },
    ],
  },

  'about/messages/principal': {
    eyebrow: 'About · Messages',
    title: "Principal's",
    italic: 'message.',
    dek: 'From the desk of the Principal, MLR Institute of Technology.',
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Messages' },
      { label: "Principal's Message" },
    ],
    blocks: [
      {
        kind: 'quote',
        text:
          'We believe that engineering education is most powerful when it is hands-on, industry-aligned and research-driven. At MLRIT, we have built that — across 11 departments, with a faculty team that mentors every student from the first class to the final capstone. Welcome to a place where ideas turn into engineering.',
        attribution: 'Dr. S.V.S. Prasad',
        role: 'Principal, MLR Institute of Technology',
      },
      {
        kind: 'paragraph',
        text:
          'Under the Principal\'s leadership, MLRIT has expanded into autonomous status, launched five new UG programmes, and grown its research-active doctoral faculty to over 25. The placement record — capped by the ₹51 LPA top package of 2026 — speaks to a curriculum that meets industry where industry is heading.',
      },
      { kind: 'cta', label: 'Explore academics →', href: '/academics' },
    ],
  },

  'about/messages/dean': {
    eyebrow: 'About · Messages',
    title: "Director's",
    italic: 'message.',
    dek: 'From the desk of the Director, MLR Institute of Technology.',
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Messages' },
      { label: "Director's Message" },
    ],
    blocks: [
      {
        kind: 'quote',
        text:
          'Academic excellence at MLRIT is not a slogan — it is a practice. Outcome-Based Education, regular curriculum review with industry experts, and a culture of measurable assessment combine to produce graduates ready for the world they will shape.',
        attribution: 'Dr. V. Radhika Devi',
        role: 'Director, MLR Institute of Technology',
      },
      {
        kind: 'paragraph',
        text:
          'The Dean\'s office anchors curriculum design, examination governance, and Programme Outcome (PO) attainment across every department. Through autonomous status, MLRIT now refreshes regulations on a rolling cycle — keeping the curriculum aligned with what industry needs next.',
      },
      { kind: 'cta', label: 'Open the academics overview →', href: '/academics' },
    ],
  },

  /* ──────────────────── ADMISSIONS ──────────────────── */

  'admissions/how-to-apply': {
    eyebrow: 'Admissions',
    title: 'How to',
    italic: 'apply.',
    dek: 'A step-by-step guide to applying to MLRIT — across B.Tech, M.Tech and MBA programmes. Source: mlrit.ac.in/admissions/.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Admissions', href: '/admissions' }, { label: 'How to Apply' }],
    blocks: [
      {
        kind: 'lead',
        text:
          'Admissions to MLRIT are managed through TS-EAMCET (B.Tech), GATE / TS-PGECET (M.Tech) and TS-ICET (MBA). 30% of B.Tech seats are filled under Management Quota.',
      },
      {
        kind: 'numbered-cards',
        items: [
          { title: 'Choose your programme', body: 'Explore MLRIT\'s 10+ B.Tech branches, M.Tech specialisations and MBA. Confirm eligibility for your chosen programme.' },
          { title: 'Appear for the entrance exam', body: 'B.Tech — TS EAMCET. M.Tech — GATE or TS PGECET. MBA — TS ICET or AP ICET. Qualify with a valid rank.' },
          { title: 'Participate in counselling', body: 'Register for the respective state counselling. Select MLRIT as your preference. 70% of seats are allotted through counselling.' },
          { title: 'Report to MLRIT', body: 'Bring originals of all certificates — 10th & 12th mark sheets, TC, migration, caste certificate, photographs. Pay the semester fee.' },
          { title: 'B-Category / Walk-in', body: 'For the remaining 30% management-quota seats, contact the MLRIT admissions office directly. Walk-in admissions are welcome.' },
        ],
      },
      {
        kind: 'bullets',
        title: 'Documents required at reporting',
        items: [
          '10th and 12th / Intermediate mark sheets (original + copies).',
          'Transfer Certificate and Migration Certificate.',
          'Caste Certificate (OBC/SC/ST — if applicable).',
          'Aadhaar card.',
          '6 passport-size photographs.',
          'Counselling allotment letter (for convener-quota candidates).',
        ],
      },
      {
        kind: 'cards',
        items: [
          { title: 'Admissions Help Desk', body: '+91 96522 26061 · Dr. CH Achireddy (Admissions I/C): +91 98666 52122 · admissions@mlrinstitutions.ac.in' },
          { title: 'Download Application Form', body: 'Available on mlrit.ac.in/admissions/ — download, fill, and submit in person or by post. B-Category form also available.' },
        ],
      },
      {
        kind: 'button-group',
        items: [
          { label: 'Check Eligibility', href: '/admissions/eligibility', variant: 'solid' },
          { label: 'Fee Structure', href: '/admissions/fees', variant: 'outline' },
          { label: 'Download Application', href: '/admissions/admission-form-2024-25.pdf', variant: 'outline', external: true },
        ],
      },
    ],
  },

  'admissions/eligibility': {
    eyebrow: 'Admissions',
    title: 'Eligibility',
    italic: 'criteria.',
    dek: 'Programme-wise eligibility requirements for B.Tech, M.Tech and MBA admissions at MLRIT. Source: mlrit.ac.in/admissions/.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Admissions', href: '/admissions' }, { label: 'Eligibility' }],
    blocks: [
      { kind: 'heading', eyebrow: 'Undergraduate', title: 'B.Tech', italic: 'Eligibility' },
      {
        kind: 'bullets',
        title: 'Convener Quota (70% of seats)',
        items: [
          'Pass in Intermediate (10+2) conducted by the Board of Intermediate Education, Govt. of Telangana or equivalent.',
          'Subjects: Mathematics, Physics and Chemistry as optional subjects.',
          'Minimum 45% aggregate marks (40% for reserved categories).',
          'Valid TS-EAMCET rank required for allotment.',
        ],
      },
      {
        kind: 'bullets',
        title: 'Management Quota (30% of seats)',
        items: [
          'Same academic eligibility as convener quota.',
          'Admissions are direct — based on eligibility as per JNTU Rules.',
          'Contact MLRIT Admissions Office for seat availability.',
        ],
      },
      {
        kind: 'bullets',
        title: 'Lateral Entry to B.Tech (2nd Year)',
        items: [
          'Diploma holders in relevant engineering branch — minimum 50% aggregate.',
          'Valid TS-ECET rank required.',
        ],
      },
      { kind: 'heading', eyebrow: 'Postgraduate', title: 'M.Tech', italic: 'Eligibility' },
      {
        kind: 'bullets',
        title: 'Admission criteria',
        items: [
          'B.E. / B.Tech in relevant branch (or equivalent) — minimum 50% aggregate.',
          'Valid GATE score or rank obtained in JNTUH PGECET.',
          'Branch-wise eligibility varies — see programme catalogue or contact admissions.',
        ],
      },
      { kind: 'heading', eyebrow: 'Postgraduate', title: 'MBA', italic: 'Eligibility' },
      {
        kind: 'bullets',
        title: 'Admission criteria',
        items: [
          'Pass in undergraduate course (10+2+3) — any discipline.',
          '70% of seats allotted based on TS-ICET / AP-ICET merit.',
          '30% of seats reserved for Management / NRI candidates.',
        ],
      },
      {
        kind: 'cards',
        items: [
          { title: 'Admissions Help Desk', body: '+91 96522 26061 · Dr. CH Achireddy (Admissions I/C): +91 98666 52122' },
          { title: 'Application', body: 'Download application form from mlrit.ac.in or collect in person at the admissions office. Walk-in admissions are welcome.' },
        ],
      },
    ],
  },

  'admissions/fee-structure': {
    eyebrow: 'Admissions',
    title: 'Fee',
    italic: 'structure.',
    dek: 'Annual fee structure across UG and PG programmes at MLRIT for 2025–26. Source: mlrit.ac.in/admissions/.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Admissions', href: '/admissions' }, { label: 'Fee Structure' }],
    blocks: [
      {
        kind: 'lead',
        text:
          'Fees shown are for AY 2025–26 as published on the official MLRIT admissions page. Convener-quota and management-quota fees are the same for the current academic year. Fees are subject to revision by the Telangana Fee Regulation Committee (TSFRC) / APSCHE.',
      },
      {
        kind: 'table',
        caption: 'Annual fee structure — AY 2025–26 (Source: mlrit.ac.in/admissions/)',
        columns: ['Programme', 'Convener Quota', 'Management / NRI Quota'],
        rows: [
          ['B.Tech (All Branches)', '₹1,10,000 / year', '₹1,10,000 / year'],
          ['M.Tech (All Specialisations)', '₹60,000 / year', '₹60,000 / year'],
          ['MBA', '₹60,000 / year', '₹60,000 / year'],
        ],
      },
      {
        kind: 'bullets',
        title: 'What the fee covers',
        items: [
          'Tuition, library, laboratory and university examination fees.',
          'Identity card, student handbook and orientation programmes.',
          'Hostel, transport and food are charged separately as opted.',
        ],
      },
      {
        kind: 'bullets',
        title: 'Payment modes',
        items: [
          'Online portal — debit / credit card, UPI, net banking.',
          'Demand Draft in favour of "MLRIT" payable at Hyderabad.',
          'Cash or card at the MLRIT accounts office.',
        ],
      },
      { kind: 'cta', label: 'View fee structure →', href: '/admissions/fees' },
    ],
  },

  'admissions/scholarships': {
    eyebrow: 'Admissions',
    title: 'Scholarships',
    italic: 'and aid.',
    dek: 'State, central and institute-level scholarships available to MLRIT students.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Admissions' }, { label: 'Scholarships' }],
    blocks: [
      {
        kind: 'cards',
        items: [
          { title: 'Post-Matric (SC/ST/BC/EBC)', body: 'Telangana State scholarship covering tuition reimbursement and maintenance allowance. Apply through the e-Pass portal each year.' },
          { title: 'AICTE Scholarships', body: 'Pragati & Saksham scholarships for girls and differently-abled students respectively. Awarded by AICTE to qualifying candidates.' },
          { title: 'Merit Scholarship', body: 'Institute-level award for top-ranking students in EAMCET / PGECET / ICET. Awarded annually.' },
          { title: 'Sports & Cultural', body: 'Fee concessions and stipends for state and national-level sports and cultural representatives.' },
        ],
      },
      {
        kind: 'bullets',
        title: 'How to apply',
        items: [
          'Government scholarships — apply via the Telangana e-Pass portal each academic year.',
          'AICTE scholarships — apply via the AICTE National Scholarship Portal (NSP).',
          'Institute scholarships — eligible students are notified by the MLRIT admissions office.',
        ],
      },
      { kind: 'cta', label: 'Telangana e-Pass portal →', href: 'https://telanganaepass.cgg.gov.in', external: true },
    ],
  },

  /* ──────────────────── CAMPUS ──────────────────── */

  'campus/hostels': {
    eyebrow: 'Campus · Life',
    title: 'Hostels',
    italic: 'on campus.',
    dek: 'Home away from home — purpose-built residential blocks for boys and girls, steps from the academic campus, for 1,650+ students.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Campus' }, { label: 'Hostels' }],
    blocks: [
      {
        kind: 'lead',
        text: 'Over 1,650 students call MLRIT home — a green, clean campus with fresh air, professional resident staff, and everything needed to study, rest, and grow.',
      },
      {
        kind: 'stat-grid',
        items: [
          { num: '850+',       label: 'Boys hostel capacity' },
          { num: '800+',       label: 'Girls hostel capacity' },
          { num: '₹1,20,000',  label: 'Fee per year (online)' },
          { num: '24×7',       label: 'Wi-fi, security & hospital' },
        ],
      },
      {
        kind: 'pillars',
        items: [
          {
            variant: 'green',
            icon: 'hostel',
            eyebrow: 'Boys Hostel',
            title: 'Block A & Block B',
            body: 'Two dedicated blocks housing 850+ students. Block A spans 3 floors with 65 rooms; Block B spans 5 floors with 72 rooms. Each block has a library, reading room, shuttle courts, and an in-hostel shop.',
          },
          {
            variant: 'light',
            icon: 'hostel',
            eyebrow: 'Girls Hostel',
            title: 'Block A & Block B',
            body: 'Two dedicated blocks housing 800+ students. Each block has 70 rooms across 5 floors with lift access. Fully furnished with a separate library, reading room, shuttle courts, and an in-hostel shop.',
          },
        ],
      },
      {
        kind: 'bullet-groups',
        items: [
          {
            title: 'Rooms & Connectivity',
            items: [
              'Fully furnished rooms — bed, study table, wardrobe, and storage',
              '24×7 high-speed wi-fi throughout both blocks',
              'Hot & cold drinking water; hot water for bathing',
            ],
          },
          {
            title: 'Dining & Wellness',
            items: [
              'Dining hall for 1,000+ students — hygienic steam-cooked meals',
              'Four nutritious meals served daily',
              'State-of-the-art gymnasium and free campus bicycles',
            ],
          },
          {
            title: 'Safety & Support',
            items: [
              'On-campus hospital — free treatment and ambulance, 24×7',
              'Resident wardens on each floor with CCTV coverage',
              'Biometric entry and round-the-clock security personnel',
            ],
          },
        ],
      },
      {
        kind: 'table',
        columns: ['Meal', 'Girls', 'Boys'],
        fitMobile: true,
        rows: [
          ['Breakfast',    '7:00 – 8:00 AM',  '8:00 – 9:00 AM'],
          ['Lunch',        'As per timetable', 'As per timetable'],
          ['Evening Tea',  '4:30 – 5:30 PM',  '4:30 – 5:30 PM'],
          ['Dinner',       '7:00 – 8:00 PM',  '8:00 – 9:00 PM'],
          ['Study Hours',  '6:00 – 7:30 PM',  '6:30 – 8:00 PM'],
        ],
        caption: 'Study hours are mandatory in designated study rooms.',
      },
      {
        kind: 'heading',
        eyebrow: 'Contacts',
        title: 'Hostel Management',
        italic: 'team.',
      },
      {
        kind: 'roster',
        items: [
          { name: 'Hostel In-Charge',      detail: '+91 94913 63735', tag: 'administration' },
          { name: 'Hostel Warden (Boys)',   detail: '+91 73370 35879', tag: 'boys hostel' },
          { name: 'Hostel Warden (Girls)',  detail: '+91 63059 46826', tag: 'girls hostel' },
          { name: 'Mess In-Charge',         detail: '+91 94924 50009', tag: 'dining' },
        ],
      },
      {
        kind: 'bullet-groups',
        items: [
          {
            title: 'Visiting Hours',
            items: [
              'Working days: 4:00 – 6:00 PM',
              'Sundays & holidays: 8:00 AM – 6:00 PM',
              'Only pre-listed local guardians or parents may visit',
              'Meetings in the visitor\'s hall only — not in rooms',
            ],
          },
          {
            title: 'Outings & Movement',
            items: [
              'One outing permitted per month, on designated holidays',
              'Departure no earlier than 6:30 AM; return by 6:00 PM',
              'Day scholars are not permitted inside the hostel blocks',
              'College buses are reserved for day scholars only',
            ],
          },
          {
            title: 'Room Conduct',
            items: [
              'Unauthorised electrical fittings and gadgets are not permitted',
              'Students are responsible for keeping their room and furniture in order',
              'Any damage or defacement must be reported to the floor warden',
            ],
          },
        ],
      },
    ],
  },

  'campus/sports': {
    eyebrow: 'Campus · Life',
    title: 'Sports',
    italic: 'at MLRIT.',
    dek: 'World-class indoor and outdoor sports infrastructure, resident coaching staff, and a legacy of champions — cricket, volleyball, football, basketball, badminton and table tennis.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Campus' }, { label: 'Sports' }],
    blocks: [
      {
        kind: 'lead',
        text:
          'Sports play an important role in shaping the personality and fitness of every MLRIT student. Since its founding in 2005, the institute has fielded undisputed champions in volleyball, badminton, kabaddi, basketball and cricket — backed by sporting environments built to global standards.',
      },
      {
        kind: 'paragraph',
        text:
          'A world-class indoor stadium spans more than 26,000 sq. ft. across two floors, with a gallery seating up to 1,000 people. It houses 10 badminton courts, a table-tennis hall with 20 tables, and a fully-equipped gym with modern strength equipment. The same stadium makes room for 4 snooker tables, space for 6+ carom boards, a squash court, a dedicated fencing hall, and Zumba and meditation halls — plus guest accommodation across 32 rooms.',
      },
      {
        kind: 'paragraph',
        text:
          'Outdoors, MLRIT fields two volleyball courts, a throwball court, a basketball court, two kabaddi courts, a kho-kho field, a football field and an athletic track. The dedicated cricket ground is equipped with four floodlights delivering 77,000 watts of lighting, enabling matches to continue after dark.',
      },
      {
        kind: 'stat-grid',
        items: [
          { num: '26,000+', label: 'Sq ft indoor stadium, 2 floors' },
          { num: '1,000',   label: 'Stadium seating capacity' },
          { num: '10',      label: 'Badminton courts' },
          { num: '20',      label: 'Table-tennis tables' },
          { num: '4',       label: 'Cricket-ground floodlights' },
          { num: '32',      label: 'Stadium guest rooms' },
        ],
      },
      {
        kind: 'pillars',
        items: [
          {
            variant: 'green',
            icon: 'sports',
            eyebrow: 'Goal',
            title: 'Sportsmanship & Teamwork',
            body: 'To inculcate the spirit of sportsmanship and teamwork among the students of MLR Institute.',
          },
          {
            variant: 'light',
            icon: 'award',
            eyebrow: 'Motto',
            title: 'Win If You Can.',
            body: 'Lose if you must. But never quit.',
          },
        ],
      },
      { kind: 'heading', eyebrow: 'Facilities', title: 'Sports offered', italic: 'at MLRIT.' },
      {
        kind: 'pill-band',
        video: '/videos/sports.mp4',
        items: [
          { label: 'Cricket' },
          { label: 'Volleyball' },
          { label: 'Football' },
          { label: 'Indoor Stadium' },
          { label: 'Gym' },
          { label: 'Basketball' },
          { label: 'Table Tennis' },
          { label: 'Badminton' },
        ],
      },
      { kind: 'heading', eyebrow: 'Coaching Staff', title: 'Sports', italic: 'trainers.' },
      {
        kind: 'roster',
        items: [
          { name: 'Sardar Inderpal Singh', detail: 'Head of Department, Physical Education', tag: 'HOD', photo: '/images/sports/trainers/sardar-inderpal-singh.jpg' },
          { name: 'P. Srinivas',           detail: 'Senior Physical Director',               tag: 'Senior Physical Director', photo: '/images/sports/trainers/p-srinivas.jpg' },
          { name: 'Ch. Ramesh',            detail: 'Assistant Physical Director',             tag: 'Asst. Physical Director', photo: '/images/sports/trainers/ch-ramesh.jpg' },
          { name: 'K. Srinivas',           detail: 'Physical Director',                       tag: 'Physical Director', photo: '/images/sports/trainers/k-srinivas.jpg' },
        ],
      },
      { kind: 'heading', eyebrow: 'Sports Accolades', title: 'Champions', italic: 'in the making.' },
      {
        kind: 'roster',
        items: [
          { name: 'Sanskruthi',        detail: 'Softball',    tag: 'National' },
          { name: 'Harikishore',       detail: 'Gymnastics',  tag: 'All India University Medalist', photo: '/images/sports/accolades/harikishore.jpg' },
          { name: 'Sindhu',            detail: 'Weight Lifting', tag: 'All India University Medalist', photo: '/images/sports/accolades/sindhu.jpg' },
          { name: 'A. Nithin',         detail: 'Cricket',     tag: 'State U-25', photo: '/images/sports/accolades/a-nithin.jpg' },
          { name: 'N. Surya Teja',     detail: 'Cricket',     tag: 'Ranji Trophy', photo: '/images/sports/accolades/n-surya-teja.jpg' },
          { name: 'A. Vinay',          detail: 'Cricket',     tag: 'Ranji Trophy', photo: '/images/sports/accolades/a-vinay.jpg' },
          { name: 'A. Prudhvi Reddy',  detail: 'Basketball',  tag: 'International', photo: '/images/sports/accolades/a-prudhvi-reddy.jpg' },
          { name: 'K. Tarun Reddy',    detail: 'Badminton',   tag: 'International', photo: '/images/sports/accolades/k-tarun-reddy.jpg' },
        ],
      },
      { kind: 'heading', eyebrow: 'Sports Quota', title: 'Seats reserved for', italic: 'athletes.' },
      {
        kind: 'stat-strip',
        variant: 'green',
        items: [
          { num: '10',      label: 'Free sports-quota seats every year' },
          { num: '2020–26', label: 'Continuous intake, year on year' },
        ],
      },
      { kind: 'heading', eyebrow: 'Sports Life', title: 'Activities &', italic: 'benefits.' },
      {
        kind: 'bullet-groups',
        items: [
          {
            title: 'Activities',
            items: [
              'Daily practice with a coach for all sports',
              'Inter-college tournaments all round the year',
              'Friendly faculty matches',
              'Departmental competitions',
              'Annual sports fest',
            ],
          },
          {
            title: 'Physiological Benefits',
            items: [
              'Assertive',
              'Competent',
              'Responsible',
              'Self-control',
              'Youth development',
              'Helps overcome depression',
            ],
          },
          {
            title: 'Sociological Benefits',
            items: [
              'Cooperation',
              'Teamwork',
              'Discipline',
              'Responsibility',
              'Respect for others',
              'Patience',
            ],
          },
        ],
      },
      {
        kind: 'paragraph',
        text:
          'Every academic year, MLRIT publishes a consolidated sports-achievements record spanning inter-university, state, national and international-level results across every sport the institute fields teams in.',
      },
      { kind: 'cta', label: 'Explore Clubs & Societies →', href: '/campus/clubs' },
    ],
  },

  'campus/cafeteria': {
    eyebrow: 'Campus · Life',
    title: 'Cafeteria',
    italic: '& food.',
    dek: 'Multiple food courts and a central cafeteria — affordable, hygienic, and open all day.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Campus' }, { label: 'Cafeteria' }],
    blocks: [
      {
        kind: 'lead',
        text:
          'MLRIT runs a central cafeteria and multiple food courts across the campus. Menus rotate weekly and span South Indian, North Indian, Chinese and continental cuisines — at student-friendly prices.',
      },
      {
        kind: 'bullets',
        title: 'Highlights',
        items: [
          'Central cafeteria open 8 am – 8 pm.',
          'Food courts in the engineering and management blocks.',
          'Weekly rotating menus across regional cuisines.',
          'Hygiene-audited kitchens and routine quality checks.',
          'Pre-paid card system for cashless transactions.',
        ],
      },
    ],
  },

  'campus/transport': {
    eyebrow: 'Campus · Life',
    title: 'Transport',
    italic: 'services.',
    dek: 'Institute-operated buses across 40+ routes covering Hyderabad — punctual, safe, GPS-tracked.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Campus' }, { label: 'Transport' }],
    blocks: [
      {
        kind: 'lead',
        text:
          'MLRIT operates a fleet of buses across 40+ routes spanning Hyderabad, Secunderabad and the surrounding suburbs. All buses are GPS-tracked and operated by professionally trained drivers.',
      },
      {
        kind: 'stat-grid',
        items: [
          { num: '40+',  label: 'Active routes' },
          { num: '60+',  label: 'Buses' },
          { num: 'GPS',  label: 'Tracked in real-time' },
          { num: '24×7', label: 'Helpline' },
        ],
      },
      {
        kind: 'bullets',
        title: 'Coverage',
        items: [
          'Major Hyderabad clusters — Kukatpally, Miyapur, Ameerpet, Secunderabad, LB Nagar.',
          'Suburban towns and townships connected via dedicated routes.',
          'Special evening shuttles after extended labs and project work.',
          'GPS-based parent app for real-time bus tracking.',
        ],
      },
    ],
  },

  'campus/clubs': {
    eyebrow: 'Campus · Life',
    title: 'Clubs and',
    italic: 'societies.',
    dek: 'From robotics and coding to dance, drama and debate — student-led clubs that build community.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Campus' }, { label: 'Clubs & Societies' }],
    blocks: [
      {
        kind: 'lead',
        text:
          'MLRIT supports 17 student-led clubs across technical, cultural, social and sports domains. Every department hosts at least one technical society; the cultural calendar runs throughout the year.',
      },
      {
        kind: 'cards',
        items: [
          { title: 'Coding & Robotics',     body: 'Hackathons, ACM-ICPC training, robotics competitions, IEEE student branch.' },
          { title: 'Cultural Societies',    body: 'Dance crews, music ensembles, theatre, photography, fine arts.' },
          { title: 'Literary & Debate',     body: 'Literary club, debate society, model UN, quizzing teams.' },
          { title: 'Social & Service',      body: 'NSS unit, Rotaract, blood-donation drives, rural outreach.' },
          { title: 'Department Societies',  body: 'Tech societies in CSE, ECE, EEE, MECH, IT and AIML.' },
          { title: 'Sports Clubs',          body: 'Cricket, football, kabaddi, basketball, badminton, athletics.' },
        ],
      },
      { kind: 'heading', eyebrow: 'Campus · Life', title: 'Events on', italic: 'campus.' },
      {
        kind: 'paragraph',
        text:
          'MLRIT\'s event calendar runs year-round — anchored by the annual Trishna celebration, the cultural festival Symphony, departmental tech-fests and a continuous stream of guest lectures, hackathons and industry workshops.',
      },
      {
        kind: 'cards',
        items: [
          { title: 'Trishna',         body: 'Annual Day — combines tech, culture and recognition. Trishna 2K26 celebrated 20 years with 621 placement offers.' },
          { title: 'Symphony',        body: 'Cultural festival — dance, drama, music, fashion. Cross-college participation.' },
          { title: 'Department Fests', body: 'Each department hosts a yearly tech-fest with workshops, paper presentations and competitions.' },
          { title: 'Hackathons',      body: 'Periodic 24/48-hour hackathons in partnership with industry sponsors.' },
          { title: 'Guest Lectures',  body: 'Weekly industry lectures from MoU partners and alumni speakers.' },
          { title: 'Convocations',    body: 'Annual graduation ceremonies featuring chief guests from government, industry and academia.' },
        ],
      },
      { kind: 'cta', label: 'See homepage events showcase →', href: '/#events' },
    ],
  },

  /* ──────────────────── FACILITIES & AMENITIES ──────────────────── */

  'student-life/facilities': {
    eyebrow: 'Campus · Life',
    title: 'Facilities &',
    italic: 'Amenities',
    dek: 'A campus built for the complete student — 26,000 sq ft indoor stadium, dual hostels, a central cafeteria, 27 bus routes, and 17 active student clubs.',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Life at MLR', href: '/student-life' }, { label: 'Facilities & Amenities' }],
    blocks: [
      {
        kind: 'lead',
        text:
          'MLRIT was designed around the premise that infrastructure shapes character. Every facility on campus — from the floodlit cricket ground to the 24×7 hostel wi-fi — exists to keep students focused, comfortable, and growing.',
      },
      {
        kind: 'stat-strip',
        variant: 'ink',
        items: [
          { num: '26,000+', label: 'Sq ft indoor sports complex' },
          { num: '27',      label: 'Institute bus routes' },
          { num: '4',       label: 'Meals served daily in hostels' },
          { num: '17',      label: 'Active student clubs' },
        ],
      },
      { kind: 'heading', eyebrow: 'Sports & Fitness', title: 'A stadium built for', italic: 'champions.' },
      {
        kind: 'paragraph',
        text:
          'The MLRIT indoor stadium spans more than 26,000 sq ft across two floors with gallery seating for 1,000. Inside: 10 badminton courts, 20 table-tennis tables, a fully-equipped gym, 4 snooker tables, a squash court, a dedicated fencing hall, and Zumba and meditation halls. Outdoors, a cricket ground with four 77,000-watt floodlights enables evening matches — alongside volleyball, basketball, kabaddi, kho-kho and football facilities.',
      },
      {
        kind: 'stat-grid',
        items: [
          { num: '26,000+', label: 'Sq ft indoor stadium' },
          { num: '10',      label: 'Badminton courts' },
          { num: '20',      label: 'Table-tennis tables' },
          { num: '1,000',   label: 'Stadium seating capacity' },
          { num: '4',       label: 'Cricket floodlights' },
          { num: '32',      label: 'Stadium guest rooms' },
        ],
      },
      { kind: 'heading', eyebrow: 'Hostel Life', title: 'On-campus living,', italic: 'sorted.' },
      {
        kind: 'paragraph',
        text:
          'Separate, fully managed hostels for boys and girls sit within 100 metres of the academic blocks. All rooms are air-cooled with attached washrooms and study furniture. Resident wardens, a medical room, and 24×7 security keep campus life safe; four meals a day and a weekly-rotating mess menu keep it comfortable.',
      },
      {
        kind: 'pillars',
        items: [
          {
            variant: 'green',
            icon: 'building',
            eyebrow: 'Boys Hostel',
            title: 'Secure, connected, comfortable.',
            bullets: [
              'Air-cooled rooms with study furniture',
              '24×7 wi-fi and security',
              'Recreation room with indoor games',
              'Medical room and resident warden',
            ],
          },
          {
            variant: 'light',
            icon: 'building',
            eyebrow: 'Girls Hostel',
            title: 'Same standards, dedicated block.',
            bullets: [
              'Separate block with female wardens',
              'Attached washrooms in every room',
              'Reading lounge and common areas',
              '4 meals a day from qualified caterers',
            ],
          },
        ],
      },
      { kind: 'heading', eyebrow: 'Cafeteria', title: 'Campus food that keeps you', italic: 'going.' },
      {
        kind: 'bullets',
        title: 'What to expect',
        items: [
          'Central cafeteria open 8 am – 8 pm, serving South Indian, North Indian, Chinese and continental menus.',
          'Food courts inside the engineering and management blocks for between-class convenience.',
          'Weekly rotating menus — quality-audited kitchens with routine hygiene checks.',
          'Pre-paid card system for cashless transactions across all food outlets.',
        ],
      },
      { kind: 'heading', eyebrow: 'Transport', title: '27 routes. Every', italic: 'working day.' },
      {
        kind: 'paragraph',
        text:
          'MLRIT operates a GPS-tracked fleet of buses spanning Hyderabad, Secunderabad and the surrounding suburbs. The first bus departs at 6:30 AM; special evening shuttles run after extended labs and project sessions. A parent app provides live tracking for every route.',
      },
      {
        kind: 'stat-grid',
        items: [
          { num: '27',     label: 'Active routes' },
          { num: '400+',   label: 'Stops covered' },
          { num: '6:30 AM', label: 'First departure' },
          { num: 'GPS',    label: 'Tracked in real-time' },
        ],
      },
      { kind: 'heading', eyebrow: 'Student Community', title: 'Clubs for every', italic: 'interest.' },
      {
        kind: 'cards',
        items: [
          { title: 'Coding & Robotics',    body: 'Hackathons, ACM-ICPC training, robotics competitions, IEEE student branch.', href: '/campus/clubs' },
          { title: 'Cultural Societies',   body: 'Dance crews, music ensembles, theatre, photography, fine arts.' },
          { title: 'Literary & Debate',    body: 'Literary club, debate society, model UN, quizzing teams.' },
          { title: 'Social & Service',     body: 'NSS unit, Rotaract, blood-donation drives, rural outreach.' },
          { title: 'Department Societies', body: 'Tech societies across CSE, ECE, EEE, MECH, IT and AI&ML.' },
          { title: 'Sports Clubs',         body: 'Cricket, football, kabaddi, basketball, badminton, athletics.', href: '/campus/sports' },
        ],
      },
      {
        kind: 'button-group',
        items: [
          { label: 'Explore Sports →',   href: '/campus/sports' },
          { label: 'Hostel info →',      href: '/campus/hostels',   variant: 'outline' },
          { label: 'Plan your route →',  href: '/campus/transport', variant: 'outline' },
          { label: 'Student Clubs →',    href: '/campus/clubs',     variant: 'outline' },
        ],
      },
    ],
  },
};

export function getInfoPage(slug: string): InfoPage | undefined {
  return INFO_PAGES[slug];
}
