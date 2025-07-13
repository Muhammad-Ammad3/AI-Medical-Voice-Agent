"use client";
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
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";

function AddNewSessionDialog() {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctor, setSuggestedDoctor] = useState<doctorAgent[] | null>(
    null
  );
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent | null>(
    null
  );
  const router = useRouter();

  const onClickNext = async () => {
    if (!note.trim()) return;
    try {
      setLoading(true);
      const result = await axios.post("/api/suggest-doctor", {
        notes: note,
      });
      setSuggestedDoctor(result.data);
    } catch (error) {
      console.error("Error suggesting doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const onStartConsultation = async () => {
    if (!selectedDoctor) return;
    try {
      setLoading(true);
      const result = await axios.post("/api/session-chat", {
        notes: note,
        selectedDoctor,
      });

      if (result.data?.sessionId) {
        router.push("/dashboard/medical-agent/" + result.data.sessionId);
      }
    } catch (error) {
      console.error("Error starting consultation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3">+ Start a Consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            {!suggestedDoctor ? (
              <div>
                <h2>Add Symptoms or Any Other Details</h2>
                <Textarea
                  placeholder="Add details here..."
                  className="h-[200px] mt-1"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <h2>Select the Doctor</h2>
                <div className="grid grid-cols-2 gap-5">
                  {suggestedDoctor.map((doctor, index) => (
                    <SuggestedDoctorCard
                      key={index}
                      doctorAgent={doctor}
                      selectedDoctor={selectedDoctor}
                      setSelectedDoctor={() => setSelectedDoctor(doctor)}
                    />
                  ))}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          {!suggestedDoctor ? (
            <Button disabled={!note.trim() || loading} onClick={onClickNext}>
              Next{" "}
              {loading ? (
                <Loader2 className="animate-spin ml-2" />
              ) : (
                <ArrowRight className="ml-2" />
              )}
            </Button>
          ) : (
            <Button
              disabled={loading || !selectedDoctor}
              onClick={onStartConsultation}
            >
              Start Consultation
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
