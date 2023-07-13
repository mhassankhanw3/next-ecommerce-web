import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "../components/Nav";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "./Logo";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);

  if (!session) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-800">
        <button
          onClick={() => signIn("google")}
          className="bg-gray-200 text-black py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-all "
        >
          Login with Google
        </button>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="md:hidden flex items-center p-4">
        <button
          onClick={() => setShowNav(true)}
          className="text-gray-900 text-[24px] font-light "
        >
          <GiHamburgerMenu />
        </button>
        <div className="flex grow justify-center mr-6 ">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav showNav={showNav} />
        <div className="flex-grow p-4">
          <Toaster />
          {children}
        </div>
      </div>
    </div>
  );
}
