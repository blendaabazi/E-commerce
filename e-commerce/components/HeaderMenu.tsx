"use client";

import { useUserRole } from "@/context/UserRoleContext";
import { CATEGORIES_QUERYResult, Category } from "@/sanity.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderMenuProps {
  categories: CATEGORIES_QUERYResult;
}

const Underline = ({ active }: { active: boolean }) => (
  <>
    <span
      className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor transition-all duration-300 group-hover:w-1/2 group-hover:left-0 ${
        active ? "w-1/2" : ""
      }`}
    />
    <span
      className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor transition-all duration-300 group-hover:w-1/2 group-hover:right-0 ${
        active ? "w-1/2" : ""
      }`}
    />
  </>
);

const HeaderMenu = ({ categories }: HeaderMenuProps) => {
  const pathname = usePathname();
  const { isAdmin, isLoading } = useUserRole();

  // Loading state, mund të ndryshohet në spinner
  if (isLoading) return <div className="text-center py-2">Loading menu...</div>;

  // Funksion për klasat e linkut
  const getLinkClass = (path: string) =>
    `hover:text-darkColor hoverEffect relative group ${
      pathname === path ? "text-darkColor" : ""
    }`;

  return (
    <nav className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold text-lightColor">
      <Link href="/" className={getLinkClass("/")}>
        Home
        <Underline active={pathname === "/"} />
      </Link>

      {categories?.map((category: Category) => {
        const categoryPath = `/category/${category.slug?.current}`;
        return (
          <Link key={category._id} href={categoryPath} className={getLinkClass(categoryPath)}>
            {category.title}
            <Underline active={pathname === categoryPath} />
          </Link>
        );
      })}

      <Link href="/dashboard" className={getLinkClass("/dashboard")}>
        Dashboard
        <Underline active={pathname === "/dashboard"} />
      </Link>

      {isAdmin && (
        <Link href="/admin" className={getLinkClass("/admin")}>
          AdminPanel
          <Underline active={pathname === "/admin"} />
        </Link>
      )}
    </nav>
  );
};

export default HeaderMenu;
