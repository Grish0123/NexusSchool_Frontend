import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal, revealDelay } from "../components/common/Reveal.jsx";
import { leadership, media, pageHero } from "../utils/content";
import { aboutHeroImages, aboutJourneyImages, siteImages } from "../data/siteImages";
import styles from "./AboutPage.module.scss";

export function AboutPage({ data }) {
  const [activeHero, setActiveHero] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const storyRef = useRef(null);
  const hero = pageHero(data, "about", {
    copy: "A school culture built around disciplined learning, care, confidence, and family trust.",
    eyebrow: "About Nexus",
    image_url: data.about?.hero_video?.image_url || siteImages.audience,
    title: "Learning with discipline, confidence, and care."
  });
  const heroSlides = [
    {
      image: media(aboutHeroImages[0] || hero.image_url || siteImages.audience),
      title: hero.title,
      copy: hero.copy,
      action: "Explore Nexus"
    },
    {
      image: media(aboutHeroImages[1] || siteImages.stage),
      title: "A learning culture built with care.",
      copy: "Students grow through discipline, confidence, achievement, and meaningful school experiences.",
      action: "View Gallery"
    },
    {
      image: media(aboutHeroImages[2] || siteImages.success),
      title: "Every learner has a story here.",
      copy: "Nexus brings families, teachers, and students together around strong values and bright futures.",
      action: "Start Admission"
    }
  ];
  const journey = data.about?.about_journey?.[0] || {};
  const intro = data.home?.about_section?.description || "Nexus School is committed to quality education that builds knowledge, creativity, confidence, and character. Our story begins with every learner’s curiosity and potential, supported by dedicated teachers, a caring environment, and meaningful learning experiences.";
  const introWords = useMemo(() => intro.split(/\s+/).filter(Boolean), [intro]);
  const highlightedIntroWords = Math.ceil(storyProgress * introWords.length);
  const journeyImages = aboutJourneyImages;
  const leaders = leadership(data);
  const highlightedMessages = leaders.slice(0, 3);

  useEffect(() => {
    function updateStoryProgress() {
      const element = storyRef.current;

      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const start = viewport * 0.82;
      const end = viewport * 0.24;
      const nextProgress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));

      setStoryProgress(nextProgress);
    }

    updateStoryProgress();
    window.addEventListener("scroll", updateStoryProgress, { passive: true });
    window.addEventListener("resize", updateStoryProgress);

    return () => {
      window.removeEventListener("scroll", updateStoryProgress);
      window.removeEventListener("resize", updateStoryProgress);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <>
      <section className={styles.aboutHero}>
        <div className={styles.aboutHeroTrack} style={{ transform: `translateX(-${activeHero * 100}%)` }}>
          {heroSlides.map((slide) => (
            <img src={slide.image} alt="" aria-hidden="true" key={slide.title} />
          ))}
        </div>
        <button
          className={`${styles.aboutHeroArrow} ${styles.aboutHeroPrev}`}
          onClick={() => setActiveHero((activeHero - 1 + heroSlides.length) % heroSlides.length)}
          type="button"
          aria-label="Previous about slide"
        >
          ‹
        </button>
        <button
          className={`${styles.aboutHeroArrow} ${styles.aboutHeroNext}`}
          onClick={() => setActiveHero((activeHero + 1) % heroSlides.length)}
          type="button"
          aria-label="Next about slide"
        >
          ›
        </button>
        <div className={styles.aboutHeroInner}>
          <Reveal as="article" className={styles.aboutHeroCard} amount={0.55} direction="left" distance={72}>
            <span>{hero.eyebrow}</span>
            <h1>{heroSlides[activeHero].title}</h1>
            <p>{heroSlides[activeHero].copy}</p>
            <a href={activeHero === 1 ? "/gallery" : "/admissions"} data-link>{heroSlides[activeHero].action}</a>
          </Reveal>
        </div>
        <div className={styles.aboutHeroBars}>
          {heroSlides.map((slide, index) => (
            <button
              className={index === activeHero ? styles.aboutHeroBarActive : ""}
              key={slide.title}
              onClick={() => setActiveHero(index)}
              type="button"
              aria-label={`Show about slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
      <section className={styles.storyHighlight}>
        <Reveal className={`${styles.inner} ${styles.storyHighlightInner}`} direction="up" distance={62} ref={storyRef}>
          <span>Our Story</span>
          <h2>
            {introWords.map((word, index) => (
              <span className={index < highlightedIntroWords ? styles.storyWordActive : ""} key={`${word}-${index}`}>
                {word}{" "}
              </span>
            ))}
          </h2>
          <div className={styles.storyActions}>
            <a href="/admissions" data-link>Start Admission</a>
            <a href="/gallery" data-link>View Gallery</a>
          </div>
        </Reveal>
      </section>
      <section className={styles.sectionMuted}>
        <div className={`${styles.inner} ${styles.journeyShowcase}`}>
          <Reveal className={`${styles.sectionHead} ${styles.journeyHead}`}>
            <span>{journey.title || "Our Journey"}</span>
            <h2>Built on values, sharpened by results.</h2>
            <p>{journey.description || "Nexus stands on a strong foundation of academic care, disciplined learning, leadership, and family trust. From classroom confidence to public events and achievements, the school experience helps learners grow with purpose."}</p>
            <div className={styles.pills}>
              {(data.home?.about_section?.features || ["Quality Education", "Experienced Teachers", "Modern Learning", "Student Confidence"]).map((feature) => (
                <span key={feature}>{feature}</span>
              ))}
            </div>
          </Reveal>
          <div className={styles.journeyImageGrid}>
            {journeyImages.map((image, index) => (
              <Reveal as="img" delay={revealDelay(index, 0.07)} direction={index % 2 ? "right" : "left"} kind="image" src={image} alt={`Nexus journey ${index + 1}`} key={image} />
            ))}
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={`${styles.inner} ${styles.leadershipSection}`}>
          <Reveal className={`${styles.sectionHead} ${styles.centerHead}`}>
            <span>Messages From Leadership</span>
            <h2>Guidance from the people shaping Nexus.</h2>
            <p>Thoughtful leadership, experienced educators, and a caring faculty shape the learning culture at Nexus.</p>
          </Reveal>

          <div className={styles.messageGrid}>
            {highlightedMessages.map((leader, index) => (
              <Reveal as="article" className={styles.messageCard} delay={revealDelay(index)} direction={index === 1 ? "up" : index === 0 ? "left" : "right"} key={leader.author} kind="card">
                <img src={media(leader.image_url || leader.image)} alt={leader.author} />
                <div>
                  <span>{leader.title}</span>
                  <h3>{leader.author}</h3>
                  <p>{leader.message}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
