import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  AiOutlineHome,
  AiOutlineUnorderedList,
  AiOutlineSetting,
} from "react-icons/ai";
import {
  HiOutlineQueueList,
  HiOutlineArchiveBox,
  HiOutlineBuildingStorefront,
} from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "next-auth/react";

export default function Nav() {
  const inactiveLink = "flex items-center gap-1 p-1";
  const activeLink =
    inactiveLink +
    "flex items-center gap-1 bg-slate-200 text-blue-900 rounded-l-md py-[2px] px-[2px] ";

  const router = useRouter();
  const { pathname } = router;
  const url = router.pathname;

  return (
    <aside className="text-white font-medium p-4 pr-0">
      <Link href={"/"} className="flex items-center gap-1 mb-4 mr-4 ">
        <HiOutlineBuildingStorefront fontSize={23} />
        <span>EcommerceAdmin</span>
      </Link>
      <nav className="flex flex-col gap-2">
        <Link
          href={"/"}
          className={pathname === "/" ? activeLink : inactiveLink}
        >
          <AiOutlineHome fontSize={22} />
          Dashboard
        </Link>{" "}
        <Link
          href={"/products"}
          className={pathname.includes("/products") ? activeLink : inactiveLink}
        >
          <HiOutlineArchiveBox fontSize={23} />
          Products
        </Link>{" "}
        <Link
          href={"/categories"}
          className={
            pathname.includes("/categories") ? activeLink : inactiveLink
          }
        >
          <AiOutlineUnorderedList fontSize={23} />
          Categories
        </Link>{" "}
        <Link
          href={"/orders"}
          className={pathname.includes("/orders") ? activeLink : inactiveLink}
        >
          <HiOutlineQueueList fontSize={23} />
          Orders
        </Link>
        <Link
          href={"/settings"}
          className={pathname.includes("/settings") ? activeLink : inactiveLink}
        >
          <AiOutlineSetting fontSize={23} />
          Settings
        </Link>
        <button onClick={() => signOut()} className={inactiveLink}>
          <HiOutlineLogout fontSize={23} />
          Logout
        </button>
      </nav>
    </aside>
  );
}
