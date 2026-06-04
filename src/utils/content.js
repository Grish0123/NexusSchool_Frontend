import {
  careerImages,
  careerCardImages,
  clubImages,
  courseImages,
  curatedSlides,
  defaultNotices,
  galleryImages,
  homeHeroImages,
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
  if (/^https?:\/\//.test(raw) || raw.startsWith('/')) return raw;
  if (raw.startsWith('site-images/')) return `/${raw}`;
  if (raw.startsWith('media/')) return `/${raw}`;
  return raw;
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
    [...cleanList(items, ['platform_name', 'url']), ...defaultSocialLinks],
    (item) => item.platform_name || item.platform || item.url,
  );
}

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

  const notices = cleanList(cms.notices || [], ['title', 'content', 'attachments']);
  if (notices.length) merged.notices = notices;

  const courses = cleanList(cms.courses || [], ['title', 'description', 'image_url']);
  if (courses.length) merged.courses = courses;

  const clubs = cleanList(cms.clubs || [], ['name', 'title', 'description', 'image_url']);
  if (clubs.length) merged.clubs = { ...(merged.clubs || {}), clubs };

  const albums = cleanList(cms.galleryAlbums || [], ['title', 'image', 'images']);
  if (albums.length) {
    merged.memories = {
      ...(merged.memories || {}),
      event_folders: albums.map((album) => ({
        title: album.title,
        images: compact(album.images || album.image)
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

  return merged;
}

export function heroSlides(data) {
  const slides = data.home?.hero_slider?.length ? data.home.hero_slider : curatedSlides;
  const apiImages = imagePool(data);
  return slides.map((slide, index) => ({
    ...slide,
    image_url: media(
      homeHeroImages[index % homeHeroImages.length]
        || slide.image_url
        || slide.image
        || apiImages[index % Math.max(1, apiImages.length)],
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
          'Confidence in English communication through reading, speaking, writing, and classroom support.',
        image_url: courseImages.english,
        title: 'Cambridge Assessment English Program',
      },
      {
        category: 'Foundation Learning',
        description:
          'Activity-based learning for young learners with care, structure, creativity, and strong learning habits.',
        image_url: courseImages.montessori,
        title: 'Montessori and IPC Teaching',
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
          'A space for drawing, craft, performance, imagination, and confident expression.',
        image_url: clubImages.art,
        name: 'Art & Creativity Club',
      },
      {
        description: 'Technology exposure, digital confidence, and practical problem solving.',
        image_url: clubImages.computer,
        name: 'IT & Computer Club',
      },
      {
        description:
          'Rhythm, stage confidence, cultural pride, teamwork, and joyful participation.',
        image_url: clubImages.dance,
        name: 'Music & Dance Club',
      },
      {
        description: 'Fitness, discipline, teamwork, leadership, and healthy competition.',
        image_url: clubImages.sports,
        name: 'Sports Club',
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
          "At Nexus, we combine innovation with tradition to build minds that think, create, and lead. Your child's bright future is our promise.",
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
