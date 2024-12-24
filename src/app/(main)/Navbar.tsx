import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";

import { AvatarDemo } from "@/components/UserAvt";
import { getServerSession } from "next-auth";
import { DialogDemo } from "@/components/Dialog";

export default async function Navbar() {
  const session = await getServerSession();
  return (
    <header className=" top-0 z-10 border-b-2 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto py-3 px-2">
        <Link href={"/"}>
          <div className="border-4 border-primary px-2 py-1 text-2xl text-primary font-bold tracking-wider">
            JustLinks
          </div>
        </Link>
        <div className="flex items-center gap-5">
          {session?.user?.email && <DialogDemo />}
          <div>
            <ModeToggle />
          </div>
          <div>
            <AvatarDemo />
          </div>
        </div>
      </div>
    </header>
  );
}
