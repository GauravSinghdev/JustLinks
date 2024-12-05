import MagicCardCompo from "@/components/MagicCardCompo";
import { RedirectServer } from "@/components/RedirectServer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <div className="">
      <RedirectServer/>
      <div className="flex flex-col gap-10 max-w-full">
        <div>
          <MagicCardCompo />
        </div>
      </div>
    </div>
  );
}
