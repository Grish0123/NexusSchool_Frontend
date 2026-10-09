import { useEffect } from 'react';

const SITE_URL = 'https://www.nexus.edu.np';
const SCHOOL_NAME = 'Nexus International School';
const DEFAULT_DESCRIPTION =
  'Nexus International School in Pepsi-Cola Town Planning, Kathmandu — a future-ready school where learners build confidence, creativity, values, and academic excellence.';

const pages = {
  '/': { title: 'Nexus | Nexus International School' },
  '/about': {
    title: 'About Nexus | Nexus International School',
    description:
      'Learn about Nexus International School in Kathmandu: our learning culture, values, leadership, and commitment to future-ready education.',
  },
  '/admission': {
    title: 'Admissions | Nexus International School',
    description:
      'Explore admissions at Nexus International School in Kathmandu, including the process, documents, and how to arrange a school visit.',
  },
  '/admissions': {
    title: 'Admissions | Nexus International School',
    description:
      'Explore admissions at Nexus International School in Kathmandu, including the process, documents, and how to arrange a school visit.',
  },
  '/courses': {
    title: 'Courses | Nexus International School',
    description:
      'Explore the academic programmes at Nexus International School in Kathmandu, including Montessori, IPC, Cambridge English, and digital learning.',
  },
  '/courses/cambridge-assessment-english': {
    title: 'Cambridge English | Nexus International School',
    description:
      'Explore the Cambridge Assessment English programme at Nexus International School in Kathmandu.',
  },
  '/courses/montessori-ipc': {
    title: 'Montessori & IPC | Nexus International School',
    description:
      'Learn about the Montessori and IPC programme at Nexus International School in Kathmandu.',
  },
  '/courses/ncc-digi-school': {
    title: 'NCC Digi School | Nexus International School',
    description:
      'Explore the NCC UK Digi School programme at Nexus International School in Kathmandu.',
  },
  '/clubs': {
    title: 'Student Clubs | Nexus International School',
    description:
      'Discover student clubs, sports, arts, technology, and activities at Nexus International School in Kathmandu.',
  },
  '/student-life': {
    title: 'Student Life | Nexus International School',
    description:
      'Discover activities, clubs, gallery memories, and student life at Nexus International School in Kathmandu.',
  },
  '/gallery': {
    title: 'Gallery | Nexus International School',
    description:
      'See school life, student achievements, events, and learning moments at Nexus International School in Kathmandu.',
  },
  '/notices': {
    title: 'Notices | Nexus International School',
    description:
      'Read the latest school notices and updates from Nexus International School in Kathmandu.',
  },
  '/careers': {
    title: 'Careers | Nexus International School',
    description: 'Explore career opportunities at Nexus International School in Kathmandu.',
  },
  '/contact': {
    title: 'Contact Nexus | Nexus International School',
    description:
      'Contact Nexus International School in Pepsi-Cola Town Planning, Kathmandu. Call 01-4990303 or email info@nexus.edu.np.',
  },
};

function setMeta(selector, attribute, value) {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

export function Seo({ path }) {
  useEffect(() => {
    const page = pages[path] || pages['/'];
    const canonicalPath = path === '/admissions' ? '/admission' : path;
    const url = `${SITE_URL}${canonicalPath}`;
    const description = page.description || DEFAULT_DESCRIPTION;

    document.title = page.title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:title"]', 'content', page.title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[name="twitter:title"]', 'content', page.title);
    setMeta('meta[name="twitter:description"]', 'content', description);
  }, [path]);

  return null;
}
