import { useEffect, useMemo, useState } from "react";
import { apiUrl, endpoints } from "../config/api";
import { clubs, courses, galleryAlbums, notices } from "../utils/content";
import styles from "./AdminPage.module.scss";

const tabs = ["Identity", "Home", "Pages", "Notices", "Courses", "Clubs", "Gallery", "Contact"];

const pageDefaults = [
  ["courses", "Courses", "Academic Programs", "Explore each Nexus program with learning details, student fit, and next steps."],
  ["clubs", "Clubs", "Student Life", "Student activities designed for creativity, leadership, teamwork, confidence, and personal growth."],
  ["gallery", "Gallery", "Nexus Memories", "A polished visual archive of Nexus achievements and student moments."],
  ["notices", "Notices", "Updates", "School updates, events, announcements, and important information in one clean view."],
  ["admissions", "Admissions", "Admissions", "Enroll now and give your child a strong foundation for a brighter future."],
  ["contact-nexus", "Contact Nexus", "Contact", "Visit, call, email, or message the school."],
  ["careers", "Careers", "Work With Nexus", "Join a school culture built around discipline, care, and excellence."]
];

function emptyByType(type) {
  const map = {
    clubs: { description: "", image_url: "", name: "" },
    courses: { category: "", description: "", image_url: "", title: "" },
    faqs: { answer: "", question: "" },
    galleryAlbums: { image: "", images: "", title: "" },
    homeHeroSlides: { image_url: "", subtitle: "", title: "" },
    homeStats: { label: "", number: "" },
    notices: { attachments: "", content: "", date: new Date().toISOString().slice(0, 10), title: "" },
    socialLinks: { platform_name: "", url: "" }
  };
  return map[type] || {};
}

function Repeater({ fields, items, onChange, title, type }) {
  const updateItem = (index, key, value) => {
    onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item));
  };

  return (
    <section className={styles.card}>
      <div className={styles.cardHead}>
        <h3>{title}</h3>
        <button type="button" onClick={() => onChange([...items, emptyByType(type)])}>Add</button>
      </div>
      <div className={styles.repeatGrid}>
        {items.map((item, index) => (
          <article className={styles.repeatItem} key={index}>
            <strong>{title} {index + 1}</strong>
            {fields.map(([key, label, multiline]) => (
              <label key={key}>
                {label}
                {multiline
                  ? <textarea value={item[key] || ""} onChange={(event) => updateItem(index, key, event.target.value)} />
                  : <input value={item[key] || ""} onChange={(event) => updateItem(index, key, event.target.value)} />}
              </label>
            ))}
            {items.length > 1 && (
              <button type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>Remove</button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export function AdminPage({ data }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("Identity");
  const [status, setStatus] = useState("");
  const [login, setLogin] = useState({ password: "", username: "admin" });
  const [cms, setCms] = useState(() => ({
    aboutHero: data.cms?.aboutHero || {},
    galleryAlbums: data.cms?.galleryAlbums || galleryAlbums(data).slice(0, 4),
    homeAbout: data.cms?.homeAbout || data.home?.about_section || {},
    homeHeroSlides: data.cms?.homeHeroSlides || data.home?.hero_slider || [],
    homeStats: data.cms?.homeStats || data.home?.stats || [],
    identity: {
      address: data.config?.address || "",
      email: data.config?.contact_email || "",
      phone: data.config?.contact_phone?.[0] || "",
      schoolName: data.config?.school_name || "",
      tagline: data.config?.tagline || ""
    },
    notices: data.cms?.notices || notices(data).slice(0, 4),
    pageHeroes: data.cms?.pageHeroes || {},
    courses: data.cms?.courses || courses(data).slice(0, 4),
    clubs: data.cms?.clubs || clubs(data).slice(0, 4),
    faqs: data.cms?.faqs || data.faqs || [],
    socialLinks: data.cms?.socialLinks || data.social || []
  }));

  useEffect(() => {
    fetch(apiUrl(endpoints.cmsSession), { credentials: "include" })
      .then((response) => response.json())
      .then((session) => setAuthenticated(Boolean(session.authenticated)))
      .catch(() => setAuthenticated(false));
  }, []);

  const pageHeroItems = useMemo(() => pageDefaults.map(([key, title, eyebrow, copy]) => ({
    key,
    copy: cms.pageHeroes?.[key]?.copy || copy,
    eyebrow: cms.pageHeroes?.[key]?.eyebrow || eyebrow,
    image_url: cms.pageHeroes?.[key]?.image_url || "",
    title: cms.pageHeroes?.[key]?.title || title
  })), [cms.pageHeroes]);

  async function submitLogin(event) {
    event.preventDefault();
    setStatus("Checking login...");
    const response = await fetch(apiUrl(endpoints.cmsLogin), {
      body: JSON.stringify(login),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });
    if (!response.ok) {
      setStatus("Login failed");
      return;
    }
    setAuthenticated(true);
    setStatus("");
  }

  async function saveCms(event) {
    event.preventDefault();
    setStatus("Saving...");
    const response = await fetch(apiUrl(endpoints.cms), {
      body: JSON.stringify(cms),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });
    setStatus(response.ok ? "Saved successfully." : "Save failed.");
  }

  const setList = (key) => (items) => setCms((current) => ({ ...current, [key]: items }));
  const setIdentity = (key, value) => setCms((current) => ({ ...current, identity: { ...current.identity, [key]: value } }));

  if (!authenticated) {
    return (
      <main className={styles.loginShell}>
        <form className={styles.loginCard} onSubmit={submitLogin}>
          <h1>Nexus Admin</h1>
          <p>Sign in to manage the website content.</p>
          <label>Username<input value={login.username} onChange={(event) => setLogin({ ...login, username: event.target.value })} /></label>
          <label>Password<input type="password" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} /></label>
          <button>Login</button>
          {status && <span>{status}</span>}
        </form>
      </main>
    );
  }

  return (
    <main className={styles.adminShell}>
      <aside className={styles.sidebar}>
        <h1>Nexus Admin</h1>
        {tabs.map((tab) => <button className={activeTab === tab ? styles.active : ""} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}
        <a href="/" data-link>View Site</a>
      </aside>
      <form className={styles.workspace} onSubmit={saveCms}>
        <div className={styles.topbar}>
          <div>
            <span>Dashboard</span>
            <h2>{activeTab}</h2>
          </div>
          <button>Save Changes</button>
        </div>

        {activeTab === "Identity" && (
          <section className={styles.card}>
            <h3>School Identity</h3>
            {[
              ["schoolName", "School name"],
              ["tagline", "Tagline"],
              ["phone", "Phone"],
              ["email", "Email"],
              ["address", "Address"]
            ].map(([key, label]) => (
              <label key={key}>{label}<input value={cms.identity[key] || ""} onChange={(event) => setIdentity(key, event.target.value)} /></label>
            ))}
          </section>
        )}

        {activeTab === "Home" && (
          <>
            <Repeater fields={[["title", "Title"], ["subtitle", "Subtitle", true], ["image_url", "Image URL"]]} items={cms.homeHeroSlides} onChange={setList("homeHeroSlides")} title="Hero Slide" type="homeHeroSlides" />
            <Repeater fields={[["number", "Number"], ["label", "Label"]]} items={cms.homeStats} onChange={setList("homeStats")} title="Home Stat" type="homeStats" />
          </>
        )}

        {activeTab === "Pages" && (
          <Repeater
            fields={[["title", "Title"], ["eyebrow", "Eyebrow"], ["copy", "Copy", true], ["image_url", "Image URL"]]}
            items={pageHeroItems}
            onChange={(items) => setCms((current) => ({ ...current, pageHeroes: Object.fromEntries(items.map((item) => [item.key, item])) }))}
            title="Page Hero"
            type="pageHeroes"
          />
        )}

        {activeTab === "Notices" && <Repeater fields={[["date", "Date"], ["title", "Title"], ["content", "Content", true], ["attachments", "Image URL"]]} items={cms.notices} onChange={setList("notices")} title="Notice" type="notices" />}
        {activeTab === "Courses" && <Repeater fields={[["title", "Title"], ["category", "Category"], ["description", "Description", true], ["image_url", "Image URL"]]} items={cms.courses} onChange={setList("courses")} title="Course" type="courses" />}
        {activeTab === "Clubs" && <Repeater fields={[["name", "Name"], ["category", "Category"], ["description", "Description", true], ["image_url", "Image URL"]]} items={cms.clubs} onChange={setList("clubs")} title="Club" type="clubs" />}
        {activeTab === "Gallery" && <Repeater fields={[["title", "Title"], ["image", "Cover image"], ["images", "Images", true]]} items={cms.galleryAlbums} onChange={setList("galleryAlbums")} title="Gallery Album" type="galleryAlbums" />}
        {activeTab === "Contact" && (
          <>
            <Repeater fields={[["question", "Question"], ["answer", "Answer", true]]} items={cms.faqs} onChange={setList("faqs")} title="FAQ" type="faqs" />
            <Repeater fields={[["platform_name", "Platform"], ["url", "URL"]]} items={cms.socialLinks} onChange={setList("socialLinks")} title="Social Link" type="socialLinks" />
          </>
        )}

        {status && <p className={styles.status}>{status}</p>}
      </form>
    </main>
  );
}
