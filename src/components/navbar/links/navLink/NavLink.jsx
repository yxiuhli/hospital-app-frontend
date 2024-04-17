"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.path}
      className={`container w-fit px-2 py-2 rounded-2xl font-semibold text-center ${
        pathName === item.path && "underline underline-offset-8"
      }`}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
