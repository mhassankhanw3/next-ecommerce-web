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
import Logo from "./Logo";

export default function Nav({ showNav }) {
  const inactiveLink = "flex items-center gap-1 p-1 text-gray-500";
  const activeLink =
    inactiveLink +
    "flex items-center gap-1 bg-[#ede9fe] text-gray-900 rounded-sm py-[6px] px-[4px] transition-all ";
  const inactiveIcon = "text-gray-500 text-[23px] flex items-center ";
  const activeIcon = "text-indigo-800  ";

  const router = useRouter();
  const { pathname } = router;

  const logout = async () => {
    await router.push("/");
    await signOut();
  };

  return (
    <aside
      className={
        (showNav ? "left-0" : "-left-full") +
        " top-0 text-gray-500 font-medium p-4 fixed w-full bg-gray-100 h-full md:static md:w-auto transition-all"
      }
    >
      <div className="mb-4 mr-4">
        <Logo />
      </div>
      <nav className="flex flex-col gap-3">
        <Link
          href={"/"}
          className={pathname === "/" ? activeLink : inactiveLink}
        >
          <AiOutlineHome
            fontSize={22}
            className={pathname === "/" ? activeIcon : inactiveIcon}
          />
          Dashboard
        </Link>{" "}
        <Link
          href={"/products"}
          className={pathname.includes("/products") ? activeLink : inactiveLink}
        >
          <HiOutlineArchiveBox
            fontSize={23}
            className={
              pathname.includes("/products") ? activeIcon : inactiveIcon
            }
          />
          Products
        </Link>{" "}
        <Link
          href={"/categories"}
          className={
            pathname.includes("/categories") ? activeLink : inactiveLink
          }
        >
          <AiOutlineUnorderedList
            fontSize={23}
            className={
              pathname.includes("/categories") ? activeIcon : inactiveIcon
            }
          />
          Categories
        </Link>{" "}
        <Link
          href={"/orders"}
          className={pathname.includes("/orders") ? activeLink : inactiveLink}
        >
          <HiOutlineQueueList
            fontSize={23}
            className={pathname.includes("/orders") ? activeIcon : inactiveIcon}
          />
          Orders
        </Link>
        <Link
          href={"/settings"}
          className={pathname.includes("/settings") ? activeLink : inactiveLink}
        >
          <AiOutlineSetting
            fontSize={23}
            className={
              pathname.includes("/settings") ? activeIcon : inactiveIcon
            }
          />
          Settings
        </Link>
        <button onClick={logout} className={inactiveLink}>
          <HiOutlineLogout fontSize={23} />
          Logout
        </button>
      </nav>
    </aside>
  );
}
