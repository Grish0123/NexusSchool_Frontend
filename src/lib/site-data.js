import { cache } from "react";
import { applyCms } from "../utils/content";

const SERVER_API_BASE = (process.env.API_BASE || process.env.NEXT_PUBLIC_API_BASE || "https://backend.nexus.edu.np").replace(/\/$/, "");
const empty = {};

const endpoints = {
  about: "/api/aboutus-page/",
  admission: "/api/admission-page/",
  careerHero: "/api/career-hero-image/",
  clubs: "/api/clubs-page/",
  cms: "/api/cms",
  config: "/api/school-config/",
  courses: "/api/courses-page/",
  faqs: "/api/contact-faqs/",
  home: "/api/home-page/",
  memories: "/api/memories-page/",
  noticeHero: "/api/notices-hero-image/",
  notices: "/api/notices/",
  social: "/api/social-links/",
};

async function getJson(path, fallback) {
  try {
    const response = await fetch(`${SERVER_API_BASE}${path}`, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  } catch (error) {
    // Public pages still render their verified local fallback content if the CMS
    // is temporarily unavailable. Do not expose backend failure details to users.
    console.error(`Unable to load public CMS data for ${path}:`, error.message);
    return fallback;
  }
}

export const getSiteData = cache(async () => {
  const [config, home, notices, courses, clubs, memories, social, about, admission, faqs, noticeHero, careerHero, cms] = await Promise.all([
    getJson(endpoints.config, empty), getJson(endpoints.home, empty), getJson(endpoints.notices, []),
    getJson(endpoints.courses, []), getJson(endpoints.clubs, empty), getJson(endpoints.memories, empty),
    getJson(endpoints.social, []), getJson(endpoints.about, empty), getJson(endpoints.admission, empty),
    getJson(endpoints.faqs, []), getJson(endpoints.noticeHero, empty), getJson(endpoints.careerHero, empty), getJson(endpoints.cms, empty),
  ]);

  return applyCms({ about, admission, careerHero, clubs, cms, config, courses, faqs, home, memories, noticeHero, notices, social });
});
