import { PageHero } from "../components/common/PageHero.jsx";
import { Reveal, revealDelay } from "../components/common/Reveal.jsx";
import { careerImages, clubBookImages } from "../data/siteImages";
import { imageValue, media } from "../utils/content";
import styles from "./CardsPage.module.scss";

const courseHeroImage = "/site-images/Nexus.png";
const clubSlidingLogos = [
  "/Clubs%20sliding%20logos/student-quality-circle-logo.jpg",
  "/Clubs%20sliding%20logos/nmun.jpg",
  "/Clubs%20sliding%20logos/nexus-technical-education-and-skill-development-center.jpg",
  "/Clubs%20sliding%20logos/nexus-music-club.jpg",
  "/Clubs%20sliding%20logos/nexus-music-club-2.jpg",
  "/Clubs%20sliding%20logos/nexus-meditation-center-english.jpg",
  "/Clubs%20sliding%20logos/nexus-literary-club.jpg",
  "/Clubs%20sliding%20logos/nexus-english-club.jpg",
  "/Clubs%20sliding%20logos/nexus-dance.jpg",
  "/Clubs%20sliding%20logos/nexus-cricket-club.jpg",
  "/Clubs%20sliding%20logos/nexus-basketball-club.jpg",
  "/Clubs%20sliding%20logos/ipc-logo.jpg"
];

function isMontessoriIpcCourse(item = {}) {
  const title = item.title || item.name || "";
  return /montessori/i.test(title) && /\bipc\b/i.test(title);
}

function courseDetailPath(item = {}) {
  const title = item.title || item.name || "";
  if (isMontessoriIpcCourse(item)) return "/courses/montessori-ipc";
  if (/cambridge/i.test(title) || /\bncc\b/i.test(title) || /digi/i.test(title)) return "/courses/cambridge-assessment-english";
  return "";
}

function CourseHero({ hero }) {
  return (
    <section className={styles.courseHero}>
      <Reveal className={styles.courseHeroInner} amount={0.55} direction="up" distance={64}>
        <span className={styles.courseBadge}>{hero.eyebrow}</span>
        <h1>
          Develop New Skills
          <br />Uniquely
        </h1>
        <p>{hero.copy}</p>
        <div className={styles.courseActions}>
          <a href="/admission" data-link>Start your journey</a>
        </div>
      </Reveal>
      <Reveal as="img" className={styles.courseKids} delay={0.14} direction="up" distance={78} kind="image" src={courseHeroImage} alt="" aria-hidden="true" />
    </section>
  );
}

function ClubHero({ hero }) {
  const books = [
    ["English Book", clubBookImages.english, styles.clubBookPrimary],
    ["Science Book", clubBookImages.science, styles.clubNotebook],
    ["Computer Book", clubBookImages.computer, styles.clubBookGreen],
    ["Maths Book", clubBookImages.maths, styles.clubBookPink],
    ["Nepali Book", clubBookImages.nepali, styles.clubBookDark]
  ];

  return (
    <section className={styles.clubHero}>
      <Reveal className={styles.clubHeroInner} amount={0.55} direction="up" distance={64}>
        <span>{hero.eyebrow}</span>
        <h1>
          One Stop
          <br />
          Nexus Clubs for Learners.
        </h1>
        <p>{hero.copy}</p>
        <a href="/courses" data-link>View Courses</a>
      </Reveal>
      <div className={styles.clubSupplies} aria-hidden="true">
        {books.map(([label, image, className], index) => (
          <Reveal as="figure" className={`${styles.clubSupply} ${className}`} delay={revealDelay(index, 0.06)} direction={index % 2 ? "right" : "left"} key={label} kind="card">
            <img src={image} alt="" />
            <figcaption>{label}</figcaption>
          </Reveal>
        ))}
        <span className={`${styles.clubAccessory} ${styles.clubPencil}`} />
        <span className={`${styles.clubAccessory} ${styles.clubRuler}`} />
        <span className={`${styles.clubAccessory} ${styles.clubClip}`} />
      </div>
    </section>
  );
}

function CareerHero({ hero }) {
  return (
    <section className={styles.careerHero}>
      <div className={styles.careerPortraits} aria-hidden="true">
        {careerImages.map((image, index) => (
          <span className={styles[`careerFace${index + 1}`]} key={image}>
            <img src={image} alt="" />
          </span>
        ))}
      </div>
      <Reveal className={styles.careerHeroInner} amount={0.55} direction="up" distance={64}>
        <span>{hero.eyebrow}</span>
        <h1>
          Work with people
          <br />
          <em>who shape futures</em>
        </h1>
        <p>{hero.copy}</p>
        <a href="#career-openings">View Open Positions</a>
      </Reveal>
    </section>
  );
}

function ClubLogoSlider() {
  const logos = [...clubSlidingLogos, ...clubSlidingLogos];

  return (
    <Reveal className={styles.clubLogoPanel} direction="up" distance={54} kind="card">
      <div className={styles.clubLogoHead}>
        <span>Club Logos</span>
        <h3>Explore Our Clubs</h3>
      </div>
      <div className={styles.clubLogoViewport} aria-label="Nexus club logos">
        <div className={styles.clubLogoTrack}>
          {logos.map((logo, index) => {
            const label = logo.split("/").pop()?.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ") || "Club";

            return (
              <figure className={styles.clubLogoItem} key={`${logo}-${index}`} aria-hidden={index >= clubSlidingLogos.length}>
                <img src={logo} alt={index < clubSlidingLogos.length ? `${label} club` : ""} />
              </figure>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

export function CardsPage({ hero, items, kind }) {
  return (
    <>
      {kind === "course" && <CourseHero hero={hero} />}
      {kind === "club" && <ClubHero hero={hero} />}
      {kind === "career" && <CareerHero hero={hero} />}
      {kind !== "course" && kind !== "club" && kind !== "career" && <PageHero {...hero} />}
      <section className={styles.section} id={kind === "career" ? "career-openings" : kind === "club" ? "club-list" : undefined}>
        <div className={styles.inner}>
          <Reveal className={styles.sectionHead}>
            <span>{kind}</span>
            <h2>Explore Nexus {hero.title}</h2>
            <p>Clear, organized information with real school images and practical details.</p>
          </Reveal>
          <div className={styles.grid}>
            {items.map((item, index) => {
              const meta = item.category || item.type || item.duration;
              const detailPath = courseDetailPath(item);

              return (
                <Reveal as="article" className={styles.card} delay={revealDelay(index)} direction={index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right"} key={`${item.title || item.name}-${index}`} kind="card">
                  <img src={media(imageValue(item))} alt={item.title || item.name} />
                  <div>
                    {meta && <span>{meta}</span>}
                    <h3>{item.title || item.name}</h3>
                    <p>{item.description}</p>
                    {kind === "course" && (
                      <a className={styles.textButton} href={detailPath || "/contact"} data-link>
                        {detailPath ? "View Details" : "Ask for Syllabus"}
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
          {kind === "club" && <ClubLogoSlider />}
        </div>
      </section>
    </>
  );
}
