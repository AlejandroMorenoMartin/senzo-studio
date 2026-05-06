export const hero = {
  videoSrc: '/video/introWeb_SenzoStudio.mp4',
  reelUrl: 'https://vimeo.com/senzostudio',
  ctaLabel: 'PLAY REEL',
  tagline: 'High-End VFX · CGI & FX Simulations',
  description: 'We are a Madrid-based full-service VFX & CGI boutique with a core specialization in high-end FX and simulations. We deliver comprehensive visual solutions across Feature Films, Advertising, TV Series, and Animation.',
  overlays: {
    fps: 'FPS: 24.00',
    codec: 'CODEC: RAW',
    rec: 'REC ●',
  },
};

export const statement = {
  slateData: {
    studio: 'SENZO STUDIO',
    speciality: 'VFX & CGI',
    year: 'EST. 2022',
    directors: 'SERGIO · RUBÉN',
  },
  mantra: 'Hollywood-level quality. Boutique precision.',
  body: 'Full-service VFX & CGI boutique. Our core is high-end FX and simulations — deployed across Feature Films, Advertising, TV Series, and Animation. We adapt to your pipeline. We elevate your footage.',
  accentPhrase: 'We adapt to your pipeline.',
};

export type WorkTag = 'Film' | 'Advertising' | 'TV Series';

export const WORK_TAGS: WorkTag[] = ['Film', 'Advertising', 'TV Series'];

export const work: {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  year: string;
  format: string;
  tag: WorkTag;
  client: string;
  description: string;
}[] = [
  {
    id: 'lion-king',
    src: '/images/work/The_Lion_king_01.webp',
    title: 'The Lion King',
    subtitle: 'Live Action',
    year: '2024',
    format: '2.39:1 · Feature Film',
    tag: 'Film',
    client: 'Disney',
    description: 'This project is part of our professional background prior to founding SENZO. During our time at MPC LONDON, we developed technical setups for world-class FX. This included the development of <strong>procedural rain</strong>, embers, and atmospheric systems. We also performed dust simulations for several shots of the animal stampede sequences. A project that showcases our roots in high-end, <strong>photorealistic cinematic production</strong>.',
  },
  {
    id: 'godzilla',
    src: '/images/work/Godzilla_01.webp',
    title: 'Godzilla: King of the Monsters',
    subtitle: '',
    year: '2024',
    format: '2.39:1 · Feature Film',
    tag: 'Film',
    client: 'Warner',
    description: 'This project forms part of our artistic heritage from our time before SENZO. During our tenure at MPC LONDON, we were responsible for the technical execution of massive <strong>crowd simulations</strong>. This included both human units such as ground soldiers and vehicle fleets, including aircraft and helicopters. We ensured realistic movement and interaction within high-stakes action scenes. A masterclass in managing <strong>cinematic FX</strong> for larger-scale creature films.',
  },
  {
    id: 'pirates',
    src: '/images/work/Piratas_02.webp',
    title: 'Pirates of the Caribbean: Dead Men Tell No Tales',
    subtitle: '',
    year: '2023',
    format: '2.39:1 · Feature Film',
    tag: 'Film',
    client: 'Disney',
    description: 'A key milestone in our founders\' career path leading up to the creation of SENZO during their time at MPC LONDON. We developed the specialized particle effect for Salazar\'s decaying character design. Our team also handled advanced <strong>fluid simulations</strong>, including water and foam and created dynamic smoke trails to enhance the supernatural atmosphere of the film. An example of high-level <strong>character FX</strong> and environmental integration for Disney.',
  },
  {
    id: 'lays',
    src: '/images/work/Lays_01.webp',
    title: "LAY'S – The Most Wonderful Time Of The Year",
    subtitle: '',
    year: '2023',
    format: '16:9 · Advertising',
    tag: 'Advertising',
    client: "Lay's",
    description: 'In collaboration with MATHEMATIC, we managed the comprehensive <strong>snow and winter FX</strong>. We created the ice trails for Jimmy Fallon\'s skates and the falling snow systems. Our work included the lighting setups for the reindeer and the holiday houses. We also simulated the dynamics of snowball fights and several snow-covering layers for many of the sequence objects. Delivering <strong>premium visual standards</strong> for high-profile global advertising campaigns.',
  },
  {
    id: 'pepsi',
    src: '/images/work/Pepsi_03.webp',
    title: 'PEPSI – Play to Inspire',
    subtitle: '',
    year: '2023',
    format: '16:9 · Advertising',
    tag: 'Advertising',
    client: 'Pepsi',
    description: 'In collaboration with SAUVAGE TV, we developed the signature <strong>fire simulations</strong>. We created the dynamic fire trails following icons like Ronaldinho and Messi. Our work featured the technical execution of the fire face and its transitions. We ensured the fire FX felt powerful and integrated within the fast-paced edit. <strong>High-impact visual effects</strong> designed for one of the world\'s most recognized brands.',
  },
  {
    id: 'kombucha',
    src: '/images/work/Kombucha.webp',
    title: "SYNERGY Kombucha – Begin Within – GT's Living Foods",
    subtitle: '',
    year: '2023',
    format: '16:9 · Advertising',
    tag: 'Advertising',
    client: "GT's Synergy",
    description: 'In collaboration with NOZON, we developed the entire <strong>procedural 3D setup</strong> from scratch. We built a custom tool to generate and control the organic growth of plants. This allowed for total artistic direction over timing, variations, and foliage flow. The project involved complex simulations for grass, vines, and blooming sequences. A perfect example of how we combine technical tools with <strong>creative-led direction</strong>.',
  },
  {
    id: 'motherland',
    src: '/images/work/Motherland_02.webp',
    title: 'Motherland: Fort Salem – Seasons 2 & 3',
    subtitle: '',
    year: '2023',
    format: '16:9 · TV Series',
    tag: 'TV Series',
    client: 'HBO',
    description: 'In collaboration with FOLKS, we were in charge of a wide variety of <strong>supernatural FX</strong>. Our tasks included creating tornadoes, explosions, and realistic blood simulations. We also managed complex flocking systems for bats and dynamic debris particles. The project required a high level of versatility to handle diverse magical elements. Technical expertise applied to high-end <strong>television storytelling</strong> and world-building.',
  },
  {
    id: 'umbrella',
    src: '/images/work/The_Umbrella_Academy.webp',
    title: 'The Umbrella Academy – Season 3',
    subtitle: '',
    year: '2022',
    format: '16:9 · TV Series',
    tag: 'TV Series',
    client: 'Netflix',
    description: 'In collaboration with FOLKS, we managed several high-impact <strong>practical effects</strong>. Our team was responsible for the technical simulation of realistic flamethrowers. We also handled complex glass shattering and object destruction throughout the scenes. The work included the development of dynamic smoke and atmospheric debris systems. <strong>Senzo\'s execution</strong> for one of Netflix\'s most popular and stylized superhero series.',
  },
  {
    id: 'avatar',
    src: '/images/work/Avatar_The_Last_Airbender_02.webp',
    title: 'Avatar: The Last Airbender',
    subtitle: '',
    year: '2024',
    format: '16:9 · TV Series',
    tag: 'TV Series',
    client: 'Netflix',
    description: 'In collaboration with Netflix, we spearheaded the technical execution of the complex <strong>elemental-bending FX</strong>. Our team developed advanced fluid simulations for waterbending and high-velocity smoke and air systems for airbending maneuvers. We also managed the creature FX and grooming for Appa, ensuring photorealistic fur dynamics during high-altitude flight. The project showcased our ability to integrate procedural environments with high-stakes character action. A pinnacle of <strong>elemental simulation</strong> and creature feature execution for a global streaming phenomenon.',
  },
];

export interface ServiceBeforeAfter {
  type: 'before-after';
  beforeLabel: string;
  afterLabel: string;
  beforeSrc?: string;
  afterSrc?: string;
}

export interface ServiceLayerStack {
  type: 'layer-stack';
  layers: { label: string; src?: string }[];
}

export interface ServiceHotspots {
  type: 'hotspots';
  src?: string;
  hotspots: { x: number; y: number; label: string; note: string }[];
}

export type ServiceVisual = ServiceBeforeAfter | ServiceLayerStack | ServiceHotspots;

export interface Service {
  id: string;
  label: string;
  description: string;
  visual: ServiceVisual;
}

export const services: Service[] = [
  {
    id: 'fx-simulations',
    label: 'FX SIMULATIONS',
    description: 'Fire, smoke, fluid, destruction, particles. We build the shots that can\'t be done on set — at the level of a major facility, with the attention of a boutique.',
    visual: {
      type: 'before-after',
      beforeLabel: 'RAW PLATE',
      afterLabel: 'FX',
      beforeSrc: '/fx-before.webp',
      afterSrc: '/fx-after.webp',
    },
  },
  {
    id: 'compositing',
    label: 'COMPOSITING',
    description: 'Every element in its place. We integrate 3D, matte paintings, and practical plates into seamless final images — nothing looks like it was added in post.',
    visual: {
      type: 'layer-stack',
      layers: [
        { label: 'BACKGROUND PLATE' },
        { label: 'MATTE PAINTING' },
        { label: '3D ELEMENTS' },
        { label: 'PRACTICAL FX' },
        { label: 'FINAL COMPOSITE' },
      ],
    },
  },
  {
    id: 'cgi',
    label: 'CGI PIPELINE',
    description: 'From modeling and texturing to animation, lighting, and render — we cover the full 3D pipeline in-house, and integrate into yours.',
    visual: {
      type: 'hotspots',
      hotspots: [
        { x: 22, y: 35, label: 'LIGHTING', note: 'Multi-layer HDRI with practical bounce fill' },
        { x: 55, y: 20, label: 'RENDER', note: 'Path-traced with adaptive sampling at 4K' },
        { x: 75, y: 60, label: 'MATERIALS', note: 'Physically-based shading with custom displacement' },
        { x: 38, y: 72, label: 'MOTION', note: 'Simulation-driven secondary animation' },
      ],
    },
  },
];

export const servicesSection = {
  title: 'WHAT WE DO',
  description: 'End-to-end VFX & CGI — from raw plate to final pixel. We cover every stage of the pipeline in-house, and integrate cleanly into yours.',
  chips: [
    'Tracking & Matchmove',
    'Rotoscope, Keying & Paint-Prep',
    'Match-Move',
    '3D Modeling & Texturing',
    '3D Animation',
    'FX & CFX Simulations',
    'Lighting & Render',
    'Compositing',
  ],
};

export const pipeline = [
  'Rotoscope & Keying',
  'Paint & Prep',
  'Match-Move',
  '3D Modeling & Texturing',
  '3D Animation',
  'FX Simulations',
  'Lighting & Render',
  'Compositing',
];

export const markets = [
  { label: 'FEATURE FILMS', code: 'FF' },
  { label: 'ADVERTISING', code: 'AD' },
  { label: 'TV SERIES', code: 'TV' },
  { label: 'ANIMATION', code: 'AN' },
];

export const about = {
  intro: 'Two specialists. One shared obsession with craft.',
  body: 'Senzo Studio was founded in 2020 by Rubén and Sergio. After a journey of hard work, learning, and improvement, the studio has established itself as an <strong>international leader</strong> in visual effects, collaborating with some of the most prominent companies in the industry. Today, we continue to grow with our eyes set on the future and with the excitement of expanding our team to take on new challenges.',
  crew: [
    {
      id: 'sergio',
      photo: '/images/about/sergio.webp',
      name: 'SERGIO NIETO ALBERO',
      role: 'CEO, VFX Artist & Supervisor',
      speciality: 'FX & Simulations',
      bio: 'Sergio leads the FX and simulation side of every project. With a strong creative vision, he drives innovation and unique visual solutions — bringing the kind of technical ambition that defines Senzo\'s identity and output.',
      reel: 'https://player.vimeo.com/video/1050809299?autoplay=0&loop=0&byline=0&portrait=0&title=0&dnt=1',
      linkedin: 'https://www.linkedin.com/in/sergio-nieto-albero-717b868a/',
    },
    {
      id: 'ruben',
      photo: '/images/about/ruben.webp',
      name: 'RUBÉN HINAREJOS GUERRA',
      role: 'CEO, VFX Artist & Supervisor',
      speciality: 'Lighting & Compositing',
      bio: 'Rubén brings over 10 years of experience in complex simulations. His technical precision and attention to detail guarantee high-quality visual results across every format — from feature films to high-impact advertising.',
      reel: 'https://player.vimeo.com/video/1051074872?autoplay=0&loop=0&byline=0&portrait=0&title=0&dnt=1',
      linkedin: 'https://www.linkedin.com/in/rub%C3%A9n-hinarejos-guerra-b2365910b/',
    },
  ],
};

export const clients = [
  { id: 'disney',    src: '/images/work/logo-disney.png',    alt: 'Disney' },
  { id: 'dc',        src: '/images/work/logo-dc.png',        alt: 'DC' },
  { id: 'netflix',   src: '/images/work/logo-netflix.png',   alt: 'Netflix' },
  { id: 'hbo',       src: '/images/work/logo-hbo.png',       alt: 'HBO' },
  { id: 'prime',     src: '/images/work/logo-prime.png',     alt: 'Amazon Prime' },
  { id: 'warner',    src: '/images/work/logo-warner.png',    alt: 'Warner Bros' },
  { id: 'universal', src: '/images/work/logo-universal.png', alt: 'Universal' },
  { id: 'mpc',       src: '/images/work/logo-mpc.png',       alt: 'MPC' },
  { id: 'folks',     src: '/images/work/logo-folks.png',     alt: 'Folks' },
  { id: '20',        src: '/images/work/logo-20.png',        alt: '20th Century Studios' },
];

export const faq = [
  {
    q: 'What services do you provide?',
    a: 'We offer a full-service VFX and CGI pipeline, handling projects end-to-end or just the specific parts you need. Whether you require a single department or a finished commercial, we adapt to your production\'s scope.',
  },
  {
    q: 'Do you work on a fixed budget or a day rate basis?',
    a: 'We adapt to your project\'s needs. We prioritize Fixed Project Pricing to provide financial certainty and clear milestones, but we also offer flexible Day Rate models for targeted tasks or internal production estimates.',
  },
  {
    q: 'Do you offer outsourcing services or work through a remote workflow?',
    a: 'We are fully flexible. We can work as a fully independent outsourcing partner or connect directly to your studio\'s infrastructure via secure remote workstations, seamlessly integrating into your internal workflow.',
  },
  {
    q: 'How are final deliveries handled?',
    a: 'We provide total flexibility: we can deliver high-quality final renders for direct integration, or optimized technical caches if you prefer to handle the lookdev and final render internally. Everything is tailored to your specific formats and pipeline requirements.',
  },
  {
    q: 'How do you handle security and NDAs?',
    a: 'Security is our priority. We are accustomed to the strict confidentiality standards required for major international productions. We sign NDAs from the first contact and use secure protocols for all data transfers and communications.',
  },
];

export const contact = {
  email: 'hello@senzostudio.com',
  options: [
    {
      id: 'business',
      title: 'Business Inquiries',
      description: 'For productions looking for world-class VFX, CGI & FX simulations.',
      cta: 'Contact us',
    },
    {
      id: 'freelancer',
      title: 'Freelancer Application',
      description: 'For registered freelancers and self-employed artists looking to collaborate.',
      cta: 'Apply',
    },
  ],
};

export const footer = {
  tagline: 'High-End VFX, CGI & FX Simulations.',
  accentWord: 'VFX',
  email: 'hello@senzostudio.com',
  credit: 'Alejandro Moreno',
  creditUrl: 'https://alejandromorenomartin.com',
  socials: {
    vimeo:   { href: 'https://vimeo.com/senzostudio' },
    linkedin: { href: 'https://linkedin.com/company/senzostudio' },
    behance:  { href: 'https://behance.net/senzostudio' },
    clutch:   { href: 'https://clutch.co/profile/senzo-studio' },
  },
};
