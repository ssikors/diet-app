"use client";

import Link from "next/link";
import { FaBowlFood } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import SignIn from "./components/SignIn";

const NavBar = () => {
  const path = usePathname();

  const links = [
    { label: "Meals", href: "/meals" },
    { label: "My meals", href: "/my-meals" },
  ];

  return (
    <nav className="flex text-xl space-x-6 border-b mb-6 px-5 h-14 items-center justify-between">
      <div className="flex space-x-6">
        <Link href={"/"} className="text-2xl">
          <FaBowlFood />
        </Link>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.label}
              className={`${
                link.href == path ? "text-slate-800" : "text-slate-600"
              } hover:text-slate-900`}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
      <div className="pr-12"><SignIn /></div>
      
    </nav>
  );
};

export default NavBar;
