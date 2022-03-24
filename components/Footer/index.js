import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={`${styles.footer} container`}>
      <p>Copyright &copy; DJ Events 2021</p>
      <p>
        <Link href="/about">About This Project</Link>
      </p>
    </footer>
  );
}
