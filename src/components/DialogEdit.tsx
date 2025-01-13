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
import { useSession } from "next-auth/react";
import { CiEdit } from "react-icons/ci";

interface DialogEditProp {
  id: string;
  title: string;
  description: string;
  url: string;
}

export function DialogEdit({ id, title, description, url }: DialogEditProp) {
  const router = useRouter();
  const session = useSession();
  const [formData, setFormData] = useState({
    linkId: id,
    newTitle: title,
    newDescription: description,
    newLink: url,
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
        linkId: formData.linkId,
        newTitle: formData.newTitle,
        newDescription: formData.newDescription,
        newLink: formData.newLink,
      };

      toast
        .promise(axios.put("/api/edit-link", payload), {
            loading: "Editing...",
            success: <b>Link edited successfully!</b>,
            error: null
        })
        .then(() => {
          setError(null);
          setIsDialogOpen(false);
          setFormData({
            linkId: id,
            newTitle: title,
            newDescription: description,
            newLink: url,
          });
          router.push("/"); // Optionally navigate to another page
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } catch (error) {}
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* Controlled dialog */}
      <DialogTrigger asChild>
        {session.data?.user && (
          <CiEdit className="text-green-400 hover:scale-110" />
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Link</DialogTitle>
          <DialogDescription className="text-center">
            Update your link information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="newTitle">Title</Label>
              <Input
                id="newTitle"
                name="newTitle"
                placeholder="Name of your link"
                value={formData.newTitle}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="newDescription">Description</Label>
              <Input
                id="newDescription"
                name="newDescription"
                placeholder="Description of your link"
                value={formData.newDescription}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="newLink">Link</Label>
              <Input
                id="newLink"
                name="newLink"
                placeholder="Enter your link"
                value={formData.newLink}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Edit it</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
