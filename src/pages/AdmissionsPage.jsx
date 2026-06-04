import { useEffect, useState } from "react";
import { Reveal, revealDelay } from "../components/common/Reveal.jsx";
import { admissionFaqs, pageHero } from "../utils/content";
import { admissionProcessImages, siteImages } from "../data/siteImages";
import styles from "./AdmissionsPage.module.scss";

export function AdmissionsPage({ data }) {
  const [activeProcessStep, setActiveProcessStep] = useState(null);
  const [canPreviewProcessStep, setCanPreviewProcessStep] = useState(false);
  const hero = pageHero(data, "admissions", {
    copy: data.admission?.timeline?.description || "Enroll now and give your child a strong foundation for a brighter future.",
    eyebrow: "Admissions",
    image_url: siteImages.see,
    title: "Admissions"
  });
  const heroVideo = "/Nexus%20Ad.mp4";
  const steps = data.admission?.process_steps?.length
    ? data.admission.process_steps
    : [
      { description: "Contact the school office and share the learner's grade, parent details, and visit preference. Our team helps you understand seat availability, school routines, documents, and the best next step for your family.", step_number: 1, title: "Enquiry & Guidance" },
      { description: "Visit Nexus, meet the team, observe the learning environment, and ask about academic support, discipline, student care, transport, activities, and the values that shape everyday school life.", step_number: 2, title: "Visit & Consultation" },
      { description: "Submit the admission form with the requested documents so the office can verify records, confirm grade placement, and prepare the learner's admission file without unnecessary delays.", step_number: 3, title: "Form & Documents" },
      { description: "Complete the final discussion, fee process, and enrollment confirmation. Families receive the guidance they need for joining dates, class routines, books, uniform, and school communication.", step_number: 4, title: "Confirmation & Enrollment" }
    ];
  const processImages = admissionProcessImages;
  const activeStep = canPreviewProcessStep && activeProcessStep !== null ? steps[activeProcessStep] : null;
  const requirements = data.admission?.requirements?.[0]?.requirement || ["Birth certificate", "Previous school report", "Transfer certificate if applicable", "Passport-size photographs"];
  const faqs = admissionFaqs(data);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 821px) and (hover: hover) and (pointer: fine)");
    const updatePreviewMode = () => {
      setCanPreviewProcessStep(query.matches);
      if (!query.matches) setActiveProcessStep(null);
    };

    updatePreviewMode();
    query.addEventListener("change", updatePreviewMode);

    return () => query.removeEventListener("change", updatePreviewMode);
  }, []);

  function previewProcessStep(index) {
    if (canPreviewProcessStep) setActiveProcessStep(index);
  }

  function toggleProcessStep(index) {
    if (canPreviewProcessStep) return;
    setActiveProcessStep((current) => (current === index ? null : index));
  }

  return (
    <>
      <section className={styles.admissionHero}>
        <video
          className={styles.admissionHeroVideo}
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className={styles.admissionHeroInner}>
          <Reveal as="article" className={styles.admissionHeroCard} amount={0.55} direction="left" distance={76}>
            <span>{hero.eyebrow}</span>
            <h1>{hero.title}</h1>
            <p>{hero.copy}</p>
            <a href="/contact" data-link>Start Admission</a>
          </Reveal>
        </div>
      </section>
      <section className={`${styles.section} ${styles.focusSection}`}>
        <div className={`${styles.inner} ${styles.focusInner}`}>
          <Reveal className={`${styles.sectionHead} ${styles.focusHead}`}>
            <span>Admission Focus</span>
            <h2>A calm, clear start for families choosing Nexus.</h2>
            <p>From enquiry to school visit, every step is designed to help parents understand the learning environment and feel confident about the next move.</p>
            <a className={styles.textButton} href="/contact" data-link>Book a School Visit</a>
          </Reveal>
        </div>
      </section>
      <section className={styles.processSection}>
        <div className={styles.processBg}>
          {processImages.map((image, index) => (
            <img
              className={(activeProcessStep === null ? index === 0 : index === activeProcessStep) ? styles.processBgActive : ""}
              src={image}
              alt=""
              aria-hidden="true"
              key={image}
            />
          ))}
        </div>
        <div className={styles.processInner}>
          <Reveal className={`${styles.sectionHead} ${styles.processHead}`}>
            <span>Admission Process</span>
            <h2>{activeStep?.title || "A simple path from first enquiry to enrollment."}</h2>
            <p>{activeStep?.description || "Hover over each step to see how Nexus guides families from first enquiry to final admission confirmation."}</p>
          </Reveal>
          <div className={styles.processList}>
            {steps.map((step, index) => (
              <Reveal
                as="article"
                className={`${styles.processStep} ${index === activeProcessStep ? styles.processStepActive : ""}`}
                delay={revealDelay(index)}
                direction={index < 2 ? "left" : "right"}
                kind="card"
                key={step.step_number}
                onClick={() => toggleProcessStep(index)}
                onFocus={() => previewProcessStep(index)}
                onMouseEnter={() => previewProcessStep(index)}
                tabIndex={canPreviewProcessStep ? 0 : undefined}
              >
                <span className={styles.processNumber}>{String(step.step_number).padStart(2, "0")}</span>
                <div className={styles.processCopy}>
                  <h3>{step.title || "Admission Step"}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.faqSection}>
        <div className={`${styles.inner} ${styles.faqLayout}`}>
          <Reveal as="article" className={styles.requirements} direction="left" kind="card">
            <span>Your admission checklist</span>
            <h2>Documents usually required</h2>
            <p>Keep these documents ready so the admission team can verify details and guide your family without delays.</p>
            <ul>
              {requirements.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <a href="/contact" data-link>Ask the office</a>
          </Reveal>
          <div className={styles.faqContent}>
            <Reveal className={styles.faqHead}>
              <span>Your Questions, Answered</span>
              <h2>Frequently Asked Questions</h2>
              <p>Quick answers for parents before visiting Nexus or starting the admission form.</p>
            </Reveal>
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <Reveal as="div" delay={revealDelay(index, 0.05)} direction="right" key={faq.question} kind="soft">
                <details>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

