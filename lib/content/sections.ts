import { CIRCULAR_CATEGORIES, DEFAULT_CIRCULARS } from './circulars-data';

/**
 * Every CMS-editable section, keyed by `${page}/${section}` — the same pair
 * used for the content_blocks lookup and the /admin/[page]/[section] route.
 *
 * Adding an entry here is all that is needed to give a section an admin editor;
 * the write API reads this to know which fields are required.
 */
export const CONTENT_SECTIONS = {
  'home/hero': {
    label: 'Homepage — Hero',
    liveDraft: true,
    fields: [
      { name: 'headlineLead', label: 'Headline lead', defaultValue: "Engineering" },
      { name: 'headlineAccent', label: 'Headline accent', defaultValue: "the Future." },
      { name: 'body', label: 'Body', multiline: true, defaultValue: "Two decades of shaping minds. 11,000+ engineers and counting. At MLRIT, we don't just teach the future — we build it." },
      // One upload drives both the inline preview and the lightbox — they are
      // the same film, and letting them diverge would be a bug, not a feature.
      { name: 'film', label: 'Hero film', type: 'video' },
      { name: 'poster', label: 'Hero still image', type: 'image' },
    ],
  },
  // Counters under the hero. Mirrors the STATS array in components/sections/Stats.tsx;
  // an empty repeater leaves that array in charge.
  'home/stats': {
    label: 'Homepage — Stat counters',
    liveDraft: true,
    fields: [
      {
        name: 'stats',
        label: 'Counters',
        type: 'repeater',
        itemFields: [
          { name: 'target', label: 'Number', type: 'number' },
          { name: 'suffix', label: 'Suffix' },
          { name: 'label', label: 'Label' },
          { name: 'caption', label: 'Caption (above)' },
          { name: 'footnote', label: 'Footnote (below)' },
        ],
        defaultItems: [
          {
            id: 'years',
            target: 20,
            suffix: '+',
            label: 'Years of Excellence',
            caption: 'Est \u00b7 2005',
            footnote: 'Autonomous under UGC since 2015',
          },
          {
            id: 'students',
            target: 11,
            suffix: 'K+',
            label: 'Students Enrolled',
            caption: 'UG \u00b7 PG \u00b7 Research',
            footnote: 'Across 8 engineering programmes',
          },
          {
            id: 'placement-rate',
            target: 98,
            suffix: '%',
            label: 'Placement Rate',
            caption: 'Batch of 2025',
            footnote: 'Verified \u00b7 Placement Cell records',
          },
          {
            id: 'recruiters',
            target: 200,
            suffix: '+',
            label: 'Recruiting Companies',
            caption: 'Incl. IIT / IIM / NIT hirers',
            footnote: 'Fortune 500 \u00b7 Startups \u00b7 MNCs',
          },
        ],
      },
    ],
  },
  'home/achievements': {
    label: 'Homepage — Accreditations',
    liveDraft: true,
    fields: [
      { name: 'headlineLead', label: 'Headline lead', defaultValue: "Accreditations" },
      { name: 'headlineAccent', label: 'Headline accent', defaultValue: "and Approvals." },
      { name: 'body', label: 'Body', multiline: true, defaultValue: "AICTE, NAAC, NBA, ARIIA and more — MLRIT is recognised by every leading national body for academic excellence, programme quality and innovation." },
      // defaultItems mirror the component's bundled logos so the editor opens
      // with the live set already listed and editable. No cap: the redesign
      // renders these in a marquee, which takes any number.
      {
        name: 'logos',
        label: 'Accreditation logos',
        type: 'gallery',
        itemFields: ['name'],
        defaultItems: [
          { id: 'naac', name: 'NAAC', key: '/legacy/nirf/naac.svg' },
          { id: 'aicte', name: 'AICTE', key: '/legacy/nirf/aicte.svg' },
          { id: 'the-week', name: 'The Week', key: '/legacy/nirf/the%20week.svg' },
          { id: 'ariia', name: 'ARIIA', key: '/legacy/nirf/arha.svg' },
          { id: 'nba', name: 'NBA', key: '/legacy/nirf/nba.svg' },
          { id: 'dataquest', name: 'Dataquest', key: '/legacy/nirf/dataquest.svg' },
          { id: 'gyaan-vigyan', name: 'Gyaan Vigyan', key: '/legacy/nirf/gyaanvigyan.svg' },
        ],
      },
      // Rank cards down the left column. `tint` is the accent colour used for
      // the number, the left rule and the hover index — any CSS colour.
      {
        name: 'ranks',
        label: 'Rank cards',
        type: 'repeater',
        itemFields: [
          { name: 'num', label: 'Figure' },
          { name: 'title', label: 'Title' },
          { name: 'sub', label: 'Subtitle' },
          { name: 'tint', label: 'Accent colour' },
        ],
        defaultItems: [
          {
            id: 'nirf',
            num: '201',
            title: 'NIRF Rankings 2024',
            sub: '201\u2013300 Band \u00b7 Engineering Category',
            tint: '#e85d04',
          },
          {
            id: 'times',
            num: '#6',
            title: 'Times Engineering Survey',
            sub: '6th in Telangana',
            tint: '#1F6B24',
          },
          {
            id: 'careers360',
            num: 'AAAA',
            title: 'Careers360 Rating',
            sub: 'Four-A Accredited Institution',
            tint: '#c26a2b',
          },
        ],
      },
    ],
  },
  'home/programs': {
    label: 'Homepage — Programmes',
    liveDraft: true,
    fields: [
      { name: 'headlineLead', label: 'Headline lead', defaultValue: "Find the programme" },
      { name: 'headlineAccent', label: 'Headline accent', defaultValue: "built for you." },
      { name: 'body', label: 'Body', multiline: true, defaultValue: "Scroll through every UG and PG programme — each card stacks into view, revealing the next." },
      // Two lists, one per tab. `accent` is a plain string rather than an enum
      // input: the component already narrows anything unrecognised to orange,
      // so a typo degrades to the default instead of breaking the card.
      {
        name: 'ug',
        label: 'Undergraduate cards',
        type: 'repeater',
        itemFields: [
          { name: 'slug', label: 'Slug (link target)' },
          { name: 'dept', label: 'Dept code' },
          { name: 'name', label: 'Programme name' },
          { name: 'meta', label: 'Meta line' },
          { name: 'desc', label: 'Description' },
          { name: 'accent', label: 'Accent (green / orange / navy)' },
        ],
        defaultItems: [
          {
            id: "cse",
            slug: "cse",
            dept: "CSE",
            name: "Computer Science & Engineering",
            meta: "B.Tech · 4 Years · 240 seats",
            desc: "Industry-aligned curriculum across AI/ML, systems, web and cybersecurity.",
            accent: "green",
          },
          {
            id: "aiml",
            slug: "aiml",
            dept: "AIML",
            name: "AI & Machine Learning",
            meta: "B.Tech · 4 Years",
            desc: "Foundational ML, deep learning and applied AI research on dedicated GPU hardware.",
            accent: "orange",
          },
          {
            id: "cse-ds",
            slug: "cse-ds",
            dept: "CSE-DS",
            name: "CSE — Data Science",
            meta: "B.Tech · 4 Years",
            desc: "Statistics, ML, deep learning, big-data and visualisation with industry capstones.",
            accent: "orange",
          },
          {
            id: "ece",
            slug: "ece",
            dept: "ECE",
            name: "Electronics & Communication",
            meta: "B.Tech · 4 Years",
            desc: "VLSI, embedded systems, signal processing and RF — anchored in industry projects.",
            accent: "orange",
          },
          {
            id: "eee",
            slug: "eee",
            dept: "EEE",
            name: "Electrical & Electronics",
            meta: "B.Tech · 4 Years",
            desc: "Power systems, electronics, control and renewable-energy engineering.",
            accent: "green",
          },
          {
            id: "mechanical",
            slug: "mechanical",
            dept: "MECH",
            name: "Mechanical Engineering",
            meta: "B.Tech · 4 Years",
            desc: "CAD/CAM, thermal sciences and manufacturing with industry-grade workshops.",
            accent: "navy",
          },
          {
            id: "aeronautical",
            slug: "aeronautical",
            dept: "AERO",
            name: "Aeronautical Engineering",
            meta: "B.Tech · 4 Years",
            desc: "Aerodynamics, propulsion and UAV design — active drone research lab.",
            accent: "orange",
          },
        ],
      },
      {
        name: 'pg',
        label: 'Postgraduate cards',
        type: 'repeater',
        itemFields: [
          { name: 'slug', label: 'Slug (link target)' },
          { name: 'dept', label: 'Dept code' },
          { name: 'name', label: 'Programme name' },
          { name: 'meta', label: 'Meta line' },
          { name: 'desc', label: 'Description' },
          { name: 'accent', label: 'Accent (green / orange / navy)' },
        ],
        defaultItems: [
          {
            id: "mba",
            slug: "mba",
            dept: "MBA",
            name: "Master of Business Administration",
            meta: "MBA · 2 Years · 120 seats",
            desc: "Dual-specialisation curriculum across Marketing, Finance, HR, Operations and Analytics.",
            accent: "green",
          },
          {
            id: "mtech-cse",
            slug: "mtech-cse",
            dept: "M.Tech-CSE",
            name: "M.Tech in Computer Science",
            meta: "M.Tech · 2 Years",
            desc: "AI/ML and systems specialisations with active research-led project work.",
            accent: "orange",
          },
          {
            id: "mtech-vlsi",
            slug: "mtech-vlsi",
            dept: "M.Tech-VLSI",
            name: "M.Tech in VLSI System Design",
            meta: "M.Tech · 2 Years",
            desc: "Front-end and back-end VLSI design tracks anchored in FPGA labs.",
            accent: "navy",
          },
          {
            id: "mtech-ps",
            slug: "mtech-ps",
            dept: "M.Tech-PS",
            name: "M.Tech in Power Systems",
            meta: "M.Tech · 2 Years",
            desc: "Smart grid, renewables, protection — industry-led project scope.",
            accent: "orange",
          },
          {
            id: "mtech-aero",
            slug: "mtech-aero",
            dept: "M.Tech-AERO",
            name: "M.Tech in Aerospace Propulsion",
            meta: "M.Tech · 2 Years",
            desc: "Propulsion, materials and unmanned-systems research with industry MoUs.",
            accent: "green",
          },
          {
            id: "phd",
            slug: "phd",
            dept: "Ph.D",
            name: "Doctoral programmes",
            meta: "Ph.D · 5 disciplines",
            desc: "JNTUH-recognised research centres in CSE, ECE, MECH, EEE and MBA.",
            accent: "navy",
          },
        ],
      },
    ],
  },
  'home/why-mlrit': {
    label: 'Homepage — Why MLRIT',
    liveDraft: true,
    fields: [
      { name: 'headlineLead', label: 'Headline line 1', defaultValue: "Industry." },
      { name: 'headlineAccent', label: 'Headline line 2 (gradient)', defaultValue: "Integrated." },
      { name: 'headlineTail', label: 'Headline line 3 (italic)', defaultValue: "Blended with sport." },
      { name: 'body', label: 'Body', multiline: true, defaultValue: "An integrated curriculum that gives equal weight to academics, employable skills, and sport." },
      {
        name: 'footnote',
        label: 'Founding note (**bold** supported)',
        multiline: true,
        defaultValue: "Founded in **2005** by the KMR Education Trust, headed by **Mr. Marri Laxman Reddy**. Located in Dundigal, Hyderabad. Affiliated to JNTUH. Granted autonomous status by the UGC in 2015.",
      },
      { name: 'video', label: 'Portrait video', type: 'video' },
    ],
  },

  'home/success-stories': {
    label: 'Homepage — Success stories',
    liveDraft: true,
    fields: [
      { name: 'eyebrow', label: 'Eyebrow', defaultValue: "Wall of Achievements" },
      { name: 'headingLead', label: 'Heading line 1', defaultValue: "Building Real Careers," },
      { name: 'headingAccent', label: 'Heading line 2', defaultValue: "Not Just Degrees." },
      { name: 'body', label: 'Body', multiline: true, defaultValue: "Real placements, real achievements — MLRIT students on the biggest campus stages and the country's top recruiters." },
      {
        name: 'cards',
        label: 'Cards',
        type: 'gallery',
        itemFields: [
          { name: 'season', label: 'Season / tag' },
          { name: 'name', label: 'Name' },
          { name: 'detail', label: 'Detail' },
        ],
        defaultItems: [
          {
            id: 'microsoft',
            key: 'https://i.ibb.co/MxvbKjRH/8.jpg',
            season: 'Placement \u00b7 2026',
            name: 'Microsoft \u2014 51 LPA',
            detail: 'Sai Loukhya & Sailatha \u00b7 CSE',
          },
          {
            id: 'faculty-cert',
            key: 'https://i.ibb.co/670CTVrD/6.png',
            season: 'Faculty \u00b7 Cert',
            name: 'Mrs. Vijay Keerthika',
            detail: 'Wipro TalentNext \u00b7 87 %',
          },
          {
            id: 'football',
            key: 'https://i.ibb.co/99JB52L2/4.jpg',
            season: 'Sports \u00b7 1st Place',
            name: 'MLRIT Football',
            detail: "vs. St. Peter's \u00b7 March 21\u201322",
          },
        ],
      },
    ],
  },

  'home/testimonials': {
    label: 'Homepage \u2014 Alumni voices',
    liveDraft: true,
    fields: [
      { name: 'eyebrow', label: 'Eyebrow', defaultValue: "Alumni Voices" },
      { name: 'headingLead', label: 'Heading lead', defaultValue: "What Our" },
      { name: 'headingAccent', label: 'Heading accent', defaultValue: "Graduates Say." },
      { name: 'body', label: 'Body', multiline: true, defaultValue: "Five MLRIT alumni — five different paths, one shared starting line." },
      {
        name: 'people',
        label: 'Alumni clips',
        type: 'gallery',
        // The item's primary upload is the clip itself, not a thumbnail.
        accept: 'video',
        itemFields: [
          { name: 'name', label: 'Name' },
          { name: 'title', label: 'Title / batch' },
          { name: 'description', label: 'Quote' },
        ],
        defaultItems: [
          {
            id: 'sathvika',
            key: '/videos/av1.mp4',
            name: 'Sathvika',
            title: 'CSIT \u00b7 MLRIT \u00b7 B.Tech CSE 2023',
            description:
              'MLRIT was where I learned to think like an engineer \u2014 not just to code.',
          },
          {
            id: 'pranay',
            key: '/videos/av2.mp4',
            name: 'Dasam Pranay',
            title: 'Aeronautical Engineering \u00b7 B.Tech AE 2023',
            description:
              'The aeronautical block at MLRIT is more than labs and lecture halls.',
          },
          {
            id: 'pavani',
            key: '/videos/av3.mp4',
            name: 'Gopi Pavani',
            title: 'Aerospace Engineer \u00b7 Safran \u00b7 B.Tech AE 2022',
            description:
              'MLRIT gave me the tools and confidence to walk into Safran from day one.',
          },
        ],
      },
    ],
  },

  'home/events': {
    label: 'Homepage \u2014 Events',
    liveDraft: true,
    fields: [
      {
        name: 'slides',
        label: 'Event slides',
        type: 'gallery',
        // Primary upload is the clip; the logo and poster are their own
        // columns, because one slide legitimately carries three files.
        accept: 'video',
        itemFields: [
          { name: 'title', label: 'Title' },
          { name: 'tag', label: 'Tag' },
          { name: 'desc', label: 'Description' },
          { name: 'quote', label: 'Quote' },
          { name: 'speaker', label: 'Speaker' },
          { name: 'speakerRole', label: 'Speaker role' },
          { name: 'logo', label: 'Logo', type: 'image' },
          { name: 'poster', label: 'Poster', type: 'image' },
        ],
        defaultItems: [
          {
            id: 'equinox',
            key: "/videos/equinox.mp4",
            title: "The Equinox E-Summit 2K24",
            tag: "Entrepreneurship · 2024",
            desc: "Equinox E-Summit is MLRIT's annual entrepreneurship summit — live startup pitches, investor panels, product showcases and workshops run by founders. Students pitch real ideas to real investors, on campus.",
            quote: "Live pitches. Real investors. Zero rehearsal. Equinox is where student ideas meet the people who fund them.",
            speaker: "Equinox E-Summit",
            speakerRole: "Annual · MLRIT Campus",
            logo: "/assets/logo.svg",
            poster: "/images/events/SBS_0711.JPG",
          },
          {
            id: 'zignasa',
            key: "/videos/zignasa.mp4",
            title: "Zignasa 2025",
            tag: "Tech · Cultural · 2025",
            desc: "Zignasa is MLRIT's inter-departmental fest — hackathons, robotics arenas, coding contests, music, dance and film screenings running simultaneously. Every department competes. Every stage is open.",
            quote: "Every department on stage. Zignasa is the event that turns the whole campus into one team.",
            speaker: "Zignasa",
            speakerRole: "Annual Fest · MLRIT",
            logo: "/assets/zignasa-logo.png",
            poster: "/images/events/SBS_0750.JPG",
          },
          {
            id: 'zenith',
            key: "/videos/zenith.mp4",
            title: "Zenith 2K25",
            tag: "National Tech Fest · 2025",
            desc: "Zenith is MLRIT's national-level technical festival — colleges from across India compete in robotics, circuit design, coding sprints and product challenges. Open registrations, multi-college participation.",
            quote: "National-level. Multi-college. Engineering at full intensity — Zenith is where MLRIT competes with the country.",
            speaker: "Zenith",
            speakerRole: "National Tech Fest · MLRIT",
            logo: "/assets/logo.svg",
            poster: "/images/events/SBS_0998.JPG",
          },
          {
            id: 'navrat-naveli',
            key: "/videos/came.mp4",
            title: "Navrat Naveli 2025",
            tag: "Cultural · Dussehra · 2025",
            desc: "Navrat Naveli is MLRIT's Dussehra cultural event — classical and folk performances, garba, rangoli, traditional food and student-led celebrations marking the spirit of the festival across the campus.",
            quote: "Music, dance, colour and tradition — Navrat Naveli is how MLRIT celebrates Dussehra together.",
            speaker: "Navrat Naveli",
            speakerRole: "Cultural Fest · MLRIT",
            logo: "/assets/logo.svg",
            poster: "/images/campus/SBS_1131.JPG",
          },
        ],
      },
    ],
  },

  // Counters in the dark placements band. Mirrors the STATS array in
  // components/sections/Placements.tsx. Separate from home/stats: different
  // numbers, different component, edited independently.
  'home/placements': {
    label: 'Homepage — Placement counters',
    liveDraft: true,
    fields: [
      // The headline figure above the grid — it counts up, so it is a number
      // with its unit beside it rather than one preformatted string.
      { name: 'highest', label: 'Headline figure', defaultValue: '44' },
      { name: 'highestUnit', label: 'Headline unit', defaultValue: 'LPA' },
      {
        name: 'stats',
        label: 'Counters',
        type: 'repeater',
        // `value` is free text, not number + suffix: the redesign prints
        // '5,000+' and '18 LPA' verbatim, so splitting them would make the
        // editor encode formatting it cannot see in the preview.
        itemFields: [
          { name: 'value', label: 'Value' },
          { name: 'label', label: 'Label' },
          { name: 'note', label: 'Note' },
        ],
        defaultItems: [
          { id: 'placed', value: '5,000+', label: 'Students Placed', note: 'in Top MNCs since 2005' },
          {
            id: 'recruiters',
            value: '200+',
            label: 'Recruiters on Campus',
            note: 'incl. IIT / IIM / NIT hirers',
          },
          {
            id: 'average',
            value: '18 LPA',
            label: 'Average \u00b7 Top Quartile',
            note: 'Placed batch of 2025',
          },
          {
            id: 'rate',
            value: '98 %',
            label: 'Placement Rate',
            note: 'Batch of 2025 \u00b7 Verified',
          },
        ],
      },
    ],
  },

  'placements/track-record': {
    label: 'Placements — Year-wise record',
    previewPath: '/placements/statistics',
    fields: [
      { name: 'years', label: 'Years', type: 'repeater',
        itemFields: [
          { name: 'year', label: 'Year' },
          { name: 'academicYear', label: 'Academic year' },
          { name: 'jobOffers', label: 'Job offers', type: 'number' },
          { name: 'companiesVisited', label: 'Companies visited', type: 'number' },
          { name: 'highestPackageLpa', label: 'Highest package (LPA)', type: 'number' },
          { name: 'provisional', label: 'Provisional (yes / blank)' },
        ],
        defaultItems: [
          { id: "2026", year: "2026", academicYear: "2025–26", jobOffers: "621", companiesVisited: "37", highestPackageLpa: "51", provisional: "" },
          { id: "2025", year: "2025", academicYear: "2024–25", jobOffers: "536", companiesVisited: "62", highestPackageLpa: "33", provisional: "" },
          { id: "2024", year: "2024", academicYear: "2023–24", jobOffers: "674", companiesVisited: "55", highestPackageLpa: "28.5", provisional: "" },
          { id: "2023", year: "2023", academicYear: "2022–23", jobOffers: "734", companiesVisited: "32", highestPackageLpa: "58", provisional: "" },
          { id: "2022", year: "2022", academicYear: "2021–22", jobOffers: "1236", companiesVisited: "42", highestPackageLpa: "25", provisional: "" },
          { id: "2021", year: "2021", academicYear: "2020–21", jobOffers: "740", companiesVisited: "49", highestPackageLpa: "18.1", provisional: "" },
        ] },
      { name: 'companies', label: 'Company rows', type: 'repeater',
        groupByColumn: 'year',
        // Flat, with `year` naming the table each row belongs to — grouped on
        // read, the same way the footer rebuilds its columns. A repeater row
        // cannot hold a nested list, and asking an editor to manage two levels
        // to add one company would be worse than regrouping here.
        //
        // Adding a year: add a row above, then company rows carrying that year.
        itemFields: [
          { name: 'year', label: 'Year' },
          { name: 'company', label: 'Company' },
          { name: 'role', label: 'Role' },
          { name: 'salaryDisplay', label: 'Package' },
          { name: 'selected', label: 'Selected (number, or in-progress)' },
        ],
        defaultItems: [
          { id: "2026-microsoft", year: "2026", company: "Microsoft", role: "Software Engineer Intern", salaryDisplay: "₹51 LPA", selected: "2" },
          { id: "2026-scaler", year: "2026", company: "Scaler", role: "AWS DevOps Associate Intern", salaryDisplay: "₹48 LPA", selected: "1" },
          { id: "2026-vivnovation", year: "2026", company: "Vivnovation", role: "Trainee Engineer", salaryDisplay: "₹20 LPA", selected: "1" },
          { id: "2026-dbs", year: "2026", company: "DBS Tech", role: "Apprenticeship", salaryDisplay: "₹12 LPA", selected: "3" },
          { id: "2026-realpage", year: "2026", company: "Realpage", role: "Software Engineer Intern", salaryDisplay: "₹10 LPA", selected: "10" },
          { id: "2026-tcs", year: "2026", company: "Tata Consultancy Services", role: "Ninja / Digital", salaryDisplay: "₹3.46 – 9.07 LPA", selected: "101" },
          { id: "2026-cognizant", year: "2026", company: "Cognizant", role: "GenC Next / GenC Pro / GenC", salaryDisplay: "₹4 – 6.75 LPA", selected: "107" },
          { id: "2026-hcl", year: "2026", company: "HCL Tech", role: "Graduate Engineer Trainee", salaryDisplay: "₹4.5 LPA", selected: "83" },
          { id: "2026-infosys", year: "2026", company: "Infosys", role: "Systems Engineer", salaryDisplay: "₹3.6 LPA", selected: "92" },
          { id: "2026-virtusa", year: "2026", company: "Virtusa", role: "Software Engineer", salaryDisplay: "₹5 – 6.5 LPA", selected: "41" },
          { id: "2025-servicenow", year: "2025", company: "ServiceNow", role: "Associate Software QA Engineer", salaryDisplay: "₹33 LPA", selected: "1" },
          { id: "2025-bigworks", year: "2025", company: "BigWorks", role: "Software Engineer", salaryDisplay: "₹26 LPA", selected: "3" },
          { id: "2025-inovalon", year: "2025", company: "Inovalon", role: "Software Engineer", salaryDisplay: "₹25 LPA", selected: "3" },
          { id: "2025-cognizant", year: "2025", company: "Cognizant", role: "GenC", salaryDisplay: "₹4 LPA", selected: "154" },
          { id: "2025-infosys", year: "2025", company: "Infosys", role: "Systems Engineer", salaryDisplay: "₹3.6 – 9 LPA", selected: "42" },
          { id: "2025-globallogic", year: "2025", company: "GlobalLogic", role: "Associate Analyst", salaryDisplay: "₹2.55 LPA", selected: "38" },
          { id: "2025-hcl", year: "2025", company: "HCL Tech", role: "Graduate Engineer Trainee", salaryDisplay: "₹4.25 LPA", selected: "27" },
          { id: "2025-techmahindra", year: "2025", company: "Tech Mahindra", role: "Associate Process Engineer", salaryDisplay: "₹5.5 LPA", selected: "17" },
          { id: "2025-ust", year: "2025", company: "UST", role: "Software Engineer", salaryDisplay: "₹4.25 LPA", selected: "17" },
          { id: "2025-tcs", year: "2025", company: "TCS", role: "Ninja / Digital / Prime", salaryDisplay: "₹3.36 – 9 LPA", selected: "in-progress" },
          { id: "2024-accelerize", year: "2024", company: "Accelerize 360", role: "Software Developer", salaryDisplay: "₹12 LPA", selected: "1" },
          { id: "2024-accenture", year: "2024", company: "Accenture", role: "Associate Software Engineer", salaryDisplay: "₹4.53 LPA", selected: "95" },
          { id: "2024-capgemini", year: "2024", company: "Capgemini", role: "Software Engineer", salaryDisplay: "₹4.25 – 5.75 LPA", selected: "91" },
          { id: "2024-techmahindra", year: "2024", company: "Tech Mahindra", role: "Associate Process Executive", salaryDisplay: "₹3.25 LPA", selected: "65" },
          { id: "2024-globallogic", year: "2024", company: "GlobalLogic", role: "Associate Analyst", salaryDisplay: "₹2.23 LPA", selected: "54" },
          { id: "2024-tcs", year: "2024", company: "Tata Consultancy Services", role: "Digital & Prime", salaryDisplay: "₹7 – 9 LPA", selected: "11" },
          { id: "2024-eidiko", year: "2024", company: "Eidiko Systems", role: "Trainee Software Engineer", salaryDisplay: "₹4.7 LPA", selected: "21" },
          { id: "2024-peopletech", year: "2024", company: "PeopleTech", role: "Junior Software Engineer", salaryDisplay: "₹3.3 LPA", selected: "38" },
          { id: "2024-astramwp", year: "2024", company: "AstraMWP", role: "Trainee", salaryDisplay: "₹2.34 LPA", selected: "35" },
          { id: "2024-eis", year: "2024", company: "Engineering Inspection Services", role: "Graduate Engineer Trainee", salaryDisplay: "₹2.64 LPA", selected: "36" },
          { id: "2023-paloalto", year: "2023", company: "Palo Alto Networks", role: "Software Engineer", salaryDisplay: "₹58 LPA", selected: "3" },
          { id: "2023-cisco", year: "2023", company: "Cisco Systems", role: "Software Engineer", salaryDisplay: "₹22.59 LPA", selected: "1" },
          { id: "2023-experian", year: "2023", company: "Experian Services", role: "Automation Test Engineer", salaryDisplay: "₹15.5 LPA", selected: "4" },
          { id: "2023-epam", year: "2023", company: "EPAM Systems", role: "Junior Software Engineer", salaryDisplay: "₹12 LPA", selected: "19" },
          { id: "2023-virtusa", year: "2023", company: "Virtusa Corporation", role: "Power Developer / Developer", salaryDisplay: "₹5.5 – 7 LPA", selected: "180" },
          { id: "2023-dxc", year: "2023", company: "DXC Technology", role: "Associate Professional", salaryDisplay: "₹4.2 LPA", selected: "179" },
          { id: "2023-accenture", year: "2023", company: "Accenture", role: "Associate Software Engineer", salaryDisplay: "₹4.5 LPA", selected: "66" },
          { id: "2023-skolar", year: "2023", company: "Skolar", role: "Business Development Trainee", salaryDisplay: "₹6 LPA", selected: "52" },
          { id: "2023-cybage", year: "2023", company: "Cybage Software", role: "Development Engineer", salaryDisplay: "₹4.5 LPA", selected: "30" },
          { id: "2023-alten", year: "2023", company: "Alten India", role: "Graduate Engineer Trainee", salaryDisplay: "₹3.5 LPA", selected: "31" },
          { id: "2022-amazon", year: "2022", company: "Amazon", role: "Software Development Engineer", salaryDisplay: "₹25 LPA", selected: "3" },
          { id: "2022-walmart", year: "2022", company: "Walmart Global Tech", role: "Software Engineer", salaryDisplay: "₹24 LPA", selected: "3" },
          { id: "2022-wipro", year: "2022", company: "Wipro Limited", role: "Project Engineer", salaryDisplay: "₹3.75 – 6.5 LPA", selected: "251" },
          { id: "2022-accenture", year: "2022", company: "Accenture", role: "Advanced / Associate Software Eng", salaryDisplay: "₹4.5 – 6.5 LPA", selected: "213" },
          { id: "2022-tcs", year: "2022", company: "Tata Consultancy Services", role: "Ninja / Digital", salaryDisplay: "₹3.37 – 7 LPA", selected: "128" },
          { id: "2022-capgemini", year: "2022", company: "Capgemini", role: "Analyst / Senior Analyst", salaryDisplay: "₹4 – 7.5 LPA", selected: "159" },
          { id: "2022-virtusa", year: "2022", company: "Virtusa Corporation", role: "Developer / Power Developer", salaryDisplay: "₹5.5 – 6.5 LPA", selected: "112" },
          { id: "2022-hcl", year: "2022", company: "HCL Technologies", role: "Graduate Engineer Trainee", salaryDisplay: "₹4.25 LPA", selected: "44" },
          { id: "2022-epam", year: "2022", company: "EPAM Systems", role: "Junior Software Engineer", salaryDisplay: "₹6 LPA", selected: "20" },
          { id: "2022-infosys", year: "2022", company: "Infosys Limited", role: "Specialist Programmer / Software Eng", salaryDisplay: "₹3.6 – 9.5 LPA", selected: "34" },
          { id: "2021-amazon", year: "2021", company: "Amazon", role: "Programmer Analyst / DevOps", salaryDisplay: "₹9.5 – 16 LPA", selected: "4" },
          { id: "2021-lti", year: "2021", company: "Larsen & Toubro Infotech", role: "Infinity Level 1–3", salaryDisplay: "₹3.5 – 10 LPA", selected: "26" },
          { id: "2021-accenture", year: "2021", company: "Accenture", role: "Advanced / Associate Software Eng", salaryDisplay: "₹4.5 – 6.5 LPA", selected: "221" },
          { id: "2021-tcs", year: "2021", company: "Tata Consultancy Services", role: "Ninja / Digital", salaryDisplay: "₹3.37 – 7 LPA", selected: "56" },
          { id: "2021-cognizant", year: "2021", company: "Cognizant Technology Solutions", role: "Programmer Analyst Trainee", salaryDisplay: "₹4.02 LPA", selected: "86" },
          { id: "2021-mindtree", year: "2021", company: "MindTree Limited", role: "Engineer / Junior Engineer", salaryDisplay: "₹3 – 4 LPA", selected: "41" },
          { id: "2021-virtusa", year: "2021", company: "Virtusa Corporation", role: "Associate Engineer", salaryDisplay: "₹4 – 6.5 LPA", selected: "51" },
          { id: "2021-capgemini", year: "2021", company: "Capgemini Technology Services", role: "Analyst", salaryDisplay: "₹3.8 LPA", selected: "55" },
          { id: "2021-hcl", year: "2021", company: "HCL Technologies", role: "Graduate Engineer Trainee", salaryDisplay: "₹3.5 LPA", selected: "24" },
          { id: "2021-optum", year: "2021", company: "Optum Global Solutions", role: "Associate Software Engineer", salaryDisplay: "₹5 LPA", selected: "10" },
        ] },
    ],
  },

  'placements/statistics': {
    label: 'Placements — Statistics',
    previewPath: '/placements/statistics',
    fields: [
      { name: 'navLabel', label: 'Side-nav label', defaultValue: 'Statistics' },
      { name: 'infraEyebrow', label: 'Infrastructure eyebrow', defaultValue: 'Facilities' },
      { name: 'infraHeadingLead', label: 'Infrastructure heading', defaultValue: 'Placement' },
      { name: 'infraHeadingItalic', label: 'Infrastructure heading (italic)', defaultValue: 'infrastructure.' },
      { name: 'infraBody', label: 'Infrastructure intro', multiline: true, defaultValue: "MLRIT maintains a dedicated placement block equipped to host large-scale campus recruitment drives throughout the year." },
      { name: 'highlights', label: 'Headline figures', type: 'repeater',
        itemFields: [
          { name: 'value', label: 'Value' },
          { name: 'label', label: 'Label' },
          { name: 'sub', label: 'Sub-label' },
        ],
        defaultItems: [
          { id: "students-getting-placed", value: "81%", label: "Students getting placed", sub: "Consistently every year" },
          { id: "years-of-experience", value: "21", label: "Years of experience", sub: "Since inception" },
          { id: "alumni-placed-in-mncs", value: "7000+", label: "Alumni placed in MNCs", sub: "Across industries" },
          { id: "campus-visiting-partners", value: "200+", label: "Campus visiting partners", sub: "MNCs to startups" },
          { id: "highest-package", value: "₹58 LPA", label: "Highest package", sub: "Palo Alto Networks · 2023" },
        ] },
      { name: 'infrastructure', label: 'Infrastructure list', type: 'repeater',
        itemFields: [{ name: 'text', label: 'Item' }],
        defaultItems: [
          { id: "infra-1", text: "800+ networked computer systems with webcams and 1 Gbps internet connectivity" },
          { id: "infra-2", text: "Auditorium with 1,200-seat capacity for pre-placement talks and mass drives" },
          { id: "infra-3", text: "Dedicated placement block with seminar halls, GD rooms, and interview panels" },
          { id: "infra-4", text: "Uninterrupted power backup across all placement facilities" },
          { id: "infra-5", text: "Centres of Excellence with Virtusa and EPAM Systems for advanced domain training" },
        ] },
      { name: 'infraStats', label: 'Infrastructure figures', type: 'repeater',
        itemFields: [
          { name: 'num', label: 'Figure' },
          { name: 'label', label: 'Label' },
        ],
        defaultItems: [
          { id: "systems", num: "800+", label: "Systems" },
          { id: "seat-auditorium", num: "1200", label: "Seat Auditorium" },
          { id: "connectivity", num: "1 Gbps", label: "Connectivity" },
        ] },
    ],
  },

  'placements/mous': {
    label: 'Placements — MoUs',
    previewPath: '/placements/mous',
    fields: [
      { name: 'coe', label: "CoE", defaultValue: "CoE" },
      { name: 'mou', label: "MoU", defaultValue: "MoU" },
      { name: 'centresOf', label: "Centres of", defaultValue: "Centres of" },
      { name: 'mou2', label: "MoU", defaultValue: "MoU" },
      { name: 'excellence', label: "Excellence.", defaultValue: "Excellence." },
      { name: 'onCampus', label: "On-Campus", defaultValue: "On-Campus" },
      { name: 'strategic', label: "Strategic", defaultValue: "Strategic" },
      { name: 'partners', label: "Partners.", defaultValue: "Partners." },
      { name: 'mous', label: 'MoUs', type: 'repeater',
        // One document per MoU, flattened into two columns: every bundled
        // entry has at most one, and a nested list is not something a
        // repeater row can hold.
        itemFields: [
          { name: 'name', label: 'Partner' },
          { name: 'domain', label: 'Domain' },
          { name: 'package', label: 'Package' },
          { name: 'type', label: 'Type' },
          { name: 'docLabel', label: 'Document label' },
          { name: 'docFile', label: 'Document link' },
        ],
        defaultItems: [
          { id: "virtusa", name: "Virtusa", domain: "Talend Data Integration and AWS — hands-on training with live industry projects through a dedicated on-campus Centre of Excellence.", package: "5.5 – 7 LPA", type: "Centre of Excellence", docLabel: "MoU · CoE Agreement 2026", docFile: "/placements/mou/virtusa-coe-2026.pdf" },
          { id: "epam-systems", name: "EPAM Systems", domain: "Fullstack Development and Cloud Engineering — specialised curriculum delivered by EPAM practitioners at our on-campus CoE.", package: "8 – 12 LPA", type: "Centre of Excellence", docLabel: "UpSkill Programme Agreement", docFile: "/placements/mou/epam-upskill.pdf" },
          { id: "hcl-tech", name: "HCL Tech", domain: "Specialised technical training in Snowflake, Informatica, and Java — developing job-ready professionals through industry-designed learning.", package: "", type: "Centre of Excellence", docLabel: "", docFile: "" },
          { id: "tata-technologies", name: "Tata Technologies", domain: "PLM and Engineering Design — dedicated Tata Technologies Centre of Excellence for advanced product lifecycle and manufacturing skills.", package: "", type: "Centre of Excellence", docLabel: "", docFile: "" },
          { id: "boeing", name: "Boeing", domain: "Aerospace Design and Manufacturing — formal partnership enabling internships, research collaboration, and direct recruitment.", package: "", type: "MoU Partner", docLabel: "", docFile: "" },
          { id: "cyient", name: "Cyient", domain: "Engineering and Technology Services — strategic MoU covering campus recruitment, joint technical training, and faculty development.", package: "", type: "MoU Partner", docLabel: "", docFile: "" },
          { id: "infosys", name: "Infosys", domain: "Campus Connect Programme — structured industry partnership providing Infosys-designed curriculum, certification, and campus recruitment.", package: "", type: "MoU Partner", docLabel: "", docFile: "" },
          { id: "revature", name: "Revature", domain: "Technology staffing and training partnership — placing graduates into software development roles at Fortune 500 clients through Revature's workforce model.", package: "", type: "MoU Partner", docLabel: "MoU Agreement", docFile: "/placements/mou/revature-mou.pdf" },
          { id: "cybage-software", name: "Cybage Software", domain: "Strategic MoU enabling campus recruitment, joint training initiatives, and industry exposure for MLRIT students through Cybage's technology services platform.", package: "", type: "MoU Partner", docLabel: "MoU Agreement", docFile: "/placements/mou/cybage-mou.pdf" },
          { id: "ite-c-department-govt-of-telangana", name: "ITE&C Department, Govt. of Telangana", domain: "Formal partnership with the IT, Electronics and Communications Department of Telangana Government — covering Blockchain technology training and digital skilling initiatives.", package: "", type: "MoU Partner", docLabel: "MoU Agreement", docFile: "/placements/mou/itec-blockchain.pdf" },
          { id: "aleap-we-hub", name: "ALEAP We Hub", domain: "Collaboration with ALEAP We Hub, Hyderabad — supporting women entrepreneurship, skill development, and industry-readiness programmes for students.", package: "", type: "MoU Partner", docLabel: "MoU Agreement", docFile: "/placements/mou/aleap-wehub.pdf" },
          { id: "idea-labs-futuretech-ventures", name: "Idea Labs Futuretech Ventures", domain: "Partnership with Idea Labs Futuretech Ventures — enabling emerging technology exposure, innovation-driven training, and startup ecosystem engagement for students.", package: "", type: "MoU Partner", docLabel: "MoU Agreement", docFile: "/placements/mou/idealabs-futuretech.pdf" },
          { id: "india-matters-foundation", name: "India Matters Foundation", domain: "Social impact partnership with India Matters Foundation, Chennai — focused on employability, professional development, and community engagement initiatives.", package: "", type: "MoU Partner", docLabel: "MoU Agreement", docFile: "/placements/mou/india-matters-foundation.pdf" },
          { id: "itca-bengaluru", name: "ITCA Bengaluru", domain: "Indo-Israel technology initiative through ITCA, Bengaluru — providing access to cutting-edge training programmes and international technology collaboration opportunities.", package: "", type: "MoU Partner", docLabel: "MoU Agreement", docFile: "/placements/mou/itca-mou.pdf" },
          { id: "movate", name: "Movate", domain: "Strategic MoU with Movate (formerly CSS Corp) — a global technology services company — covering campus recruitment, domain training, and professional development.", package: "", type: "MoU Partner", docLabel: "MoU Agreement", docFile: "/placements/mou/movate-mou.pdf" },
        ] },
    ],
  },

  'placements/support': {
    label: 'Placements — Contacts',
    previewPath: '/placements/support',
    fields: [
      { name: 'medchalMalkajgiriTelangana500', label: "Medchal Malkajgiri, Telangana – 500 043", defaultValue: "Medchal Malkajgiri, Telangana – 500 043" },
      { name: 'surveyNo444Dundigal', label: "Survey No. 444, Dundigal, Gandi Maisamma", defaultValue: "Survey No. 444, Dundigal, Gandi Maisamma" },
      { name: 'call919849991299', label: "Call +91 98499 91299", defaultValue: "Call +91 98499 91299" },
      { name: 'eapcetCodeMlid', label: "EAPCET Code · MLID", defaultValue: "EAPCET Code · MLID" },
      { name: 'emailTPCell', label: "Email T&P Cell", defaultValue: "Email T&P Cell" },
      { name: 'mlrInstituteOfTechnology', label: "MLR Institute of Technology", defaultValue: "MLR Institute of Technology" },
      { name: 'tPCellGround', label: "T&P Cell — Ground Floor, Main Block", defaultValue: "T&P Cell — Ground Floor, Main Block" },
      { name: 'officeLocation', label: "Office Location", defaultValue: "Office Location" },
      { name: 'contacts', label: 'Contacts', type: 'repeater',
        itemFields: [
          { name: 'name', label: 'Name' },
          { name: 'designation', label: 'Designation' },
          { name: 'phones', label: 'Phones (comma separated)' },
          { name: 'email', label: 'Email' },
          { name: 'purpose', label: 'Purpose' },
        ],
        defaultItems: [
          { id: "mr-ravi-chandra-p", name: "Mr. Ravi Chandra P", designation: "Head of Placements", phones: "+91 98499 91299, +91 96522 26061", email: "ravichandra@mlrinstitutions.ac.in", purpose: "Campus recruitment, company tie-ups, placement policy and student placement queries." },
          { id: "mr-s-arun-kumar", name: "Mr. S. Arun Kumar", designation: "Asst. Training & Placement Officer", phones: "+91 98661 93405", email: "placements@mlrinstitutions.ac.in", purpose: "Student registration, resume prep, mock interviews and training schedules." },
        ] },
    ],
  },

  // Recruiter logos, shared by the homepage marquee and /placements/recruiters.
  // One field, two consumers — previously the same 16 paths were generated
  // independently in both places and would have drifted the moment either was
  // edited.
  'placements/recruiters': {
    label: 'Placements — Recruiter logos',
    liveDraft: true,
    previewPath: '/placements/recruiters',
    fields: [
      {
        name: 'logos',
        label: 'Recruiter logos',
        type: 'gallery',
        itemFields: ['name'],
        defaultItems: [
          { id: 'p1', name: 'Recruiter', key: '/placements/p1.jpg' },
          { id: 'p2', name: 'Recruiter', key: '/placements/p2.jpg' },
          { id: 'p3', name: 'Recruiter', key: '/placements/p3.jpg' },
          { id: 'p4', name: 'Recruiter', key: '/placements/p4.jpg' },
          { id: 'p5', name: 'Recruiter', key: '/placements/p5.jpg' },
          { id: 'p6', name: 'Recruiter', key: '/placements/p6.jpg' },
          { id: 'p7', name: 'Recruiter', key: '/placements/p7.png' },
          { id: 'p8', name: 'Recruiter', key: '/placements/p8.png' },
          { id: 'p9', name: 'Recruiter', key: '/placements/p9.png' },
          { id: 'p10', name: 'Recruiter', key: '/placements/p10.png' },
          { id: 'p11', name: 'Recruiter', key: '/placements/p11.png' },
          { id: 'p12', name: 'Recruiter', key: '/placements/p12.png' },
          { id: 'p13', name: 'Recruiter', key: '/placements/p13.png' },
          { id: 'p14', name: 'Recruiter', key: '/placements/p14.png' },
          { id: 'p15', name: 'Recruiter', key: '/placements/p15.png' },
          { id: 'p16', name: 'Recruiter', key: '/placements/p16.png' },
        ],
      },
    ],
  },

  'iqac/aqar': {
    label: 'IQAC — AQAR reports',
    liveDraft: true,
    previewPath: '/iqac/aqar',
    fields: [
      { name: 'coeMlrinstitutionsAcIn', label: "coe@mlrinstitutions.ac.in", defaultValue: "coe@mlrinstitutions.ac.in" },
      { name: 'downloadPdf', label: "Download PDF", defaultValue: "Download PDF" },
      { name: 'latest', label: "Latest", defaultValue: "Latest" },
      { name: 'contactIqacOffice', label: "Contact IQAC Office", defaultValue: "Contact IQAC Office" },
      { name: 'aboutHeading', label: 'About heading', defaultValue: 'About AQAR' },
      { name: 'aboutBody1', label: 'About paragraph 1', multiline: true, defaultValue: "The Annual Quality Assurance Report (AQAR) is a yearly report prepared and submitted by MLRIT's Internal Quality Assurance Cell (IQAC) to NAAC. It documents the quality initiatives undertaken, academic outcomes achieved and improvements made during the academic year." },
      { name: 'aboutBody2', label: 'About paragraph 2', multiline: true, defaultValue: "AQAR submission is a mandatory requirement for all NAAC-accredited institutions and forms a key part of the continuous quality assessment process. It covers curriculum, teaching-learning, research, infrastructure, student support and governance." },
      { name: 'facts', label: 'Fact cards', type: 'repeater',
        itemFields: [
          { name: 'val', label: 'Value' },
          { name: 'sub', label: 'Label' },
        ],
        defaultItems: [
          { id: 'years', val: '7+', sub: 'Years of Reports' },
          { id: 'submitted-to', val: 'NAAC', sub: 'Submitted To' },
          { id: 'prepared-by', val: 'IQAC', sub: 'Prepared By' },
          { id: 'frequency', val: 'Annual', sub: 'Submission Frequency' },
        ] },
      { name: 'reportsHeading', label: 'Reports heading', defaultValue: 'AQAR Reports' },
      { name: 'reportsLede', label: 'Reports intro', multiline: true, defaultValue: "Annual Quality Assurance Reports for each academic year. Click to download the PDF." },
      {
        name: 'reports',
        label: 'AQAR reports',
        type: 'repeater',
        // `available` and `latest` are yes/blank rather than checkboxes: a
        // repeater column holds text, and the component reads them the same
        // way the footer reads its external-link flag.
        itemFields: [
          { name: 'year', label: 'Year' },
          { name: 'file', label: 'PDF link' },
          { name: 'available', label: 'Published (yes / blank)' },
          { name: 'latest', label: 'Latest (yes / blank)' },
        ],
        defaultItems: [
          { id: "2023-24", year: "2023–24", file: "/iqac/aqar/aqar-2023-24.pdf", available: "yes", latest: "yes" },
          { id: "2022-23", year: "2022–23", file: "/iqac/aqar/aqar-2022-23.pdf", available: "yes", latest: "" },
          { id: "2020-21", year: "2020–21", file: "/iqac/aqar/aqar-2020-21.pdf", available: "", latest: "" },
          { id: "2019-20", year: "2019–20", file: "/iqac/aqar/aqar-2019-20.pdf", available: "", latest: "" },
          { id: "2018-19", year: "2018–19", file: "/iqac/aqar/aqar-2018-19.pdf", available: "", latest: "" },
          { id: "2017-18", year: "2017–18", file: "/iqac/aqar/aqar-2017-18.pdf", available: "", latest: "" },
          { id: "2016-17", year: "2016–17", file: "/iqac/aqar/aqar-2016-17.pdf", available: "", latest: "" },
        ],
      },
    ],
  },

  'iqac/best-practices': {
    label: 'IQAC — Best practices',
    previewPath: '/iqac/best-practices',
    fields: [
      {
        name: 'practices',
        label: 'Practices',
        type: 'repeater',
        itemFields: [
          { name: 'n', label: 'Number label' },
          { name: 't', label: 'Title' },
          { name: 'd', label: 'Description' },
        ],
        defaultItems: [
          { id: "best-practice-1", n: "Best Practice 1", t: "Mentoring & Student Support System", d: "Every student is assigned a faculty mentor who tracks academic progress, attendance, personal development and career readiness throughout the programme." },
          { id: "best-practice-2", n: "Best Practice 2", t: "Industry-Integrated Curriculum", d: "Curriculum designed in consultation with industry experts; includes live projects, internship components and elective tracks aligned to current technology domains." },
          { id: "best-practice-3", n: "Best Practice 3", t: "Green Campus Initiatives", d: "Sustained efforts towards solar energy, tree plantation drives, water conservation and paperless administration to build an eco-sensitive campus." },
        ],
      },
    ],
  },

  'iqac/functions': {
    label: 'IQAC — Functions',
    liveDraft: true,
    previewPath: '/iqac/functions',
    fields: [
      { name: 'theQualityAssuranceProcess', label: "The quality assurance process is participative…", multiline: true, defaultValue: "The quality assurance process is participative, involving all stakeholders, including management, faculty, students, alumni, employers, parents, and industry experts." },
      { name: 'methodologyAndAlignsInstitutional', label: "methodology and aligns institutional quality i…", multiline: true, defaultValue: "methodology and aligns institutional quality initiatives with the requirements of NAAC, NBA, AICTE, UGC, JNTUH, NIRF, AISHE, and other statutory and regulatory bodies." },
      { name: 'theIqacFollowsThe', label: "The IQAC follows the", defaultValue: "The IQAC follows the" },
      { name: 'iqacQualityAssuranceProcess', label: "IQAC Quality Assurance Process", defaultValue: "IQAC Quality Assurance Process" },
      { name: 'iqacProcessFlow', label: "IQAC Process Flow", defaultValue: "IQAC Process Flow" },
      { name: 'keyFunctions', label: "Key Functions", defaultValue: "Key Functions" },
      {
        name: 'functions',
        label: 'Functions',
        type: 'repeater',
        itemFields: [{ name: 'text', label: 'Function' }],
        defaultItems: [
          { id: "fn-1", text: "Develops and monitors institutional quality benchmarks." },
          { id: "fn-2", text: "Coordinates accreditation and ranking activities." },
          { id: "fn-3", text: "Facilitates Academic and Administrative Audits." },
          { id: "fn-4", text: "Promotes Outcome-Based Education (OBE)." },
          { id: "fn-5", text: "Encourages innovative teaching-learning methodologies." },
          { id: "fn-6", text: "Collects and analyses stakeholder feedback." },
          { id: "fn-7", text: "Monitors implementation of quality initiatives." },
          { id: "fn-8", text: "Coordinates Annual Quality Assurance Report (AQAR) preparation." },
          { id: "fn-9", text: "Supports NBA, NAAC, NIRF, AISHE, and statutory compliance." },
          { id: "fn-10", text: "Organizes faculty development programmes, workshops, seminars, and quality awareness activities." },
          { id: "fn-11", text: "Promotes best practices and institutional distinctiveness." },
          { id: "fn-12", text: "Maintains quality documentation and evidence for accreditation." },
        ],
      },
      {
        name: 'steps',
        label: 'Process flow steps',
        type: 'repeater',
        itemFields: [
          { name: 'n', label: 'Number' },
          { name: 'label', label: 'Label' },
        ],
        defaultItems: [
          { id: "step-01", n: "01", label: "Vision & Mission" },
          { id: "step-02", n: "02", label: "Strategic Planning" },
          { id: "step-03", n: "03", label: "Quality Objectives & Benchmarks" },
          { id: "step-04", n: "04", label: "Department Quality Planning" },
          { id: "step-05", n: "05", label: "Implementation of Academic & Administrative Processes" },
          { id: "step-06", n: "06", label: "Monitoring & Documentation" },
          { id: "step-07", n: "07", label: "Internal Academic Audit / Administrative Audit" },
          { id: "step-08", n: "08", label: "Stakeholder Feedback Collection" },
          { id: "step-09", n: "09", label: "Performance Analysis" },
          { id: "step-10", n: "10", label: "IQAC Review Meeting" },
          { id: "step-11", n: "11", label: "Action Taken Report (ATR)" },
          { id: "step-12", n: "12", label: "Corrective & Preventive Actions" },
          { id: "step-13", n: "13", label: "Continuous Quality Improvement" },
          { id: "step-14", n: "14", label: "Institutional Excellence" },
        ],
      },
    ],
  },

  'iqac/objectives': {
    label: 'IQAC — Objectives',
    liveDraft: true,
    previewPath: '/iqac/objectives',
    fields: [
      { name: 'drivingExcellenceThroughContinuous', label: "Driving Excellence through Continuous Quality …", multiline: true, defaultValue: "Driving Excellence through Continuous Quality Enhancement — by integrating quality benchmarks into all institutional processes, IQAC ensures that every academic and administrative activity contributes to sustainable growth, stakeholder satisfaction, and national and international recognition." },
      { name: 'theInstituteStrivesTo', label: "The Institute strives to continuously enhance …", multiline: true, defaultValue: "The Institute strives to continuously enhance academic and administrative processes by adopting transparent governance, learner-centric education, industry engagement, digital transformation, and evidence-based decision-making to produce competent professionals and responsible citizens." },
      { name: 'committedToAcademicExcellence', label: "Committed to Academic Excellence and Continuou…", defaultValue: "Committed to Academic Excellence and Continuous Improvement" },
      { name: 'qualityPolicyStatementThe', label: "Quality Policy Statement — The Institution is …", defaultValue: "Quality Policy Statement — The Institution is committed to:" },
      { name: 'strategicGoalsOfIqac', label: "Strategic Goals of IQAC", defaultValue: "Strategic Goals of IQAC" },
      { name: 'qualityPolicy', label: "Quality Policy", defaultValue: "Quality Policy" },
      {
        name: 'objectives',
        label: 'Objectives',
        type: 'repeater',
        itemFields: [
          { name: 'n', label: 'Number' },
          { name: 't', label: 'Title' },
          { name: 'd', label: 'Description' },
        ],
        defaultItems: [
          { id: "obj-01", n: "01", t: "Academic Excellence", d: "Strengthen the quality of teaching-learning processes through innovative pedagogical practices, curriculum enrichment, experiential learning, and outcome-based education to enhance student learning outcomes." },
          { id: "obj-02", n: "02", t: "Continuous Quality Improvement", d: "Establish robust quality assurance mechanisms that facilitate periodic review, monitoring, assessment, and continual enhancement of academic and administrative processes." },
          { id: "obj-03", n: "03", t: "Outcome-Based Education (OBE)", d: "Promote effective implementation of Outcome-Based Education by aligning curriculum delivery, assessment, and attainment with Programme Outcomes (POs), Programme Specific Outcomes (PSOs), and Course Outcomes (COs)." },
          { id: "obj-04", n: "04", t: "Research, Innovation and Consultancy", d: "Encourage faculty and students to engage in impactful research, interdisciplinary collaborations, innovation, entrepreneurship, consultancy, patents, and technology transfer." },
          { id: "obj-05", n: "05", t: "Faculty Empowerment", d: "Support continuous professional development through Faculty Development Programmes (FDPs), workshops, certifications, research opportunities, and industry interactions." },
          { id: "obj-06", n: "06", t: "Student Development", d: "Create a learner-centric environment that nurtures technical competence, leadership, ethical values, innovation, employability skills, and lifelong learning." },
          { id: "obj-07", n: "07", t: "Digital Transformation", d: "Leverage digital technologies and data-driven systems to improve academic administration, documentation, quality monitoring, and institutional decision-making." },
          { id: "obj-08", n: "08", t: "Accreditation and Ranking Excellence", d: "Strengthen institutional preparedness for accreditation and ranking frameworks such as NAAC, NBA, NIRF, AISHE, AICTE, and other quality assessment agencies." },
          { id: "obj-09", n: "09", t: "Stakeholder Engagement", d: "Develop effective mechanisms to obtain, analyze, and act upon feedback from students, faculty, alumni, employers, parents, and industry to enhance institutional effectiveness." },
          { id: "obj-10", n: "10", t: "Sustainable Institutional Development", d: "Promote environmentally responsible practices, social responsibility, inclusiveness, ethical governance, and community engagement to achieve long-term institutional sustainability." },
        ],
      },
      {
        name: 'commitments',
        label: 'Quality policy commitments',
        type: 'repeater',
        itemFields: [{ name: 'text', label: 'Commitment' }],
        defaultItems: [
          { id: "commitment-1", text: "Deliver quality education through effective curriculum planning, innovative teaching-learning practices, and robust assessment systems." },
          { id: "commitment-2", text: "Promote Outcome-Based Education to ensure attainment of defined learning outcomes and graduate attributes." },
          { id: "commitment-3", text: "Foster a culture of continuous quality improvement through regular monitoring, evaluation, and quality audits." },
          { id: "commitment-4", text: "Encourage research, innovation, entrepreneurship, consultancy, and interdisciplinary collaboration." },
          { id: "commitment-5", text: "Strengthen industry partnerships to enhance experiential learning, internships, skill development, and employability." },
          { id: "commitment-6", text: "Provide opportunities for faculty development, leadership, and professional growth." },
          { id: "commitment-7", text: "Create an inclusive, student-centric, and technology-enabled learning environment." },
          { id: "commitment-8", text: "Ensure transparent, participative, and accountable governance practices." },
          { id: "commitment-9", text: "Promote environmental sustainability, social responsibility, and ethical values." },
          { id: "commitment-10", text: "Comply with statutory, regulatory, and accreditation requirements while continually improving institutional effectiveness." },
        ],
      },
    ],
  },

  'iqac/overview': {
    label: 'IQAC — Overview',
    previewPath: '/iqac',
    fields: [
      { name: 'theInternalQualityAssurance', label: "The Internal Quality Assurance Cell (IQAC) ser…", multiline: true, defaultValue: "The Internal Quality Assurance Cell (IQAC) serves as the quality sustenance and enhancement mechanism of the institution. Established in accordance with the guidelines of the National Assessment and Accreditation Council (NAAC), IQAC promotes a culture of quality through systematic planning, monitoring, documentation, and continuous improvement of academic and administrative processes." },
      { name: 'theIqacActsAs', label: "The IQAC acts as a catalyst for institutional …", multiline: true, defaultValue: "The IQAC acts as a catalyst for institutional excellence by encouraging innovation, outcome-based education, digital transformation, stakeholder participation, and evidence-based decision making. It coordinates quality initiatives aligned with NAAC, NBA, NIRF, AISHE, UGC, AICTE, and other regulatory frameworks to ensure holistic institutional development." },
      { name: 'throughContinuousMonitoringAnd', label: "Through continuous monitoring and periodic rev…", multiline: true, defaultValue: "Through continuous monitoring and periodic reviews, IQAC strengthens teaching-learning processes, research, extension activities, governance, infrastructure, and student support systems, thereby contributing to the realization of the institution's vision and mission." },
      { name: 'toNurtureACulture', label: "To nurture a culture of continuous quality enh…", multiline: true, defaultValue: "To nurture a culture of continuous quality enhancement and innovation that transforms MLR Institute of Technology into a globally recognized institution of academic excellence, research, innovation, and societal impact." },
      { name: 'qualityIsNotAn', label: "“Quality is not an event; it is a continuous j…", defaultValue: "“Quality is not an event; it is a continuous journey towards excellence.”" },
      { name: 'iqacAlignsInstitutionalActivities', label: "IQAC aligns institutional activities with the …", defaultValue: "IQAC aligns institutional activities with the following quality frameworks:" },
      { name: 'institutionalQualityFramework', label: "Institutional Quality Framework", defaultValue: "Institutional Quality Framework" },
      { name: 'ourCommitmentToQuality', label: "Our Commitment to Quality", defaultValue: "Our Commitment to Quality" },
      { name: 'iqacIsCommittedTo', label: "IQAC is committed to:", defaultValue: "IQAC is committed to:" },
      { name: 'visionMission', label: "Vision & Mission", defaultValue: "Vision & Mission" },
      { name: 'aboutIqac', label: "About IQAC", defaultValue: "About IQAC" },
      { name: 'iqacMotto', label: "IQAC Motto", defaultValue: "IQAC Motto" },
      { name: 'framework', label: "Framework", defaultValue: "Framework" },
      { name: 'fullName', label: "Full Name", defaultValue: "Full Name" },
      { name: 'missionHeading', label: "Mission heading", defaultValue: "Mission" },
      { name: 'vision', label: "Vision", defaultValue: "Vision" },
      { name: 'mission', label: 'Mission points', type: 'repeater',
        itemFields: [{ name: 'text', label: 'Point' }],
        defaultItems: [
          { id: "mission-1", text: "To institutionalize quality assurance practices across academic and administrative domains." },
          { id: "mission-2", text: "To promote excellence in teaching, learning, research, innovation, and extension activities." },
          { id: "mission-3", text: "To facilitate outcome-based education and continuous curriculum improvement." },
          { id: "mission-4", text: "To encourage stakeholder participation for institutional development." },
          { id: "mission-5", text: "To strengthen governance through transparency, accountability, and evidence-based decision making." },
          { id: "mission-6", text: "To achieve excellence in accreditation, ranking, and national quality frameworks." },
        ] },
      { name: 'commitments', label: 'Commitment items', type: 'repeater',
        itemFields: [{ name: 'text', label: 'Item' }],
        defaultItems: [
          { id: "commitment-1", text: "Academic Excellence" },
          { id: "commitment-2", text: "Continuous Quality Improvement" },
          { id: "commitment-3", text: "Student-Centric Learning" },
          { id: "commitment-4", text: "Research and Innovation" },
          { id: "commitment-5", text: "Industry Collaboration" },
          { id: "commitment-6", text: "Digital Transformation" },
          { id: "commitment-7", text: "Sustainable Development" },
          { id: "commitment-8", text: "Ethical Governance" },
          { id: "commitment-9", text: "Institutional Transparency" },
          { id: "commitment-10", text: "Inclusive Growth" },
        ] },
      { name: 'frameworks', label: 'Quality frameworks', type: 'repeater',
        itemFields: [
          { name: 'code', label: 'Code' },
          { name: 'label', label: 'Full name' },
        ],
        defaultItems: [
          { id: "naac", code: "NAAC", label: "National Assessment and Accreditation Council" },
          { id: "nba", code: "NBA", label: "National Board of Accreditation" },
          { id: "nirf", code: "NIRF", label: "National Institutional Ranking Framework" },
          { id: "aishe", code: "AISHE", label: "All India Survey on Higher Education" },
          { id: "aicte", code: "AICTE", label: "All India Council for Technical Education" },
          { id: "ugc", code: "UGC", label: "University Grants Commission" },
          { id: "jntuh", code: "JNTUH", label: "Jawaharlal Nehru Technological University Hyderabad" },
          { id: "obe", code: "OBE", label: "Outcome-Based Education" },
        ] },
    ],
  },

  'iqac/initiatives': {
    label: 'IQAC — Initiatives',
    previewPath: '/iqac/initiatives',
    fields: [
      { name: 'theIqacActivelyCoordinates', label: "The IQAC actively coordinates institutional in…", multiline: true, defaultValue: "The IQAC actively coordinates institutional initiatives in the following areas to ensure holistic institutional development:" },
      { name: 'theIqacActsAs', label: "The IQAC acts as the institutional quality cat…", defaultValue: "The IQAC acts as the institutional quality catalyst by:" },
      { name: 'majorQualityInitiatives', label: "Major Quality Initiatives", defaultValue: "Major Quality Initiatives" },
      { name: 'keyResponsibilities', label: "Key Responsibilities", defaultValue: "Key Responsibilities" },
      { name: 'initiatives', label: 'Initiatives', type: 'repeater',
        itemFields: [{ name: 'text', label: 'Initiative' }],
        defaultItems: [
          { id: "initiative-1", text: "Academic Quality Enhancement" },
          { id: "initiative-2", text: "Curriculum Enrichment" },
          { id: "initiative-3", text: "Faculty Development Programmes" },
          { id: "initiative-4", text: "Student Skill Development" },
          { id: "initiative-5", text: "Outcome-Based Education Implementation" },
          { id: "initiative-6", text: "Research Promotion" },
          { id: "initiative-7", text: "Innovation and Entrepreneurship" },
          { id: "initiative-8", text: "Green Campus Initiatives" },
          { id: "initiative-9", text: "Digital Learning Ecosystem" },
          { id: "initiative-10", text: "Industry-Institute Interaction" },
          { id: "initiative-11", text: "Internal Academic Audits" },
          { id: "initiative-12", text: "Administrative Process Improvements" },
          { id: "initiative-13", text: "Stakeholder Feedback System" },
          { id: "initiative-14", text: "Student Satisfaction Survey" },
          { id: "initiative-15", text: "Best Practices Documentation" },
          { id: "initiative-16", text: "Institutional Distinctiveness" },
          { id: "initiative-17", text: "National Ranking and Accreditation Support" },
        ] },
      { name: 'responsibilities', label: 'Responsibilities', type: 'repeater',
        itemFields: [{ name: 'text', label: 'Responsibility' }],
        defaultItems: [
          { id: "responsibility-1", text: "Planning quality initiatives" },
          { id: "responsibility-2", text: "Monitoring academic processes" },
          { id: "responsibility-3", text: "Supporting strategic planning" },
          { id: "responsibility-4", text: "Reviewing institutional performance" },
          { id: "responsibility-5", text: "Facilitating evidence-based decision making" },
          { id: "responsibility-6", text: "Coordinating accreditation documentation" },
          { id: "responsibility-7", text: "Strengthening stakeholder engagement" },
          { id: "responsibility-8", text: "Promoting institutional excellence" },
          { id: "responsibility-9", text: "Encouraging innovation and best practices" },
          { id: "responsibility-10", text: "Driving continuous improvement across all functional areas" },
        ] },
    ],
  },

  'iqac/support': {
    label: 'IQAC — Support contacts',
    previewPath: '/iqac/support',
    fields: [
      { name: 'medchalMalkajgiriTelangana500', label: "Medchal Malkajgiri, Telangana – 500 043", defaultValue: "Medchal Malkajgiri, Telangana – 500 043" },
      { name: 'surveyNo444Dundigal', label: "Survey No. 444, Dundigal, Gandi Maisamma", defaultValue: "Survey No. 444, Dundigal, Gandi Maisamma" },
      { name: 'emailIqacOffice', label: "Email IQAC Office", defaultValue: "Email IQAC Office" },
      { name: 'mlrInstituteOfTechnology', label: "MLR Institute of Technology", defaultValue: "MLR Institute of Technology" },
      { name: 'iqacOfficeAdministrativeBlock', label: "IQAC Office — Administrative Block", defaultValue: "IQAC Office — Administrative Block" },
      { name: 'phoneToBeUpdated', label: "Phone — To be updated", defaultValue: "Phone — To be updated" },
      { name: 'officeLocation', label: "Office Location", defaultValue: "Office Location" },
      { name: 'contacts', label: 'Contacts', type: 'repeater',
        itemFields: [
          { name: 'name', label: 'Name' },
          { name: 'role', label: 'Role' },
          { name: 'phone', label: 'Phone' },
          { name: 'tollFree', label: 'Toll-free' },
          { name: 'email', label: 'Email' },
          { name: 'purpose', label: 'Purpose' },
        ],
        defaultItems: [
          { id: "dr-radhika-devi-v", name: "Dr. Radhika Devi V", role: "Head IQAC — Director & Dean H&S", phone: "To be updated", tollFree: "", email: "iqac@mlrinstitutions.ac.in", purpose: "Accreditation, AQAR submissions, quality assurance and NBA documentation." },
          { id: "iqac-office", name: "IQAC Office", role: "General Enquiries", phone: "1800 572 4363", tollFree: "yes", email: "iqac@mlrinstitutions.ac.in", purpose: "Criteria-wise reports, NAAC queries and institutional benchmarking." },
        ] },
    ],
  },

  'iqac/reports': {
    label: "IQAC — Reports & documents",
    liveDraft: true,
    previewPath: '/iqac/reports',
    fields: [
      { name: 'contentToBeUpdated', label: "Content to be updated.", defaultValue: "Content to be updated." },
      { name: 'policyDocuments', label: "Policy Documents", defaultValue: "Policy Documents" },
      { name: 'auditReports', label: "Audit Reports", defaultValue: "Audit Reports" },
      { name: 'aqarReports', label: "AQAR Reports", defaultValue: "AQAR Reports" },
      { name: 'minutesHeading', label: "Minutes heading", defaultValue: "Minutes" },
      { name: 'open', label: "Open →", defaultValue: "Open →" },
      {
        name: "aqar",
        label: "AQAR reports",
        type: 'repeater',
        itemFields: [
          { name: "label", label: "Label" },
          { name: "href", label: "Link" },
          { name: "tag", label: "Tag" },
        ],
        defaultItems: [
          { id: "aqar-reports", label: "AQAR Reports", href: "/iqac/aqar", tag: "Annual Report" },
        ],
      },
      {
        name: "minutes",
        label: "Minutes",
        type: 'repeater',
        itemFields: [
          { name: "label", label: "Label" },
          { name: "href", label: "Link" },
          { name: "tag", label: "Tag" },
        ],
        defaultItems: [
          { id: "iqac-minutes-of-meeting", label: "IQAC Minutes of Meeting", href: "/iqac/minutes", tag: "Governance" },
        ],
      },
      {
        name: "other",
        label: "Other reports",
        type: 'repeater',
        itemFields: [
          { name: "label", label: "Label" },
          { name: "href", label: "Link" },
          { name: "tag", label: "Tag" },
        ],
        defaultItems: [
          { id: "strategic-perspective-plan", label: "Strategic Perspective Plan", href: "/iqac", tag: "Planning" },
          { id: "policies", label: "Policies", href: "/iqac/policies", tag: "Policy" },
          { id: "newsletters", label: "Newsletters", href: "/iqac", tag: "Publications" },
          { id: "nba-programme-accreditation", label: "NBA — Programme Accreditation", href: "/iqac/nba", tag: "Accreditation" },
        ],
      },
    ],
  },

  'iqac/feedback': {
    label: "IQAC — Feedback types",
    previewPath: '/iqac/feedback',
    fields: [
      {
        name: "types",
        label: "Feedback types",
        type: 'repeater',
        itemFields: [
          { name: "tag", label: "Tag" },
          { name: "title", label: "Title" },
          { name: "desc", label: "Description" },
        ],
        defaultItems: [
          { id: "student-feedback", tag: "Students", title: "Student Feedback", desc: "Semester-wise feedback on teaching quality, course delivery, infrastructure and overall campus experience collected from all enrolled students." },
          { id: "faculty-feedback", tag: "Faculty", title: "Faculty Feedback", desc: "Feedback from faculty on curriculum relevance, administrative support, professional development opportunities and institutional processes." },
          { id: "alumni-feedback", tag: "Alumni", title: "Alumni Feedback", desc: "Inputs from alumni on the long-term impact of their MLRIT education on career growth and professional development." },
          { id: "employer-feedback", tag: "Employers", title: "Employer Feedback", desc: "Annual feedback from recruiting organisations on graduate competency, workplace readiness and industry-alignment of MLRIT programmes." },
        ],
      },
    ],
  },

  'iqac/contact': {
    label: "IQAC — Contact details",
    previewPath: '/iqac/contact',
    fields: [
      { name: 'forQuestionsRelatedTo', label: "For questions related to accreditation, qualit…", multiline: true, defaultValue: "For questions related to accreditation, quality assurance reports, feedback forms or IQAC activities, write to us directly or visit the IQAC office during working hours." },
      { name: 'emailIqac', label: "Email IQAC →", defaultValue: "Email IQAC →" },
      { name: 'contactDetails', label: "Contact Details", defaultValue: "Contact Details" },
      { name: 'sendAQuery', label: "Send a Query", defaultValue: "Send a Query" },
      { name: 'sendQuery', label: "Send Query", defaultValue: "Send Query" },
      {
        name: "details",
        label: "Contact details",
        type: 'repeater',
        itemFields: [
          { name: "label", label: "Label" },
          { name: "value", label: "Value" },
        ],
        defaultItems: [
          { id: "head-iqac", label: "Head IQAC", value: "Dr. Radhika Devi V — Director & Dean H&S" },
          { id: "phone", label: "Phone", value: "+91-40-2304 4444" },
          { id: "email", label: "Email", value: "iqac@mlrit.ac.in" },
          { id: "address", label: "Address", value: "IQAC Office, MLRIT, Dundigal, Hyderabad – 500 043, Telangana, India" },
          { id: "office-hours", label: "Office Hours", value: "Monday – Saturday, 9:00 AM – 5:00 PM" },
        ],
      },
    ],
  },

  // NBA accreditation table — the cycle and status move every few years.
  'iqac/nba': {
    label: 'IQAC — NBA accredited programmes',
    liveDraft: true,
    previewPath: '/iqac/nba',
    fields: [
      { name: 'theFollowingBTech', label: "The following B.Tech programmes at MLRIT are c…", multiline: true, defaultValue: "The following B.Tech programmes at MLRIT are currently accredited by the National Board of Accreditation under the Tier-1 framework." },
      { name: 'download', label: "Download", defaultValue: "Download" },
      { name: 'downloadPdf', label: "Download PDF", defaultValue: "Download PDF" },
      { name: 'accreditationCycle', label: "Accreditation Cycle", defaultValue: "Accreditation Cycle" },
      { name: 'accredited', label: "Accredited", defaultValue: "Accredited" },
      { name: 'programme', label: "Programme", defaultValue: "Programme" },
      { name: 'status', label: "Status", defaultValue: "Status" },
      { name: 'about', label: "About", defaultValue: "About" },
      {
        name: 'programmes',
        label: 'Accredited programmes',
        type: 'repeater',
        itemFields: [
          { name: 'dept', label: 'Department' },
          { name: 'code', label: 'Code' },
          { name: 'cycle', label: 'Cycle' },
          { name: 'status', label: 'Status' },
          { name: 'dcp', label: 'DCP report link' },
        ],
        defaultItems: [
          { id: "cse", dept: "Computer Science & Engineering", code: "CSE", cycle: "2022–2025", status: "Accredited", dcp: "/iqac/dcp-cse.pdf" },
          { id: "ece", dept: "Electronics & Communication", code: "ECE", cycle: "2022–2025", status: "Accredited", dcp: "/iqac/dcp-ece.pdf" },
          { id: "mech", dept: "Mechanical Engineering", code: "MECH", cycle: "2022–2025", status: "Accredited", dcp: "/iqac/dcp-mech.pdf" },
          { id: "aero", dept: "Aeronautical Engineering", code: "AERO", cycle: "2022–2025", status: "Accredited", dcp: "/iqac/dcp-aero.pdf" },
          { id: "ds", dept: "CSE — Data Science", code: "DS", cycle: "2022–2025", status: "Accredited", dcp: "/iqac/dcp-ds.pdf" },
          { id: "aiml", dept: "CSE — AI & Machine Learning", code: "AIML", cycle: "2022–2025", status: "Accredited", dcp: "/iqac/dcp-aiml.pdf" },
        ],
      },
    ],
  },

  // The shared chapter-cover hero, on every secondary page. Keyed by route
  // path: PageHeader reads its own path, so adding a page here needs no change
  // at the call site.
  //
  // Dynamic routes (faculty/[slug], syllabus) are deliberately absent — their
  // headers come from the record being shown, not from fixed copy.
  'site/page-headers': {
    label: 'Page headers',
    // This list spans 36 routes, so the preview can only show one of them.
    // /iqac is a representative page that uses the hero; edits to other rows
    // are saved correctly but will not be visible until that page is opened.
    previewPath: '/iqac',
    fields: [
      {
        name: 'headers',
        label: 'Headers by page',
        type: 'repeater',
        itemFields: [
          { name: 'path', label: 'Route (do not change)' },
          { name: 'eyebrow', label: 'Eyebrow' },
          { name: 'title', label: 'Title' },
          { name: 'italic', label: 'Title italic tail' },
          { name: 'dek', label: 'Sub-headline' },
        ],
        defaultItems: [
          {
            id: "about-internal-governance",
            path: "/about/internal-governance",
            eyebrow: "About MLRIT",
            title: "Internal",
            italic: "Governance.",
            dek: "The leadership team and institutional governance structure of MLR Institute of Technology.",
          },
          {
            id: "about-legacy",
            path: "/about/legacy",
            eyebrow: "Legacy",
            title: "Founding",
            italic: "voices.",
            dek: "Messages from the Founder and Chairman of MLRIT — the vision and values that have guided the institution since 2005.",
          },
          {
            id: "about",
            path: "/about",
            eyebrow: "About MLRIT",
            title: "Twenty years of",
            italic: "building engineers.",
            dek: "MLR Institute of Technology — Dundigal, Hyderabad. An autonomous, JNTUH-affiliated, AICTE-approved engineering institution founded in 2005 by the KMR Educational Society.",
          },
          {
            id: "about-rankings-awards",
            path: "/about/rankings-awards",
            eyebrow: "Rankings & Awards",
            title: "Recognised",
            italic: "nationally.",
            dek: "The accreditations, rankings and institutional achievements that benchmark MLRIT's twenty years of quality engineering education.",
          },
          {
            id: "about-timeline",
            path: "/about/timeline",
            eyebrow: "Timeline",
            title: "Two decades in",
            italic: "eight moments.",
            dek: "From the foundation stone in 2005 to a nationally accredited institution — the institutional milestones that shaped MLRIT.",
          },
          {
            id: "about-vision-mission-vision-mission",
            path: "/about/vision-mission/vision-mission",
            eyebrow: "Vision & Mission",
            title: "What we",
            italic: "stand for.",
            dek: "The guiding principles that shape every academic, research and institutional decision at MLRIT.",
          },
          {
            id: "academics",
            path: "/academics",
            eyebrow: "Academics",
            title: "Education that",
            italic: "adapts faster than industry.",
            dek: "An autonomous, outcome-based, research-led academic system. Ten engineering branches at the undergraduate level, four M.Tech specialisations, an MBA programme, and doctoral research across five disciplines.",
          },
          {
            id: "admissions-by-degree",
            path: "/admissions/by-degree",
            eyebrow: "Programmes",
            title: "Find your",
            italic: "perfect programme.",
            dek: "From core engineering to next-gen specialisations, MLRIT offers 15 programmes designed for the jobs of tomorrow.",
          },
          {
            id: "admissions-counselling",
            path: "/admissions/counselling",
            eyebrow: "Counselling",
            title: "Admission process &",
            italic: "counselling guide.",
            dek: "Everything you need to know about web counselling, required documents and important dates for joining MLRIT.",
          },
          {
            id: "admissions-fees",
            path: "/admissions/fees",
            eyebrow: "Fee Structure 2025–26",
            title: "Transparent &",
            italic: "competitive fees.",
            dek: "MLRIT offers quality education at accessible fee levels. Fee structure is approved by the Telangana Fee Regulation Committee (TSFRC) / APSCHE.",
          },
          {
            id: "admissions-policies",
            path: "/admissions/policies",
            eyebrow: "Policies",
            title: "Institutional policies &",
            italic: "student rights.",
            dek: "Transparency and fairness define MLRIT's institutional framework. Our policies are aligned with UGC, AICTE and state regulatory guidelines.",
          },
          {
            id: "admissions-scholarships",
            path: "/admissions/scholarships",
            eyebrow: "Financial Support",
            title: "Scholarships &",
            italic: "fee support.",
            dek: "MLRIT believes financial constraints should never stand between talent and opportunity. Explore our merit-based, sports and government-linked scholarship programmes.",
          },
          {
            id: "admissions-support",
            path: "/admissions/support",
            eyebrow: "Admissions Support",
            title: "We're here",
            italic: "to help.",
            dek: "Find answers to the most common admissions questions, or reach out to our team directly.",
          },
          {
            id: "admissions-why-mlrit",
            path: "/admissions/why-mlrit",
            eyebrow: "Why MLRIT",
            title: "More than a degree —",
            italic: "a launchpad.",
            dek: "MLRIT isn't just where you earn a degree — it's where you find your direction, your people, and your future.",
          },
          {
            id: "departments-pg",
            path: "/departments/pg",
            eyebrow: "M.Tech & MBA",
            title: "Postgraduate",
            italic: "programmes.",
            dek: "Two-year M.Tech specialisations and a two-year MBA — research-led, industry-anchored, designed for postgraduate growth.",
          },
          {
            id: "departments-ug",
            path: "/departments/ug",
            eyebrow: "B.Tech Programmes",
            title: "Undergraduate",
            italic: "programmes.",
            dek: "A four-year B.Tech across seven engineering branches, built on a shared first-year foundation — with an industry-integrated curriculum, hands-on labs and a culture of inquiry.",
          },
          {
            id: "iqac-aqar",
            path: "/iqac/aqar",
            eyebrow: "IQAC",
            title: "Annual Quality",
            italic: "Assurance Reports.",
            dek: "AQAR — Annual Quality Assurance Reports submitted by MLRIT to NAAC as part of the institutional accreditation cycle, documenting quality initiatives, outcomes and improvements each academic year.",
          },
          {
            id: "iqac-best-practices",
            path: "/iqac/best-practices",
            eyebrow: "IQAC",
            title: "Best Practices",
            italic: "",
            dek: "Institutional best practices adopted at MLRIT that reflect commitment to quality, innovation and holistic student development.",
          },
          {
            id: "iqac-composition",
            path: "/iqac/composition",
            eyebrow: "IQAC",
            title: "IQAC Composition",
            italic: "",
            dek: "The cell brings together institutional leadership, management, faculty, external stakeholders, and alumni to ensure comprehensive quality oversight and continuous improvement.",
          },
          {
            id: "iqac-contact",
            path: "/iqac/contact",
            eyebrow: "IQAC",
            title: "Contact IQAC",
            italic: "",
            dek: "Reach out to the IQAC office for queries on accreditation, quality assurance reports, feedback forms or any IQAC activities.",
          },
          {
            id: "iqac-feedback",
            path: "/iqac/feedback",
            eyebrow: "IQAC",
            title: "Feedback",
            italic: "",
            dek: "IQAC collects and analyses feedback from all stakeholders — students, faculty, employers and alumni — to drive continuous improvement.",
          },
          {
            id: "iqac-functions",
            path: "/iqac/functions",
            eyebrow: "IQAC",
            title: "Functions",
            italic: "",
            dek: "The IQAC performs key functions to ensure continuous quality enhancement across academic and administrative activities at MLR Institute of Technology (Autonomous).",
          },
          {
            id: "iqac-initiatives",
            path: "/iqac/initiatives",
            eyebrow: "IQAC",
            title: "Quality Initiatives",
            italic: "",
            dek: "IQAC actively coordinates institutional initiatives across seventeen focus areas to promote and sustain quality in academic and administrative activities at MLR Institute of Technology (Autonomous).",
          },
          {
            id: "iqac-naac",
            path: "/iqac/naac",
            eyebrow: "Accreditation",
            title: "NAAC",
            italic: "at MLRIT",
            dek: "National Assessment and Accreditation Council — MLRIT's institutional accreditation, self-study reports and assessment cycle artefacts.",
          },
          {
            id: "iqac-nba",
            path: "/iqac/nba",
            eyebrow: "Accreditation",
            title: "NBA — Programme",
            italic: "accreditation.",
            dek: "National Board of Accreditation — programme-level accreditation for engineering branches at MLR Institute of Technology, validating outcome-based education quality.",
          },
          {
            id: "iqac-objectives",
            path: "/iqac/objectives",
            eyebrow: "IQAC",
            title: "Objectives",
            italic: "",
            dek: "The IQAC of MLR Institute of Technology (Autonomous) is committed to fostering a culture of quality, innovation, and continuous improvement through ten strategic goals that guide all institutional activities.",
          },
          {
            id: "iqac",
            path: "/iqac",
            eyebrow: "Quality Assurance",
            title: "Internal Quality Assurance Cell (IQAC)",
            italic: "",
            dek: "The IQAC of MLR Institute of Technology (Autonomous) functions as the central quality assurance and enhancement body — fostering a culture of quality, innovation, and continuous improvement across all academic and administrative activities.",
          },
          {
            id: "iqac-reports",
            path: "/iqac/reports",
            eyebrow: "IQAC",
            title: "Reports & Documents",
            italic: "",
            dek: "Access IQAC reports, governance documents, policies, AQAR submissions and accreditation records.",
          },
          {
            id: "iqac-support",
            path: "/iqac/support",
            eyebrow: "IQAC Support",
            title: "Quality Assurance",
            italic: "Office.",
            dek: "Reach the IQAC office for accreditation queries, AQAR submissions and NBA documentation.",
          },
          {
            id: "placements-alumni",
            path: "/placements/alumni",
            eyebrow: "Placements",
            title: "Alumni",
            italic: "worldwide.",
            dek: "7,000+ MLRIT alumni working at leading MNCs and startups across the globe.",
          },
          {
            id: "placements-global-certification",
            path: "/placements/global-certification",
            eyebrow: "Placements",
            title: "Global",
            italic: "certifications.",
            dek: "AWS, Google, Microsoft, Cisco and NPTEL certifications embedded directly into the MLRIT curriculum.",
          },
          {
            id: "placements-industry-readiness",
            path: "/placements/industry-readiness",
            eyebrow: "Placements",
            title: "Industry",
            italic: "readiness.",
            dek: "The training pipeline that takes first-years to placement-ready seniors — aptitude, communication, and domain expertise.",
          },
          {
            id: "placements-mous",
            path: "/placements/mous",
            eyebrow: "Placements",
            title: "MoUs &",
            italic: "partnerships.",
            dek: "Formal industry engagements and Centres of Excellence powering hands-on learning at MLRIT.",
          },
          {
            id: "placements-statistics",
            path: "/placements/statistics",
            eyebrow: "Placements",
            title: "Year-wise",
            italic: "statistics.",
            dek: "Verified placement outcomes year on year — offers, packages, and company participation from our campus recruitment seasons.",
          },
          {
            id: "placements-support",
            path: "/placements/support",
            eyebrow: "Placements",
            title: "Contact",
            italic: "T&P Cell.",
            dek: "Recruiter enquiries, campus drive requests and corporate connect — reach the Training & Placement Cell directly.",
          },
          {
            id: "student-life-facilities",
            path: "/student-life/facilities",
            eyebrow: "Campus · Life",
            title: "Facilities &",
            italic: "Amenities",
            dek: "A solar-powered, 31-acre green campus built around student life — with every daily need within walking distance.",
          },
        ],
      },
    ],
  },

  // Secondary pages rendered by InfoPageRenderer — About, Admissions, Campus,
  // Student Life. One list keyed by slug rather than a section per page: the
  // fields are identical for all of them, and 17 near-empty configs would be
  // 17 places to keep in sync.
  //
  // Header copy only. `blocks` is a 20-kind discriminated union and needs a
  // real block editor to be safely editable; the bundled blocks still render.
  'info/pages': {
    label: 'Info pages — headers',
    // Same caveat as page headers: one list, seventeen pages, one preview.
    previewPath: '/admissions/eligibility',
    fields: [
      {
        name: 'pages',
        label: 'Pages',
        type: 'repeater',
        itemFields: [
          { name: 'slug', label: 'Page (do not change)' },
          { name: 'eyebrow', label: 'Eyebrow' },
          { name: 'title', label: 'Title' },
          { name: 'italic', label: 'Title italic tail' },
          { name: 'dek', label: 'Sub-headline' },
        ],
        defaultItems: [
          {
            id: "about-vision-mission-introduction",
            slug: "about/vision-mission/introduction",
            eyebrow: "About MLRIT",
            title: "Built Beyond",
            italic: "Classrooms",
            dek: "Since 2005, MLR Institute of Technology has been shaping engineers, thinkers, and leaders — through academics, innovation, and the culture of a campus that never stops growing.",
          },
          {
            id: "about-vision-mission-vision-mission",
            slug: "about/vision-mission/vision-mission",
            eyebrow: "Our Purpose",
            title: "Vision &",
            italic: "Mission",
            dek: "The foundational beliefs that guide every decision, programme, and experience at MLR Institute of Technology.",
          },
          {
            id: "about-legacy",
            slug: "about/legacy",
            eyebrow: "Two Decades",
            title: "The MLRIT",
            italic: "Legacy",
            dek: "From a single campus in Dundigal to a nationally recognised institution — a timeline of milestones and the leadership that built them.",
          },
          {
            id: "about-rankings-awards",
            slug: "about/rankings-awards",
            eyebrow: "Recognition",
            title: "Rankings &",
            italic: "Awards",
            dek: "National rankings, institutional accreditations, research achievements, and recognitions that reflect the quality MLRIT delivers.",
          },
          {
            id: "about-brochure",
            slug: "about/brochure",
            eyebrow: "Official Brochure",
            title: "Everything about MLRIT,",
            italic: "in one document",
            dek: "Programmes, campus life, research, sports, facilities, admissions — the complete MLRIT story, ready to download.",
          },
          {
            id: "about-messages-principal",
            slug: "about/messages/principal",
            eyebrow: "About · Messages",
            title: "",
            italic: "message.",
            dek: "From the desk of the Principal, MLR Institute of Technology.",
          },
          {
            id: "about-messages-dean",
            slug: "about/messages/dean",
            eyebrow: "About · Messages",
            title: "",
            italic: "message.",
            dek: "From the desk of the Director, MLR Institute of Technology.",
          },
          {
            id: "admissions-how-to-apply",
            slug: "admissions/how-to-apply",
            eyebrow: "Admissions",
            title: "How to",
            italic: "apply.",
            dek: "A step-by-step guide to applying to MLRIT — across B.Tech, M.Tech and MBA programmes. Source: mlrit.ac.in/admissions/.",
          },
          {
            id: "admissions-eligibility",
            slug: "admissions/eligibility",
            eyebrow: "Admissions",
            title: "Eligibility",
            italic: "criteria.",
            dek: "Programme-wise eligibility requirements for B.Tech, M.Tech and MBA admissions at MLRIT. Source: mlrit.ac.in/admissions/.",
          },
          {
            id: "admissions-fee-structure",
            slug: "admissions/fee-structure",
            eyebrow: "Admissions",
            title: "Fee",
            italic: "structure.",
            dek: "Annual fee structure across UG and PG programmes at MLRIT for 2025–26. Source: mlrit.ac.in/admissions/.",
          },
          {
            id: "admissions-scholarships",
            slug: "admissions/scholarships",
            eyebrow: "Admissions",
            title: "Scholarships",
            italic: "and aid.",
            dek: "State, central and institute-level scholarships available to MLRIT students.",
          },
          {
            id: "campus-hostels",
            slug: "campus/hostels",
            eyebrow: "Campus · Life",
            title: "Hostels",
            italic: "on campus.",
            dek: "Home away from home — purpose-built residential blocks for boys and girls, steps from the academic campus, for 1,650+ students.",
          },
          {
            id: "campus-sports",
            slug: "campus/sports",
            eyebrow: "Campus · Life",
            title: "Sports",
            italic: "at MLRIT.",
            dek: "World-class indoor and outdoor sports infrastructure, resident coaching staff, and a legacy of champions — cricket, volleyball, football, basketball, badminton and table tennis.",
          },
          {
            id: "campus-cafeteria",
            slug: "campus/cafeteria",
            eyebrow: "Campus · Life",
            title: "Cafeteria",
            italic: "& food.",
            dek: "Multiple food courts and a central cafeteria — affordable, hygienic, and open all day.",
          },
          {
            id: "campus-transport",
            slug: "campus/transport",
            eyebrow: "Campus · Life",
            title: "Transport",
            italic: "services.",
            dek: "Institute-operated buses across 40+ routes covering Hyderabad — punctual, safe, GPS-tracked.",
          },
          {
            id: "campus-clubs",
            slug: "campus/clubs",
            eyebrow: "Campus · Life",
            title: "Clubs and",
            italic: "societies.",
            dek: "From robotics and coding to dance, drama and debate — student-led clubs that build community.",
          },
          {
            id: "student-life-facilities",
            slug: "student-life/facilities",
            eyebrow: "Campus · Life",
            title: "Facilities &",
            italic: "Amenities",
            dek: "A campus built for the complete student — 26,000 sq ft indoor stadium, dual hostels, a central cafeteria, 27 bus routes, and over 30 active student clubs.",
          },
        ],
      },
    ],
  },

  // The prospectus. One field, three consumers — the admissions page, the
  // floating side button and the chatbot's quick links all linked the same
  // path independently, so replacing it meant finding all three.
  'site/documents': {
    label: 'Site — Documents',
    fields: [
      { name: 'brochure', label: 'Prospectus / brochure (PDF)', type: 'document' },
      {
        name: 'brochureLabel',
        label: 'Brochure link text',
        defaultValue: 'Download Brochure',
      },
    ],
  },

  'examinations/annual-reports': {
    label: 'Examinations — Annual reports',
    previewPath: '/examinations/annual-reports',
    fields: [
      { name: 'coeMlrinstitutionsAcIn', label: "coe@mlrinstitutions.ac.in", defaultValue: "coe@mlrinstitutions.ac.in" },
      { name: 'latest', label: "Latest", defaultValue: "Latest" },
      { name: 'contactUs', label: "Contact Us", defaultValue: "Contact Us" },
      { name: 'examinationReports', label: "examination reports.", defaultValue: "examination reports." },
      { name: 'reports', label: "Reports", defaultValue: "Reports" },
    ],
  },

  'examinations/certificates': {
    label: 'Examinations — Certificates',
    previewPath: '/examinations/certificates',
    fields: [
      { name: 'viewLabel', label: "View Form", defaultValue: "View Form" },
      { name: 'downloadLabel', label: "Download Form", defaultValue: "Download Form" },
      { name: 'attachSupportingDocumentsAnd', label: ". Attach supporting documents and proof of fee…", defaultValue: ". Attach supporting documents and proof of fee payment where applicable." },
      { name: 'coeMlrinstitutionsAcIn', label: "coe@mlrinstitutions.ac.in", defaultValue: "coe@mlrinstitutions.ac.in" },
      { name: 'contactCoeOffice', label: "Contact COE Office →", defaultValue: "Contact COE Office →" },
      { name: 'availableDocuments', label: "Available Documents", defaultValue: "Available Documents" },
      { name: 'applicationForm', label: "application form.", defaultValue: "application form." },
      { name: 'startHere', label: "Start Here", defaultValue: "Start Here" },
    ],
  },

  'examinations/circulars': {
    label: 'Examinations — Circulars',
    previewPath: '/examinations/circulars',
    fields: [
      // One row per circular. Add a row to publish a new one: pick the PDF
      // from Media (or paste its link) and it appears on /examinations/circulars,
      // newest first. Starts with the circulars that were hardcoded in the page.
      {
        name: 'circularList',
        label: 'Circulars',
        type: 'repeater',
        itemFields: [
          { name: 'title', label: 'Title' },
          { name: 'category', label: 'Category', type: 'select', options: CIRCULAR_CATEGORIES },
          { name: 'date', label: 'Date, as shown on the page (e.g. October 29, 2026)' },
          { name: 'file', label: 'PDF', type: 'document' },
        ],
        defaultItems: DEFAULT_CIRCULARS,
      },
      { name: 'viewLabel', label: "View", defaultValue: "View" },
      { name: 'downloadLabel', label: "Download", defaultValue: "Download" },
      { name: 'allDocumentsBelowAre', label: "All documents below are hosted locally. Use Vi…", multiline: true, defaultValue: "All documents below are hosted locally. Use View to open in-browser or Download to save a copy." },
      { name: 'coeMlrinstitutionsAcIn', label: "coe@mlrinstitutions.ac.in", defaultValue: "coe@mlrinstitutions.ac.in" },
      { name: 'contactUs', label: "Contact Us", defaultValue: "Contact Us" },
      { name: 'recent', label: "Recent", defaultValue: "Recent" },
      { name: 'circulars', label: "circulars.", defaultValue: "circulars." },
    ],
  },

  'examinations/citizen-charter': {
    label: 'Examinations — Citizen charter',
    previewPath: '/examinations/citizen-charter',
    fields: [
      { name: 'viewLabel', label: "View PDF", defaultValue: "View PDF" },
      { name: 'downloadLabel', label: "Download PDF", defaultValue: "Download PDF" },
      { name: 'theCitizenCharterCommits', label: "The Citizen Charter commits the Controller of …", multiline: true, defaultValue: "The Citizen Charter commits the Controller of Examinations office to delivering services within defined timelines. It also outlines the grievance redressal procedure for unresolved complaints." },
      { name: 'coeMlrinstitutionsAcIn', label: "coe@mlrinstitutions.ac.in", defaultValue: "coe@mlrinstitutions.ac.in" },
      { name: 'contactCoeOffice', label: "Contact COE Office →", defaultValue: "Contact COE Office →" },
      { name: 'grievanceRedressal', label: "Grievance Redressal", defaultValue: "Grievance Redressal" },
      { name: 'serviceStandards', label: "Service Standards", defaultValue: "Service Standards" },
      { name: 'serviceTimelines', label: "Service Timelines", defaultValue: "Service Timelines" },
      { name: 'expectFromUs', label: "expect from us.", defaultValue: "expect from us." },
    ],
  },

  'examinations/coe': {
    label: 'Examinations — Controller of Examinations',
    previewPath: '/examinations/coe',
    fields: [
      { name: 'viewLabel', label: "View Profile", defaultValue: "View Profile" },
      { name: 'downloadLabel', label: "Download Profile", defaultValue: "Download Profile" },
      { name: 'aUgcAutonomousInstitution', label: "A UGC-autonomous institution designing its own…", multiline: true, defaultValue: "A UGC-autonomous institution designing its own regulations, grading norms and academic policies — aligned with Outcome-Based Education and NEP 2020." },
      { name: 'theCoeOfficeEnsures', label: "The COE office ensures transparency, consisten…", multiline: true, defaultValue: "The COE office ensures transparency, consistency and integrity across all programmes — from timetable notification to final grade cards." },
      { name: 'examinationFramework', label: "examination framework.", defaultValue: "examination framework." },
      { name: 'contactTheCoeOffice', label: "Contact the COE Office →", defaultValue: "Contact the COE Office →" },
      { name: 'autonomousSince2015', label: "Autonomous Since 2015", defaultValue: "Autonomous Since 2015" },
      { name: 'coeOfficeDoes', label: "COE office does.", defaultValue: "COE office does." },
      { name: 'milestones', label: "milestones.", defaultValue: "milestones." },
      { name: 'functions', label: "Functions", defaultValue: "Functions" },
      { name: 'timeline', label: "Timeline", defaultValue: "Timeline" },
    ],
  },

  'examinations/contact': {
    label: 'Examinations — Contact',
    previewPath: '/examinations/contact',
    fields: [
      { name: 'medchalMalkajgiriTelangana500', label: "Medchal Malkajgiri, Telangana – 500 043", defaultValue: "Medchal Malkajgiri, Telangana – 500 043" },
      { name: 'surveyNo444Dundigal', label: "Survey No. 444, Dundigal, Gandi Maisamma", defaultValue: "Survey No. 444, Dundigal, Gandi Maisamma" },
      { name: 'openExamPortal', label: "Open Exam Portal ↗", defaultValue: "Open Exam Portal ↗" },
      { name: 'emailCoeOffice', label: "Email COE Office", defaultValue: "Email COE Office" },
      { name: 'mlrInstituteOfTechnology', label: "MLR Institute of Technology", defaultValue: "MLR Institute of Technology" },
      { name: 'coeOfficeAdministrativeBlock', label: "COE Office — Administrative Block", defaultValue: "COE Office — Administrative Block" },
      { name: 'officeLocation', label: "Office Location", defaultValue: "Office Location" },
    ],
  },

  // Footer — shown on every page, so it lives under its own `site` slug rather
  // than `home`. The Useful Links accordion is deliberately not here: it is a
  // nested structure a flat list cannot express, and it changes rarely.
  'site/footer': {
    label: 'Site — Footer',
    fields: [
      {
        name: 'links',
        label: 'Navigation links',
        type: 'repeater',
        // Flat, with `head` naming the column. Rows are grouped by head in
        // render order, so reordering rows moves both links and columns
        // without needing a nested editor.
        itemFields: [
          { name: 'head', label: 'Column' },
          { name: 'label', label: 'Label' },
          { name: 'href', label: 'Link' },
          { name: 'external', label: 'Opens in new tab (yes / blank)' },
        ],
        defaultItems: [
          { id: "about-about-mlrit-0", head: "About", label: "About MLRIT", href: "/about", external: "" },
          { id: "about-vision-mission-1", head: "About", label: "Vision & Mission", href: "/about/vision-mission/vision-mission", external: "" },
          { id: "about-legacy-2", head: "About", label: "Legacy", href: "/about/legacy", external: "" },
          { id: "about-rankings-awards-3", head: "About", label: "Rankings & Awards", href: "/about/rankings-awards", external: "" },
          { id: "about-internal-governance-4", head: "About", label: "Internal Governance", href: "/about/internal-governance", external: "" },
          { id: "admissions-overview-5", head: "Admissions", label: "Overview", href: "/admissions", external: "" },
          { id: "admissions-counselling-6", head: "Admissions", label: "Counselling", href: "/admissions/counselling", external: "" },
          { id: "admissions-scholarships-7", head: "Admissions", label: "Scholarships", href: "/admissions/scholarships", external: "" },
          { id: "admissions-fee-structure-8", head: "Admissions", label: "Fee Structure", href: "/admissions/fees", external: "" },
          { id: "admissions-why-mlrit-9", head: "Admissions", label: "Why MLRIT", href: "/admissions/why-mlrit", external: "" },
          { id: "examinations-overview-10", head: "Examinations", label: "Overview", href: "/examinations", external: "" },
          { id: "examinations-timetable-11", head: "Examinations", label: "Timetable", href: "/examinations/timetable", external: "" },
          { id: "examinations-regulations-12", head: "Examinations", label: "Regulations", href: "/examinations/regulations", external: "" },
          { id: "examinations-aqar-13", head: "Examinations", label: "AQAR", href: "/iqac/aqar", external: "" },
          { id: "follow-us-linkedin-14", head: "Follow Us", label: "LinkedIn", href: "https://www.linkedin.com/school/mlr-institute-of-technology/", external: "yes" },
          { id: "follow-us-instagram-15", head: "Follow Us", label: "Instagram", href: "https://www.instagram.com/mlritofficial/", external: "yes" },
          { id: "follow-us-facebook-16", head: "Follow Us", label: "Facebook", href: "https://www.facebook.com/Mlrit/", external: "yes" },
          { id: "follow-us-x-com-17", head: "Follow Us", label: "X.com", href: "https://x.com/mlritin", external: "yes" },
          { id: "follow-us-youtube-18", head: "Follow Us", label: "YouTube", href: "https://www.youtube.com/channel/UCAfZfemyTCM-965RZy6QiGA", external: "yes" },
        ],
      },
      {
        name: 'logos',
        label: 'Accreditation logos',
        type: 'gallery',
        itemFields: [{ name: 'name', label: 'Alt text' }],
        defaultItems: [
          { id: 'naac', key: '/legacy/nirf/naac.svg', name: 'NAAC' },
          { id: 'aicte', key: '/legacy/nirf/aicte.svg', name: 'AICTE' },
          { id: 'nba', key: '/legacy/nirf/nba.svg', name: 'NBA' },
        ],
      },
      { name: 'watermark', label: 'Watermark word', defaultValue: 'MLRIT' },
      { name: 'craftedLead', label: 'Crafted line — lead', defaultValue: 'Crafted with passion by ' },
      { name: 'craftedName', label: 'Crafted line — name', defaultValue: 'The Students' },
      { name: 'craftedTail', label: 'Crafted line — tail', defaultValue: ' of MLRIT' },
      { name: 'copyright', label: 'Copyright', defaultValue: '\u00a9 2026 KMR Educational Society' },
      {
        name: 'badges',
        label: 'Legal badges',
        type: 'repeater',
        itemFields: [{ name: 'label', label: 'Label' }],
        defaultItems: [
          { id: 'jntuh', label: 'Affiliated to JNTUH' },
          { id: 'aicte', label: 'Approved by AICTE' },
        ],
      },
    ],
  },

  'about/overview': {
    label: "About — Overview",
    previewPath: '/about',
    fields: [
      { name: 'withAClearPurpose', label: ", with a clear purpose — to bring rigorous, in…", multiline: true, defaultValue: ", with a clear purpose — to bring rigorous, industry-aligned engineering education to Telangana." },
      { name: 'acrossFiveBranchesAnd', label: "across five branches, and a consistent place i…", defaultValue: "across five branches, and a consistent place in NIRF engineering rankings." },
      { name: 'readOurFullLegacy', label: "Read our full legacy →", defaultValue: "Read our full legacy →" },
      { name: 'toABenchmarkToday', label: "to a benchmark today.", defaultValue: "to a benchmark today." },
      { name: 'fromAVisionIn', label: "From a vision in 2005", defaultValue: "From a vision in 2005" },
      { name: 'viewTimeline', label: "View timeline →", defaultValue: "View timeline →" },
      { name: 'rightEducationBrightPlacements', label: "right education, bright placements.", defaultValue: "right education, bright placements." },
      { name: 'nbaProgrammeLevelAccreditation', label: "NBA programme-level accreditation", defaultValue: "NBA programme-level accreditation" },
      { name: 'naacInstitutionalAccreditation', label: "NAAC institutional accreditation", defaultValue: "NAAC institutional accreditation" },
      { name: 'sriMarriLaxmanReddy', label: "Sri Marri Laxman Reddy Garu", defaultValue: "Sri Marri Laxman Reddy Garu" },
      { name: 'kmrEducationalSociety', label: "KMR Educational Society", defaultValue: "KMR Educational Society" },
      { name: 'autonomousStatus', label: "autonomous status", defaultValue: "autonomous status" },
      { name: 'whatDefinesUs', label: "What Defines Us", defaultValue: "What Defines Us" },
      { name: 'ourStory', label: "Our Story", defaultValue: "Our Story" },
      { name: 'mlrit', label: "MLRIT.", defaultValue: "MLRIT." },
    ],
  },
  'about/rankings-awards': {
    label: "About — Rankings & awards",
    previewPath: '/about/rankings-awards',
    fields: [
      { name: 'numbersThat', label: "Numbers that", defaultValue: "Numbers that" },
      { name: 'accreditationsRankings', label: "Accreditations & Rankings", defaultValue: "Accreditations & Rankings" },
      { name: 'speakForThemselves', label: "speak for themselves.", defaultValue: "speak for themselves." },
      { name: 'recognitions', label: "recognitions.", defaultValue: "recognitions." },
      { name: 'timeline', label: "Timeline", defaultValue: "Timeline" },
    ],
  },
  'about/vision-mission': {
    label: "About — Vision & mission",
    previewPath: '/about/vision-mission/vision-mission',
    fields: [
      { name: 'promoteAcademicExcellenceResearch', label: "Promote academic excellence, research, innovat…", multiline: true, defaultValue: "Promote academic excellence, research, innovation, and entrepreneurial skills to produce graduates with human values and leadership qualities to serve the nation." },
      { name: 'coreValues', label: "Core Values", defaultValue: "Core Values" },
      { name: 'mission', label: "Mission", defaultValue: "Mission" },
      { name: 'vision', label: "Vision", defaultValue: "Vision" },
    ],
  },
  'academics/overview': {
    label: "Academics — Overview",
    previewPath: '/academics',
    fields: [
      { name: 'everyAcademicDecisionAt', label: "Every academic decision at MLRIT runs through …", multiline: true, defaultValue: "Every academic decision at MLRIT runs through four lenses — outcome-based teaching, autonomy of regulation, industry integration, and research-led depth." },
      { name: 'pickYour', label: "Pick your", defaultValue: "Pick your" },
      { name: 'theFour', label: "The four", defaultValue: "The four" },
      { name: 'howWeTeach', label: "How We Teach", defaultValue: "How We Teach" },
      { name: 'frameworks', label: "frameworks.", defaultValue: "frameworks." },
      { name: 'explore', label: "Explore", defaultValue: "Explore" },
      { name: 'thread', label: "thread.", defaultValue: "thread." },
      { name: 'open', label: "Open →", defaultValue: "Open →" },
    ],
  },
  'admissions/b-category': {
    label: "Admissions — B-category",
    previewPath: '/admissions/b-category',
    fields: [
      { name: 'contactAdmissions', label: "Contact Admissions", defaultValue: "Contact Admissions" },
      { name: 'viewFeeStructure', label: "View Fee Structure", defaultValue: "View Fee Structure" },
      { name: 'getInTouch', label: "Get in Touch", defaultValue: "Get in Touch" },
      { name: 'managementQuota', label: "Management Quota", defaultValue: "Management Quota" },
      { name: 'admissions', label: "Admissions", defaultValue: "Admissions" },
      { name: 'bCategory', label: "B-Category", defaultValue: "B-Category" },
      { name: 'limitedSeatsAvailable', label: "Limited seats available", defaultValue: "Limited seats available" },
      { name: 'readyToJoinMlrit', label: "Ready to join MLRIT?", defaultValue: "Ready to join MLRIT?" },
      { name: 'admissions2', label: "Admissions", defaultValue: "Admissions" },
      { name: 'bCategory2', label: "B-Category", defaultValue: "B-Category" },
      { name: 'home', label: "Home", defaultValue: "Home" },
    ],
  },
  'admissions/fees': {
    label: "Admissions — Fees",
    previewPath: '/admissions/fees',
    fields: [
      { name: 'feeStructureIsSubject', label: "Fee structure is subject to revision by the re…", multiline: true, defaultValue: "Fee structure is subject to revision by the respective fee regulatory authority each academic year. Fees shown are for AY 2025–26. Management quota fees differ from convener quota and are available on request." },
      { name: 'howToApply', label: "How to Apply", defaultValue: "How to Apply" },
      { name: 'theseAreInAddition', label: "These are in addition to the annual tuition fe…", defaultValue: "These are in addition to the annual tuition fee." },
      { name: 'acceptedPaymentModes', label: "Accepted Payment Modes", defaultValue: "Accepted Payment Modes" },
      { name: 'approxTotalYear', label: "Approx. Total / Year", defaultValue: "Approx. Total / Year" },
      { name: 'approxTotalYear2', label: "Approx. total / year", defaultValue: "Approx. total / year" },
      { name: 'otherFeesCharges', label: "Other Fees & Charges", defaultValue: "Other Fees & Charges" },
      { name: 'tuitionFeeYear', label: "Tuition Fee / Year", defaultValue: "Tuition Fee / Year" },
      { name: 'feeRevisionNote', label: "Fee Revision Note", defaultValue: "Fee Revision Note" },
      { name: 'tuitionYear', label: "Tuition / year", defaultValue: "Tuition / year" },
      { name: 'programme', label: "Programme", defaultValue: "Programme" },
    ],
  },
  'admissions/why-mlrit': {
    label: "Admissions — Why MLRIT",
    previewPath: '/admissions/why-mlrit',
    fields: [
      { name: 'fiveLettersOneStory', label: "Five letters. One story.", defaultValue: "Five letters. One story." },
      { name: 'everyLetterOfMlrit', label: "Every letter of MLRIT stands", defaultValue: "Every letter of MLRIT stands" },
      { name: 'scrollToExplore', label: "Scroll to explore", defaultValue: "Scroll to explore" },
      { name: 'youCanFeel', label: "you can feel.", defaultValue: "you can feel." },
    ],
  },
  'chronicles/overview': {
    label: "Chronicles — Overview",
    previewPath: '/chronicles',
    fields: [
      { name: 'inBrief', label: "In Brief", defaultValue: "In Brief" },
      { name: 'today', label: "Today", defaultValue: "Today" },
      { name: 'liveWire', label: "Live Wire", defaultValue: "Live Wire" },
      { name: 'twelveMonthsOneCampus', label: "Twelve months, one campus", defaultValue: "Twelve months, one campus" },
      { name: 'olderStories', label: "Older stories", defaultValue: "Older stories" },
      { name: 'theCampusBroadsheetOf', label: "The campus broadsheet of MLR Institute of Tech…", defaultValue: "The campus broadsheet of MLR Institute of Technology" },
      { name: 'campusResearchPlacementsSport', label: "Campus · Research · Placements · Sport", defaultValue: "Campus · Research · Placements · Sport" },
      { name: 'continueReading', label: "Continue reading →", defaultValue: "Continue reading →" },
      { name: 'mlritChronicles', label: "MLRIT Chronicles", defaultValue: "MLRIT Chronicles" },
      { name: 'mlritHyderabad', label: "MLRIT · HYDERABAD", defaultValue: "MLRIT · HYDERABAD" },
      { name: 'volVNo23', label: "VOL. V · NO. 23", defaultValue: "VOL. V · NO. 23" },
      { name: 'springEdition', label: "SPRING EDITION", defaultValue: "SPRING EDITION" },
      { name: 'mostRead', label: "Most Read", defaultValue: "Most Read" },
    ],
  },
  'departments/pg': {
    label: "Departments — PG programmes",
    previewPath: '/departments/pg',
    fields: [
      { name: 'fourResearchLedM', label: "Four research-led M.Tech tracks across CSE, VL…", defaultValue: "Four research-led M.Tech tracks across CSE, VLSI, Power Systems and Aerospace Propulsion." },
      { name: 'exploreMbaProgramme', label: "Explore MBA programme →", defaultValue: "Explore MBA programme →" },
      { name: 'mTech', label: "M.Tech", defaultValue: "M.Tech" },
    ],
  },
  'departments/ug': {
    label: "Departments — UG programmes",
    previewPath: '/departments/ug',
    fields: [
      { name: 'everyBTechBranch', label: "Every B.Tech branch at MLRIT is JNTUH-affiliat…", multiline: true, defaultValue: "Every B.Tech branch at MLRIT is JNTUH-affiliated, AICTE-approved and offered as a 4-year programme." },
      { name: 'engineering', label: "Engineering", defaultValue: "Engineering" },
      { name: 'open', label: "Open →", defaultValue: "Open →" },
    ],
  },
  'examinations/downloads': {
    label: "Examinations — Downloads",
    previewPath: '/examinations/downloads',
    fields: [
      { name: 'view', label: "View", defaultValue: "View" },
      { name: 'download', label: "Download", defaultValue: "Download" },
      { name: 'downloadPrintAndSubmit', label: "Download, print and submit these forms to the …", multiline: true, defaultValue: "Download, print and submit these forms to the COE office with supporting documents and prescribed fees." },
      { name: 'current', label: "Current", defaultValue: "Current" },
      { name: 'academicCalendars', label: "Academic Calendars", defaultValue: "Academic Calendars" },
      { name: 'studentForms', label: "Student Forms", defaultValue: "Student Forms" },
      { name: 'documents', label: "documents.", defaultValue: "documents." },
      { name: 'calendars', label: "calendars.", defaultValue: "calendars." },
      { name: 'forms', label: "forms.", defaultValue: "forms." },
    ],
  },
  'examinations/fee-results': {
    label: "Examinations — Fees & results",
    previewPath: '/examinations/fee-results',
    fields: [
      { name: 'semesterResultsArePublished', label: "Semester results are published on the MLRIT Ex…", multiline: true, defaultValue: "Semester results are published on the MLRIT Exam Portal within the timelines specified in the academic calendar. Log in with your student credentials to view and download your grade sheet." },
      { name: 'theMlritExaminationsPortal', label: "The MLRIT Examinations Portal is the single de…", multiline: true, defaultValue: "The MLRIT Examinations Portal is the single destination for paying examination fees, accessing results and downloading hall tickets." },
      { name: 'contactCoeForResult', label: "Contact COE for Result Queries →", defaultValue: "Contact COE for Result Queries →" },
      { name: 'viewResultsOnPortal', label: "View Results on Portal ↗", defaultValue: "View Results on Portal ↗" },
      { name: 'mlritExaminationsPortal', label: "MLRIT Examinations Portal", defaultValue: "MLRIT Examinations Portal" },
      { name: 'openExamPortal', label: "Open Exam Portal ↗", defaultValue: "Open Exam Portal ↗" },
      { name: 'feePaymentAndResults', label: "Fee payment and results", defaultValue: "Fee payment and results" },
      { name: 'areOnTheExam', label: "are on the Exam Portal.", defaultValue: "are on the Exam Portal." },
      { name: 'fourSteps', label: "four steps.", defaultValue: "four steps." },
      { name: 'howToPay', label: "How to Pay", defaultValue: "How to Pay" },
      { name: 'results', label: "results.", defaultValue: "results." },
      { name: 'results2', label: "Results", defaultValue: "Results" },
    ],
  },
  'examinations/notifications': {
    label: "Examinations — Notifications",
    previewPath: '/examinations/notifications',
    fields: [
      { name: 'view', label: "View", defaultValue: "View" },
      { name: 'download', label: "Download", defaultValue: "Download" },
      { name: 'resultsDeclarationsMarkVerifications', label: "Results declarations, mark verifications and r…", multiline: true, defaultValue: "Results declarations, mark verifications and revaluation notices. Use View to open in-browser or Download to save a copy." },
      { name: 'coeMlrinstitutionsAcIn', label: "coe@mlrinstitutions.ac.in", defaultValue: "coe@mlrinstitutions.ac.in" },
      { name: 'new', label: "New", defaultValue: "New" },
      { name: 'notifications', label: "notifications.", defaultValue: "notifications." },
    ],
  },
  'examinations/pyqs': {
    label: "Examinations — Previous papers",
    previewPath: '/examinations/pyqs',
    fields: [
      { name: 'bTech', label: "B.Tech", defaultValue: "B.Tech" },
      { name: 'bgGreen50Border', label: "bg-green-50 border-green-200 text-secondary", defaultValue: "bg-green-50 border-green-200 text-secondary" },
      { name: 'mTechMba', label: "M.Tech / MBA", defaultValue: "M.Tech / MBA" },
      { name: 'bgOrange50Border', label: "bg-orange-50 border-orange-200 text-primary", defaultValue: "bg-orange-50 border-orange-200 text-primary" },
      { name: 'semesterWiseArchivesFrom', label: "Semester-wise archives from 2016 to 2026, orga…", defaultValue: "Semester-wise archives from 2016 to 2026, organised by year." },
      { name: 'pgProgrammeArchivesFrom', label: "PG programme archives from 2020 to 2026.", defaultValue: "PG programme archives from 2020 to 2026." },
      { name: 'mlritExamPortal', label: "MLRIT Exam Portal", defaultValue: "MLRIT Exam Portal" },
      { name: 'questionPapers', label: "Question Papers.", defaultValue: "Question Papers." },
      { name: 'winrar', label: "WinRAR", defaultValue: "WinRAR" },
      { name: 'undergraduate', label: "Undergraduate", defaultValue: "Undergraduate" },
      { name: 'text7Zip', label: "7-Zip", defaultValue: "7-Zip" },
      { name: 'postgraduate', label: "Postgraduate", defaultValue: "Postgraduate" },
    ],
  },
  'examinations/regulations': {
    label: "Examinations — Regulations",
    previewPath: '/examinations/regulations',
    fields: [
      { name: 'asAnAutonomousInstitution', label: "As an autonomous institution since 2015, MLRIT…", multiline: true, defaultValue: "As an autonomous institution since 2015, MLRIT designs its own regulations approved by UGC and affiliated to JNTUH. Download the applicable regulation PDF for your programme and batch year." },
      { name: 'examinationPolicyPdf', label: "Examination Policy PDF", defaultValue: "Examination Policy PDF" },
      { name: 'examinationsSupport', label: "Examinations Support", defaultValue: "Examinations Support" },
      { name: 'allRegulations', label: "All Regulations", defaultValue: "All Regulations" },
      { name: 'programme', label: "Programme", defaultValue: "Programme" },
      { name: 'regulations', label: "regulations.", defaultValue: "regulations." },
    ],
  },
  'examinations/student-verifications': {
    label: "Examinations — Student verifications",
    previewPath: '/examinations/student-verifications',
    fields: [
      { name: 'viewForm', label: "View Form", defaultValue: "View Form" },
      { name: 'downloadForm', label: "Download Form", defaultValue: "Download Form" },
      { name: 'downloadAndCompleteThe', label: "Download and complete the Student Verification…", multiline: true, defaultValue: "Download and complete the Student Verification Form. This form is required for all credential authentication requests submitted to the COE office." },
      { name: 'text57WorkingDays', label: "5–7 working days for standard requests. Urgent…", multiline: true, defaultValue: "5–7 working days for standard requests. Urgent requests may be accommodated subject to workload — contact the office in advance." },
      { name: 'attachACopyOf', label: ". Attach a copy of the document to be verified…", defaultValue: ". Attach a copy of the document to be verified and a valid government-issued ID proof." },
      { name: 'downloadTheVerificationForm', label: "Download the Verification Form", defaultValue: "Download the Verification Form" },
      { name: 'coeMlrinstitutionsAcIn', label: "coe@mlrinstitutions.ac.in", defaultValue: "coe@mlrinstitutions.ac.in" },
      { name: 'submitToTheCoe', label: "Submit to the COE Office", defaultValue: "Submit to the COE Office" },
      { name: 'pageForOfficeDetails', label: "page for office details.", defaultValue: "page for office details." },
      { name: 'verificationIsAcceptedFor', label: "Verification is accepted for", defaultValue: "Verification is accepted for" },
      { name: 'processingTime', label: "Processing time:", defaultValue: "Processing time:" },
      { name: 'contactUs', label: "Contact Us", defaultValue: "Contact Us" },
      { name: 'step1', label: "Step 1", defaultValue: "Step 1" },
      { name: 'step2', label: "Step 2", defaultValue: "Step 2" },
    ],
  },
  'examinations/timetable-external': {
    label: "Examinations — External timetable",
    previewPath: '/examinations/timetable/external',
    fields: [
      { name: 'viewPdf', label: "View PDF", defaultValue: "View PDF" },
      { name: 'download', label: "Download", defaultValue: "Download" },
      { name: 'allTimetablesAreHosted', label: "All timetables are hosted locally. Use View to…", defaultValue: "All timetables are hosted locally. Use View to open in-browser or Download to save a copy." },
      { name: 'current', label: "Current", defaultValue: "Current" },
      { name: 'coeOffice', label: "COE office", defaultValue: "COE office" },
      { name: 'circulars', label: "Circulars", defaultValue: "Circulars" },
      { name: 'schedules', label: "schedules.", defaultValue: "schedules." },
    ],
  },
  'examinations/timetable-internal': {
    label: "Examinations — Internal timetable",
    previewPath: '/examinations/timetable/internal',
    fields: [
      { name: 'viewPdf', label: "View PDF", defaultValue: "View PDF" },
      { name: 'download', label: "Download", defaultValue: "Download" },
      { name: 'midTermAndUnit', label: "Mid-term and unit test timetables published by…", multiline: true, defaultValue: "Mid-term and unit test timetables published by the COE. Use View to open in-browser or Download to save a copy." },
      { name: 'current', label: "Current", defaultValue: "Current" },
      { name: 'coeOffice', label: "COE office", defaultValue: "COE office" },
      { name: 'schedules', label: "schedules.", defaultValue: "schedules." },
    ],
  },
  'iqac/composition': {
    label: "IQAC — Composition",
    previewPath: '/iqac/composition',
    fields: [
      { name: 'anAcclaimedAcademicianAnd', label: "An acclaimed academician and administrator in …", multiline: true, defaultValue: "An acclaimed academician and administrator in the field of technical education with more than 21 years of academic experience. Former Head of the Science and Humanities Department at MLR Institute of Technology." },
      { name: 'sheHasOrganisedAnd', label: "She has organised and attended several Nationa…", multiline: true, defaultValue: "She has organised and attended several National and International Conferences, Seminars and Workshops, and has published nearly 20 research papers in Journals of National and International Repute." },
      { name: 'theIqacFunctionsAs', label: "The IQAC functions as the nodal agency for qua…", multiline: true, defaultValue: "The IQAC functions as the nodal agency for quality assurance and enhancement, ensuring that the institution continuously improves its academic and administrative performance." },
      { name: 'theIqacFunctionsAs2', label: "The IQAC functions as the nodal agency for qua…", multiline: true, defaultValue: "The IQAC functions as the nodal agency for quality assurance and enhancement, bringing together institutional leadership, faculty, and external experts." },
      { name: 'tcosSmartMaterialsHigher', label: "TCOs · Smart Materials · Higher Education · IC…", defaultValue: "TCOs · Smart Materials · Higher Education · ICT in Education" },
      { name: 'densityFunctionalTheoryTransparent', label: "Density Functional Theory · Transparent Conduc…", defaultValue: "Density Functional Theory · Transparent Conducting Oxides" },
      { name: 'hyderabadCentralUniversity', label: "Hyderabad Central University", defaultValue: "Hyderabad Central University" },
      { name: 'iqacMemberComposition', label: "IQAC Member Composition", defaultValue: "IQAC Member Composition" },
      { name: 'mScPhD', label: "M.Sc., Ph.D — Physics", defaultValue: "M.Sc., Ph.D — Physics" },
      { name: 'drRadhikaDeviV', label: "Dr. Radhika Devi V", defaultValue: "Dr. Radhika Devi V" },
      { name: 'specialisation', label: "Specialisation", defaultValue: "Specialisation" },
      { name: 'researchFocus', label: "Research Focus", defaultValue: "Research Focus" },
      { name: 'qualification', label: "Qualification", defaultValue: "Qualification" },
      { name: 'iqacMembers', label: "IQAC Members", defaultValue: "IQAC Members" },
      { name: 'headIqac', label: "Head IQAC", defaultValue: "Head IQAC" },
      { name: 'category', label: "Category", defaultValue: "Category" },
      { name: 'position', label: "Position", defaultValue: "Position" },
    ],
  },
  'iqac/naac': {
    label: "IQAC — NAAC",
    previewPath: '/iqac/naac',
    fields: [
      { name: 'mlritIsAccreditedBy', label: "MLRIT is accredited by NAAC. Below are the key…", defaultValue: "MLRIT is accredited by NAAC. Below are the key documents available for public download." },
      { name: 'forDirectDocumentAccess', label: "For direct document access, write to the IQAC …", defaultValue: "For direct document access, write to the IQAC office at" },
      { name: 'availableOnRequestContact', label: "Available on request — contact", defaultValue: "Available on request — contact" },
      { name: 'iqacMlrinstitutionsAcIn', label: "iqac@mlrinstitutions.ac.in", defaultValue: "iqac@mlrinstitutions.ac.in" },
      { name: 'accreditation', label: "Accreditation", defaultValue: "Accreditation" },
      { name: 'document', label: "Document", defaultValue: "Document" },
    ],
  },
  'placements/drives': {
    label: "Placements — Drives",
    previewPath: '/placements/drives',
    fields: [
      { name: 'maxWidth768px100vw', label: "(max-width: 768px) 100vw, 1280px", defaultValue: "(max-width: 768px) 100vw, 1280px" },
      { name: 'maxWidth768px50vw', label: "(max-width: 768px) 50vw, 25vw", defaultValue: "(max-width: 768px) 50vw, 25vw" },
      { name: 'industryPartnersRecruitDirectly', label: "Industry partners recruit directly from campus…", multiline: true, defaultValue: "Industry partners recruit directly from campus — bringing pre-placement talks, assessments, and offer sessions to MLRIT every year." },
      { name: 'placement', label: "Placement", defaultValue: "Placement" },
      { name: 'onCampus', label: "On Campus", defaultValue: "On Campus" },
      { name: 'drives', label: "Drives.", defaultValue: "Drives." },
    ],
  },
  'placements/global-certification': {
    label: "Placements — Global certification",
    previewPath: '/placements/global-certification',
    fields: [
      { name: 'additionalCertificationPartnersFull', label: "Additional certification partners — full progr…", multiline: true, defaultValue: "Additional certification partners — full programme details updated as institutional records are confirmed." },
      { name: 'beyondThe', label: "Beyond the", defaultValue: "Beyond the" },
      { name: 'verified', label: "Verified", defaultValue: "Verified" },
      { name: 'certificationPartners', label: "Certification Partners", defaultValue: "Certification Partners" },
      { name: 'more', label: "More", defaultValue: "More" },
      { name: 'certifications', label: "certifications.", defaultValue: "certifications." },
      { name: 'whyItMatters', label: "Why It Matters", defaultValue: "Why It Matters" },
      { name: 'programmes', label: "programmes.", defaultValue: "programmes." },
      { name: 'partner', label: "Partner", defaultValue: "Partner" },
      { name: 'degree', label: "degree.", defaultValue: "degree." },
    ],
  },
  'placements/industry-readiness': {
    label: "Placements — Industry readiness",
    previewPath: '/placements/industry-readiness',
    fields: [
      { name: 'preparation', label: "Preparation", defaultValue: "Preparation" },
      { name: 'branchWise', label: "Branch-wise", defaultValue: "Branch-wise" },
      { name: 'curriculum', label: "Curriculum", defaultValue: "Curriculum" },
      { name: 'training', label: "training.", defaultValue: "training." },
      { name: 'areas', label: "areas.", defaultValue: "areas." },
    ],
  },
  'placements/overview': {
    label: "Placements — Overview",
    previewPath: '/placements/overview',
    fields: [
      { name: 'twentyOneYearsOf', label: "Twenty-one years of building industry-ready pr…", multiline: true, defaultValue: "Twenty-one years of building industry-ready professionals — every year, MLRIT places 81%+ of its graduating class." },
      { name: 'exploreThePlacementsSection', label: "Explore the Placements Section", defaultValue: "Explore the Placements Section" },
      { name: 'explore', label: "Explore →", defaultValue: "Explore →" },
      { name: 'placementsApart', label: "placements apart.", defaultValue: "placements apart." },
      { name: 'mlritPlacements', label: "MLRIT placements.", defaultValue: "MLRIT placements." },
      { name: 'begin', label: "begin.", defaultValue: "begin." },
      { name: 'whyMlrit', label: "Why MLRIT", defaultValue: "Why MLRIT" },
      { name: 'overview', label: "Overview", defaultValue: "Overview" },
    ],
  },
  'research/support': {
    label: "Research — Support",
    previewPath: '/research/support',
    fields: [
      { name: 'medchalMalkajgiriTelangana500', label: "Medchal Malkajgiri, Telangana – 500 043", defaultValue: "Medchal Malkajgiri, Telangana – 500 043" },
      { name: 'surveyNo444Dundigal', label: "Survey No. 444, Dundigal, Gandi Maisamma", defaultValue: "Survey No. 444, Dundigal, Gandi Maisamma" },
      { name: 'emailRDCell', label: "Email R&D Cell", defaultValue: "Email R&D Cell" },
      { name: 'mlrInstituteOfTechnology', label: "MLR Institute of Technology", defaultValue: "MLR Institute of Technology" },
      { name: 'rDCellResearch', label: "R&D Cell — Research Block", defaultValue: "R&D Cell — Research Block" },
      { name: 'phoneToBeUpdated', label: "Phone — To be updated", defaultValue: "Phone — To be updated" },
      { name: 'officeLocation', label: "Office Location", defaultValue: "Office Location" },
    ],
  },
  'student-life/overview': {
    label: "Student life — Overview",
    previewPath: '/student-life',
    fields: [
      { name: 'aLifetimeOfMemories', label: "A lifetime of memories", defaultValue: "A lifetime of memories" },
      { name: 'maxWidth768px80vw', label: "(max-width: 768px) 80vw, 38vw", defaultValue: "(max-width: 768px) 80vw, 38vw" },
      { name: 'maxWidth1360px100vw', label: "(max-width: 1360px) 100vw, 1360px", defaultValue: "(max-width: 1360px) 100vw, 1360px" },
      { name: 'diveIntoCampusClubs', label: "Dive into campus clubs, cultural fests, sports…", multiline: true, defaultValue: "Dive into campus clubs, cultural fests, sports leagues, and academic competitions that spark growth and lasting memories. At MLRIT, every event is a chance to discover your passion, build your network, and create experiences that stay with you long after graduation." },
      { name: 'whereLearningMeetsLiving', label: "Where learning meets living — every day on cam…", defaultValue: "Where learning meets living — every day on campus" },
      { name: 'celebrateCampus', label: "Celebrate Campus", defaultValue: "Celebrate Campus" },
      { name: 'engagements', label: "Engagements", defaultValue: "Engagements" },
      { name: 'welcomeToStudentLife', label: "Welcome to Student Life", defaultValue: "Welcome to Student Life" },
      { name: 'mlrInstituteOfTechnology', label: "MLR Institute of Technology", defaultValue: "MLR Institute of Technology" },
    ],
  },
  'admissions/overview': {
    label: "Admissions — Overview",
    previewPath: '/admissions',
    fields: [
      { name: 'weBelieveNoStudent', label: "We believe no student should miss out on quali…", multiline: true, defaultValue: "We believe no student should miss out on quality education for financial reasons. MLRIT disburses scholarships across merit, need, sports and SC/ST categories every year." },
      { name: 'mlritOpensItsDoors', label: "MLRIT opens its doors to students who are curi…", multiline: true, defaultValue: "MLRIT opens its doors to students who are curious, driven and ready to shape the future. A transparent, merit-based admissions process — designed for you." },
      { name: 'exploreScholarships', label: "Explore Scholarships", defaultValue: "Explore Scholarships" },
      { name: 'viewFeeStructure', label: "View Fee Structure", defaultValue: "View Fee Structure" },
      { name: 'exploreMore', label: "Explore More", defaultValue: "Explore More" },
      { name: 'admissions202526', label: "Admissions 2025–26", defaultValue: "Admissions 2025–26" },
      { name: 'downloadBrochure', label: "Download Brochure", defaultValue: "Download Brochure" },
      { name: 'checkDetails', label: "Check Details", defaultValue: "Check Details" },
      { name: 'bCatDetails', label: "B-Cat Details", defaultValue: "B-Cat Details" },
      { name: 'bCategory', label: "B-Category", defaultValue: "B-Category" },
      { name: 'whyMlrit', label: "Why MLRIT", defaultValue: "Why MLRIT" },
      { name: 'admissions', label: "§ Admissions", defaultValue: "§ Admissions" },
      { name: 'scholarships', label: "Scholarships", defaultValue: "Scholarships" },
      { name: 'fiveStepsTo', label: "Five steps to", defaultValue: "Five steps to" },
      { name: 'scholarship', label: "Scholarship", defaultValue: "Scholarship" },
      { name: 'fees', label: "Fees &", defaultValue: "Fees &" },
      { name: 'financialSupport', label: "Financial Support", defaultValue: "Financial Support" },
      { name: 'howToApply', label: "How to Apply", defaultValue: "How to Apply" },
      { name: 'admissions2', label: "Admissions", defaultValue: "Admissions" },
      { name: 'yourSeat', label: "your seat.", defaultValue: "your seat." },
      { name: 'types', label: "types.", defaultValue: "types." },
      { name: 'home', label: "Home", defaultValue: "Home" },
    ],
  },
  'admissions/counselling': {
    label: "Admissions — Counselling",
    previewPath: '/admissions/counselling',
    fields: [
      { name: 'datesAreIndicativeRefer', label: "Dates are indicative. Refer to the official AP…", multiline: true, defaultValue: "Dates are indicative. Refer to the official AP/TS EAMCET counselling website for confirmed schedules." },
      { name: 'gateQualifiedCandidatesMay', label: "GATE qualified candidates may also be consider…", multiline: true, defaultValue: "GATE qualified candidates may also be considered for direct admission subject to seat availability." },
      { name: 'referToTheOfficial', label: "Refer to the official AP ICET / TS ICET websit…", defaultValue: "Refer to the official AP ICET / TS ICET website for confirmed schedules." },
      { name: 'text30OfSeatsIn', label: "30% of seats in each branch are filled under M…", multiline: true, defaultValue: "30% of seats in each branch are filled under Management Quota based on eligibility as per JNTU rules." },
      { name: 'downloadBCategoryForm', label: "Download B-Category Form", defaultValue: "Download B-Category Form" },
      { name: 'carryOriginalsAndOne', label: "Carry originals and one set of photocopies on …", defaultValue: "Carry originals and one set of photocopies on the day of verification." },
      { name: 'eligibilityCriteria', label: "Eligibility Criteria", defaultValue: "Eligibility Criteria" },
      { name: 'importantInstructions', label: "Important Instructions", defaultValue: "Important Instructions" },
      { name: 'counsellingSchedule', label: "Counselling Schedule", defaultValue: "Counselling Schedule" },
      { name: 'indicativeDatesForAp', label: "Indicative dates for AP/TS state counselling r…", defaultValue: "Indicative dates for AP/TS state counselling rounds in 2025." },
      { name: 'cutoffRanks202425', label: "Cutoff Ranks 2024–25", defaultValue: "Cutoff Ranks 2024–25" },
      { name: 'howToApply', label: "How to Apply", defaultValue: "How to Apply" },
      { name: 'stepByStepWalkthrough', label: "Step-by-step walkthrough from application to c…", defaultValue: "Step-by-step walkthrough from application to confirmation." },
      { name: 'requiredDocuments', label: "Required Documents", defaultValue: "Required Documents" },
      { name: 'admissionProcess', label: "Admission Process", defaultValue: "Admission Process" },
      { name: 'ourAdmissionsTeamIs', label: "Our admissions team is available Mon–Sat, 9 AM…", defaultValue: "Our admissions team is available Mon–Sat, 9 AM – 5 PM." },
      { name: 'admissionsMlrinstitutionsAcIn', label: "admissions@mlrinstitutions.ac.in", defaultValue: "admissions@mlrinstitutions.ac.in" },
      { name: 'needHelpWithAdmissions', label: "Need help with admissions?", defaultValue: "Need help with admissions?" },
      { name: 'admissionsHelpdesk', label: "Admissions Helpdesk", defaultValue: "Admissions Helpdesk" },
    ],
  },
  'admissions/support': {
    label: "Admissions — Support",
    previewPath: '/admissions/support',
    fields: [
      { name: 'searchQuestionsEG', label: "Search questions — e.g. 'hostel', 'fee', 'docu…", defaultValue: "Search questions — e.g. 'hostel', 'fee', 'documents'…" },
      { name: 'infoMlrinstitutionsAcIn', label: "info@mlrinstitutions.ac.in", defaultValue: "info@mlrinstitutions.ac.in" },
      { name: 'ourAdmissionsTeamIs', label: "Our admissions team is available Monday to Sat…", defaultValue: "Our admissions team is available Monday to Saturday, 9 AM – 5 PM." },
      { name: 'telangana500043', label: "Telangana – 500 043", defaultValue: "Telangana – 500 043" },
      { name: 'dundigalVSurveyNo', label: "Dundigal V, Survey No. 444, Dundigal,", defaultValue: "Dundigal V, Survey No. 444, Dundigal," },
      { name: 'gandiMaisammaMedchalMalkajgiri', label: "Gandi Maisamma, Medchal Malkajgiri,", defaultValue: "Gandi Maisamma, Medchal Malkajgiri," },
      { name: 'stillHaveQuestions', label: "Still have questions?", defaultValue: "Still have questions?" },
      { name: 'generalEnquiries', label: "General Enquiries", defaultValue: "General Enquiries" },
      { name: 'officialAddress', label: "Official Address", defaultValue: "Official Address" },
      { name: 'keyContacts', label: "Key Contacts", defaultValue: "Key Contacts" },
      { name: 'searchFaqs', label: "Search FAQs", defaultValue: "Search FAQs" },
      { name: 'designation', label: "Designation", defaultValue: "Designation" },
      { name: 'eapcetCode', label: "EAPCET Code", defaultValue: "EAPCET Code" },
      { name: 'reachUs', label: "Reach Us", defaultValue: "Reach Us" },
      { name: 'contact', label: "Contact", defaultValue: "Contact" },
      { name: 'email', label: "Email", defaultValue: "Email" },
      { name: 'name', label: "Name", defaultValue: "Name" },
    ],
  },
  'admissions/scholarships': {
    label: "Admissions — Scholarships",
    previewPath: '/admissions/scholarships',
    fields: [
      { name: 'studentsMayAlsoBenefit', label: "Students may also benefit from the following s…", multiline: true, defaultValue: "Students may also benefit from the following state and central government schemes: AP ePass / TS ePass fee reimbursement, Post-Matric Scholarship for SC/ST/OBC, EWS scholarships, and AICTE/UGC sponsored fellowships." },
      { name: 'allScholarshipAndFee', label: "All scholarship and fee-reimbursement applicat…", multiline: true, defaultValue: "All scholarship and fee-reimbursement applications must be submitted during or within 30 days of admission. Late applications may not be considered. For queries, contact the accounts or student affairs office." },
      { name: 'telanganaEpassPortal', label: "Telangana ePass Portal ↗", defaultValue: "Telangana ePass Portal ↗" },
      { name: 'applicationsAreProcessedAt', label: "Applications are processed at the time of admi…", defaultValue: "Applications are processed at the time of admission" },
      { name: 'governmentExternalSchemes', label: "Government & External Schemes", defaultValue: "Government & External Schemes" },
    ],
  },
  'admissions/by-degree': {
    label: "Admissions — By degree",
    previewPath: '/admissions/by-degree',
    fields: [
      { name: 'admissionCriteria', label: "Admission Criteria", defaultValue: "Admission Criteria" },
    ],
  },
  'examinations/syllabus': {
    label: "Examinations — Syllabus",
    previewPath: '/examinations/syllabus',
    fields: [
      { name: 'syllabusDataForThis', label: "Syllabus data for this combination is not yet …", defaultValue: "Syllabus data for this combination is not yet available." },
      { name: 'subjectsAppearHereEach', label: "Subjects appear here — each links to its offic…", defaultValue: "Subjects appear here — each links to its official syllabus PDF" },
      { name: 'selectDepartmentRegulationAnd', label: "Select department, regulation and semester abo…", defaultValue: "Select department, regulation and semester above" },
      { name: 'checkExamPortal', label: "Check Exam Portal →", defaultValue: "Check Exam Portal →" },
      { name: 'step1Department', label: "Step 1 — Department", defaultValue: "Step 1 — Department" },
      { name: 'step2Regulation', label: "Step 2 — Regulation", defaultValue: "Step 2 — Regulation" },
      { name: 'step3Semester', label: "Step 3 — Semester", defaultValue: "Step 3 — Semester" },
      { name: 'noSemestersAvailableFor', label: "No semesters available for this combination.", defaultValue: "No semesters available for this combination." },
    ],
  },
  'placements/alumni': {
    label: "Placements — Alumni",
    previewPath: '/placements/alumni',
    fields: [
      { name: 'alumniPortalLinkWill', label: "Alumni portal link will be published once conf…", defaultValue: "Alumni portal link will be published once confirmed by the institution." },
      { name: 'alumniPortalComingSoon', label: "Alumni Portal — Coming Soon", defaultValue: "Alumni Portal — Coming Soon" },
      { name: 'contactTPCell', label: "Contact T&P Cell", defaultValue: "Contact T&P Cell" },
      { name: 'alumniNetwork', label: "Alumni Network", defaultValue: "Alumni Network" },
      { name: 'member', label: "Member.", defaultValue: "Member." },
    ],
  },
  'about/internal-governance': {
    label: "About — Internal governance",
    previewPath: '/about/internal-governance',
    fields: [
      { name: 'thePeopleWhoLead', label: "The people who lead and shape MLR Institute of…", defaultValue: "The people who lead and shape MLR Institute of Technology." },
      { name: 'principal', label: "Principal.", defaultValue: "Principal." },
      { name: 'leadership', label: "Leadership", defaultValue: "Leadership" },
    ],
  },
  'site/faculty-profile': {
    label: "Site-wide — Faculty profile labels",
    previewPath: '/faculty/s-k-lokesh-naik-cse',
    fields: [
      { name: 'googleScholar', label: "Google Scholar", defaultValue: "Google Scholar" },
      { name: 'teachingExperience', label: "Teaching Experience", defaultValue: "Teaching Experience" },
      { name: 'linkedin', label: "LinkedIn", defaultValue: "LinkedIn" },
      { name: 'scopus', label: "Scopus", defaultValue: "Scopus" },
      { name: 'profiles', label: "Profiles", defaultValue: "Profiles" },
      { name: 'designation', label: "Designation", defaultValue: "Designation" },
      { name: 'department', label: "Department", defaultValue: "Department" },
      { name: 'empId', label: "Emp ID", defaultValue: "Emp ID" },
      { name: 'email', label: "Email", defaultValue: "Email" },
      { name: 'academicQualifications', label: "Academic Qualifications", defaultValue: "Academic Qualifications" },
      { name: 'areasOfSpecialisation', label: "Areas of Specialisation", defaultValue: "Areas of Specialisation" },
      { name: 'booksBookChapters', label: "Books & Book Chapters", defaultValue: "Books & Book Chapters" },
      { name: 'subjectsTaught', label: "Subjects Taught", defaultValue: "Subjects Taught" },
      { name: 'publications', label: "Publications", defaultValue: "Publications" },
      { name: 'profile', label: "Profile", defaultValue: "Profile" },
      { name: 'patents', label: "Patents", defaultValue: "Patents" },
    ],
  },
  'site/research-profile': {
    label: "Site-wide — Research page labels",
    previewPath: '/research/support',
    fields: [
      { name: 'researchAreas', label: "research areas", defaultValue: "research areas" },
    ],
  },
  'site/syllabus-regulation': {
    label: "Site-wide — Syllabus regulation labels",
    previewPath: '/departments/syllabus/aiml/r25',
    fields: [
      { name: 'viewPdf', label: "View PDF ↗", defaultValue: "View PDF ↗" },
      { name: 'otherRegulations', label: "Other Regulations", defaultValue: "Other Regulations" },
      { name: 'syllabus', label: "Syllabus", defaultValue: "Syllabus" },
      { name: 'subject', label: "Subject", defaultValue: "Subject" },
      { name: 'code', label: "Code", defaultValue: "Code" },
    ],
  },
  'site/syllabus-semester': {
    label: "Site-wide — Syllabus semester labels",
    previewPath: '/departments/syllabus/aiml/r25/year4/sem8',
    fields: [
      { name: 'viewPdf', label: "View PDF ↗", defaultValue: "View PDF ↗" },
      { name: 'otherSemesters', label: "Other semesters", defaultValue: "Other semesters" },
      { name: 'syllabus', label: "Syllabus", defaultValue: "Syllabus" },
      { name: 'courses', label: "Courses", defaultValue: "Courses" },
      { name: 'subject', label: "Subject", defaultValue: "Subject" },
      { name: 'code', label: "Code", defaultValue: "Code" },
    ],
  },
  'admissions/policies': {
    label: "Admissions — Policies",
    previewPath: '/admissions/policies',
    fields: [
      { name: 'studentsAdmittedToMlrit', label: "Students admitted to MLRIT are expected to abi…", multiline: true, defaultValue: "Students admitted to MLRIT are expected to abide by the rules and regulations of the institution. Violation of the code of conduct may result in disciplinary action up to and including expulsion." },
      { name: 'reservationPercentagesAreIndicative', label: "Reservation percentages are indicative and sub…", multiline: true, defaultValue: "Reservation percentages are indicative and subject to state government notifications for the respective academic year. Inter-se merit within each category is the basis for seat allotment." },
      { name: 'mlritDoesNotDiscriminate', label: "MLRIT does not discriminate on the basis of ge…", multiline: true, defaultValue: "MLRIT does not discriminate on the basis of gender, religion, caste, race or place of birth. All eligible candidates who have secured a valid rank are welcome to seek admission." },
      { name: 'policiesAreSubjectTo', label: "Policies are subject to revision as per regula…", multiline: true, defaultValue: "Policies are subject to revision as per regulatory directives. This page was last updated June 2025. For the most current version, contact the MLRIT administrative office." },
      { name: 'mlritHasAMulti', label: "MLRIT has a multi-tier grievance redressal mec…", multiline: true, defaultValue: "MLRIT has a multi-tier grievance redressal mechanism to ensure all student concerns are addressed fairly and promptly." },
      { name: 'orDroppedInThe', label: "or dropped in the grievance box at the adminis…", defaultValue: "or dropped in the grievance box at the administrative office." },
      { name: 'writtenGrievancesMayAlso', label: "Written grievances may also be submitted via e…", defaultValue: "Written grievances may also be submitted via email to" },
      { name: 'grievanceMlritAcIn', label: "grievance@mlrit.ac.in", defaultValue: "grievance@mlrit.ac.in" },
      { name: 'managementQuota', label: "Management Quota", defaultValue: "Management Quota" },
      { name: 'mlritHelpline', label: "MLRIT Helpline:", defaultValue: "MLRIT Helpline:" },
      { name: 'convenerQuota', label: "Convener Quota", defaultValue: "Convener Quota" },
      { name: 'ugcHelpline', label: "UGC Helpline:", defaultValue: "UGC Helpline:" },
      { name: 'category', label: "Category", defaultValue: "Category" },
    ],
  },
} as const;

export type SectionKey = keyof typeof CONTENT_SECTIONS;

export type FieldType =
  | 'text'
  | 'multiline'
  | 'image'
  | 'video'
  /** A PDF — brochures, AQAR reports, DCP documents. */
  | 'document'
  | 'gallery'
  | 'repeater';

/** Per-item metadata a gallery may collect alongside each image. */
export type GalleryItemField = 'name' | 'title' | 'linkUrl' | 'active' | 'startDate' | 'endDate';

/**
 * One column of a repeater row. Unlike a gallery's itemFields — a fixed set of
 * known metadata names — a repeater declares its own shape, because the rows
 * are the content rather than annotations on an uploaded image.
 */
export type RepeaterItemField = {
  readonly name: string;
  readonly label: string;
  /**
   * `image`/`video` turn the column into its own upload slot, so one gallery
   * row can carry several files — an event slide needs a logo, a clip and a
   * poster, which a single `key` cannot express.
   */
  readonly type?: 'text' | 'number' | 'select' | 'image' | 'video' | 'document';
  /** `select` columns only: the choices offered in the editor. */
  readonly options?: readonly string[];
};

/** Columns that hold an uploaded asset key rather than typed text. */
export const isMediaColumn = (column: RepeaterItemField): boolean =>
  column.type === 'image' || column.type === 'video' || column.type === 'document';

export type FieldConfig = {
  readonly name: string;
  readonly label: string;
  readonly type?: FieldType;
  /** Legacy shorthand for `type: 'multiline'`; existing configs still use it. */
  readonly multiline?: boolean;
  /**
   * List fields only. For a gallery: which metadata inputs each item gets, as
   * names from the fixed GalleryItemField set (omit for a plain list of images
   * with no per-item fields). For a repeater: the row's columns, declared
   * inline because a repeater defines its own shape.
   *
   * Read through galleryItemFields()/repeaterItemFields() rather than directly
   * — those narrow the union by the element kind actually present.
   */
  readonly itemFields?: readonly GalleryItemField[] | readonly RepeaterItemField[];
  /**
   * List fields only. How many items the consuming component can actually
   * render. Extras are kept in the data but never displayed, so the editor
   * warns rather than letting someone add rows that silently vanish. Omit when
   * the list has no fixed limit.
   */
  readonly maxItems?: number;
  /**
   * Gallery only. What the item's primary `key` accepts. Defaults to images;
   * `video` makes the gallery a list of clips, which is what the testimonial
   * and event carousels hold.
   */
  readonly accept?: 'image' | 'video';
  /**
   * Repeater only. Keeps rows grouped by this column in the editor: the list
   * is sorted by it, newest value first, and a heading marks each change.
   *
   * The sort is stable, so order *within* a group is whatever the editor set
   * — which matters when position carries meaning, as the first company of a
   * placement year does.
   */
  readonly groupByColumn?: string;
  /**
   * Gallery only. Seeds the EDITOR when nothing has been saved yet, so a
   * section that currently ships hardcoded assets opens with those assets as
   * real, editable rows instead of an empty list.
   *
   * These are never written to the database on load — only an explicit Save
   * persists them. That matters: the public components treat an empty stored
   * gallery as "use my bundled fallback", and auto-saving defaults would
   * quietly convert every section from fallback-driven to CMS-driven.
   */
  readonly defaultItems?: readonly GalleryItem[] | readonly RepeaterItem[];
  /**
   * Text fields only. Seeds the EDITOR when nothing has been saved yet, the
   * same contract defaultItems gives lists: the form opens showing the copy
   * the component currently renders, as editable text.
   *
   * Never written to the database on load — only an explicit Save persists it.
   * Without this a required text field opens blank, which both hides the live
   * copy and makes the section unsavable until every field is retyped.
   */
  readonly defaultValue?: string;
};

/**
 * One gallery entry. `id` is minted client-side on add and never changes, so it
 * survives reordering and is safe as a React key; `key` is the storage key (or,
 * briefly, a local object URL while the upload is in flight).
 */
export type GalleryItem = {
  id: string;
  key: string;
  name?: string;
  title?: string;
  linkUrl?: string;
  active?: boolean;
  startDate?: string;
  endDate?: string;
  /** Extra columns declared by the field's itemFields, text or media keys. */
  [column: string]: string | number | boolean | undefined;
};

/**
 * One repeater row. `id` is minted client-side on add and never changes, so it
 * survives reordering and is safe as a React key; every other key is a column
 * declared by the field's itemFields.
 *
 * Number columns are stored as numbers, but a row that has been through a
 * text input can hold the string form — consumers coerce rather than trust.
 */
export type RepeaterItem = {
  id: string;
  [column: string]: string | number | undefined;
};

/** Resolved field type — `type` wins, then the `multiline` shorthand, then text. */
export const fieldType = (field: FieldConfig): FieldType =>
  field.type ?? (field.multiline ? 'multiline' : 'text');

/**
 * Media fields hold an uploaded asset key and are optional: a section with no
 * uploaded file falls back to whatever the component hardcodes. Only the text
 * fields are required on save.
 */
export const isMediaField = (field: FieldConfig): boolean => {
  const type = fieldType(field);
  return type === 'image' || type === 'video' || type === 'document' || type === 'gallery';
};

/** What a gallery item's primary key accepts — images unless stated. */
export const galleryAccept = (field: FieldConfig): 'image' | 'video' =>
  field.accept ?? 'image';

/** Gallery fields hold an array of items rather than a single string value. */
export const isGalleryField = (field: FieldConfig): boolean => fieldType(field) === 'gallery';

/** Repeater fields hold an array of structured rows — text-first, no uploads. */
export const isRepeaterField = (field: FieldConfig): boolean => fieldType(field) === 'repeater';

/** Either kind of list field: stored as an array, never as a string. */
export const isListField = (field: FieldConfig): boolean =>
  isGalleryField(field) || isRepeaterField(field);


/**
 * The gallery metadata names on a field, ignoring repeater column objects.
 * Filtering by element kind rather than casting keeps a mis-declared config
 * from reaching the editor as a malformed input.
 */
export const galleryItemFields = (field: FieldConfig): readonly GalleryItemField[] =>
  (field.itemFields ?? []).filter(
    (item): item is GalleryItemField => typeof item === 'string'
  );

/** The repeater columns on a field, ignoring gallery metadata names. */
export const repeaterItemFields = (field: FieldConfig): readonly RepeaterItemField[] =>
  (field.itemFields ?? []).filter(
    (item): item is RepeaterItemField => typeof item === 'object' && item !== null
  );

/** Narrows an unknown stored value to repeater rows, discarding malformed ones. */
export const asRepeaterItems = (value: unknown): RepeaterItem[] => {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is RepeaterItem =>
      typeof item === 'object' &&
      item !== null &&
      !Array.isArray(item) &&
      typeof (item as RepeaterItem).id === 'string'
  );
};

/**
 * A repeater column read as a number, for the counter targets.
 *
 * Accepts the number itself and the string an <input type="number"> produces;
 * anything unusable yields the fallback so a half-typed row renders the
 * component's own value rather than NaN.
 *
 * Blank is checked before parsing, and that is the whole point: Number('') is
 * 0, and 0 is finite, so an absent or empty value used to sail through as a
 * legitimate zero and the fallback never ran. That is how a headline figure
 * with nothing saved rendered as "0 LPA".
 */
export const asNumber = (value: unknown, fallback: number): number => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : fallback;

  const text = String(value ?? '').trim();
  if (text === '') return fallback;

  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : fallback;
};

/** A repeater column read as a trimmed string. */
export const asText = (value: unknown, fallback = ''): string =>
  typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;

/** Narrows an unknown stored value to gallery items, discarding malformed ones. */
export const asGalleryItems = (value: unknown): GalleryItem[] => {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is GalleryItem =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as GalleryItem).id === 'string' &&
      typeof (item as GalleryItem).key === 'string'
  );
};

/** Field config for a page/section pair, or null when it is not editable. */
export type SectionConfig = {
  label: string;
  fields: readonly FieldConfig[];
  /**
   * The page the live preview should load for this section.
   *
   * Defaults to the homepage, which was the hardcoded behaviour and is still
   * right for home/* and for anything global. Every other section names the
   * route it actually appears on, or the editor previews a page that does not
   * contain what is being edited.
   */
  previewPath?: string;
  /**
   * Whether the preview updates as you type.
   *
   * True only where the rendering component subscribes to the draft store via
   * useMergedSection — the homepage sections and the recruiter marquee. Pages
   * wired later are Server Components that read the database at render, so
   * their preview can only refresh after a save. The badge says which, rather
   * than claiming live editing everywhere and looking broken.
   */
  liveDraft?: boolean;
};

export function getSectionConfig(
  page: string,
  section: string
): SectionConfig | null {
  const key = `${page}/${section}`;
  if (!Object.prototype.hasOwnProperty.call(CONTENT_SECTIONS, key)) return null;
  return CONTENT_SECTIONS[key as SectionKey];
}
