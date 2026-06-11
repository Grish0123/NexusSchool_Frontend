import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaBell, FaFileAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Reveal, revealDelay } from "../components/common/Reveal.jsx";
import { clubs, courses, heroSlides, media, notices } from "../utils/content";
import { galleryImages, homeAdvantageImages, homeMomentImages, siteImages } from "../data/siteImages";
import styles from "./HomePage.module.scss";

function HeroTitle({ title }) {
  const fallback = "Leadership That Guides Every Learner";
  const words = String(title || fallback).trim().split(/\s+/);
  const highlightCount = Math.min(2, words.length);
  const plain = words.slice(0, -highlightCount).join(" ");
  const highlighted = words.slice(-highlightCount).join(" ");

  return (
    <h1>
      {plain ? `${plain} ` : ""}
      <em>{highlighted}</em>
    </h1>
  );
}

function CounterNumber({ active = false, delay = 0, value }) {
  const text = String(value || "");
  const match = text.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match?.[1] || "";
  const target = Number(match?.[2] || 0);
  const suffix = match?.[3] || "";
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (!active) return undefined;
    if (!target) return undefined;

    const duration = 1200;
    const stepTime = 30;
    const steps = Math.max(1, Math.floor(duration / stepTime));
    const increment = target / steps;
    let current = 0;
    let interval;

    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        current = Math.min(target, current + increment);
        setCount(Math.round(current));
        if (current >= target) window.clearInterval(interval);
      }, stepTime);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [active, delay, target]);

  if (!match) return <strong className={styles.counterNumber}>{text}</strong>;

  return <strong className={styles.counterNumber}>{prefix}{count}{suffix}</strong>;
}

function QuickIcon({ type }) {
  const icons = {
    admission: FaFileAlt,
    notice: FaBell,
    visit: FaMapMarkerAlt
  };
  const Icon = icons[type];

  return (
    <span className={styles.quickIcon} aria-hidden="true">
      <Icon />
    </span>
  );
}

const advantageBoxVariants = {
  hidden: { y: -44, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.82,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.09,
      delayChildren: 0
    }
  }
};

const advantageChildVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.64, ease: [0.16, 1, 0.3, 1] } }
};

export function HomePage({ data }) {
  const slides = heroSlides(data);
  const [active, setActive] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [testimonialDirection, setTestimonialDirection] = useState("next");
  const [aboutProgress, setAboutProgress] = useState(0);
  const [statsActive, setStatsActive] = useState(false);
  const aboutSectionRef = useRef(null);
  const aboutRef = useRef(null);
  const slide = slides[active] || slides[0] || {};
  const latestNotice = notices(data)[0] || {};
  const about = data.home?.about_section || {};
  const aboutText = about.description || "Nexus International School is where global excellence begins. We blend national and international curricula to shape future-ready learners with innovation, creativity, values, critical thinking, global competence, and strong academic habits.";
  const aboutWords = useMemo(() => aboutText.split(/\s+/).filter(Boolean), [aboutText]);
  const highlightedAboutWords = Math.ceil(aboutProgress * aboutWords.length);
  const stats = data.home?.stats?.length
    ? data.home.stats
    : [
      { label: "Years of Excellence", number: "20+" },
      { label: "Students Nurtured", number: "2500+" },
      { label: "Expert Educators", number: "50+" },
      { label: "Awards & Achievements", number: "30+" }
    ];
  const previewCards = useMemo(() => [
    ...courses(data).slice(0, 2),
    ...clubs(data).slice(0, 2)
  ], [data]);
  const testimonialItems = [
  [
    "Alumni Testimonial",
    "Nexus International School gave me more than just classroom knowledge. The school helped me build discipline, confidence, and a strong academic foundation that continues to support me in my higher studies. The guidance I received from my teachers shaped the way I approach challenges, communicate with others, and work toward my goals.",
    siteImages.success
  ],
  [
    "Student Testimonial",
    "Studying at Nexus has made learning feel more comfortable and meaningful for me. The teachers explain lessons clearly, encourage us to ask questions, and support us whenever we need help. The friendly environment, regular activities, and positive school culture have helped me become more confident in my studies and in myself.",
    siteImages.audience
  ],
  [
    "Parent Testimonial",
    "As a parent, I have seen a positive change in my child after joining Nexus International School. The school focuses not only on academic progress but also on discipline, confidence, values, and character development. The teachers are caring, approachable, and genuinely involved in each student's growth, which makes us feel confident about our child's future.",
    siteImages.stage
  ]
];
  const visibleTestimonials = [-1, 0, 1].map((offset) => {
    const index = (activeTestimonial + offset + testimonialItems.length) % testimonialItems.length;
    return { index, item: testimonialItems[index], offset };
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTestimonialDirection("next");
      setActiveTestimonial((current) => (current + 1) % testimonialItems.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [testimonialItems.length]);

  function showTestimonial(index) {
    if (index === activeTestimonial) return;
    const forwardDistance = (index - activeTestimonial + testimonialItems.length) % testimonialItems.length;
    const backwardDistance = (activeTestimonial - index + testimonialItems.length) % testimonialItems.length;
    setTestimonialDirection(forwardDistance <= backwardDistance ? "next" : "previous");
    setActiveTestimonial(index);
  }

  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    let frame = 0;

    function updateAboutProgress() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const element = aboutRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const start = window.innerHeight * 0.82;
        const end = window.innerHeight * 0.28;
        const nextProgress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
        setAboutProgress(nextProgress);
      });
    }

    updateAboutProgress();
    window.addEventListener("scroll", updateAboutProgress, { passive: true });
    window.addEventListener("resize", updateAboutProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateAboutProgress);
      window.removeEventListener("resize", updateAboutProgress);
    };
  }, []);

  useEffect(() => {
    const element = aboutSectionRef.current;
    if (!element) return undefined;

    if (!("IntersectionObserver" in window)) {
      setStatsActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStatsActive(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.25 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.homePage}>
      <section className={styles.heroShell}>
        <div className={styles.hero}>
          <div className={styles.heroTrack} style={{ transform: `translateX(-${active * 100}%)` }}>
            {slides.map((item, index) => (
              <div
                className={styles.heroSlide}
                key={item.title}
                style={{ "--hero-slide-image": `url(${media(item.image_url)})` }}
              >
                <img
                  alt={item.title}
                  className={`${styles.heroSlideImage} ${String(item.image_url).includes("glorious-") ? styles.heroSlideImageContain : ""}`}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "low"}
                  loading={index === 0 ? "eager" : "lazy"}
                  src={media(item.image_url)}
                />
              </div>
            ))}
          </div>
          <div className={styles.heroScrim} />
          <Reveal className={styles.heroInner} amount={0.55} direction="left" distance={76}>
            <span>Admissions Open</span>
            <HeroTitle title={slide.title} />
            <p>{slide.subtitle || "A future-ready school in Kathmandu where discipline, confidence, creativity, and leadership grow together."}</p>
            <div className={styles.heroActions}>
              <a href="/admissions" data-link>Start Admission</a>
              <a href="/gallery" data-link>View Gallery</a>
            </div>
          </Reveal>
          <div className={styles.dots}>
            {slides.map((item, index) => (
              <button
                aria-label={`Show slide ${index + 1}`}
                className={index === active ? styles.activeDot : ""}
                onClick={() => setActive(index)}
                key={item.title}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.aboutNexus} ref={aboutSectionRef}>
        <Reveal className={styles.aboutNexusInner} ref={aboutRef}>
          <span>About Us</span>
          <h2>
            {aboutWords.map((word, index) => (
              <span className={index < highlightedAboutWords ? styles.aboutWordActive : ""} key={`${word}-${index}`}>
                {word}{" "}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal className={styles.statsWrap} delay={0.08} kind="soft">
          <section className={styles.stats}>
          {stats.slice(0, 4).map((stat, index) => {
            const number = String(stat.number || "");
            return (
              <Reveal as="article" delay={revealDelay(index)} key={stat.label} kind="card" style={{ "--delay": `${index * 0.18}s` }}>
                <CounterNumber active={statsActive} delay={index * 180} value={number} />
                <span>{stat.label}</span>
              </Reveal>
            );
          })}
          </section>
        </Reveal>
      </section>

      <section className={styles.momentsSection}>
        <div className={styles.inner}>
          <Reveal className={styles.sectionHead}>
            <span>Nexus Moments</span>
            <h2>Leadership, celebration, and achievement on the main page.</h2>
          </Reveal>
          <div className={styles.moments}>
            {[
              [homeMomentImages[0], "Leadership in Action"],
              [homeMomentImages[1], "Celebrating Our Culture"],
              [homeMomentImages[2], "Achievements That Inspire"]
            ].map(([image, subtitle], index) => (
              <Reveal as="figure" delay={revealDelay(index)} direction={index === 1 ? "up" : index === 0 ? "left" : "right"} key={image} kind="card" style={{ "--reveal-delay": `${index * 110}ms` }}>
                <a href="/gallery" aria-label={`Open ${subtitle}`} data-link>
                  <img src={image} alt={subtitle} />
                  <figcaption>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>Nexus Moment</strong>
                    <small>{subtitle}</small>
                  </figcaption>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.quick}>
        <Reveal as="article" direction="left" kind="card">
          <QuickIcon type="notice" />
          <div>
            <span>Latest Notice</span>
            <h2>{latestNotice.title || "School updates and announcements"}</h2>
            <a href="/notices" data-link>View notices <span>→</span></a>
          </div>
        </Reveal>
        <Reveal as="article" delay={0.08} direction="up" kind="card">
          <QuickIcon type="admission" />
          <div>
            <span>Admissions</span>
            <h2>Ask about seats, visits, and documents.</h2>
            <a href="/admissions" data-link>See process <span>→</span></a>
          </div>
        </Reveal>
        <Reveal as="article" delay={0.16} direction="right" kind="card">
          <QuickIcon type="visit" />
          <div>
            <span>Visit Nexus</span>
            <h2>{data.config?.address || "Pepsi-Cola Town Planning, Kathmandu"}</h2>
            <a href="/contact" data-link>Contact office <span>→</span></a>
          </div>
        </Reveal>
      </section>

      <section className={styles.exploreSection}>
        <Reveal className={styles.exploreCopy} direction="left" distance={68}>
          <span>Explore Nexus</span>
          <h2>Courses, clubs, and school life in one clean place.</h2>
          <p>Discover the academic pathways, creative communities, and everyday experiences that shape confident Nexus learners.</p>
          <a href="/courses" data-link>Explore Courses<span>›</span></a>
        </Reveal>
        <div className={styles.exploreScroller}>
          <div className={styles.exploreImages}>
            {[
              ...previewCards,
              { description: "Recognition moments, performances, and school events that bring the community together.", image_url: galleryImages[3], title: "Celebration and Achievement" },
              { description: "A caring environment where guidance, confidence, and everyday learning grow side by side.", image_url: siteImages.audience, title: "Student Life at Nexus" }
            ].map((item, index) => (
              <Reveal as="article" delay={revealDelay(index, 0.06)} direction={index % 2 ? "right" : "left"} key={item.title || item.name} kind="image">
                <img src={media(item.image_url || item.image)} alt={item.title || item.name} />
                <div>
                  <span>{item.category || "Nexus Life"}</span>
                  <h3>{item.title || item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.advantage}>
        <Reveal as="header" amount={0.45} className={styles.advantageHeading} direction="down" distance={56} effect="translate" kind="soft">
          <span>Nexus Advantages</span>
          <h2>Experience the Nexus difference.</h2>
        </Reveal>
        <div className={styles.advantageRows}>
          {[
            ["Strong academic foundation", "Disciplined classrooms, clear routines, and caring guidance help students build steady learning habits.", homeAdvantageImages[0]],
            ["Confidence beyond books", "Events, clubs, presentations, and recognition moments help learners speak, perform, and lead.", homeAdvantageImages[1]],
            ["Learning with real support", "Teachers and families work together so every child feels noticed, encouraged, and ready for the next step.", homeAdvantageImages[2]],
            ["Activities with purpose", "Sports, creativity, teamwork, and school culture shape character along with academic progress.", homeAdvantageImages[3]]
          ].map(([title, copy, image], index) => {
            const imageDirection = index % 2 ? "right" : "left";
            const rowDelay = revealDelay(index, 0.08);
            const boxOffset = index % 2 ? -120 : 120;

            return (
              <article key={title}>
                <motion.div
                  variants={advantageBoxVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4, margin: "0px 0px -12% 0px" }}
                  style={{ willChange: "transform" }}
                >
                  <motion.span variants={advantageChildVariants}>Nexus Advantage</motion.span>
                  <motion.h3 variants={advantageChildVariants}>{title}</motion.h3>
                  <motion.p variants={advantageChildVariants}>{copy}</motion.p>
                </motion.div>
                <Reveal amount={0.38} as="img" delay={rowDelay} direction={imageDirection} distance={120} effect="translate" kind="image" src={image} alt={title} style={{ "--reveal-delay": `${rowDelay * 1000}ms` }} />
              </article>
            );
          })}
        </div>
      </section>

      <section className={`${styles.section} ${styles.testimonialSection}`}>
        <div className={styles.inner}>
          <Reveal className={styles.sectionHead}>
            <span>Testimonials</span>
            <h2>What People Say About Us.</h2>
          </Reveal>
          <div
            className={`${styles.testimonials} ${testimonialDirection === "next" ? styles.testimonialsNext : styles.testimonialsPrevious}`}
            key={activeTestimonial}
          >
            {visibleTestimonials.map(({ index, item, offset }) => {
              const [name, quote, image] = item;
              return (
              <Reveal as="article" className={offset === 0 ? styles.activeTestimonial : styles.sideTestimonial} key={`${name}-${index}`} kind="card">
                <img
                  src={image || siteImages.nexusHero}
                  alt={name}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = siteImages.nexusHero;
                  }}
                />
                <span>Testimonial</span>
                <blockquote>{quote}</blockquote>
                <h3>{name}</h3>
              </Reveal>
              );
            })}
          </div>
          <div className={styles.testimonialControls}>
            {testimonialItems.map(([name], index) => (
              <button
                aria-label={`Show ${name}`}
                className={index === activeTestimonial ? styles.activeTestimonialDot : ""}
                key={name}
                onClick={() => showTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
