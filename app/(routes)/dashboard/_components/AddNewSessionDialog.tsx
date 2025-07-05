"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import axios from "axios";

function AddNewSessionDialog() {
  const [note, setNote] = useState<string>();
  const [loading , setLoading] = useState(false);
  const onClickNext =async () => {
    setLoading(true);
    const result = await axios.post("/api/suggest-doctor", {
      notes: note
    })
    console.log("result.data==>",result.data);
    setLoading(false)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3">+ Start a Consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basics Details</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2>Add Symptoms or Any Other Details</h2>
              <Textarea
                placeholder="Add Details here..."
                className="h-[200px] mt-1"
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button disabled={!note} onClick={() => onClickNext()}>
            Next <ArrowRight />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
