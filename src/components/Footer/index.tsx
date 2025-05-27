import {ReactNode}  from "react";
 import Link from "next/link"; 
import Logo from "@/assets/icons/logo.svg";

interface FooterProps{

    copyrightText?: string;
    logoLink?: string;
    className?: string;
    children?: ReactNode;

}

export function Footer({
    copyrightText = "All rgihts reserved - DreamLiving. 2025 ",
    logoLink="/",
    className="",
    children,

}: FooterProps){
 return(
<div className={`border-t ${className}`}>
<div className="container m-auto py-7 flex items-center">
<Link href={logoLink} legacyBehavior>
    <a>
    <picture> 
        <img className="h-10" src={Logo.src} alt="Logo" />
    </picture> 
    </a>
     
</Link>
<div className="flex-1 flex justify-center">
<p className="text-gray-500">{copyrightText}</p> 
</div>
{children}
</div>
</div>
);
}

export default Footer;