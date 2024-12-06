"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ShinyButton from "./ui/shiny-button";
import { useSession } from "next-auth/react";

export function DialogDemo() {
  const router = useRouter();
  const session = useSession();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state control

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.name,
        description: formData.description,
        link: formData.link,
      };

      toast
        .promise(axios.post("/api/create-link", payload), {
          loading: "Saving...",
          success: <b>Link added successfully!</b>,
          error: <b>Error saving the link.</b>,
        })
        .then(() => {
          setError(null);
          setIsDialogOpen(false);
          setFormData({
            name: "",
            description: "",
            link: "",
          });
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        });
    } catch (error) {
      console.error(error);
      setError("There was an error saving your link.");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {" "}
      {/* Controlled dialog */}
      <DialogTrigger asChild>
        {session.data?.user && (
          <ShinyButton className="">
            {/* Desktop or larger screens: Displays 'Add Link' and a plus sign */}
            <div className="hidden md:flex items-center gap-4">
              Add Link<span className="text-2xl">+</span>
            </div>

            {/* Mobile or smaller screens: Displays 'Add' and a plus sign */}
            <div className="md:hidden flex items-center gap-2">
              <span className="text-2xl">+</span> Link
            </div>
          </ShinyButton>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Add a link</DialogTitle>
          <DialogDescription className="text-center">
            Save your link in one-click. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Title</Label>
              <Input
                id="name"
                name="name"
                placeholder="Name of your link"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Description of your link"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                name="link"
                placeholder="Enter your link"
                value={formData.link}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
