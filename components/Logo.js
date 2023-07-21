import Link from "next/link";
import React from "react";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";

export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center text-gray-800 gap-1">
      <HiOutlineBuildingStorefront fontSize={23} />
      EcommerceAdmin
    </Link>
  );
}
