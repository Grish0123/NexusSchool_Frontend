import { Reveal, revealDelay } from "../components/common/Reveal.jsx";
import { admissionProcessImages, courseImages, siteImages } from "../data/siteImages";
import { media } from "../utils/content";
import styles from "./CourseDetailPage.module.scss";

const montessoriBenefits = [
  ["Individualized Learning", "Children progress at their own pace, guided by self-directed exploration."],
  ["Hands-on Materials", "Concrete tools help children grasp abstract concepts, from math beads to language cards."],
  ["Independence & Responsibility", "Students learn to manage their own tasks, building confidence and autonomy."],
  ["Holistic Development", "Academic, social, emotional, and practical life skills grow together."],
  ["Proven Outcomes", "Montessori learning supports executive function, creativity, and social-emotional growth."]
];

const ipcBenefits = [
  ["Global Perspective", "Curriculum themes connect local learning to international contexts and cultural awareness."],
  ["Structured Units", "Clear learning goals across subjects support consistency and progression."],
  ["Collaborative Learning", "Group projects encourage teamwork, empathy, communication, and shared responsibility."],
  ["Targeted Outcomes", "Knowledge, skills, and understanding are clearly defined in each unit."],
  ["Adaptability", "IPC can integrate with Montessori methods to enrich activity-based learning."]
];

const outcomes = [
  {
    approach: "Montessori",
    example: "A child uses bead chains to understand multiplication until confident.",
    method: "Self-paced exploration with the teacher as guide, plus mastery through repetition."
  },
  {
    approach: "IPC",
    example: "A unit on Rainforests integrates science, geography, and art with specific learning targets.",
    method: "Clearly defined thematic units with measurable goals."
  },
  {
    approach: "Blended",
    example: "Students research local ecosystems while connecting findings to global biodiversity.",
    method: "Combines independence with structured global themes."
  }
];

const blendedReasons = [
  ["Montessori ensures depth", "Children truly understand concepts through hands-on practice."],
  ["IPC ensures breadth", "Students gain exposure to diverse subjects and global issues."],
  ["Together", "They produce learners who are academically competent, globally aware, empathetic, and independent thinkers."]
];

const cambridgeBenefits = [
  ["Global Recognition", "Accepted by over 25,000 universities, employers, and governments worldwide."],
  ["Practical Skills", "Focuses on communication, critical thinking, and academic readiness."],
  ["Confidence Building", "Helps learners use English effectively in study, work, and travel."],
  ["Lifelong Value", "Certificates never expire and serve as a lasting credential."]
];

const digiBenefits = [
  ["British Curriculum", "Provides UK-standard computer education from early grades."],
  ["Future-Ready Skills", "Covers coding, computational thinking, online safety, and problem-solving."],
  ["Global Certification", "Students receive internationally recognized NCC Education qualifications."],
  ["Inclusive Learning", "Blends creativity and technology to prepare students for careers in IT and innovation."]
];

const cambridgeLevels = [
  ["Young Learners", "Pre A1 to A2", "A child's first steps in English, helping them build confidence, enjoy exams, and begin proving their skills."],
  ["A2 Key", "A2", "Demonstrates control of basic language skills for simple everyday communication and future study."],
  ["B1 Preliminary", "B1", "Shows mastery of English basics and practical language skills for everyday use."],
  ["B2 First", "B2", "Demonstrates confident communication in an English-speaking environment."],
  ["C1 Advanced", "C1", "Proof of high-level English achievement for university or professional preparation."],
  ["C2 Proficiency", "C2", "The highest qualification, showing exceptional mastery of English."]
];

const digiLevels = [
  ["Digi Explorers", "Grades 1-2", "Builds critical thinking about hardware and software while introducing simple program design and testing."],
  ["Digi Navigators", "Grades 3-6", "Introduces next-level coding through Python programming for young learners."],
  ["Digi Trailblazers", "Grades 7-9", "Strengthens digital literacy and introduces advanced computing concepts for higher-level IT study."],
  ["Level 2 Award in Computing", "L2AC", "An Ofqual regulated qualification at the same level as IGCSE, with advanced Python and introductory Java."]
];

const factFrameworks = [
  {
    feature: "Cambridge Assessment English",
    rows: [
      ["Focus Area", "English language proficiency"],
      ["Global Recognition", "25,000+ institutions worldwide"],
      ["Progression Path", "A2 -> B1 -> B2 -> C1 -> C2"],
      ["Key Benefits", "Academic readiness and career mobility"],
      ["Target Audience", "Students, professionals, and migrants"]
    ]
  },
  {
    feature: "NCC Education Digi School",
    rows: [
      ["Focus Area", "Digital literacy and computing"],
      ["Global Recognition", "UK NCC Education certification"],
      ["Progression Path", "Explorers -> Navigators -> Trailblazers -> L2AC"],
      ["Key Benefits", "Essential computing knowledge, creativity, and globally recognized qualifications"],
      ["Target Audience", "School children from Grades 1-10/12"]
    ]
  }
];

function splitItems(value, fallback) {
  if (!value) return fallback;
  return String(value)
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [heading, ...copy] = line.split("|").map((part) => part.trim());
      return [heading, copy.join(" | ")];
    });
}

function splitRows(value, fallback) {
  if (!value) return fallback;
  return String(value)
    .split(/\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split("|").map((part) => part.trim()));
}

function courseDetailCms(data, key, fallback) {
  const item = (data?.cms?.courseDetails || []).find((detail) => detail.key === key) || {};
  return { ...fallback, ...item };
}

const montessoriDetail = {
  benefitOneImage: admissionProcessImages[0],
  benefitOneItems: montessoriBenefits.map(([heading, copy]) => `${heading} | ${copy}`).join("\n"),
  benefitOneTitle: "Montessori Teaching",
  benefitTwoImage: admissionProcessImages[1],
  benefitTwoItems: ipcBenefits.map(([heading, copy]) => `${heading} | ${copy}`).join("\n"),
  benefitTwoTitle: "IPC Teaching",
  bottomSectionEyebrow: "Why The Blend Works",
  bottomSectionImage: siteImages.audience,
  bottomSectionItems: blendedReasons.map(([heading, copy]) => `${heading} | ${copy}`).join("\n"),
  bottomSectionTitle: "Strong foundations, wider understanding.",
  extraSectionOneEyebrow: "Targeted Learning Outcomes",
  extraSectionOneItems: outcomes.map((item) => `${item.approach} | ${item.method} | ${item.example}`).join("\n"),
  extraSectionOneTitle: "Different methods, clear progress.",
  finalCopy: "When combined, they create a powerful synergy: Montessori builds strong foundations of independence and curiosity, and IPC channels that energy into structured, measurable outcomes aligned with global standards.",
  finalEyebrow: "Final Insight",
  finalTitle: "Montessori builds curiosity. IPC channels it.",
  heroCopy: "Montessori and IPC teaching both emphasize child-centered learning, but they achieve outcomes in different ways. Montessori focuses on independence and experiential learning, while IPC emphasizes global awareness and structured thematic units.",
  heroEyebrow: "Montessori and IPC Program",
  heroImage: courseImages.montessori,
  heroTitle: "Child-centered learning with global outcomes.",
  introCopy: "Together, Montessori and IPC create a balanced approach that nurtures academic success, social-emotional growth, and targeted learning outcomes. Montessori nurtures how children learn, while IPC defines what they learn.",
  introEyebrow: "Balanced Foundation",
  introTitle: "A program built for academic, emotional, and social growth.",
  key: "montessori-ipc"
};

const cambridgeDetail = {
  benefitOneImage: admissionProcessImages[2],
  benefitOneItems: cambridgeBenefits.map(([heading, copy]) => `${heading} | ${copy}`).join("\n"),
  benefitOneTitle: "Cambridge English Benefits",
  benefitTwoImage: siteImages.labor,
  benefitTwoItems: digiBenefits.map(([heading, copy]) => `${heading} | ${copy}`).join("\n"),
  benefitTwoTitle: "NCC Digi School Benefits",
  bottomSectionEyebrow: "Fact Framework",
  bottomSectionItems: factFrameworks.map((framework) => `${framework.feature} | ${framework.rows.map(([label, value]) => `${label}: ${value}`).join("; ")}`).join("\n"),
  bottomSectionTitle: "Program focus at a glance.",
  extraSectionOneEyebrow: "Cambridge Progression Levels",
  extraSectionOneImage: siteImages.principal,
  extraSectionOneItems: cambridgeLevels.map(([name, level, copy]) => `${name} | ${level} | ${copy}`).join("\n"),
  extraSectionOneTitle: "A clear pathway from first steps to mastery.",
  extraSectionTwoEyebrow: "NCC Education Digi School",
  extraSectionTwoImage: siteImages.vicePrincipal,
  extraSectionTwoItems: digiLevels.map(([name, level, copy]) => `${name} | ${level} | ${copy}`).join("\n"),
  extraSectionTwoTitle: "Computing pathways for future-ready digital innovators.",
  finalCopy: "Cambridge English builds internationally recognized communication ability, while NCC Digi School equips learners with computing knowledge, creativity, and future-ready digital skills.",
  finalEyebrow: "Final Insight",
  finalTitle: "Language confidence and digital fluency prepare students for the world ahead.",
  heroCopy: "Cambridge Assessment English is part of the University of Cambridge and provides internationally recognized English language qualifications designed to assess real-life communication skills.",
  heroEyebrow: "Cambridge Assessment English Program",
  heroImage: courseImages.english,
  heroTitle: "International English skills for confident learners.",
  introCopy: "The program supports academic, professional, and personal growth by helping learners use English confidently in study, work, travel, and everyday communication.",
  introEyebrow: "Program Overview",
  introTitle: "Real-life communication skills with global academic value.",
  key: "cambridge-assessment-english"
};

const nccDetail = {
  ...cambridgeDetail,
  benefitOneImage: siteImages.labor,
  benefitOneItems: digiBenefits.map(([heading, copy]) => `${heading} | ${copy}`).join("\n"),
  benefitOneTitle: "NCC Digi School Benefits",
  benefitTwoImage: courseImages.english,
  benefitTwoItems: cambridgeBenefits.map(([heading, copy]) => `${heading} | ${copy}`).join("\n"),
  benefitTwoTitle: "Cambridge English Support",
  bottomSectionItems: factFrameworks.map((framework) => `${framework.feature} | ${framework.rows.map(([label, value]) => `${label}: ${value}`).join("; ")}`).join("\n"),
  finalCopy: "NCC Digi School helps students build practical computing knowledge, creativity, online safety, and globally useful digital confidence.",
  finalTitle: "Digital fluency prepares students for the world ahead.",
  heroCopy: "NCC UK Digi School and ICT learning prepare students with digital literacy, online safety, smart classroom exposure, robotics, and coding foundations.",
  heroEyebrow: "NCC UK Digi School",
  heroImage: "/Clubs/Computer.jpeg",
  heroTitle: "Future-ready digital skills for confident learners.",
  introCopy: "The program builds confidence with technology through structured computing, practical digital literacy, online safety, and creative problem solving.",
  introTitle: "Computing knowledge with practical value.",
  key: "ncc-digi-school"
};

export function CourseDetailPage({ data }) {
  const detail = courseDetailCms(data, "montessori-ipc", montessoriDetail);
  const benefitOneItems = splitItems(detail.benefitOneItems, montessoriBenefits);
  const benefitTwoItems = splitItems(detail.benefitTwoItems, ipcBenefits);
  const detailOutcomes = splitRows(detail.extraSectionOneItems, outcomes.map((item) => [item.approach, item.method, item.example]));
  const detailReasons = splitItems(detail.bottomSectionItems, blendedReasons);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Reveal className={styles.heroCopy} direction="left" distance={58}>
            <span>{detail.heroEyebrow}</span>
            <h1>{detail.heroTitle}</h1>
            <p>{detail.heroCopy}</p>
            <a href="/contact" data-link>Ask About Admission</a>
          </Reveal>
          <Reveal as="figure" className={styles.heroImage} delay={0.12} direction="right" kind="image">
            <img src={media(detail.heroImage)} alt="Montessori and IPC classroom learning" />
          </Reveal>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.inner}>
          <Reveal className={styles.introPanel} kind="card">
            <span>{detail.introEyebrow}</span>
            <h2>{detail.introTitle}</h2>
            <p>{detail.introCopy}</p>
          </Reveal>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className={styles.inner}>
          <div className={styles.benefitGrid}>
            <BenefitColumn title={detail.benefitOneTitle} items={benefitOneItems} image={media(detail.benefitOneImage)} />
            <BenefitColumn title={detail.benefitTwoTitle} items={benefitTwoItems} image={media(detail.benefitTwoImage)} />
          </div>
        </div>
      </section>

      <section className={styles.outcomesSection}>
        <div className={styles.inner}>
          <Reveal className={styles.sectionHead}>
            <span>{detail.extraSectionOneEyebrow || "Targeted Learning Outcomes"}</span>
            <h2>{detail.extraSectionOneTitle || "Different methods, clear progress."}</h2>
          </Reveal>
          <div className={styles.outcomeGrid}>
            {detailOutcomes.map(([approach, method, example], index) => (
              <Reveal as="article" className={styles.outcomeCard} delay={revealDelay(index, 0.06)} direction={index === 1 ? "up" : index === 0 ? "left" : "right"} key={approach} kind="card">
                <span>{approach}</span>
                <h3>How outcomes are achieved</h3>
                <p>{method}</p>
                <strong>{example}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.blendSection}>
        <div className={styles.inner}>
          <Reveal as="figure" className={styles.blendImage} direction="left" kind="image">
            <img src={media(detail.bottomSectionImage)} alt="Students learning together at Nexus" />
          </Reveal>
          <Reveal className={styles.blendCopy} direction="right" distance={54}>
            <span>{detail.bottomSectionEyebrow}</span>
            <h2>{detail.bottomSectionTitle}</h2>
            <div className={styles.reasonList}>
              {detailReasons.map(([title, copy], index) => (
                <article key={title} style={{ "--delay": `${index * 70}ms` }}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.inner}>
          <Reveal className={styles.finalPanel} kind="card">
            <span>{detail.finalEyebrow}</span>
            <h2>{detail.finalTitle}</h2>
            <p>{detail.finalCopy}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function LanguageDigitalDetailPage({ data, detailKey = "cambridge-assessment-english", fallback = cambridgeDetail }) {
  const detail = courseDetailCms(data, detailKey, fallback);
  const benefitOneItems = splitItems(detail.benefitOneItems, cambridgeBenefits);
  const benefitTwoItems = splitItems(detail.benefitTwoItems, digiBenefits);
  const progressionOne = splitRows(detail.extraSectionOneItems, cambridgeLevels);
  const progressionTwo = splitRows(detail.extraSectionTwoItems, digiLevels);
  const frameworkItems = splitItems(detail.bottomSectionItems, factFrameworks.map((framework) => [framework.feature, framework.rows.map(([label, value]) => `${label}: ${value}`).join("; ")]));

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Reveal className={styles.heroCopy} direction="left" distance={58}>
            <span>{detail.heroEyebrow}</span>
            <h1>{detail.heroTitle}</h1>
            <p>{detail.heroCopy}</p>
            <a href="/contact" data-link>Ask About The Program</a>
          </Reveal>
          <Reveal as="figure" className={styles.heroImage} delay={0.12} direction="right" kind="image">
            <img src={media(detail.heroImage)} alt="Cambridge English learning at Nexus" />
          </Reveal>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.inner}>
          <Reveal className={styles.introPanel} kind="card">
            <span>{detail.introEyebrow}</span>
            <h2>{detail.introTitle}</h2>
            <p>{detail.introCopy}</p>
          </Reveal>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className={styles.inner}>
          <div className={styles.benefitGrid}>
            <BenefitColumn title={detail.benefitOneTitle} items={benefitOneItems} image={media(detail.benefitOneImage)} />
            <BenefitColumn title={detail.benefitTwoTitle} items={benefitTwoItems} image={media(detail.benefitTwoImage)} />
          </div>
        </div>
      </section>

      <ProgressionSection
        eyebrow={detail.extraSectionOneEyebrow || "Cambridge Progression Levels"}
        image={media(detail.extraSectionOneImage || siteImages.principal)}
        items={progressionOne}
        title={detail.extraSectionOneTitle || "A clear pathway from first steps to mastery."}
      />

      <ProgressionSection
        eyebrow={detail.extraSectionTwoEyebrow || "NCC Education Digi School"}
        image={media(detail.extraSectionTwoImage || siteImages.vicePrincipal)}
        items={progressionTwo}
        reverse
        title={detail.extraSectionTwoTitle || "Computing pathways for future-ready digital innovators."}
      />

      <section className={styles.outcomesSection}>
        <div className={styles.inner}>
          <Reveal className={styles.sectionHead}>
            <span>{detail.bottomSectionEyebrow || "Fact Framework"}</span>
            <h2>{detail.bottomSectionTitle || "Program focus at a glance."}</h2>
          </Reveal>
          <div className={styles.factGrid}>
            {frameworkItems.map(([title, rowsText], index) => (
              <Reveal as="article" className={styles.factCard} delay={revealDelay(index, 0.06)} direction={index ? "right" : "left"} key={title} kind="card">
                <h3>{title}</h3>
                <p>{rowsText}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.inner}>
          <Reveal className={styles.finalPanel} kind="card">
            <span>{detail.finalEyebrow}</span>
            <h2>{detail.finalTitle}</h2>
            <p>{detail.finalCopy}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function CambridgeCourseDetailPage({ data }) {
  return <LanguageDigitalDetailPage data={data} detailKey="cambridge-assessment-english" fallback={cambridgeDetail} />;
}

export function NccDigiCourseDetailPage({ data }) {
  return <LanguageDigitalDetailPage data={data} detailKey="ncc-digi-school" fallback={nccDetail} />;
}

function BenefitColumn({ image, items, title }) {
  return (
    <Reveal as="article" className={styles.benefitColumn} kind="card">
      <img src={image} alt={`${title} at Nexus`} />
      <div>
        <span>Key Benefits</span>
        <h2>{title}</h2>
        <ul>
          {items.map(([heading, copy]) => (
            <li key={heading}>
              <strong>{heading}</strong>
              <p>{copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function ProgressionSection({ eyebrow, image, items, reverse = false, title }) {
  return (
    <section className={`${styles.blendSection} ${reverse ? styles.reverseSection : ""}`}>
      <div className={styles.inner}>
        <Reveal as="figure" className={`${styles.blendImage} ${styles.progressionImage}`} direction={reverse ? "right" : "left"} kind="image">
          <img src={image} alt={title} />
        </Reveal>
        <Reveal className={styles.blendCopy} direction={reverse ? "left" : "right"} distance={54}>
          <span>{eyebrow}</span>
          <h2>{title}</h2>
          <div className={styles.levelList}>
            {items.map(([name, level, copy]) => (
              <article key={`${name}-${level}`}>
                <span>{level}</span>
                <h3>{name}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
