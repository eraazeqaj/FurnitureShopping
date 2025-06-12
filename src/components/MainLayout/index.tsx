import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Shared/Button";
import { useRouter } from "next/router";

interface Props {
  children?: ReactNode;
  name?: string;
}

export function MainLayout({ children, name }: Props) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-white">
        <Header
          logoSrc="/logo.svg"
          navItems={[
            { name: "Home", pathName: "/" },
            { name: "About", pathName: "/about" },
            { name: "Contact", pathName: "/contact" },
          ]}
        />

        {/* 👇 Add this to push everything below the fixed header */}
        <div className="h-16" />

        {/* ✅ Cleaned up search bar + Kyçu button */}
        <div className="w-full flex justify-end items-center gap-4 px-8 mb-4">
          <input
            type="text"
            placeholder="Kërko produkte..."
            className="px-4 py-2 border border-amber-400 rounded-full text-sm text-amber-900 placeholder:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const query = (e.target as HTMLInputElement).value;
                router.push(`/search?q=${encodeURIComponent(query)}`);
              }
            }}
          />
          <Link href="/register">
            <Button text="Kyçu" variant="primary" type="button" />
          </Link>
        </div>

        <main className="flex-1">{children}</main>

        <Footer
          copyrightText="All rights reserved - DreamLiving. 2025"
          logoLink="/"
        />
      </div>
    </>
  );
}

export default MainLayout;
