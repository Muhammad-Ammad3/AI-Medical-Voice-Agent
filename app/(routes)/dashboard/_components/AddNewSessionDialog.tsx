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
import  { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";


function AddNewSessionDialog() {
  const [note, setNote] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [suggestedDoctor, setSuggestedDoctor] = useState<doctorAgent[]>();
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const router = useRouter();
  const onClickNext = async () => {
    setLoading(true);
    const result = await axios.post("/api/suggest-doctor", {
      notes: note,
    });
    setSuggestedDoctor(result.data);
    setLoading(false);
  };

  const onStartConsultation = async () => {
    setLoading(true);
    // save the selected doctor on database
    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor: selectedDoctor,
    });
    // console.log("result.dataAddnew==>", result.data);

    if (result.data?.sessionId) {
      // console.log("result.data==>sessionid", result.data.sessionId);
      router.push("/dashboard/medical-agent/" + result.data.sessionId);
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3">+ Start a Consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basics Details</DialogTitle>
          <DialogDescription asChild>
            {!suggestedDoctor ? (
              <div>
                <h2>Add Symptoms or Any Other Details</h2>
                <Textarea
                  placeholder="Add Details here..."
                  className="h-[200px] mt-1"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <h2>Select the Doctor</h2>
                <div className="grid grid-cols-2 gap-5">
                  {/* suggested doctor  */}
                  {suggestedDoctor?.map?.((doctor, index) => (
                    <SuggestedDoctorCard
                      doctorAgent={doctor}
                      key={index}
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
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          {!suggestedDoctor ? (
            <Button disabled={!note || loading} onClick={() => onClickNext()}>
              Next{" "}
              {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </Button>
          ) : (
            <Button
              disabled={loading}
              onClick={() => onStartConsultation()}
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
