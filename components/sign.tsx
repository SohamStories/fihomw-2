"use client"

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false }); // Prevent default redirection
        router.push("/auth/login"); // Manually redirect to login
    };

    return   <Button variant="outline"
                onClick={handleLogout}
                size="lg"
                className="font-bold hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                type="submit">Log Out</Button>;
};

export default LogoutButton;
