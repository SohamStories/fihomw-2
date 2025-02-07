"use client"

import { NavButton } from "./nav-elemts/navbutton";

import {useMedia} from "react-use";
import {useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname,useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { Menu } from "lucide-react";



const routes =[ {
   href: "/dashboard",
   label: "Overview",
},
{
    href:"/transactions",
    label:"Transactions",
},
{
    href:"/accounts",
    label:"Accounts",
},
{
    href:"/categories",
    label:"Categories"
},
{
    href:"/settings",
    label:"Settings",
},
];

export const Navigation = () => {

const [isOpen , setIsOpen] = useState(false);
const pathname = usePathname();
const router = useRouter();
const isMobile = useMedia("(max-width: 1024px)",false);

const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
};

if(isMobile) {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline"
                size="sm"
                className="font-semibold hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                >
                    <Menu className="size-5 rounded-lg shadow-black "/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-2 bg-white">
            <SheetTitle className="px-4">Menu</SheetTitle>
                <nav className="flex flex-col gap-y-2 pt-6">
                    {routes.map((route) => (
                        <Button 
                            key={route.href}
                        variant={route.href === pathname ? "secondary" : "ghost"}
                        onClick={() => onClick(route.href)}
                        className="w-full justify-start"
                        >
                            {route.label}
                        </Button>
                    ))}

                </nav>
            </SheetContent>
        </Sheet>
    );
};

    return (
<nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
    {routes.map((route => (
      <NavButton
      key={route.href}
      href={route.href}
      label={route.label}
      isActive={pathname === route.href}
      />
    )))}

</nav>
    )
}