import Head from "next/head";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props {
  children?: ReactNode;
  name?: string;
}

export function MainLayout({ children, name }: Props) {
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header
          logoSrc="/assets/icons/logo.svg"
          navItems={[
            { name: "Home", pathName: "/" },
            { name: "About", pathName: "/about" },
            { name: "Contact", pathName: "/contact" },
          ]}
        />

        {/* Adjust pt-16 to equal header height (64px) */}
        <main className="flex-1 pt-16">
          {children}
        </main>

        <Footer
          copyrightText="All rights reserved - DreamLiving. 2025"
          logoLink="/"
        />
      </div>
    </>
  );
}

export default MainLayout;


