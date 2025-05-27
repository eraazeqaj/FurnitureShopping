import { ReactNode } from "react";
import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";

interface FooterProps {
  copyrightText?: string;
  logoLink?: string;
  className?: string;
  children?: ReactNode;
}

export function Footer({
  copyrightText = "All rights reserved - DreamLiving. 2025",
  logoLink = "/",
  className = "",
  children,
}: FooterProps) {
  return (
    <footer
      className={`bg-yellow-700 border-t border-amber-400 shadow-inner ${className}`}
    >
      <div className="container mx-auto py-6 flex items-center">
        <Link href={logoLink} passHref>
          
            <img
              src={Logo.src}
              alt="Logo"
              className="h-10 w-auto cursor-pointer"
            />
          
        </Link>

        <div className="flex-1 flex justify-center">
          <p className="text-white-900 text-sm">{copyrightText}</p>
        </div>

        {children}
      </div>
    </footer>
  );
}

export default Footer;
