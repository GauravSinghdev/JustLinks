import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Share2, Search } from "lucide-react";
import { Redirect } from "@/components/Redirect";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Redirect />
      <main className="">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 lg:h-screen">
          <div className="px-4 py-10 md:py-0 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Store Your Important Links in One Place
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  JustLinks helps you organize and access your important links
                  with ease. Save time and boost productivity.
                </p>
              </div>
              <div className="space-x-4">
                <Link href={"/api/auth/signin"}>
                  <Button>Get Started</Button>
                </Link>
                <Link href={"/learn-more"}>
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <CheckCircle className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Easy Organization</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Categorize and tag your links for quick access and better
                  organization.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <Share2 className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Share Collections</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Create and share link collections with your team or the
                  public.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <Search className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Powerful Search</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Find your saved links quickly with our advanced search
                  functionality.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-2">
                  1
                </div>
                <h3 className="text-xl font-bold">Sign Up</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Create your free account in seconds.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-2">
                  2
                </div>
                <h3 className="text-xl font-bold">Add Links</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Save links with titles and descriptions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-2">
                  3
                </div>
                <h3 className="text-xl font-bold">Organize & Access</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Categorize your links and access them from anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Organizing Your Links Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of users who are already saving time and
                  boosting productivity with LinkVault.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
