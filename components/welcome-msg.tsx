

import { auth } from "@/auth";
import { Loader2 } from "lucide-react";


export  default async function WelcomeMsg()  {
  const session = await auth();

  if (!session?.user) {
    return <p className=""><Loader2 className="size-8 animate-spin text-white"/></p>; // Handle loading or no session case
  }
  return (
    <div className="">
        <h2 className="text-2xl lg:text-4xl text-white font-semibold">Welcome Back, {session.user.name} 👋</h2>
        <p className="text-sm lg:text-base text-[#89b6fd]">This is your Financial Overview Report</p>
     
    </div>
  );
}
