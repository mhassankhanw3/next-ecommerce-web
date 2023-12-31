import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "../components/Nav";
import Layout from "../components/Layout";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  // console.log(session.user, "session.user");
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">
            Hello,{" "}
            <span className="font-medium text-[#7c3aed] text-[18px]">
              <b>{session?.user?.name.toUpperCase()}</b>
            </span>
          </h2>
        </div>
        <div className="flex items-center rounded-md bg-[#ddd6fe]">
          <img
            className="w-8 h-8 mr-2 rounded-l-md"
            src={session?.user?.image}
            alt=""
          />
          <span className="text-[#3b0764] font-medium mr-2">
            {session?.user?.name}
          </span>
        </div>
      </div>
    </Layout>
  );
}
