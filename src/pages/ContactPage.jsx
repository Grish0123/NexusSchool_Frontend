import { FaBuilding, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { Reveal, revealDelay } from "../components/common/Reveal.jsx";
import styles from "./ContactPage.module.scss";

export function ContactPage({ data }) {
  const address = "Pepsi-Cola Town Planning, Kathmandu";
  const phone = "01-4990303 | 01-4991051";
  const email = "info@nexus.edu.np";
  const schoolMapSrc = "https://maps.google.com/maps?q=Nexus%20International%20School%20Pepsi-Cola%20Town%20Planning%20Kathmandu&t=&z=16&ie=UTF8&iwloc=&output=embed";
  const contactCards = [
    ["Email Address", email, `mailto:${email}`, FaEnvelope],
    ["Phone Number", phone, "tel:01-4990303", FaPhoneAlt],
    ["Our Location", address, null, FaMapMarkerAlt],
  ];
  const campuses = [
    {
      address,
      email,
      name: "Nexus International School",
      phone: "01-4990303 | 01-4991051",
      tagline: "Where Excellence Begins!",
      website: "www.nexus.edu.np"
    },
    {
      address: "Khageshwori, Kathmandu",
      email: "admin@nexus.edu.np",
      name: "Nexus IPC Montessori",
      phone: "01-4990934 | 01-4991051",
      tagline: "The Foundation of Future Excellence!",
      website: "www.nexus.edu.np"
    }
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
                {href ? (
                  <a href={href}>
                    <span className={styles.methodIcon}><Icon aria-hidden="true" /></span>
                    <span>
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </span>
                  </a>
                ) : (
                  <div className={styles.methodStatic}>
                    <span className={styles.methodIcon}><Icon aria-hidden="true" /></span>
                    <span>
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </span>
                  </div>
                )}
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal as="section" className={styles.mapPanel} direction="up" distance={42} kind="card" aria-label="Nexus International School map">
            <iframe
              src={schoolMapSrc}
              title="Nexus International School location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>

          <div className={styles.contactGrid}>
            <Reveal
              as="div"
              className={styles.campusPanel}
              direction="left"
              kind="card"
            >
              <div className={styles.campusHead}>
                <span>School Locations</span>
                <h2>Contact Nexus</h2>
              </div>
              <div className={styles.campusList}>
                {campuses.map((campus) => (
                  <article className={styles.campusCard} key={campus.name}>
                    <span className={styles.campusIcon}><FaBuilding aria-hidden="true" /></span>
                    <div>
                      <h3>{campus.name}</h3>
                      <p>{campus.tagline}</p>
                      <ul>
                        <li><FaMapMarkerAlt aria-hidden="true" /> {campus.address}</li>
                        <li><FaPhoneAlt aria-hidden="true" /> {campus.phone}</li>
                        <li><FaEnvelope aria-hidden="true" /> <a href={`mailto:${campus.email}`}>{campus.email}</a></li>
                        <li><FaGlobe aria-hidden="true" /> {campus.website}</li>
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
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
