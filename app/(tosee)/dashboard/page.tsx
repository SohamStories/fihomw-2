"use client"

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-get-account";

export default  function Home() {

const {onOpen} = useNewAccount();
  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
     <Button className="px-6 py-3 rounded-xl bg-blue-950 text-white font-semibold shadow-md transition duration-300 hover:bg-blue-700 active:scale-95" onClick={onOpen}>
      Add an account
     </Button>
    </div>
  );
}
