"use client";
import { useState, useContext } from "react";
import NavLink from "./navLink/navLink";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

const links = [
  {
    title: "Trang chủ",
    path: "/",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Links = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { currentUser, updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      updateUser(null);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="hidden sm:flex items-center gap-2">
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {currentUser ? (
          <button
            onClick={handleLogout}
            className="hidden sm:block p-2 cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className="sm:hidden block cursor-pointer p-2"
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="sm:hidden absolute top-14 right-0 w-50% h-[calc(100vh-56px)] 
        bg-gray-700 flex flex-col items-center justify-center gap-10">
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
