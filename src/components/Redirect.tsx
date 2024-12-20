"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export function Redirect() {
  const session = useSession();
  useEffect(() => {
    if (session.data?.user) {
      redirect("/mylinks");
    }
  }, [session]);

  return null;
}
