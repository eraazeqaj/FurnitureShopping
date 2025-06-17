import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Shared/Button";
import { useRouter } from "next/router";
import {useSession, signOut} from "next-auth/react";

interface Props {
  children?: ReactNode;
  name?: string;
}

export function MainLayout({ children, name }: Props) {
  const router = useRouter();
  const {data: session,status} = useSession();

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


        <div className="h-16" />


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


          {status === "loading" ? (
  <div className="text-sm text-gray-500">Duke kontrolluar...</div>
) : status === "authenticated" ? (
  <Button
    text="Shkyçu"
    variant="primary"
    type="button"
    onClick={() => signOut({ callbackUrl: "/" })}
  />
) : (
  <Link href="/login">
    <Button text="Kyçu" variant="primary" type="button" />
  </Link>
)}

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
