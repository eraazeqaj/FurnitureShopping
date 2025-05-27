
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

export interface HeaderProps {
  logoSrc: string;
  logoLink?: string;
  navItems: { name: string; pathName: string }[];
  className?: string;
}

export function Header({
  logoSrc,
  logoLink = "/",
  navItems,
  className = "",
}: HeaderProps) {
  const router = useRouter();

  return (
    <header
      className={classNames(
        "py-2 fixed z-50 bg-white border-b w-full transition-all duration-300",
        className
      )}
    >
      <div className="container m-auto flex items-center justify-between">
        <Link href={logoLink}>
        <span>
          <img
            src={logoSrc}
            alt="Logo"
            className="h-10 w-auto cursor-pointer"
          />
          </span>
        </Link>
        <nav className="flex gap-10 items-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.pathName}
              className={classNames("text-black", {
                "underline font-semibold": router.pathname === item.pathName,
              })}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;

