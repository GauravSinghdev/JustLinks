import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t text-base">
      <div className="max-w-7xl mx-auto flex flex-col justify-center gap-2 sm:flex-row py-3 w-full shrink-0 items-center px-4 md:px-6">
        <p className="text-gray-500 dark:text-gray-400">
          © 2024 JustLinks. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
