// ---------------------------------------------------------------------------
//  All portfolio content lives here. Edit this file to update the site.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Bhumika Garg",
  firstName: "Bhumika",
  role: "Full Stack Developer",
  roles: ["Full Stack Developer", "MERN Stack Developer", "Next.js Developer", "React.js Developer"],
  location: "Delhi, India",
  timezone: "Asia/Kolkata",
  phone: "+91 8950299308",
  email: "bhumikagargsfd@gmail.com",
  linkedin: "https://www.linkedin.com/in/bhumika-garg-649319224/",
  github: "https://github.com/Bhumi2408",
  resume: "/resume.pdf",
  photo: "/photo.jpeg",
  company: "Bharat Bizmart",
  companyGroup: "Cybertricks Media Group",
  intro:
    "Full Stack Developer (MERN · Next.js) based in Delhi. I build fast, SEO-friendly, production-grade web apps — from product catalogues and checkout flows to admin dashboards and role-based CRMs.",
  about: [
    "I'm a Full Stack Developer with 1.5+ years of hands-on experience building and shipping production web applications with MongoDB, Express.js, React.js, Node.js and Next.js.",
    "At Bharat Bizmart (Cybertricks Media Group) I've delivered 4 live e-commerce platforms — product catalogues, cart, wishlist, checkout and admin dashboards — plus responsive, SEO-optimised business websites for clients across manufacturing, real estate, interiors, beauty and digital media.",
    "I love the full journey: designing RESTful APIs, wiring up role-based access control, rendering pages on the server for SEO, and squeezing out every millisecond of load time. Alongside work, I'm pursuing my M.Tech after graduating B.Tech as a Silver Medalist.",
  ],
};

export const stats = [
  { value: 1.5, suffix: "+", decimals: 1, label: "Years of experience" },
  { value: 4, suffix: "", label: "Live e-commerce platforms" },
  { value: 10, suffix: "+", label: "Production websites" },
  { value: 9.62, suffix: "", decimals: 2, label: "B.Tech CGPA · Silver Medal" },
];

export const services = [
  {
    title: "E-commerce Platforms",
    text: "Catalogues, categories, cart, wishlist, checkout, user accounts and admin dashboards — end to end on MERN & Next.js.",
    icon: "cart",
  },
  {
    title: "Business Websites",
    text: "Responsive, SEO-first websites with SSR, structured FAQ content, optimised images and lead-generation flows.",
    icon: "layout",
  },
  {
    title: "APIs & Backend",
    text: "RESTful APIs with Node.js & Express on MongoDB, authentication and role-based access control for admins and customers.",
    icon: "server",
  },
  {
    title: "Dashboards & CRM",
    text: "Internal tools like a role-based CRM with Admin, Sales and Team modules, project allocation and task tracking.",
    icon: "chart",
  },
];

export const skills = [
  { title: "Frontend", icon: "layout", items: ["React.js", "Next.js (SSR/SSG)", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3", "Responsive Design"] },
  { title: "Backend", icon: "server", items: ["Node.js", "Express.js", "RESTful APIs", "Authentication", "RBAC", "MVC Architecture"] },
  { title: "Databases", icon: "db", items: ["MongoDB", "MySQL"] },
  { title: "Languages", icon: "code", items: ["JavaScript (ES6+)", "HTML5", "CSS3", "C"] },
  { title: "Tools & Platforms", icon: "tool", items: ["Git", "GitHub", "Postman", "WordPress", "Render", "Netlify", "AWS / Azure"] },
  { title: "Concepts", icon: "spark", items: ["Technical SEO", "Performance", "Third-party APIs", "Debugging", "Agile / Scrum", "SDLC"] },
];

// shown on the skills orbit + marquee
export const orbit = {
  inner: ["React", "Next.js", "Node.js"],
  middle: ["Express", "MongoDB", "Tailwind", "MySQL"],
  outer: ["Git", "Postman", "REST", "RBAC", "SEO", "Netlify"],
};

export const marquee = [
  "React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS",
  "REST APIs", "RBAC", "MySQL", "Technical SEO", "Git", "JavaScript",
];

export const experience = [
  {
    hash: "a9f3c21",
    refs: ["HEAD -> main", "current"],
    role: "Full Stack Developer",
    company: "Bharat Bizmart (Cybertricks Media Group)",
    location: "Delhi",
    period: "Apr 2025 — Present",
    current: true,
    points: [
      "Developed and deployed 4 full-stack e-commerce platforms using the MERN stack and Next.js — product catalogue, categories, cart, wishlist, checkout, user accounts and admin dashboard.",
      "Designed and built RESTful APIs with Node.js and Express.js on MongoDB, with role-based authentication for secure admin and customer access.",
      "Built responsive client websites in React.js and Next.js with SSR, SEO meta tags, structured FAQ content and optimised images for better search visibility and load speed.",
      "Developed an internal role-based CRM (Admin, Sales, Team modules) with project allocation and task-tracking workflows.",
    ],
    tags: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "RBAC"],
  },
  {
    hash: "4e7b0d9",
    refs: ["internship"],
    role: "Web Developer Intern",
    company: "Kreativan Technologies",
    location: "Panchkula",
    period: "Jan 2024 — May 2024",
    points: [
      "Built responsive, pixel-perfect user interfaces with React.js, improving cross-device usability.",
      "Integrated third-party APIs and resolved UI and functional bugs in collaboration with cross-functional teams.",
    ],
    tags: ["React.js", "JavaScript", "APIs", "Git"],
  },
];

// smaller milestones shown in the git-log timeline
export const milestones = [
  { hash: "c1d8e44", date: "2024", type: "feat", text: "Started M.Tech — Maharaja Agrasen University", branch: "education" },
  { hash: "88a2f10", date: "2024", type: "release", text: "Graduated B.Tech with CGPA 9.62 — Silver Medalist", branch: "education" },
  { hash: "3b9c7e2", date: "2022", type: "award", text: "2nd position — University-level internal hackathon for Smart India Hackathon 2022", branch: "achievements" },
  { hash: "f05a6d3", date: "2020", type: "init", text: "Started B.Tech — Maharaja Agrasen University", branch: "education" },
];

export const projects = [
  {
    slug: "artics-decorr",
    name: "Artics Decorr",
    kind: "E-commerce",
    tagline: "Outdoor furniture e-commerce platform",
    url: "https://www.articsdecorr.com",
    image: "/projects/artics-decorr.png",
    description:
      "A full e-commerce store for an outdoor & indoor furniture brand — category-wise listing, product pages, cart, wishlist, user accounts and checkout, available in 6 languages with SEO-friendly server-rendered pages.",
    features: ["Category-wise product listing", "Product detail pages", "Cart & wishlist", "User accounts & checkout", "Multi-language support (6 languages)", "Blog module", "SEO-friendly server-rendered pages"],
    tech: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    accent: "#2f5d3a",
    featured: true,
  },
  {
    slug: "lute-diamonds",
    name: "Lute Diamonds",
    kind: "E-commerce",
    tagline: "Tanzanite & diamond jewellery store",
    url: "https://www.lutediamonds.com",
    image: "/projects/lute-diamonds.png",
    description:
      "An international jewellery store for the UK & Europe with category pages for rings, pendants and earrings, product ratings, cart, wishlist, user login and promotional offer banners.",
    features: ["International storefront (UK & Europe)", "Rings, pendants & earrings categories", "Product ratings", "Cart & wishlist", "User login", "Promotional offer banners"],
    tech: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    accent: "#b08a3e",
    featured: true,
  },
  {
    slug: "shop99",
    name: "Shop99",
    kind: "E-commerce",
    tagline: "Car audio & accessories store",
    url: "https://www.shop99.co.in",
    image: "/projects/shop99.png",
    description:
      "An online store for car audio and accessories with brand and category browsing, plus deals, best-seller and new-arrival sections driven entirely by admin-panel data.",
    features: ["Brand & category browsing", "Deals, best-seller & new-arrival sections", "Admin-panel driven content", "Product search", "SEO metadata & Open Graph tags"],
    tech: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    accent: "#f26a1b",
    featured: true,
  },
  {
    slug: "medical-surgical-solutions",
    name: "Medical Surgical Solutions",
    kind: "E-commerce",
    tagline: "Medical supplies e-commerce platform",
    url: "https://medicalsurgicalsolutions.com",
    image: "/projects/medical-surgical-solutions.png",
    description:
      "A medical & surgical supplies store with product management, cart, checkout and an admin dashboard secured with role-based authentication for admins and users.",
    features: ["Product management", "Cart & checkout", "Admin dashboard", "Role-based auth (admin / user)", "Category search"],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs"],
    accent: "#c62828",
    featured: true,
  },
  {
    slug: "play-area-manufacturer",
    name: "Play Area Manufacturer",
    kind: "Website",
    tagline: "Soft play & kids' play equipment",
    url: "https://www.playareamanufacturer.com",
    image: "/projects/play-area-manufacturer.png",
    description:
      "A lead-generation website for a Delhi NCR soft-play manufacturer — product collections, new arrivals, client showcase, blog and FAQ, with WhatsApp and call enquiry flows.",
    features: ["Product collections & new arrivals", "Client showcase", "Blog & FAQ", "WhatsApp / call enquiry flows", "Optimised images"],
    tech: ["Next.js", "React.js", "SEO"],
    accent: "#e64980",
  },
  {
    slug: "dermaplex-professional",
    name: "Dermaplex Professional",
    kind: "Website",
    tagline: "Professional skin, hair & waxing products",
    url: "https://www.dermaplexprofessional.in",
    image: "/projects/dermaplex-professional.png",
    description:
      "A product catalogue for a professional beauty brand with 60+ products across hair care, skin care and personal care, plus a private-label page, skincare guide, FAQ and bulk-order enquiries.",
    features: ["60+ product catalogue", "Hair, skin & personal-care categories", "Private-label page", "Skincare guide & FAQ", "Bulk-order enquiries", "WhatsApp contact"],
    tech: ["Product Catalogue", "SEO", "Responsive"],
    accent: "#1f3b2d",
  },
  {
    slug: "oms-bath",
    name: "OM's Bath",
    kind: "Website",
    tagline: "CP bath fittings manufacturer",
    url: "https://www.omsbath.com",
    image: "/projects/oms-bath.png",
    description:
      "A premium Next.js product catalogue for a CP bath fittings manufacturer with 20+ collections, a dealer enquiry form and a downloadable catalogue.",
    features: ["20+ product collections", "Dealer enquiry form", "Downloadable catalogue", "Enquiry popup", "Testimonials & blog"],
    tech: ["Next.js", "React.js"],
    accent: "#b8954a",
  },
  {
    slug: "jm-ventures",
    name: "JM Ventures",
    kind: "Website",
    tagline: "Real-estate investment advisory",
    url: "https://www.jm-ventures.in",
    image: "/projects/jm-ventures.png",
    description: "A React.js real-estate advisory website with project pages, consultation booking and a blog.",
    features: ["Project pages", "Consultation booking", "Blog", "WhatsApp & call CTAs"],
    tech: ["React.js"],
    accent: "#7a2e4f",
  },
  {
    slug: "cybertricks-media",
    name: "Cybertricks Media",
    kind: "Website",
    tagline: "Advertising & digital marketing agency",
    url: "https://www.cybertricksmedia.com",
    image: "/projects/cybertricks-media.png",
    description: "A Next.js corporate website for a digital marketing company, with service pages and an interactive offer widget.",
    features: ["Service pages", "Interactive offer widget", "Hero slider", "Lead-capture CTAs"],
    tech: ["Next.js", "React.js"],
    accent: "#5b3fd1",
  },
  {
    slug: "dfurniture",
    name: "Dfurniture",
    kind: "Website",
    tagline: "Interior design & furniture",
    url: "https://dfurniture.in",
    image: "/projects/dfurniture.png",
    description: "A React.js interior design website with product category pages, a blog and lead-generation CTAs.",
    features: ["Product category pages", "Blog", "Lead-generation CTAs", "Consultation booking"],
    tech: ["React.js"],
    accent: "#a8741a",
  },
];

export const education = [
  { degree: "M.Tech", school: "Maharaja Agrasen University", period: "2024 — 2026", note: "Pursuing" },
  { degree: "B.Tech", school: "Maharaja Agrasen University", period: "2020 — 2024", note: "CGPA 9.62 / 10 · Silver Medalist" },
  { degree: "Class XII (HSC)", school: "New BS Memorial Sr. Sec. School", period: "2020", note: "93.6%" },
];

export const certifications = [
  { title: "Advanced Web Development", org: "Dice Academy", period: "2024 — 25" },
  { title: "Front-End Development", org: "Dice Academy", period: "2022 — 23" },
  { title: "C Language", org: "Hartron Center", period: "2021" },
];

export const achievements = [
  { title: "Silver Medalist", detail: "B.Tech, Maharaja Agrasen University (University Level)" },
  { title: "2nd Position", detail: "University-level Internal Hackathon for Smart India Hackathon 2022" },
  { title: "Participant", detail: "MSME Skill Development Program" },
  { title: "Participant", detail: "National Aviation Tech Fest, IIT Kharagpur (2019)" },
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];
