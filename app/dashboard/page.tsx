import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return <p>Loading...</p>; // Handle loading or no session case
  }

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <p>Welcome, {session?.user?.name || "Guest"}</p>
 
    </div>
  );
}
