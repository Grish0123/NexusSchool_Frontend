import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import { Reveal, revealDelay } from "../components/common/Reveal.jsx";
import { media, pageHero } from "../utils/content";
import { siteImages } from "../data/siteImages";
import styles from "./GalleryPage.module.scss";

export function GalleryPage({ data, items }) {
  const [activeTab, setActiveTab] = useState(0);
  const [viewer, setViewer] = useState(null);
  const [viewerIndex, setViewerIndex] = useState(0);
  const hero = pageHero(data, "gallery", {
    copy: "A polished visual archive of Nexus achievements, events, ECA, classroom energy, and student moments.",
    eyebrow: "Nexus Memories",
    image_url: siteImages.award,
    title: "Gallery"
  });
  const activeAlbum = items[activeTab] || items[0];
  const activeImages = activeAlbum?.images?.length ? activeAlbum.images : [activeAlbum?.image].filter(Boolean);
  const mosaicImages = useMemo(() => {
    const galleryImages = items.flatMap((item) => item.images?.length ? item.images : [item.image].filter(Boolean));
    const mainImage = activeImages[0] || activeAlbum?.image || galleryImages[0];
    const uniqueSideImages = [...new Set(galleryImages.filter((image) => image && image !== mainImage))];
    const repeatedSideImages = Array.from({ length: 8 }, (_, index) => uniqueSideImages[index % uniqueSideImages.length]).filter(Boolean);

    return [mainImage, ...repeatedSideImages].filter(Boolean);
  }, [activeAlbum?.image, activeImages, items]);
  const mosaicMain = mosaicImages[0];
  const mosaicSideImages = mosaicImages.slice(1, 8);
  const openViewer = (index) => {
    setViewer(activeAlbum);
    setViewerIndex(index);
  };
  const viewerImages = viewer?.images?.length ? viewer.images : [viewer?.image].filter(Boolean);
  const currentViewerImage = viewerImages[viewerIndex] || viewerImages[0];
  const moveViewer = (direction) => {
    setViewerIndex((current) => (current + direction + viewerImages.length) % viewerImages.length);
  };

  useEffect(() => {
    if (!viewer) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [viewer]);

  return (
    <>
      <section className={styles.galleryHero}>
        <Reveal amount={0.55} direction="up" distance={58}>
          <span>{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
        </Reveal>
      </section>
      <section className={styles.wisdomCollage} aria-label="Nexus gallery introduction">
        <div className={styles.wisdomStage}>
          {mosaicMain && (
            <Reveal className={styles.wisdomMainWrap} direction="up" distance={72} kind="image">
              <img
                className={styles.wisdomMain}
                src={media(mosaicMain)}
                alt="Nexus International School campus life"
              />
            </Reveal>
          )}
          {mosaicSideImages.map((image, index) => (
            <Reveal
              as="img"
              className={`${styles.wisdomPhoto} ${styles[`wisdomSide${index + 1}`]}`}
              delay={revealDelay(index, 0.05)}
              direction={index < 3 ? "left" : "right"}
              kind="image"
              src={media(image)}
              alt=""
              aria-hidden="true"
              key={`wisdom-side-${image}-${index}`}
            />
          ))}
        </div>
      </section>
      <section className={styles.gallerySection}>
        <div className={styles.inner}>
            <Reveal className={styles.galleryTabs} aria-label="Gallery categories" role="tablist">
            {items.map((item, index) => (
              <button
                className={index === activeTab ? styles.activeTab : ""}
                key={item.title}
                onClick={() => setActiveTab(index)}
                role="tab"
                type="button"
              >
                {item.title}
              </button>
            ))}
            </Reveal>

          {activeAlbum && (
            <>
              <div className={styles.galleryTrack}>
                {activeImages.map((image, index) => (
                  <Reveal as="button" className={styles.gallerySlide} delay={revealDelay(index, 0.05)} direction={index % 2 ? "right" : "left"} key={`${image}-${index}`} kind="card" onClick={() => openViewer(index)} type="button">
                    <img src={media(image)} alt={`${activeAlbum.title} ${index + 1}`} />
                  </Reveal>
                ))}
              </div>
              <Reveal className={styles.galleryCaption}>
                <h2>{activeAlbum.title}</h2>
                <p>{activeAlbum.count || `${activeImages.length} photos`}</p>
              </Reveal>
            </>
          )}
        </div>
      </section>
      {viewer && currentViewerImage && (
        <div className={styles.viewer} role="dialog" aria-modal="true" aria-label={`${viewer.title} gallery`}>
          <button className={styles.closeViewer} onClick={() => setViewer(null)} type="button" aria-label="Close gallery">
            <FaTimes aria-hidden="true" />
          </button>
          {viewerImages.length > 1 && (
            <>
              <button className={`${styles.viewerNav} ${styles.viewerPrev}`} onClick={() => moveViewer(-1)} type="button" aria-label="Previous image">
                <FaArrowLeft aria-hidden="true" />
              </button>
              <button className={`${styles.viewerNav} ${styles.viewerNext}`} onClick={() => moveViewer(1)} type="button" aria-label="Next image">
                <FaArrowRight aria-hidden="true" />
              </button>
            </>
          )}
          <img className={styles.viewerImage} src={media(currentViewerImage)} alt={`${viewer.title} ${viewerIndex + 1}`} />
          <div className={styles.viewerDots}>
            {viewerImages.map((image, index) => (
              <button
                className={index === viewerIndex ? styles.viewerDotActive : ""}
                key={`${image}-${index}`}
                onClick={() => setViewerIndex(index)}
                style={{ "--preview-image": `url(${media(image)})` }}
                type="button"
                aria-label={`Show image ${index + 1}`}
              >
                <span />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
