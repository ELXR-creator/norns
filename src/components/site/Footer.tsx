import { EndCredits } from "./EndCredits";
import styles from "./Footer.module.css";

/**
 * The footer of every page except the homepage, which carries the same
 * credits inside its final scene.
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <EndCredits withMark />
      </div>
    </footer>
  );
}
