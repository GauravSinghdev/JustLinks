"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { DropdownMenuCheckboxes } from "./Dropdown";

export function AvatarDemo() {
  const { data: session, status } = useSession(); // `status` tells us whether session is loading or available
  let name = "";

  console.log("avatar  is : ", session?.user?.image)

  // If the user's name exists in the session data, extract the initials.
  if (session?.user?.name) {
    name =
      session.user.name.split(" ")[0][0] + session.user.name.split(" ")[1][0];
  }

  // Handle the loading state for session data
  if (status === "loading") {
    return (
      <Avatar>
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
    ); // Optionally show a loading spinner or placeholder
  }

  return (
    <div className="flex items-center tracking-wider">
      {session?.user ? (
        <DropdownMenuCheckboxes name={session?.user.name ?? ""} avatarUrl={session?.user.image ?? ""}/>
      ) : (
        <Button onClick={() => signIn()} title="log in">
          <span className="hover:text-gray-200">Login</span>
        </Button>
      )}
    </div>
  );
}
