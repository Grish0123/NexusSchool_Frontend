import { Reveal, revealDelay } from "../components/common/Reveal.jsx";
import { admissionProcessImages, courseImages, siteImages } from "../data/siteImages";
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

export function CourseDetailPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Reveal className={styles.heroCopy} direction="left" distance={58}>
            <span>Montessori and IPC Program</span>
            <h1>Child-centered learning with global outcomes.</h1>
            <p>
              Montessori and IPC teaching both emphasize child-centered learning, but they achieve outcomes in different ways.
              Montessori focuses on independence and experiential learning, while IPC emphasizes global awareness and structured thematic units.
            </p>
            <a href="/contact" data-link>Ask About Admission</a>
          </Reveal>
          <Reveal as="figure" className={styles.heroImage} delay={0.12} direction="right" kind="image">
            <img src={courseImages.montessori} alt="Montessori and IPC classroom learning" />
          </Reveal>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.inner}>
          <Reveal className={styles.introPanel} kind="card">
            <span>Balanced Foundation</span>
            <h2>A program built for academic, emotional, and social growth.</h2>
            <p>
              Together, Montessori and IPC create a balanced approach that nurtures academic success, social-emotional growth,
              and targeted learning outcomes. Montessori nurtures how children learn, while IPC defines what they learn.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className={styles.inner}>
          <div className={styles.benefitGrid}>
            <BenefitColumn title="Montessori Teaching" items={montessoriBenefits} image={admissionProcessImages[0]} />
            <BenefitColumn title="IPC Teaching" items={ipcBenefits} image={admissionProcessImages[1]} />
          </div>
        </div>
      </section>

      <section className={styles.outcomesSection}>
        <div className={styles.inner}>
          <Reveal className={styles.sectionHead}>
            <span>Targeted Learning Outcomes</span>
            <h2>Different methods, clear progress.</h2>
          </Reveal>
          <div className={styles.outcomeGrid}>
            {outcomes.map((item, index) => (
              <Reveal as="article" className={styles.outcomeCard} delay={revealDelay(index, 0.06)} direction={index === 1 ? "up" : index === 0 ? "left" : "right"} key={item.approach} kind="card">
                <span>{item.approach}</span>
                <h3>How outcomes are achieved</h3>
                <p>{item.method}</p>
                <strong>{item.example}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.blendSection}>
        <div className={styles.inner}>
          <Reveal as="figure" className={styles.blendImage} direction="left" kind="image">
            <img src={siteImages.audience} alt="Students learning together at Nexus" />
          </Reveal>
          <Reveal className={styles.blendCopy} direction="right" distance={54}>
            <span>Why The Blend Works</span>
            <h2>Strong foundations, wider understanding.</h2>
            <div className={styles.reasonList}>
              {blendedReasons.map(([title, copy], index) => (
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
            <span>Final Insight</span>
            <h2>Montessori builds curiosity. IPC channels it.</h2>
            <p>
              When combined, they create a powerful synergy: Montessori builds strong foundations of independence and curiosity,
              and IPC channels that energy into structured, measurable outcomes aligned with global standards.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function CambridgeCourseDetailPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Reveal className={styles.heroCopy} direction="left" distance={58}>
            <span>Cambridge Assessment English Program</span>
            <h1>International English skills for confident learners.</h1>
            <p>
              Cambridge Assessment English is part of the University of Cambridge and provides internationally recognized
              English language qualifications designed to assess real-life communication skills.
            </p>
            <a href="/contact" data-link>Ask About The Program</a>
          </Reveal>
          <Reveal as="figure" className={styles.heroImage} delay={0.12} direction="right" kind="image">
            <img src={courseImages.english} alt="Cambridge English learning at Nexus" />
          </Reveal>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.inner}>
          <Reveal className={styles.introPanel} kind="card">
            <span>Program Overview</span>
            <h2>Real-life communication skills with global academic value.</h2>
            <p>
              The program supports academic, professional, and personal growth by helping learners use English confidently
              in study, work, travel, and everyday communication.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className={styles.inner}>
          <div className={styles.benefitGrid}>
            <BenefitColumn title="Cambridge English Benefits" items={cambridgeBenefits} image={admissionProcessImages[2]} />
            <BenefitColumn title="NCC Digi School Benefits" items={digiBenefits} image={siteImages.labor} />
          </div>
        </div>
      </section>

      <ProgressionSection
        eyebrow="Cambridge Progression Levels"
        image={siteImages.principal}
        items={cambridgeLevels}
        title="A clear pathway from first steps to mastery."
      />

      <ProgressionSection
        eyebrow="NCC Education Digi School"
        image={siteImages.vicePrincipal}
        items={digiLevels}
        reverse
        title="Computing pathways for future-ready digital innovators."
      />

      <section className={styles.outcomesSection}>
        <div className={styles.inner}>
          <Reveal className={styles.sectionHead}>
            <span>Fact Framework</span>
            <h2>Program focus at a glance.</h2>
          </Reveal>
          <div className={styles.factGrid}>
            {factFrameworks.map((framework, index) => (
              <Reveal as="article" className={styles.factCard} delay={revealDelay(index, 0.06)} direction={index ? "right" : "left"} key={framework.feature} kind="card">
                <h3>{framework.feature}</h3>
                <dl>
                  {framework.rows.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.inner}>
          <Reveal className={styles.finalPanel} kind="card">
            <span>Final Insight</span>
            <h2>Language confidence and digital fluency prepare students for the world ahead.</h2>
            <p>
              Cambridge English builds internationally recognized communication ability, while NCC Digi School equips learners
              with computing knowledge, creativity, and future-ready digital skills.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
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
