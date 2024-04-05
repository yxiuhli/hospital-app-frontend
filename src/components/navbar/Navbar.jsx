import Link from "next/link";
import Links from "./links/Links";

const Navbar = async () => {
  return (
    <div className="sticky top-0 h-14 flex items-center justify-between border-b px-3 bg-sky-100">
      <Link href="/" className="font-bold text-2xl">
        Logo
      </Link>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Navbar;
