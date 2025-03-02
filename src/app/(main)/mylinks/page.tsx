import MagicCardCompo from "@/components/MagicCardCompo";
import { RedirectServer } from "@/components/RedirectServer";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Mylinks",
};

export default function MyLinkPage() {
  return (
    <Suspense>
      <div className="max-w-6xl mx-auto">
        <RedirectServer />
        <div className="flex flex-col gap-10 max-w-full m-2">
          <div>
            <MagicCardCompo />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
