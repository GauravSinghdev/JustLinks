"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

interface NameProp {
  name: string;
  avatarUrl: string;
}

export function DropdownMenuCheckboxes({ name, avatarUrl }: NameProp) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border-2">
          <AvatarImage src={avatarUrl} alt={name.split(" ")[0]} />
          <AvatarFallback>{name.split(" ")[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit p-2 border-2 cursor-pointer">
        <DropdownMenuLabel>
          Logged in as <span className="text-primary">@{name.split(" ")[0]}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setTimeout(() => {
              signOut({ redirect: false });
              toast.success("You are logged out.");
            }, 1000);
            
          }}
        >
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
