import { auth } from "@/auth";
import { Loader2 } from "lucide-react";
import { Userb2 } from "./user";
import LogoutButton from "./sign";
export async function Userbutton() {
  
     const session = await auth();

    
     if (!session) {
      return <p className=""><Loader2 className="size-8 animate-spin text-slate-400"/></p>; // Handle loading or no session case
    }
    return (
        <div className="flex items-center space-x-4">

       
            <LogoutButton/>

         

<Userb2/>
        
      </div>
    )
}