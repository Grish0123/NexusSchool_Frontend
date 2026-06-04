import { FaWhatsapp } from "react-icons/fa";
import styles from "./Layout.module.scss";

export function WhatsAppButton({ phone }) {
  const cleanPhone = String(phone || "9840000000").replace(/[^\d]/g, "");
  return (
    <a className={styles.whatsapp} href={`https://wa.me/${cleanPhone}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}
