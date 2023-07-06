import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "../components/Nav";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  const { data: session } = useSession();

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
    <div className="bg-blue-900 min-h-screen flex ">
      <Nav />
      <div className="bg-slate-200 flex-grow mt-2 mr-2 mb-2 rounded-lg px-4 py-6">
        <Toaster />
        {children}
      </div>
    </div>
  );
}
