/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import Layout from "@/components/Layout";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContentImage from "@/image/event-default.png";
import StrapiLogo from "@/image/strapi.svg";
import NextLogo from "@/image/Nextjs.svg";
export default function AboutPage() {
  return (
    <Layout>
      <div className="container aboutPage">
        <h1>About This Page</h1>
        <div className="contents">
          <Image src={ContentImage} width={600} height={400} objectFit="cover" alt="content" />
          <div className="desc">
            <h3>
              <span>DJ Event Page With</span>
              <Image src={NextLogo} width={80} height={80} objectFit="strapi-logo" />
              <Image src={StrapiLogo} width={100} height={80} objectFit="strapi-logo" />
            </h3>
            <p>
              If you add some Events, Please <Link href="/account/login">Login</Link>{" "}
            </p>
            <p>
              Don't have an account? <Link href="/account/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
