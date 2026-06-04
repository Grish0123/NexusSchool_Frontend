import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { Reveal, revealDelay } from "../components/common/Reveal.jsx";
import styles from "./ContactPage.module.scss";

export function ContactPage({ data }) {
  const config = data.config || {};
  const address = config.address || "Pepsicola Townplanning-32, Kathmandu";
  const phone = config.contact_phone?.[0] || "01-4990303";
  const email = config.contact_email || "nexusworldeducation@gmail.com";
  const mapQuery = encodeURIComponent(`Nexus International Academy ${address}`);
  const contactCards = [
    ["Email Address", email, `mailto:${email}`, FaEnvelope],
    ["Phone Number", phone, `tel:${phone}`, FaPhoneAlt],
    ["Our Office", address, `https://www.google.com/maps/search/?api=1&query=${mapQuery}`, FaMapMarkerAlt],
  ];

  return (
    <>
      <section className={styles.contactSection}>
        <div className={styles.inner}>
          <Reveal className={styles.contactIntro} direction="up" distance={58}>
            <span>Contact Us</span>
            <h1>Get in touch</h1>
            <div className={styles.contactMethods}>
              {contactCards.map(([label, value, href, Icon], index) => (
                <Reveal
                  as="div"
                  delay={revealDelay(index, 0.06)}
                  direction={index === 0 ? "left" : index === 1 ? "up" : "right"}
                  key={label}
                  kind="card"
                >
                <a
                  href={href}
                  rel={label === "Our Office" ? "noreferrer" : undefined}
                  target={label === "Our Office" ? "_blank" : undefined}
                >
                  <span className={styles.methodIcon}><Icon aria-hidden="true" /></span>
                  <span>
                    <small>{label}</small>
                    <strong>{value}</strong>
                  </span>
                </a>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <div className={styles.contactGrid}>
            <Reveal
              as="div"
              direction="left"
              kind="image"
            >
            <iframe
              title="Nexus International Academy location map"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            </Reveal>
            <Reveal as="form" className={styles.contactForm} delay={0.1} direction="right" kind="card" action={`mailto:${email}`} method="post" encType="text/plain">
              <div className={styles.formHead}>
                <span>Send A Message</span>
                <h2>Tell us what you need</h2>
              </div>
              <div className={styles.formGrid}>
                <label>
                  Your Name
                  <input name="first_name" placeholder="Your name" required type="text" />
                </label>
                <label>
                  Last Name
                  <input name="last_name" placeholder="Your last name" type="text" />
                </label>
              </div>
              <label>
                Email address
                <input name="email" placeholder="Your email address" type="email" />
              </label>
              <label>
                Message
                <textarea name="message" placeholder="Write something..." required />
              </label>
              <button type="submit">Submit</button>
            </Reveal>
          </div>
        </div>
      </section>

      {(data.faqs || []).length > 0 && (
        <section className={styles.faqSection}>
          <div className={styles.inner}>
            <Reveal className={styles.faqHead}>
              <span>Quick Answers</span>
              <h2>Before you contact us</h2>
            </Reveal>
            <div className={styles.faqGrid}>
            {(data.faqs || []).slice(0, 6).map((faq, index) => (
              <Reveal as="article" delay={revealDelay(index)} direction={index % 2 ? "right" : "left"} key={faq.question} kind="card">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
              </Reveal>
            ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
