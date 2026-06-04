export const API_BASE = import.meta.env.VITE_API_BASE || "";

export const endpoints = {
  about: "/api/aboutus-page/",
  admission: "/api/admission-page/",
  careerHero: "/api/career-hero-image/",
  clubs: "/api/clubs-page/",
  cms: "/api/cms",
  cmsLogin: "/api/cms/login",
  cmsLogout: "/api/cms/logout",
  cmsSession: "/api/cms/session",
  config: "/api/school-config/",
  courses: "/api/courses-page/",
  faqs: "/api/contact-faqs/",
  home: "/api/home-page/",
  memories: "/api/memories-page/",
  noticeHero: "/api/notices-hero-image/",
  notices: "/api/notices/",
  social: "/api/social-links/"
};

export function apiUrl(path) {
  if (/^https?:\/\//.test(path)) return path;
  return `${API_BASE}${path}`;
}
