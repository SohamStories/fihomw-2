import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  return (
    <div className=" bg-blue-600">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" passHref>
          <div className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
            FinHome
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <Button asChild  size="sm"
         className="bg-blue-500 font-semibold border-transparent hover:bg-blue-300 hover:border-blue-500">
            <Link href="/auth/login" passHref>
              <div className="flex items-center gap-2 ">
                <LogIn className="h-4 w-4" />
                Login
              </div>
            </Link>
          </Button>

          <Button asChild size="sm"
          className="bg-blue-500 font-semibold hover:bg-blue-300 hover:border-blue-500">
            <Link href="/auth/register" passHref>
              <div className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Register
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
