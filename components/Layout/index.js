import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../Footer";
import Header from "../Header";
import Showcase from "../Showcase";
import styles from "./Layout.module.scss";

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <Showcase />
      <div className={`container ${styles.container}`}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "디제잉 페이지",
  description: "디제잉, 소다, 디제이",
  keywords: "music, dj, edm, events",
};
