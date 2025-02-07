"use client";

import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";


export const Userb2 = () => {
  const { data: session, status } = useSession();
  



  if (status === "loading")
    return <p><Loader2 className="size-8 animate-spin text-white" /></p>;

  return (
    <div>
      <Image
        src={session?.user?.image || "/default.svg"}
        alt=""
        width={50}
        height={50}
        className="rounded-full"
      />
    </div>
  );
};
