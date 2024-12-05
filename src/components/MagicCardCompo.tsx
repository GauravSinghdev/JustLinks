"use client";

import { MagicCard } from "./ui/magic-card";
import { useTheme } from "next-themes";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { SkeletonCard } from "./SkeletonCard";
import { LiaExternalLinkAltSolid } from "react-icons/lia";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { redirect, useSearchParams } from "next/navigation";
interface Link {
  id: string;
  title: string;
  description: string;
  link: string;
}

export default function MagicCardCompo() {
  const { theme } = useTheme();
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // To manage loading state
  const [error, setError] = useState<string | null>(null); // To manage error state
  const searchParams = useSearchParams()
  useEffect(()=> {
    const search = searchParams.get('success')
    if(search === 'true'){
      setTimeout(() => {
        toast.success('You are logged in.');
        redirect("/dashboard")
      },100);
    }
  },[searchParams])

  const fetchLinks = async () => {
    try {
      const response = await axios.get("/api/getlinks", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLinks(response.data);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch links. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDlt = async (linkId: string) => {
    toast
      .promise(axios.delete(`/api/delete-link`, { data: { linkId } }), {
        loading: "Deleting...",
        success: <b>Link deleted successfully!</b>,
        error: <b>Error deleting the link.</b>,
      })
      .then(() => {
        fetchLinks();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  // Conditional rendering based on state
  if (loading) {
    return <SkeletonCard />; // Show loading state
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // Show error message
  }

  if (links.length === 0) {
    return <div className="text-primary text-center">No project added</div>; // Show message when no links are available
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {links.map((link) => (
        <MagicCard
          key={link.id}
          className="cursor-pointer flex flex-col shadow-2xl text-2xl bg-white rounded-lg h-fit p-2"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          {/* Render title, description, and link here */}
          <div className=" p-10 h-full">
            <h2 className="text-2xl font-semibold mb-2">{link.title}</h2>
            <p className="text-base mb-4 text-wrap">{link.description}</p>
            <div className="absolute flex bottom-0 right-0 gap-2">
              <a
                href={link.link}
                className="text-primary hover:text-purple-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                title={link.link}
              >
                <LiaExternalLinkAltSolid className="size-8" />
              </a>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" title="delete">
                    <MdDelete className="text-red-600 size-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will delete the link
                      from the database forever.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDlt(link.id)}>
                      Delete it
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </MagicCard>
      ))}
    </div>
  );
}
