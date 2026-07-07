import {
  careerImages,
  careerCardImages,
  clubImages,
  courseImages,
  curatedSlides,
  defaultNotices,
  galleryImages,
  admissionProcessImages,
  homeAdvantageImages,
  homeHeroImages,
  homeMomentImages,
  siteImages,
} from '../data/siteImages';

export const routes = [
  ['Home', '/'],
  ['About', '/about'],
  ['Admission', '/admissions'],
  ['Notices', '/notices'],
  ['Gallery', '/gallery'],
  ['Courses', '/courses'],
  ['Clubs', '/clubs'],
  ['Careers', '/careers'],
  ['Contact', '/contact'],
];

export const defaultSocialLinks = [
  {
    platform_name: 'Facebook',
    url: 'https://www.facebook.com/nexusintlacademy',
  },
  {
    platform_name: 'Instagram',
    url: 'https://www.instagram.com/nexusinternationalacademy/',
  },
];

export function compact(value, fallback = '') {
  return String(value || fallback || '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function media(value, fallback = siteImages.audience) {
  const raw = compact(value, fallback);
  if (!raw) return fallback;

  if (raw.startsWith('https://api.nexus.edu.np/')) {
    return raw.replace('https://api.nexus.edu.np', '');
  }

  if (raw.startsWith('/media/')) {
    return `https://backend.nexus.edu.np${raw}`;
  }

  if (raw.startsWith('media/')) {
    return `https://backend.nexus.edu.np/${raw}`;
  }

  if (/^https?:\/\//.test(raw) || raw.startsWith('/')) {
    return raw;
  }

  if (raw.startsWith('site-images/')) {
    return `/${raw}`;
  }

  return raw;
}

export const defaultAdmissionVideo = "/nexus-ad.mp4";

export function videoMedia(value, fallback = defaultAdmissionVideo) {
  const raw = compact(value, fallback);
  if (!raw) return fallback;
  if (/^\/?Nexus(?:%20|\s)+Ad\.mp4$/i.test(raw)) return defaultAdmissionVideo;
  return media(raw, fallback);
}

export function imageValue(item = {}) {
  if (typeof item === 'string') return item;
  return item.image_url || item.image || item.src || item.attachments || item.thumbnail || '';
}

function isBrowserImage(value = '') {
  return !/\.(cr2|raw|nef|arw|dng)(\?.*)?$/i.test(String(value));
}

function cleanList(items = [], keys = []) {
  return items
    .map((item) =>
      Object.fromEntries(
        Object.entries(item || {})
          .map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
          .filter(([, value]) => value !== '' && value !== null && value !== undefined),
      ),
    )
    .filter((item) => keys.some((key) => compact(item[key])));
}

export function uniqueBy(items, keyFn) {
  const seen = new Set();
  return items.filter((item) => {
    const key = compact(keyFn(item)).toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function socialLinks(items = []) {
  return uniqueBy(
    [...cleanList(items, ['platform_name', 'url'])],
    (item) => item.platform_name || item.platform || item.url
  );
}


export const defaultPageHeroes = {
  about: {
    copy: "A school culture built around disciplined learning, care, confidence, and family trust.",
    eyebrow: "About Nexus",
    image_url: siteImages.audience,
    title: "Learning with discipline, confidence, and care."
  },
  admissions: {
    copy: "Enroll now and give your child a strong foundation for a brighter future.",
    eyebrow: "Admissions",
    image_url: siteImages.see,
    title: "Admissions"
  },
  careers: {
    copy: "Join a school culture built around discipline, care, excellence, and student growth.",
    eyebrow: "Work With Nexus",
    image_url: siteImages.speaker,
    title: "Careers"
  },
  clubs: {
    copy: "Student activities designed for creativity, leadership, teamwork, confidence, and personal growth.",
    eyebrow: "Student Life",
    image_url: siteImages.stage,
    title: "Clubs"
  },
  "contact-nexus": {
    copy: "Visit, call, email, or message the school.",
    eyebrow: "Contact",
    image_url: siteImages.audience,
    title: "Contact Nexus"
  },
  courses: {
    copy: "Explore each Nexus program with learning details, student fit, and next steps.",
    eyebrow: "Academic Programs",
    image_url: siteImages.audience,
    title: "Courses"
  },
  gallery: {
    copy: "A polished visual archive of Nexus achievements, events, ECA, classroom energy, and student moments.",
    eyebrow: "Nexus Memories",
    image_url: siteImages.award,
    title: "Gallery"
  },
  notices: {
    copy: "School updates, events, announcements, and important information in one clean view.",
    eyebrow: "Updates",
    image_url: siteImages.labor,
    title: "Notices"
  },
  "student-life": {
    copy: "A quick gateway to real activities, gallery memories, clubs, and student confidence at Nexus.",
    eyebrow: "Life at Nexus",
    image_url: siteImages.stage,
    title: "Student Life"
  }
};

export const defaultHomeMoments = [
  { image_url: homeMomentImages[0], subtitle: "Leadership in Action", title: "Nexus Moment" },
  { image_url: homeMomentImages[1], subtitle: "Celebrating Our Culture", title: "Nexus Moment" },
  { image_url: homeMomentImages[2], subtitle: "Achievements That Inspire", title: "Nexus Moment" }
];

export const defaultHomeAdvantages = [
  {
    copy: "Disciplined classrooms, clear routines, and caring guidance help students build steady learning habits.",
    image_url: homeAdvantageImages[0],
    title: "Strong academic foundation"
  },
  {
    copy: "Events, clubs, presentations, and recognition moments help learners speak, perform, and lead.",
    image_url: homeAdvantageImages[1],
    title: "Confidence beyond books"
  },
  {
    copy: "Teachers and families work together so every child feels noticed, encouraged, and ready for the next step.",
    image_url: homeAdvantageImages[2],
    title: "Learning with real support"
  },
  {
    copy: "Sports, creativity, teamwork, and school culture shape character along with academic progress.",
    image_url: homeAdvantageImages[3],
    title: "Activities with purpose"
  }
];

export const defaultTestimonials = [
  {
    image_url: siteImages.success,
    quote: "Nexus International School gave me more than just classroom knowledge. The school helped me build discipline, confidence, and a strong academic foundation that continues to support me in my higher studies. The guidance I received from my teachers shaped the way I approach challenges, communicate with others, and work toward my goals.",
    title: "Alumni Testimonial"
  },
  {
    image_url: siteImages.audience,
    quote: "Studying at Nexus has made learning feel more comfortable and meaningful for me. The teachers explain lessons clearly, encourage us to ask questions, and support us whenever we need help. The friendly environment, regular activities, and positive school culture have helped me become more confident in my studies and in myself.",
    title: "Student Testimonial"
  },
  {
    image_url: siteImages.stage,
    quote: "As a parent, I have seen a positive change in my child after joining Nexus International School. The school focuses not only on academic progress but also on discipline, confidence, values, and character development. The teachers are caring, approachable, and genuinely involved in each student's growth, which makes us feel confident about our child's future.",
    title: "Parent Testimonial"
  }
];

export const defaultAdmissionSteps = [
  { description: "Contact the school office and share the learner's grade, parent details, and visit preference. Our team helps you understand seat availability, school routines, documents, and the best next step for your family.", image_url: admissionProcessImages[0], step_number: 1, title: "Enquiry & Guidance" },
  { description: "Visit Nexus, meet the team, observe the learning environment, and ask about academic support, discipline, student care, transport, activities, and the values that shape everyday school life.", image_url: admissionProcessImages[1], step_number: 2, title: "Visit & Consultation" },
  { description: "Submit the admission form with the requested documents so the office can verify records, confirm grade placement, and prepare the learner's admission file without unnecessary delays.", image_url: admissionProcessImages[2], step_number: 3, title: "Form & Documents" },
  { description: "Complete the final discussion, fee process, and enrollment confirmation. Families receive the guidance they need for joining dates, class routines, books, uniform, and school communication.", image_url: admissionProcessImages[3], step_number: 4, title: "Confirmation & Enrollment" }
];

export const defaultAdmissionRequirements = [
  "Birth certificate",
  "Previous school report",
  "Transfer certificate if applicable",
  "Passport-size photographs"
];

export const defaultContactCampuses = [
  {
    address: "Pepsi-Cola Town Planning, Kathmandu",
    email: "info@nexus.edu.np",
    name: "Nexus International School",
    phone: "01-4990303 | 01-4991051",
    tagline: "Where Excellence Begins!",
    website: "www.nexus.edu.np"
  },
  {
    address: "Khageshwori, Kathmandu",
    email: "admin@nexus.edu.np",
    name: "Nexus IPC Montessori",
    phone: "01-4990934 | 01-4991051",
    tagline: "The Foundation of Future Excellence!",
    website: "www.nexus.edu.np"
  }
];

export function applyCms(data) {
  const cms = data.cms || {};
  const identity = cms.identity || {};
  const merged = structuredClone(data);

  merged.config = {
    ...(merged.config || {}),
    address: identity.address || merged.config?.address,
    contact_email: identity.email || merged.config?.contact_email,
    contact_phone: identity.phone ? [identity.phone] : merged.config?.contact_phone,
    school_name: identity.schoolName || cms.schoolName || merged.config?.school_name,
    tagline: identity.tagline || cms.tagline || merged.config?.tagline,
  };

  merged.home ||= {};
  const heroSlides = cleanList(cms.homeHeroSlides || [], ['title', 'subtitle', 'image_url']);
  if (heroSlides.length) merged.home.hero_slider = heroSlides;

  const stats = cleanList(cms.homeStats || [], ['number', 'label']);
  if (stats.length) merged.home.stats = stats;

  if (cms.homeAbout?.title || cms.homeAbout?.description || cms.homeAbout?.image_url) {
    merged.home.about_section = {
      ...(merged.home.about_section || {}),
      ...cms.homeAbout,
    };
  }

  const homeMoments = cleanList(cms.homeMoments || [], ['title', 'subtitle', 'image_url']);
  if (homeMoments.length) merged.home.moments = homeMoments;

  const homeAdvantages = cleanList(cms.homeAdvantages || [], ['title', 'copy', 'image_url']);
  if (homeAdvantages.length) merged.home.advantages = homeAdvantages;

  const testimonials = cleanList(cms.testimonials || [], ['title', 'quote', 'image_url']);
  if (testimonials.length) merged.home.testimonials = testimonials;

  const notices = cleanList(cms.notices || [], ['title', 'content', 'attachments']);
  if (notices.length) merged.notices = notices;

  const courses = cleanList(cms.courses || [], ['title', 'description', 'image_url']);
  if (courses.length) merged.courses = courses;

  const careerItems = cleanList(cms.careerItems || [], ['title', 'description', 'image_url']);
  if (careerItems.length) merged.careerItems = careerItems;

  const careerPhotos = cleanList(cms.careerPhotos || [], ['image_url']).map((item) => item.image_url);
  if (careerPhotos.length) merged.careerPhotos = careerPhotos;

  const clubs = cleanList(cms.clubs || [], ['name', 'title', 'description', 'image_url']);
  if (clubs.length) merged.clubs = { ...(merged.clubs || {}), clubs };

  const albums = cleanList(cms.galleryAlbums || [], ['title', 'image', 'images']);
  if (albums.length) {
    merged.memories = {
      ...(merged.memories || {}),
      event_folders: albums.map((album) => ({
        title: album.title,
        images: String(album.images || album.image || "")
          .split(/\n|,/)
          .map((src) => compact(src))
          .filter(Boolean),
      })),
    };
  }

  const faqs = cleanList(cms.faqs || [], ['question', 'answer']);
  if (faqs.length) merged.faqs = faqs;

  const social = cleanList(cms.socialLinks || [], ['platform_name', 'url']);
  if (social.length) merged.social = social;

  merged.about ||= {};
  const aboutHeroSlides = cleanList(cms.aboutHeroSlides || [], ['title', 'copy', 'image_url']);
  if (aboutHeroSlides.length) merged.about.heroSlides = aboutHeroSlides;

  const journeyImages = cleanList(cms.aboutJourneyImages || [], ['image_url']);
  if (journeyImages.length) merged.about.journeyImages = journeyImages;

  const leadershipItems = cleanList(cms.leadership || [], ['author', 'title', 'message', 'image_url']);
  if (leadershipItems.length) merged.about.messages = leadershipItems;

  merged.admission ||= {};
  const admissionSteps = cleanList(cms.admissionSteps || [], ['title', 'description', 'image_url']);
  if (admissionSteps.length) merged.admission.process_steps = admissionSteps;
  const requirements = cleanList(cms.admissionRequirements || [], ['text']).map((item) => item.text);
  if (requirements.length) merged.admission.requirements = [{ requirement: requirements }];
  if (cms.admissionVideo) merged.admission.heroVideo = videoMedia(cms.admissionVideo);

  const contactCampuses = cleanList(cms.contactCampuses || [], ['name', 'address', 'phone', 'email']);
  if (contactCampuses.length) merged.contactCampuses = contactCampuses;
  if (cms.mapEmbedUrl) merged.mapEmbedUrl = cms.mapEmbedUrl;

  return merged;
}

export function heroSlides(data) {
  const slides = data.home?.hero_slider?.length ? data.home.hero_slider : curatedSlides;
  const isCmsControlled = Boolean(data.cms?.homeHeroSlides?.length);
  return slides.map((slide, index) => ({
    ...slide,
    image_url: media(
      isCmsControlled
        ? slide.image_url || slide.image || homeHeroImages[index % homeHeroImages.length]
        : homeHeroImages[index % homeHeroImages.length] || slide.image_url || slide.image,
    ),
  }));
}

export function notices(data) {
  const source = data.cms?.notices?.length
    ? data.notices || []
    : [...defaultNotices, ...(data.notices || [])];
  return uniqueBy(source, (notice) => `${notice.title}-${notice.date}`).slice(0, 12);
}

export function imagePool(data) {
  const home = data.home || {};
  const about = data.about || {};
  const apiClubs = Array.isArray(data.clubs) ? data.clubs : data.clubs?.clubs || [];
  const folders = Array.isArray(data.memories) ? data.memories : data.memories?.event_folders || [];
  const apiCourses = Array.isArray(data.courses) ? data.courses : [];

  return [
    ...(home.hero_slider || []).map(imageValue),
    home.about_section?.image_url,
    about.hero_video?.image_url,
    ...(about.about_journey || []).map(imageValue),
    ...(about.messages || []).map(imageValue),
    ...apiCourses.map(imageValue),
    ...apiClubs.map(imageValue),
    ...folders.flatMap((folder) => folder.images || []).map(imageValue),
    imageValue(data.noticeHero || {}),
    imageValue(data.careerHero || {}),
    ...Object.values(siteImages),
  ]
    .map((item) => media(item, ''))
    .filter(Boolean);
}

export function courses(data) {
  return uniqueBy(
    [
      ...(Array.isArray(data.courses) ? data.courses : []),
      {
        category: 'Language Growth',
        description:
          'Global language fluency through Cambridge Assessment English, strengthening reading, speaking, writing, listening, and confident communication.',
        image_url: courseImages.english,
        title: 'Cambridge Assessment English Program',
      },
      {
        category: 'Early Years & Primary',
        description:
          'International Primary Curriculum and Montessori learning for young learners, with activity-based lessons, care, structure, creativity, and strong habits.',
        image_url: courseImages.montessori,
        title: 'Montessori and IPC Program',
      },
      {
        category: 'Digital Fluency',
        description:
          'NCC UK Digi School and ICT learning prepare students with digital literacy, online safety, smart classroom exposure, robotics, and coding foundations.',
        image_url: clubImages.computer,
        title: 'NCC UK Digi School',
      },
      {
        category: 'Research & Innovation',
        description:
          'R&D-based modules, STEAM, project work, SQC, and LRPA methods build creativity, research habits, problem solving, and critical thinking.',
        image_url: siteImages.labor,
        title: 'STEAM and R&D-Based Learning',
      },
    ],
    (course) => course.title || course.name,
  );
}

export function clubs(data) {
  const apiClubs = Array.isArray(data.clubs) ? data.clubs : data.clubs?.clubs || [];
  return uniqueBy(
    [
      ...apiClubs,
      {
        description:
          'Drawing, craft, performance, music, arts, drama, imagination, and confident expression with inspiration from national creative icons.',
        image_url: clubImages.art,
        name: 'Music, Arts & Performance',
      },
      {
        description: 'Technology exposure, digital confidence, and practical problem solving.',
        image_url: clubImages.computer,
        name: 'IT & Computer Club',
      },
      {
        description: 'Fitness, discipline, teamwork, leadership, and healthy competition.',
        image_url: clubImages.sports,
        name: 'Sports Excellence',
      },
    ],
    (club) => club.name || club.title,
  );
}

export function galleryAlbums(data) {
  const folders = Array.isArray(data.memories) ? data.memories : data.memories?.event_folders || [];
  const localGalleryImages = galleryImages.length
    ? galleryImages
    : [siteImages.success, siteImages.award, siteImages.see, siteImages.stage];
  const mapped = folders
    .map((folder, index) => {
      const images = (folder.images || [])
        .map((item) => media(imageValue(item) || item))
        .filter(isBrowserImage)
        .filter(Boolean);
      return {
        count: `${images.length || 1} photos`,
        image: images[0] || (isBrowserImage(imageValue(folder)) ? media(imageValue(folder)) : ''),
        images,
        title: folder.title || folder.name || `Nexus Memory ${index + 1}`,
      };
    })
    .filter((item) => item.image);

  const fallbackAlbums = [
    {
      image: localGalleryImages[0],
      images: localGalleryImages,
      title: 'Student Achievements',
    },
    {
      image: localGalleryImages[1] || localGalleryImages[0],
      images: localGalleryImages,
      title: 'School Events',
    },
    {
      image: localGalleryImages[2] || localGalleryImages[0],
      images: localGalleryImages,
      title: 'ECA',
    },
    {
      image: localGalleryImages[3] || localGalleryImages[0],
      images: localGalleryImages,
      title: 'Classroom Moments',
    },
    {
      image: localGalleryImages[0],
      images: localGalleryImages,
      title: 'SEE Wishes',
    },
  ].map((album) => ({ ...album, count: `${album.images.length} photos` }));

  return uniqueBy([...mapped, ...fallbackAlbums], (album) => album.title);
}

export function pageHero(data, key, defaults) {
  return {
    ...(defaultPageHeroes[key] || {}),
    ...defaults,
    ...(data.cms?.pageHeroes?.[key] || {}),
  };
}

export function leadership(data) {
  const messages = Array.isArray(data.about?.messages) ? data.about.messages : [];
  return uniqueBy(
    [
      ...messages,
      {
        author: 'Bhim Bahadur Katuwal',
        featured: true,
        image_url: siteImages.bhim,
        message:
          'At Nexus, education is a promise to every child and every family. Discipline, care, confidence, and opportunity come together so students grow with values and courage.',
        priority: 1,
        title: 'Message from the Chairman',
      },
      {
        author: 'R.B. Katwal',
        image_url: siteImages.principal,
        message:
          "In the 21st century, education must meet global standards. At Nexus, we combine innovation with tradition to build minds that think, create, and lead. Your child's bright future is our promise.",
        priority: 2,
        title: 'Message from the Principal',
      },
      {
        author: 'Swikriti Rai',
        image_url: siteImages.vicePrincipal,
        message:
          'Education forms character, confidence, and competence. Nexus is committed to academic excellence, discipline, innovation, and holistic development.',
        priority: 3,
        title: 'Message from the Vice Principal',
      },
    ],
    (item) => item.author || item.title,
  ).sort((a, b) => (a.priority || 99) - (b.priority || 99));
}

export function teamMembers(data) {
  return uniqueBy(
    [
      ...(data.about?.team_members || []),
      { image_url: siteImages.bhim, name: 'Bhim Bahadur Katuwal', role: 'Chairman' },
      { image_url: siteImages.principal, name: 'R.B. Katwal', role: 'Principal' },
      { image_url: siteImages.vicePrincipal, name: 'Swikriti Rai', role: 'Vice Principal' },
      { image_url: siteImages.audience, name: 'Academic Team', role: 'Teaching Faculty' },
      { image_url: siteImages.speaker, name: 'Student Support Team', role: 'Guidance and Care' },
      { image_url: siteImages.stage, name: 'Activity Coordinators', role: 'Clubs and Events' },
    ],
    (member) => member.name || member.role,
  );
}

export function admissionFaqs(data) {
  return data.admission?.faqs?.length
    ? data.admission.faqs
    : [
        {
          answer:
            'Parents can call the school office, send an inquiry, or book a school visit to discuss grade level, seat availability, documents, and next steps.',
          question: 'How can parents start the admission process?',
        },
        {
          answer:
            'Yes. Families are encouraged to visit Nexus, see the learning environment, and speak with the office before completing the admission form.',
          question: 'Can we visit the school before applying?',
        },
        {
          answer:
            'The office usually asks for a birth certificate, previous school report, transfer certificate if applicable, and passport-size photographs.',
          question: 'Which documents are usually needed?',
        },
        {
          answer:
            'Admission requirements may vary by grade level. Parents can contact the school office to confirm the right class placement, available seats, and any entrance or interaction process.',
          question: 'Are admission requirements the same for every grade?',
        },
      ];
}

export function careerItems(data) {
  if (data.careerItems?.length) return data.careerItems;
  const school = data.config?.school_name || 'Nexus';
  return [
    {
      category: 'Academic',
      description:
        'For passionate teachers who guide students with discipline, care, subject confidence, and classroom energy.',
      image_url: careerCardImages.teaching,
      title: 'Teaching Faculty',
    },
    {
      category: 'Student Life',
      description:
        'For mentors supporting sports, arts, technology, leadership, and student confidence beyond regular classes.',
      image_url: careerCardImages.eca,
      title: 'ECA and Club Mentors',
    },
    {
      category: 'School Office',
      description: `For organized team members supporting families, visitors, communication, and daily operations at ${school}.`,
      image_url: careerCardImages.administrative,
      title: 'Administrative Support',
    },
  ];
}
