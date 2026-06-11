import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/layout/Header.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { AIChatButton } from "./components/layout/WhatsAppButton.jsx";
import { AdminPage } from "./pages/AdminPage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { AdmissionsPage } from "./pages/AdmissionsPage.jsx";
import { CardsPage } from "./pages/CardsPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { CambridgeCourseDetailPage, CourseDetailPage } from "./pages/CourseDetailPage.jsx";
import { GalleryPage } from "./pages/GalleryPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { NoticesPage } from "./pages/NoticesPage.jsx";
import { useSiteData } from "./hooks/useSiteData";
import { careerItems, clubs, courses, galleryAlbums, heroSlides, media, notices, pageHero } from "./utils/content";
import { siteImages } from "./data/siteImages";
import styles from "./styles/App.module.scss";

const PRELOAD_TIMEOUT = 10000;

function uniqueImages(images) {
  return [...new Set(images.map((image) => media(image, "")).filter(Boolean))];
}

function preloadImages(images) {
  const sources = uniqueImages(images);
  if (!sources.length) return Promise.resolve();

  return Promise.allSettled(
    sources.map(
      (src) =>
        new Promise((resolve) => {
          const image = new Image();
          const done = () => resolve(src);
          image.onload = done;
          image.onerror = done;
          image.src = src;
        }),
    ),
  );
}

function initialRouteImages(path, data) {
  if (path !== "/" || !data) return [];
  const firstHero = heroSlides(data)[0]?.image_url;

  return [
    "/site-images/Logo Nexus.png",
    firstHero,
  ].filter(Boolean);
}

function usePath() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest("a[data-link]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      event.preventDefault();
      window.history.pushState({}, "", href);
      setPath(window.location.pathname);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return path;
}

export function App() {
  const path = usePath();
  const { data, loading } = useSiteData();
  const [assetsLoading, setAssetsLoading] = useState(true);

  useEffect(() => {
    document.body.dataset.route = path;
  }, [path]);

  useEffect(() => {
    if (loading || !data) {
      setAssetsLoading(true);
      return undefined;
    }

    let cancelled = false;
    const images = initialRouteImages(path, data);
    if (!images.length) {
      setAssetsLoading(false);
      return undefined;
    }

    setAssetsLoading(true);

    let timeoutId;
    const timeout = new Promise((resolve) => {
      timeoutId = window.setTimeout(resolve, PRELOAD_TIMEOUT);
    });

    Promise.race([preloadImages(images), timeout]).then(() => {
      if (!cancelled) setAssetsLoading(false);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [data, loading, path]);

  const pages = useMemo(() => {
    if (!data) return {};
    return {
      "/": <HomePage data={data} />,
      "/about": <AboutPage data={data} />,
      "/admission": <AdmissionsPage data={data} />,
      "/admissions": <AdmissionsPage data={data} />,
      "/notices": <NoticesPage data={data} items={notices(data)} />,
      "/gallery": <GalleryPage data={data} items={galleryAlbums(data)} />,
      "/courses": (
        <CardsPage
          data={data}
          hero={pageHero(data, "courses", {
            copy: "Explore each Nexus program with learning details, student fit, and next steps.",
            eyebrow: "Academic Programs",
            image_url: siteImages.audience,
            title: "Courses"
          })}
          items={courses(data)}
          kind="course"
        />
      ),
      "/courses/cambridge-assessment-english": <CambridgeCourseDetailPage />,
      "/courses/montessori-ipc": <CourseDetailPage />,
      "/clubs": (
        <CardsPage
          data={data}
          hero={pageHero(data, "clubs", {
            copy: "Student activities designed for creativity, leadership, teamwork, confidence, and personal growth.",
            eyebrow: "Student Life",
            image_url: siteImages.stage,
            title: "Clubs"
          })}
          items={clubs(data)}
          kind="club"
        />
      ),
      "/student-life": (
        <CardsPage
          data={data}
          hero={pageHero(data, "student-life", {
            copy: "A quick gateway to real activities, gallery memories, clubs, and student confidence at Nexus.",
            eyebrow: "Life at Nexus",
            image_url: siteImages.stage,
            title: "Student Life"
          })}
          items={clubs(data)}
          kind="club"
        />
      ),
      "/careers": (
        <CardsPage
          data={data}
          hero={pageHero(data, "careers", {
            copy: "Join a school culture built around discipline, care, excellence, and student growth.",
            eyebrow: "Work With Nexus",
            image_url: siteImages.speaker,
            title: "Careers"
          })}
          items={careerItems(data)}
          kind="career"
        />
      ),
      "/contact": <ContactPage data={data} />,
      "/admin": <AdminPage data={data} />
    };
  }, [data]);

  if (assetsLoading || loading || !data) {
    return (
      <div className={styles.loading}>
        <img src="/site-images/Logo Nexus.png" alt="Nexus International School logo" />
        <span>Loading Nexus...</span>
      </div>
    );
  }

  const page = pages[path] || pages["/"];
  const isAdmin = path === "/admin";

  return (
    <div className={styles.appShell}>
      {!isAdmin && <Header activePath={path} config={data.config} social={data.social || []} />}
      {page}
      {!isAdmin && <Footer config={data.config} social={data.social || []} />}
      {!isAdmin && <AIChatButton />}
    </div>
  );
}
