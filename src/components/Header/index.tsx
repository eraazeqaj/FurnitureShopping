import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

export interface HeaderProps {
  logoSrc: string; // should be "/logo.svg"
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
      <div className="container mx-auto flex items-center justify-between h-full px-4">
        <Link href={logoLink}>
          {/* Note: Link doesn't render a DOM element, so we MUST wrap with a real element */}
          <div className="h-10 w-auto cursor-pointer flex items-center">
            <img src={logoSrc} alt="Logo" className="h-full w-auto" />
          </div>
        </Link>

        <nav className="flex gap-8 items-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.pathName}
              className={classNames(
                "text-white hover:text-amber-300 transition-colors duration-300",
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

