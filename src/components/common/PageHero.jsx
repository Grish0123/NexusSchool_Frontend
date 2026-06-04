import { media } from "../../utils/content";
import { Reveal } from "./Reveal.jsx";
import styles from "./PageHero.module.scss";

export function PageHero({ copy, eyebrow, image_url, title }) {
  const heroImage = media(image_url);

  return (
    <section
      className={styles.hero}
      style={{ "--page-hero-image": `url(${heroImage})` }}
    >
      <div className={styles.overlay} />
      <Reveal className={styles.inner} amount={0.55} direction="left" distance={72}>
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </Reveal>
    </section>
  );
}
