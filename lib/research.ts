// Research site map and shared content.
// Pages render through the shared block system (see components/InfoPageRenderer)
// so the Research section matches the editorial design language used across the site.

import type { InfoBlock } from '@/lib/info-pages';

export const RESEARCH_NAV = [
  { slug: '',                   label: 'Overview' },
  { slug: 'centers',            label: 'Research Centres' },
  { slug: 'sponsored-projects', label: 'Sponsored Projects' },
  { slug: 'scholars',           label: 'Research Scholars' },
  { slug: 'doctoral-faculty',   label: 'Doctoral Faculty' },
  { slug: 'ipfc',               label: 'IPFC Centre' },
  { slug: 'publications',       label: 'Publications' },
  { slug: 'patents',            label: 'Patents (IPRs)' },
  { slug: 'consultancy',        label: 'Consultancy' },
  { slug: 'entrepreneurship',   label: 'Entrepreneurship' },
  { slug: 'policies',           label: 'Policies & Forms' },
];

export type ResearchPage = {
  title: string;
  italic?: string;
  dek: string;
  blocks: InfoBlock[];
};


/* ──────────────────────────── SUB-PAGES ─────────────────────────── */

export const RESEARCH_PAGES: Record<string, ResearchPage> = {
  /* ── Research Centres ── */
  centers: {
    title: 'Research', italic: 'Centres',
    dek: 'Three JNTUH-recognised research centres at MLRIT — in Computer Science, Electronics and Communication, and Mechanical Engineering. Each hosts doctoral scholars, runs sponsored projects, and produces the bulk of the institute’s published research.',
    blocks: [
      { kind: 'heading', eyebrow: 'Centre 01 / CSE', title: 'Computer Science and Engineering', italic: 'Research Centre' },
      {
        kind: 'paragraph',
        text: 'The CSE centre supports doctoral research and sponsored projects in machine learning, data engineering, software engineering, cyber security and cloud computing. Scholars work alongside faculty in the AI/ML lab and the centre’s high-performance compute facility. The centre is JNTUH-recognised, with full-time and part-time research scholars under recognised supervisors.',
      },
      {
        kind: 'chips',
        items: [
          { label: 'Machine Learning' }, { label: 'Data Engineering' }, { label: 'Cyber Security' },
          { label: 'Cloud Computing' }, { label: 'Software Engineering' },
        ],
      },
      { kind: 'heading', eyebrow: 'Centre 02 / ECE', title: 'Electronics and Communication', italic: 'Research Centre' },
      {
        kind: 'paragraph',
        text: 'The ECE centre advances research in VLSI design, embedded and IoT systems, wireless communications and signal processing. Industry-grade EDA tooling — Cadence, Synopsys, Xilinx — supports both teaching and doctoral work. Research scholars contribute to sponsored projects from DST, DRDO, and industry sponsors in the semiconductor and telecom space.',
      },
      {
        kind: 'chips',
        items: [
          { label: 'VLSI Design' }, { label: 'Embedded Systems' }, { label: 'IoT' },
          { label: 'Image Processing' }, { label: 'Wireless Comms' },
        ],
      },
      { kind: 'heading', eyebrow: 'Centre 03 / Mechanical', title: 'Mechanical Engineering', italic: 'Research Centre' },
      {
        kind: 'paragraph',
        text: 'Mechanical Engineering research at MLRIT spans composite materials, thermal and fluid engineering, manufacturing processes, robotics and renewable energy. Hands-on laboratories — including CNC, 3D-printing and materials testing — support both experimental and computational work. The centre collaborates with aerospace and manufacturing partners on applied projects.',
      },
      {
        kind: 'chips',
        items: [
          { label: 'Composite Materials' }, { label: 'Manufacturing' }, { label: 'Thermal and Fluids' },
          { label: 'Robotics' }, { label: 'Renewable Energy' },
        ],
      },
    ],
  },

  /* ── Sponsored Projects ── */
  'sponsored-projects': {
    title: 'Sponsored', italic: 'Projects',
    dek: 'Externally-funded research at MLRIT — supported by national agencies and industry partners. Faculty across departments lead projects from initial proposal through completion and outcome reporting.',
    blocks: [
      {
        kind: 'stat-grid',
        items: [
          { num: '25+',    label: 'Active Projects' },
          { num: '₹3 Cr+', label: 'Total Funding' },
          { num: '8',      label: 'Funding Agencies' },
          { num: '40+',    label: 'Faculty PIs' },
        ],
      },
      { kind: 'heading', eyebrow: 'Ongoing Projects', title: 'Selected projects', italic: 'currently underway.' },
      {
        kind: 'paragraph',
        text: 'A snapshot of funded projects from the three departmental research centres.',
      },
      {
        kind: 'table',
        columns: ['Project Title', 'Principal Investigator', 'Department', 'Sponsor', 'Outlay'],
        rows: [
          ['AI for Crop Disease Detection',          'Dr. R. Kumar',    'CSE',        'DST-SERB',  '₹28 L'],
          ['Low-Power VLSI for IoT Edge',            'Dr. S. Reddy',    'ECE',        'AICTE-RPS', '₹15 L'],
          ['Smart Irrigation with WSN',              'Dr. K. Iyer',     'ECE',        'MSME-IPFC', '₹10 L'],
          ['Wearable Cardiac Monitor',               'Dr. P. Sharma',   'ECE',        'DBT',       '₹22 L'],
          ['Composite Materials for Aerospace',      'Dr. M. Joshi',    'Mechanical', 'DRDO',      '₹35 L'],
          ['Federated Learning for Healthcare',      'Dr. A. Verma',    'CSE',        'Industry',  '₹18 L'],
          ['Energy Harvesting Sensor Nodes',         'Dr. N. Krishnan', 'ECE',        'DST',       '₹14 L'],
          ['Additive Manufacturing of Bio-implants', 'Dr. B. Rao',      'Mechanical', 'DBT',       '₹20 L'],
        ],
      },
      { kind: 'heading', eyebrow: 'Funding Partners', title: 'Where our research', italic: 'grants come from.' },
      {
        kind: 'paragraph',
        text: 'MLRIT faculty have secured grants from a broad mix of central agencies and industry.',
      },
      {
        kind: 'feature-cards',
        items: [
          { icon: 'research',   title: 'DST and SERB',  body: 'Science and Engineering Research Board grants for fundamental and applied research in engineering and sciences.' },
          { icon: 'graduation', title: 'AICTE',         body: 'RPS, MODROBS and AQIS schemes for academic and infrastructure projects.' },
          { icon: 'award',      title: 'DRDO',          body: 'Defence R&D collaborations on materials, embedded systems and signal processing.' },
          { icon: 'innovation', title: 'DBT',           body: 'Department of Biotechnology grants for healthcare, bio-engineering, and bio-implant projects.' },
          { icon: 'building',   title: 'MSME and IPFC', body: 'Ministry of MSME schemes including IPFC operational support and MSME tech-dev funding.' },
          { icon: 'briefcase',  title: 'Industry',      body: 'Sponsored R&D from semiconductor, IT, manufacturing and pharmaceutical partners.' },
        ],
      },
      { kind: 'heading', eyebrow: 'Proposal Support', title: 'Faculty: working on', italic: 'a grant proposal?' },
      {
        kind: 'paragraph',
        text: 'The R&D Cell helps with budgeting, agency selection, formatting and reviewer-style internal review before submission.',
      },
      { kind: 'cta', label: 'Talk to the R&D Cell', href: 'mailto:research@mlrit.ac.in', external: true },
    ],
  },

  /* ── Research Scholars ── */
  scholars: {
    title: 'Research', italic: 'Scholars',
    dek: 'A growing cohort of full-time and part-time Ph.D. scholars at MLRIT — working alongside JNTUH-recognised supervisors and contributing to the institute’s publications, patents, and sponsored projects.',
    blocks: [
      { kind: 'heading', eyebrow: 'About the Cohort', title: 'Doctoral research', italic: 'at MLRIT.' },
      {
        kind: 'paragraph',
        text: 'Scholars enrol under JNTU Hyderabad’s Ph.D. regulations, collaborating with recognised supervisors across six departments: CSE, ECE, Mechanical, Electrical and Electronics, Management Studies, and Humanities and Sciences.',
      },
      {
        kind: 'paragraph',
        text: 'The R&D Cell manages progress via annual seminars, supports thesis submissions, and provides travel grants for scholars to attend international conferences.',
      },
      {
        kind: 'table',
        columns: ['Department', 'Full-Time', 'Part-Time', 'Total', 'Awarded'],
        rows: [
          ['Computer Science and Engineering', '6', '10', '16', '5'],
          ['Electronics and Communication',    '4', '8',  '12', '4'],
          ['Mechanical Engineering',           '3', '5',  '8',  '2'],
          ['Electrical and Electronics',       '1', '3',  '4',  '1'],
          ['Management Studies',               '1', '2',  '3',  '—'],
          ['Humanities and Sciences',          '—', '2',  '2',  '—'],
        ],
        caption: 'Department-wise distribution of registered research scholars.',
      },
      { kind: 'heading', eyebrow: 'Joining as a Scholar', title: 'What it takes', italic: 'to enrol.' },
      {
        kind: 'feature-cards',
        items: [
          { icon: 'graduation', title: 'Eligibility', body: 'M.Tech / M.E. or equivalent with first-class standing; MBA graduates with first-class credentials qualify for management programmes.' },
          { icon: 'check',      title: 'Recognition', body: 'JNTU Hyderabad oversees admissions; supervisors hold JNTUH research guide certification.' },
          { icon: 'award',      title: 'Selection',   body: 'Entrance examination and interview by the affiliating university, plus internal research proposal evaluation.' },
          { icon: 'users',      title: 'Modes',       body: 'Full-time (with research assistantship eligibility) and part-time options available.' },
          { icon: 'growth',     title: 'Duration',    body: 'Typically 3–6 years, including a comprehensive examination, open seminars, and final thesis defence.' },
          { icon: 'book',       title: 'Support',     body: 'Conference travel grants, publication incentives, plus full access to institute laboratories and digital library resources.' },
        ],
      },
    ],
  },

  /* ── Doctoral Faculty ── */
  'doctoral-faculty': {
    title: 'Doctoral', italic: 'Faculty',
    dek: 'JNTU Hyderabad-recognised research supervisors across departments. Use this directory to identify advisors whose specialisations align with your proposed research.',
    blocks: [
      { kind: 'heading', eyebrow: 'CSE', title: 'Computer Science', italic: '& Engineering' },
      {
        kind: 'roster',
        items: [
          { name: 'Dr. R. Kumar',   tag: 'Professor',           detail: 'Machine Learning · Computer Vision · Healthcare AI' },
          { name: 'Dr. A. Verma',   tag: 'Professor',           detail: 'Distributed Systems · Cloud Computing · Federated Learning' },
          { name: 'Dr. S. Murthy',  tag: 'Associate Professor', detail: 'NLP · Information Retrieval · Indic-Language Models' },
          { name: 'Dr. T. Rao',     tag: 'Associate Professor', detail: 'Cyber Security · Blockchain · Privacy-Preserving ML' },
          { name: 'Dr. V. Naidu',   tag: 'Professor',           detail: 'Software Engineering · Empirical SE · Quality Models' },
        ],
      },
      { kind: 'heading', eyebrow: 'ECE', title: 'Electronics &', italic: 'Communication' },
      {
        kind: 'roster',
        items: [
          { name: 'Dr. S. Reddy',    tag: 'Professor',           detail: 'VLSI · Low-Power Design · FPGA · RISC-V' },
          { name: 'Dr. P. Sharma',   tag: 'Professor',           detail: 'Biomedical Signal Processing · Wearable Sensors' },
          { name: 'Dr. N. Krishnan', tag: 'Associate Professor', detail: 'Wireless Communications · 5G · IoT Networks' },
          { name: 'Dr. L. Devi',     tag: 'Associate Professor', detail: 'Image Processing · Medical Imaging · Deep Learning' },
        ],
      },
      { kind: 'heading', eyebrow: 'Mechanical', title: 'Mechanical', italic: 'Engineering' },
      {
        kind: 'roster',
        items: [
          { name: 'Dr. M. Joshi',  tag: 'Professor',           detail: 'Composite Materials · Aerospace Materials' },
          { name: 'Dr. K. Iyer',   tag: 'Professor',           detail: 'Thermal Engineering · Renewable Energy' },
          { name: 'Dr. B. Rao',    tag: 'Associate Professor', detail: 'CAD/CAM · Manufacturing · Additive Manufacturing' },
          { name: 'Dr. C. Prasad', tag: 'Associate Professor', detail: 'Robotics · Mechatronics · Smart Materials' },
        ],
      },
      { kind: 'heading', eyebrow: 'EEE · MBA · H&S', title: 'Other', italic: 'departments' },
      {
        kind: 'roster',
        items: [
          { name: 'Dr. G. Rao',         tag: 'Professor · EEE', detail: 'Power Electronics · Renewable Integration · Smart Grids' },
          { name: 'Dr. N. Iyer',        tag: 'Professor · MBA', detail: 'Marketing Analytics · Consumer Behaviour · HR Analytics' },
          { name: 'Dr. R. Subramanian', tag: 'Professor · H&S', detail: 'Applied Mathematics · Optimisation · Statistics' },
        ],
      },
    ],
  },

  /* ── IPFC Centre ── */
  ipfc: {
    title: 'IPFC', italic: 'Centre',
    dek: 'The Intellectual Property Facilitation Centre at MLRIT — a central facility for IP support established in 2019 through a partnership with India’s Ministry of Micro, Small and Medium Enterprises.',
    blocks: [
      {
        kind: 'stat-grid',
        items: [
          { num: '2019', label: 'Established' },
          { num: '60+',  label: 'Patents Filed' },
          { num: '100+', label: 'Consultations' },
        ],
      },
      {
        kind: 'paragraph',
        text: 'The centre supports the complete intellectual property lifecycle — prior-art search, drafting, filing, prosecution, and commercialisation — for the institute community and the wider MSME ecosystem.',
      },
      { kind: 'heading', eyebrow: 'Who we serve', title: 'Five primary', italic: 'beneficiary groups.' },
      {
        kind: 'feature-cards',
        items: [
          { icon: 'research',       title: 'Faculty & Research Scholars', body: 'Protecting institutional research outputs and patentable inventions.' },
          { icon: 'graduation',     title: 'Students',                    body: 'Converting academic projects into protected, ownable intellectual property.' },
          { icon: 'building',       title: 'MSMEs',                       body: 'Registered micro, small and medium enterprises across Telangana.' },
          { icon: 'entrepreneurship', title: 'Startups',                  body: 'Early-stage ventures securing their core IP from day one.' },
          { icon: 'briefcase',      title: 'External Entrepreneurs',      body: 'Independent inventors, individuals and small businesses.' },
        ],
      },
      { kind: 'heading', eyebrow: 'What we do', title: 'Services across', italic: 'the IP lifecycle.' },
      {
        kind: 'numbered-cards',
        items: [
          { title: 'Prior-Art Searches',     body: 'Novelty verification against Indian and international patent databases.' },
          { title: 'Drafting Support',       body: 'Technical documentation prepared by registered patent attorneys.' },
          { title: 'Filing Assistance',      body: 'Provisional and complete specifications with the Indian Patent Office and PCT.' },
          { title: 'Prosecution & Hearings', body: 'Office-action responses and examiner coordination through to grant.' },
          { title: 'Trademarks & Copyrights', body: 'Filing support for marks, designs, and geographical indications.' },
          { title: 'Awareness Programmes',   body: 'Workshops and educational outreach on intellectual property.' },
        ],
      },
      { kind: 'heading', eyebrow: 'Contact', title: 'Have an invention', italic: 'to protect?' },
      {
        kind: 'paragraph',
        text: 'Write to the IPFC — we respond within three working days.',
      },
      { kind: 'cta', label: 'Email the IPFC', href: 'mailto:ipfc@mlrit.ac.in', external: true },
    ],
  },

  /* ── Publications ── */
  publications: {
    title: 'Research', italic: 'Publications',
    dek: 'Journal and conference publications by MLRIT faculty and research scholars from 2016 onwards. Each year’s consolidated list is available as a downloadable PDF; pick a year below to view.',
    blocks: [
      {
        kind: 'figure',
        src: '/images/research/publications-research.jpeg',
        alt: 'MLRIT research profile infographic showing Scopus publications and citations, h-index progression, Web of Science publications, patents, and funded projects, snapshot as on 16 September 2026.',
        width: 904,
        height: 1280,
      },
      { kind: 'heading', eyebrow: '2025', title: '120+ papers', italic: 'across five departments.' },
      {
        kind: 'cards',
        items: [
          { title: 'Computer Science and Engineering', body: '40+ papers — SCI · Scopus · UGC-CARE indexed.' },
          { title: 'Electronics and Communication',    body: '30+ papers — SCI · Scopus indexed.' },
          { title: 'Mechanical Engineering',           body: '20+ papers — Scopus · UGC-CARE indexed.' },
          { title: 'Electrical and Electronics',       body: '15+ papers — Scopus indexed.' },
          { title: 'MBA / Humanities and Sciences',    body: '15+ papers — UGC-CARE · ABDC indexed.' },
        ],
      },
      { kind: 'heading', eyebrow: 'Year-wise', title: 'Publication counts', italic: 'since 2016.' },
      {
        kind: 'table',
        columns: ['Year', 'Publications'],
        rows: [
          ['2025', '120+ papers'],
          ['2024', '110+ papers'],
          ['2023', '95+ papers'],
          ['2022', '85+ papers'],
          ['2021', '80+ papers'],
          ['2020', '70+ papers'],
          ['2019', '65+ papers'],
          ['2018', '55+ papers'],
          ['2017', '50+ papers'],
          ['2016', '45+ papers'],
        ],
      },
      { kind: 'heading', eyebrow: 'Faculty Note', title: 'Add your', italic: 'publication.' },
      {
        kind: 'paragraph',
        text: 'Faculty should send citations and publication PDFs to research@mlrit.ac.in. Submissions may qualify for the Research Incentive Scheme.',
      },
      { kind: 'cta', label: 'Submit a Publication', href: 'mailto:research@mlrit.ac.in', external: true },
    ],
  },

  /* ── Patents (IPRs) ── */
  patents: {
    title: 'Patents', italic: 'and IPRs',
    dek: 'Patents filed, published and granted to MLRIT faculty and students — supported end-to-end by the institute’s Intellectual Property Facilitation Centre (IPFC).',
    blocks: [
      {
        kind: 'stat-grid',
        items: [
          { num: '60+',  label: 'Patents Filed' },
          { num: '40+',  label: 'Patents Published' },
          { num: '8',    label: 'Patents Granted' },
          { num: '2019', label: 'IPFC Established' },
        ],
      },
      { kind: 'heading', eyebrow: 'Granted', title: 'Recently granted', italic: 'patents.' },
      {
        kind: 'table',
        columns: ['Title', 'Inventors', 'Year', 'Status'],
        rows: [
          ['Smart Irrigation Controller with Soil-Moisture Sensing',        'Dr. R. Kumar et al.',  '2024', 'Granted'],
          ['Low-Power SRAM Cell for IoT Processors',                        'Dr. S. Reddy et al.',  '2024', 'Granted'],
          ['Wearable Cardiac Monitor with On-Device Arrhythmia Detection',  'Dr. P. Sharma et al.', '2023', 'Granted'],
          ['FPGA-based CNN Accelerator for Image Classification',           'Dr. A. Verma et al.',  '2023', 'Granted'],
          ['Composite Material with Improved Thermal Conductivity',         'Dr. K. Iyer et al.',   '2022', 'Granted'],
        ],
      },
      { kind: 'heading', eyebrow: 'Published', title: 'Recently published', italic: 'patents.' },
      {
        kind: 'cards',
        items: [
          { title: 'AI-driven crop-disease diagnosis system',          body: 'CSE Faculty · 2024' },
          { title: 'Edge-AI module for industrial vibration monitoring', body: 'ECE Faculty · 2024' },
          { title: 'RAG-based educational chatbot for vernacular languages', body: 'CSE Faculty · 2024' },
          { title: 'Energy-harvesting wireless sensor node',           body: 'ECE Faculty · 2023' },
          { title: 'Adaptive traffic-signal controller using sensor fusion', body: 'CSE Faculty · 2023' },
          { title: 'Bio-degradable composite for packaging applications', body: 'Mechanical Faculty · 2023' },
        ],
      },
      { kind: 'heading', eyebrow: 'How to file', title: 'The filing process', italic: 'at MLRIT.' },
      {
        kind: 'paragraph',
        text: 'Faculty and students approach the IPFC with an invention disclosure. From there, the centre runs the full process.',
      },
      {
        kind: 'numbered-cards',
        items: [
          { title: 'Disclosure',  body: 'Submit an invention disclosure form to the IPFC for novelty evaluation.' },
          { title: 'Prior Art',   body: 'IPFC conducts patent searches and assesses patentability.' },
          { title: 'Drafting',    body: 'Specifications and claims drafted with empanelled patent attorneys.' },
          { title: 'Filing',      body: 'Provisional or complete specifications filed with the Indian Patent Office.' },
          { title: 'Prosecution', body: 'Examination, office actions and hearings handled with IPFC support.' },
          { title: 'Grant',       body: 'Grant certificate received; commercialisation and licensing explored.' },
        ],
      },
    ],
  },

  /* ── Consultancy ── */
  consultancy: {
    title: 'Industry', italic: 'Consultancy',
    dek: 'MLRIT faculty provide consultancy assignments to industry, MSMEs and government — drawing on technical expertise, laboratory facilities, and applied project experience. All work flows through the R&D Cell under the institute’s Consultancy Policy.',
    blocks: [
      { kind: 'heading', eyebrow: 'Service Categories', title: 'What we can', italic: 'take on.' },
      {
        kind: 'feature-cards',
        items: [
          { icon: 'innovation', title: 'AI and Data Science',  body: 'Custom model development, analytics dashboards, MLOps, and proof-of-concept initiatives.' },
          { icon: 'globe',      title: 'IoT Solutions',        body: 'Sensor design, edge prototyping, gateways, and complete IoT product development.' },
          { icon: 'research',   title: 'VLSI and FPGA',        body: 'RTL design, verification, FPGA prototyping, and physical-design support.' },
          { icon: 'building',   title: 'Materials and Testing', body: 'Material characterisation, composite design, and mechanical testing from MLRIT labs.' },
          { icon: 'check',      title: 'Software and Cloud',   body: 'Application development, cloud architecture, DevOps, and cybersecurity audits.' },
          { icon: 'briefcase',  title: 'Management Studies',   body: 'Market research, organisational studies, and analytics through MBA faculty.' },
        ],
      },
      { kind: 'heading', eyebrow: 'Engagement Process', title: 'How an engagement', italic: 'runs.' },
      {
        kind: 'numbered-cards',
        items: [
          { title: 'Enquiry',   body: 'Client submits a scope description to the R&D Cell.' },
          { title: 'Scoping',   body: 'Faculty lead identified; terms agreed in writing.' },
          { title: 'Agreement', body: 'Consultancy agreement executed with NDA provisions.' },
          { title: 'Execution', body: 'Teams deliver milestones with periodic reviews.' },
          { title: 'Closure',   body: 'Deliverables transferred, IP handled per agreement.' },
        ],
      },
      { kind: 'heading', eyebrow: 'Executive Development', title: 'EDP', italic: 'programmes.' },
      {
        kind: 'table',
        columns: ['Programme', 'Duration', 'Audience', 'Delivery'],
        rows: [
          ['Applied AI for Business',  '40 hours', 'Professionals, Managers',      'Weekend cohort'],
          ['Data Science Bootcamp',    '60 hours', 'Analysts, Engineers',          'Weekend / Online'],
          ['IoT Solution Design',      '30 hours', 'Embedded engineers',           'In-house / Campus'],
          ['VLSI Design Bootcamp',     '80 hours', 'Fresh hires, Chip companies',  'In-house'],
          ['Cyber Security Essentials', '40 hours', 'IT teams, SOC analysts',      'Online / Hybrid'],
          ['Project Management',       '24 hours', 'Engineering managers',         'Weekend'],
        ],
      },
      {
        kind: 'paragraph',
        text: 'Delivery options include in-person weekend cohorts at MLRIT, client-site delivery, online/hybrid sessions via Zoom or Teams, and customised organisational tracks.',
      },
      { kind: 'heading', eyebrow: 'Engage MLRIT', title: 'Start a', italic: 'conversation.' },
      {
        kind: 'paragraph',
        text: 'Submit a one-page brief to the R&D Cell; we respond within two working days with faculty recommendations and next steps.',
      },
      { kind: 'cta', label: 'Email the R&D Cell', href: 'mailto:research@mlrit.ac.in', external: true },
    ],
  },

  /* ── Entrepreneurship ── */
  entrepreneurship: {
    title: 'Innovation &', italic: 'Entrepreneurship',
    dek: 'Translating research, ideas and projects into ventures — through the Innovation Cell, IPFC, and the institute’s Innovation and Entrepreneurship policy.',
    blocks: [
      { kind: 'heading', eyebrow: 'Approach', title: 'From idea', italic: 'to enterprise.' },
      {
        kind: 'paragraph',
        text: 'MLRIT operates an Innovation and Entrepreneurship programme designed to guide startup concepts from initial conception through formal incorporation. The Innovation Cell, IPFC, and R&D Cell collaborate to deliver mentorship, intellectual-property safeguards, laboratory access, and investor connections.',
      },
      {
        kind: 'quote',
        text: 'Every venture that walks out of MLRIT carries IP we helped protect, a mentor we helped find, and a pitch we helped sharpen.',
        attribution: 'MLRIT Innovation Cell',
      },
      { kind: 'heading', eyebrow: 'Support', title: 'What students and faculty', italic: 'can access.' },
      {
        kind: 'feature-cards',
        items: [
          { icon: 'innovation',     title: 'Innovation Cell', body: 'Campus body running ideation bootcamps, design challenges and hackathons throughout the year.' },
          { icon: 'building',       title: 'Incubation',      body: 'Co-working desks, mentorship, and MLRIT laboratory access for early-stage ventures.' },
          { icon: 'ethics',         title: 'IP and Legal',    body: 'IPFC assistance with patents, trademarks, and IP licensing for MLRIT-originated ventures.' },
          { icon: 'growth',         title: 'Seed Funding',    body: 'Pre-seed grants and connections to angel investors and VC funds in the Hyderabad ecosystem.' },
          { icon: 'users',          title: 'Mentor Network',  body: 'Industry CEOs, alumni founders, and senior faculty providing one-on-one mentorship.' },
          { icon: 'star',           title: 'Showcase Events', body: 'Demo days, investor meetings, and innovation expos for MLRIT startup visibility.' },
        ],
      },
      { kind: 'heading', eyebrow: 'Backed by policy', title: 'Innovation and', italic: 'Entrepreneurship Policy.' },
      {
        kind: 'paragraph',
        text: 'The institute’s policy establishes operational guidelines for student and faculty ventures — addressing IP ownership, equity participation in spin-offs, faculty entrepreneur-leave provisions, and facility-usage rules. The complete policy document is available in the Policies and Forms library.',
      },
      { kind: 'cta', label: 'Open the Policy Library', href: '/research/policies' },
    ],
  },

  /* ── Policies and Forms ── */
  policies: {
    title: 'Policies', italic: 'and Forms',
    dek: 'Institutional policies governing research, intellectual property, consultancy, innovation and entrepreneurship at MLRIT, along with downloadable forms. All policy documents are reviewed periodically by the R&D Committee and revised as needed.',
    blocks: [
      { kind: 'heading', eyebrow: 'Policies', title: 'Four approved', italic: 'policies.' },
      {
        kind: 'feature-cards',
        items: [
          { icon: 'ethics',         title: 'IP Policy',                          body: 'Ownership, inventor share, institute share, and procedures for patent filing, licensing and commercialisation.' },
          { icon: 'research',       title: 'R&D Policy',                         body: 'The institute’s commitment to research, structure of the R&D Cell, and incentives for faculty researchers.' },
          { icon: 'briefcase',      title: 'Consultancy Policy',                 body: 'How faculty undertake consultancy — revenue sharing, NDAs, and use of institute facilities.' },
          { icon: 'entrepreneurship', title: 'Innovation & Entrepreneurship Policy', body: 'Framework for student and faculty ventures — incubation, equity, leave provisions, incentives.' },
        ],
      },
      { kind: 'heading', eyebrow: 'Forms', title: 'Downloadable', italic: 'forms.' },
      {
        kind: 'bullets',
        items: [
          'Publication Incentive Form',
          'Patent Filing Form',
          'Sponsored Project Proposal Form',
          'Consultancy Agreement Template',
          'Patent Incentive Claim Form',
          'Travel Support — Conference Form',
          'Research Incentive Scheme',
        ],
      },
      { kind: 'heading', eyebrow: 'Research Incentive Scheme', title: 'Rewards for', italic: 'research outputs.' },
      {
        kind: 'paragraph',
        text: 'The scheme rewards permanent faculty across departments for verified research outputs, administered through the R&D Committee.',
      },
      {
        kind: 'table',
        columns: ['Publication', 'Reward'],
        rows: [
          ['Journal — Q1 (SCI/SCIE)',          '₹25,000'],
          ['Journal — Q2 (SCI/SCIE)',          '₹15,000'],
          ['Journal — Q3/Q4 (SCI/SCIE)',       '₹10,000'],
          ['Journal — Scopus / UGC-CARE',      '₹5,000'],
          ['Conference — IEEE/Springer/Scopus', '₹3,000'],
          ['Book / Chapter — reputed publisher', '₹10,000'],
        ],
        caption: 'Publication awards.',
      },
      {
        kind: 'table',
        columns: ['Patent', 'Reward'],
        rows: [
          ['Filed (India)',          '₹5,000'],
          ['Published',              '₹10,000'],
          ['Granted (India)',        '₹50,000'],
          ['Granted (International)', '₹1,00,000'],
          ['Commercialised',         'Royalty share per IP Policy'],
        ],
        caption: 'Patent awards.',
      },
      {
        kind: 'table',
        columns: ['Sponsored Project', 'Reward'],
        rows: [
          ['Up to ₹10 lakhs',     '₹15,000 institute reward + 5% overhead'],
          ['₹10 – 25 lakhs',      '₹30,000 + 7% overhead'],
          ['Above ₹25 lakhs',     '₹50,000 + 10% overhead'],
          ['Industry Consultancy', 'Per Consultancy Policy share'],
        ],
        caption: 'Sponsored-project and consultancy rewards.',
      },
      { kind: 'heading', eyebrow: 'Support', title: 'Who to', italic: 'write to.' },
      {
        kind: 'chips',
        items: [
          { label: 'R&D Cell',        sub: 'research@mlrit.ac.in' },
          { label: 'IPFC',            sub: 'ipfc@mlrit.ac.in' },
          { label: 'Innovation Cell', sub: 'innovation@mlrit.ac.in' },
        ],
      },
    ],
  },
};
