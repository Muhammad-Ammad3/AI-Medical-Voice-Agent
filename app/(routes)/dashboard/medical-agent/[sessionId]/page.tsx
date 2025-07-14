"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import type { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, PhoneCall } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type SessionDetail = {
  id: number;
  notes: string;
  createdOn: string;
  sessionId: string;
  report: any;
  selectedDoctor: doctorAgent;
};

function MedicalVoiceAgent() {
  const params = useParams();
  const sessionId = params?.sessionId as string;
  const [sessionDetails, setSessionDetails] = useState<SessionDetail | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      GetSessionDetails();
    }
  }, [sessionId]);

  const GetSessionDetails = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `/api/session-chat?sessionId=${sessionId}`
      );
      console.log("sessionId being sent to API:", sessionId);

      console.log("session details =>", result.data);
      setSessionDetails(result.data);
    } catch (err: any) {
      console.error("Error fetching session:", err);
      setError("Failed to load session details.");
    } finally {
      setLoading(false);
    }
  };
  // {loading && <p>Loading session...</p>}
  //       {error && <p className="text-red-500">{error}</p>}

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          {" "}
          <Circle className="h-4 w-4" /> Not Connected
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>
      {sessionDetails && 
        <div className="flex flex-col items-center mt-10">
          <Image
            src={sessionDetails?.selectedDoctor?.image}
            alt={sessionDetails?.selectedDoctor?.specialist ?? ""}
            height={120}
            width={120}
            className="h-[100px] w-[100px] object-cover rounded-full"
          />
          <h2 className="mt-2 text-lg">
            {sessionDetails?.selectedDoctor?.specialist}
          </h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>
          <div className="mt-32">
            <h2 className="text-gray-400">Assistant Msg</h2>
            <h2 className="text-lg">User Msg</h2>
          </div>
          <Button className="mt-20"> <PhoneCall /> Start Call</Button>
        </div>
      }
    </div>
  );
}

export default MedicalVoiceAgent;
