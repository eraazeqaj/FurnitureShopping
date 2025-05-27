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
        "fixed top-0 left-0 right-0 z-50 bg-yellow-700 w-full shadow-md transition-all duration-300",
        className
      )}
      style={{ height: 64 }}
    >
      <div className="container m-auto flex items-center justify-between h-full">
        <Link href={logoLink} passHref>
          <img
            src={logoSrc}
            alt="Logo"
            className="h-10 w-auto cursor-pointer"
          />
        </Link>

        <nav className="flex gap-8 items-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.pathName}
              className={classNames(
                "text-white-600 hover:text-amber-700 transition-colors duration-300",
                {
                  "underline font-semibold": router.pathname === item.pathName,
                }
              )}
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
