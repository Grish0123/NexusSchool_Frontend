const SITE_URL = 'https://nexus.edu.np';
const DEFAULT_DESCRIPTION =
  'Nexus International School in Pepsi-Cola Town Planning, Kathmandu — a future-ready school where learners build confidence, creativity, values, and academic excellence.';

export const pageMetadata = {
  home: {
    path: '/',
    title: 'Nexus International School | Nepal',
    description: DEFAULT_DESCRIPTION,
  },
  about: {
    path: '/about',
    title: 'About Nexus | Nexus International School',
    description:
      'Learn about Nexus International School in Kathmandu: our learning culture, values, leadership, and commitment to future-ready education.',
  },
  admission: {
    path: '/admission',
    title: 'Admissions | Nexus International School',
    description:
      'Explore admissions at Nexus International School in Kathmandu, including the process, documents, and how to arrange a school visit.',
  },
  notices: {
    path: '/notices',
    title: 'Notices | Nexus International School',
    description:
      'Read the latest school notices and updates from Nexus International School in Kathmandu.',
  },
  gallery: {
    path: '/gallery',
    title: 'Gallery | Nexus International School',
    description:
      'See school life, student achievements, events, and learning moments at Nexus International School in Kathmandu.',
  },
  courses: {
    path: '/courses',
    title: 'Courses | Nexus International School',
    description:
      'Explore the academic programmes at Nexus International School in Kathmandu, including Montessori, IPC, Cambridge English, and digital learning.',
  },
  cambridge: {
    path: '/courses/cambridge-assessment-english',
    title: 'Cambridge English | Nexus International School',
    description:
      'Explore the Cambridge Assessment English programme at Nexus International School in Kathmandu.',
  },
  montessori: {
    path: '/courses/montessori-ipc',
    title: 'Montessori & IPC | Nexus International School',
    description:
      'Learn about the Montessori and IPC programme at Nexus International School in Kathmandu.',
  },
  digi: {
    path: '/courses/ncc-digi-school',
    title: 'NCC Digi School | Nexus International School',
    description:
      'Explore the NCC UK Digi School programme at Nexus International School in Kathmandu.',
  },
  clubs: {
    path: '/clubs',
    title: 'Student Clubs | Nexus International School',
    description:
      'Discover student clubs, sports, arts, technology, and activities at Nexus International School in Kathmandu.',
  },
  studentLife: {
    path: '/student-life',
    title: 'Student Life | Nexus International School',
    description:
      'Discover activities, clubs, gallery memories, and student life at Nexus International School in Kathmandu.',
  },
  careers: {
    path: '/careers',
    title: 'Careers | Nexus International School',
    description: 'Explore career opportunities at Nexus International School in Kathmandu.',
  },
  contact: {
    path: '/contact',
    title: 'Contact Nexus | Nexus International School',
    description:
      'Contact Nexus International School in Pepsi-Cola Town Planning, Kathmandu. Call 01-4990303 or email info@nexus.edu.np.',
  },
};

export function metadataFor(page) {
  const { path, title, description } = pageMetadata[page];
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url,
      siteName: 'Nexus International School',
      title,
      description,
      images: [{ url: '/site-images/Logo%20Nexus.png', alt: 'Nexus International School logo' }],
    },
    twitter: { card: 'summary', title, description, images: ['/site-images/Logo%20Nexus.png'] },
  };
}
