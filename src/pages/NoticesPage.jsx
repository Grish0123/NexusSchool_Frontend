import { useState } from "react";
import { Reveal, revealDelay } from "../components/common/Reveal.jsx";
import { imageValue, media, pageHero } from "../utils/content";
import { siteImages } from "../data/siteImages";
import styles from "./NoticesPage.module.scss";

export function NoticesPage({ data, items }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const hero = pageHero(data, "notices", {
    copy: "School updates, events, announcements, and important information in one clean view.",
    eyebrow: "Updates",
    image_url: data.noticeHero?.image_url || siteImages.labor,
    title: "Notices"
  });
  const notices = items.length ? items : [];
  const selectedNotice = notices[selectedIndex] || notices[0];

  return (
    <>
      <section className={styles.noticeHero}>
        <Reveal amount={0.55} direction="up" distance={58}>
          <span>{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p>{hero.copy}</p>
        </Reveal>
      </section>
      <section className={styles.noticeSection}>
        <div className={styles.inner}>
          <div className={styles.topGrid}>
            {selectedNotice && (
              <Reveal as="article" className={styles.featuredCard} direction="left" kind="card">
                <img src={media(imageValue(selectedNotice), siteImages.labor)} alt={selectedNotice.title} />
                <div>
                  <span>Notice</span>
                  <h2>{selectedNotice.title}</h2>
                  <p className={styles.featuredDescription}>{selectedNotice.content}</p>
                  <p className={styles.featuredMeta}>{new Date(selectedNotice.date).toLocaleDateString()} · School update</p>
                </div>
              </Reveal>
            )}

            <Reveal as="aside" className={styles.latestPanel} delay={0.08} direction="right" kind="card">
              <h2>Latest notices</h2>
              <div>
                {notices.map((notice, index) => (
                  <Reveal
                    as="button"
                    className={`${styles.latestItem} ${index === selectedIndex ? styles.latestItemActive : ""}`}
                    delay={revealDelay(index, 0.04)}
                    direction="right"
                    key={`${notice.title}-${index}`}
                    kind="soft"
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                  >
                    <img src={media(imageValue(notice), siteImages.stage)} alt={notice.title} />
                    <div>
                      <h3>{notice.title}</h3>
                      <p>{new Date(notice.date).toLocaleDateString()} · School update</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
