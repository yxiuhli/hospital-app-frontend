"use client";

import { useState, useContext } from "react";
import styles from "./links.module.css";
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
  const router = useRouter()

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
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {currentUser ? (
          <button onClick={handleLogout} className={styles.logout}>
            Logout
          </button>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
