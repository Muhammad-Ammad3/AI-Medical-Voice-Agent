// "use client";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { doctorAgent } from "../../_components/DoctorAgentCard";
// import { Circle } from "lucide-react";
// import Image from "next/image";

// type SessionDetail = {
//   id: number;
//   notes: string;
//   createdOn: string;
//   sessionId: number;
//   report: JSON;
//   selectedDoctor: doctorAgent;
// };

// function MedicalVoiceAgent() {
//   const { sessionId } = useParams();
//   const [sessionDetails, setSessionDetails] = useState<SessionDetail>();

//   useEffect(() => {
//     sessionId && GetSessionDetails();
//   }, [sessionId]);
//   const GetSessionDetails = async () => {
//     const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
//     console.log("result.data==>", result.data);
//     setSessionDetails(result.data);
//   };
//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
//           {" "}
//           <Circle className="h-4 w-4" /> Not Connected{" "}
//         </h2>
//         <h2 className="font-bold text-xl text-gray-400">00:00</h2>
//       </div>
//       {sessionDetails && (
//         <div>
//           <Image
//             src={sessionDetails?.selectedDoctor?.image}
//             alt={sessionDetails?.selectedDoctor?.specialist}
//             width={80}
//             height={80}
//           />
//           <h2>{sessionDetails.selectedDoctor.description}</h2>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MedicalVoiceAgent;


"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import type { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle } from "lucide-react";
import Image from "next/image";

// Define the type of session data returned from API
type SessionDetail = {
  id: number;
  notes: string;
  createdOn: string;
  sessionId: string;
  report: any; // you can replace this with a more specific type if needed
  selectedDoctor: doctorAgent;
};

function MedicalVoiceAgent() {
  const params = useParams();
  const sessionId = params?.sessionId as string; // 👈 safely cast to string
  const [sessionDetails, setSessionDetails] = useState<SessionDetail | null>(null);
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
      const result = await axios.get(`/api/session-chat?sessionId=${sessionId}`);
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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center text-sm">
          <Circle className="h-4 w-4 text-red-500" />
          Not Connected
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>

      {/* Show loading or error state */}
      {loading && <p>Loading session...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Show session data */}
      {sessionDetails && (
        <div className="flex flex-col items-start gap-2">
          <Image
            src={sessionDetails.selectedDoctor.image}
            alt={sessionDetails.selectedDoctor.specialist}
            width={80}
            height={80}
            className="rounded-full"
          />
          <h2 className="font-semibold text-lg">{sessionDetails.selectedDoctor.specialist}</h2>
          <p className="text-sm text-muted-foreground">{sessionDetails.selectedDoctor.description}</p>
          <p className="text-sm text-muted-foreground mt-2">Symptoms/Notes: {sessionDetails.notes}</p>
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;
