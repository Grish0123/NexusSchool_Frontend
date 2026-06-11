import { useState } from "react";
import { FaCompress, FaExpand, FaRobot, FaTimes } from "react-icons/fa";
import styles from "./Layout.module.scss";

const CHAT_IFRAME_SRC = "https://app.naaulo.com/app/chat/chat?suk=892b4591-ac12-4c34-ac6d-b524ae2d353f&pfx=v323df94dde9d4341968c852e0f41d8a6";

export function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {isOpen && (
        <section className={`${styles.aiChatPanel} ${isExpanded ? styles.aiChatPanelExpanded : ""}`} aria-label="Nexus AI assistant">
          <iframe
            src={CHAT_IFRAME_SRC}
            title="Nexus AI assistant"
            allow="microphone; camera; autoplay; clipboard-write"
          />
          <div className={styles.aiChatControls}>
            <button type="button" onClick={() => setIsExpanded((current) => !current)} aria-label={isExpanded ? "Restore AI assistant" : "Expand AI assistant"}>
              {isExpanded ? <FaCompress aria-hidden="true" /> : <FaExpand aria-hidden="true" />}
            </button>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close AI assistant">
              <FaTimes aria-hidden="true" />
            </button>
          </div>
        </section>
      )}
      <button className={styles.aiChatButton} type="button" onClick={() => setIsOpen((current) => !current)} aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}>
        <FaRobot aria-hidden="true" />
      </button>
    </>
  );
}
