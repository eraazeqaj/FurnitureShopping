import Head from "next/head";
import {ReactNode} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Props{
   children?: ReactNode;
   name? :string;
}

export function MainLayout({children, name}:Props){
   return(
      <div>
         <Head>
            <title>{name}</title>
         </Head>

         <Header
            logoSrc="/assets/icons/logo.svg"
            navItems={[
               {name: "Home", pathName: "/"},
               {name: "About", pathName : "/about"},
               {name: "Contact", pathName: "/contact"},
            ]}
            />

            <main className = "pt-14">{children}</main>

            <Footer
           copyrightText="All rights reserved - DreamLiving. 2025"
           logoLink="/"
            />
      </div>
   );
}

export default MainLayout;
