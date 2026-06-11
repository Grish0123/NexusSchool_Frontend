import { useEffect, useMemo, useState } from "react";
import { apiUrl, endpoints } from "../config/api";
import { applyCms } from "../utils/content";

const empty = {};

async function getJson(path, fallback) {
  try {
    const response = await fetch(apiUrl(path), { credentials: "include" });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.warn(`Failed to load ${path}`, error);
    return fallback;
  }
}

export function useSiteData() {
  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    let active = true;

    function loadData() {
      Promise.all([
        getJson(endpoints.config, empty),
        getJson(endpoints.home, empty),
        getJson(endpoints.notices, []),
        getJson(endpoints.courses, []),
        getJson(endpoints.clubs, empty),
        getJson(endpoints.memories, empty),
        getJson(endpoints.social, []),
        getJson(endpoints.about, empty),
        getJson(endpoints.admission, empty),
        getJson(endpoints.faqs, []),
        getJson(endpoints.noticeHero, empty),
        getJson(endpoints.careerHero, empty),
        getJson(endpoints.cms, empty)
      ]).then(([config, home, notices, courses, clubs, memories, social, about, admission, faqs, noticeHero, careerHero, cms]) => {
        if (!active) return;
        setState({
          data: applyCms({ about, admission, careerHero, clubs, cms, config, courses, faqs, home, memories, noticeHero, notices, social }),
          loading: false
        });
      });
    }

    loadData();
    window.addEventListener("nexus:cms-saved", loadData);

    return () => {
      active = false;
      window.removeEventListener("nexus:cms-saved", loadData);
    };
  }, []);

  return useMemo(() => state, [state]);
}
