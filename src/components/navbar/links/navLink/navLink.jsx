"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.path}
      className={`container min-w-[100px] px-2 py-2 rounded-2xl font-semibold text-center ${
        pathName === item.path && "bg-sky-950 text-white"
      }`}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
