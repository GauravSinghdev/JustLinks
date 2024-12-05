import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="my-12 w-full space-y-3 text-center tracking-widest">
      <h1 className="text-3xl font-bold">Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href={"/"}>
        <Button>Go to Home</Button>
      </Link>
    </main>
  );
}
