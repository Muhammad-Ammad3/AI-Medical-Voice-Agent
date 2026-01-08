// "use client";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import type { doctorAgent } from "../../_components/DoctorAgentCard";
// import { Circle, PhoneCall, PhoneOff } from "lucide-react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Vapi from "@vapi-ai/web";
// import Provider from "@/app/provider";

// type SessionDetail = {
//   id: number;
//   notes: string;
//   createdOn: string;
//   sessionId: string;
//   report: any;
//   selectedDoctor: doctorAgent;
// };

// type messages = {
//   role: string;
//   text: string;
// };

// function MedicalVoiceAgent() {
//   const params = useParams();
//   const sessionId = params?.sessionId as string;
//   const [sessionDetails, setSessionDetails] = useState<SessionDetail | null>(
//     null
//   );
//   const [callStarted, setCallStarted] = useState(false);
//   const [vapiInstance, setVapiInstance] = useState<any>();
//   const [currentRoll, setCurrentRoll] = useState<string | null>();
//   const [liveTranscript, setLiveTranscript] = useState<string>();
//   const [message, setMessage] = useState<messages[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (sessionId) {
//       GetSessionDetails();
//     }
//   }, [sessionId]);

//   const GetSessionDetails = async () => {
//     try {
//       setLoading(true);
//       const result = await axios.get(
//         `/api/session-chat?sessionId=${sessionId}`
//       );
//       console.log("sessionId being sent to API:", sessionId);

//       console.log("session details =>", result.data);
//       setSessionDetails(result.data);
//     } catch (err: any) {
//       console.error("Error fetching session:", err);
//       setError("Failed to load session details.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const StartCall = () => {
//     const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
//     setVapiInstance(vapi);
//     const VapiAgentConfig = {
//       name: "AI Medical Doctor Voice Agent",
//       firstMessage:
//         "Hi there! I'm your AI Medical Assistant. I'm here to help you with any health questions or concern your might have today. How are you feeling?",
//       transcriber: {
//         provider: "assembly-ai",
//         language: "en",
//       },
//       voice: {
//         provider: "vapi",
//         voiceId: sessionDetails?.selectedDoctor?.voiceId,
//       },
//       model: {
//         provider: "openai",
//         model: "gpt-4o-mini",
//         messages: [
//           {
//             role: "system",
//             content: sessionDetails?.selectedDoctor?.agentPrompt,
//           },
//         ],
//       },
//     };
//     //@ts-ignore
//     vapi.start(VapiAgentConfig);
//     vapi.on("call-start", () => {
//       console.log("Call started");
//       setCallStarted(true);
//     });
//     vapi.on("call-end", () => {
//       console.log("Call ended");
//       setCallStarted(false);
//     });
//     vapi.on("message", (message) => {
//       if (message.type === "transcript") {
//         const { role, transcript, transcriptType } = message;
//         console.log(`${message.role}: ${message.transcript}`);
//         if (transcriptType == "partial") {
//           setLiveTranscript(transcript);
//           setCurrentRoll(role);
//         } else if (transcriptType == "final") {
//           setMessage((prev: any) => [
//             ...prev,
//             { role: role, text: transcript },
//           ]);
//           setLiveTranscript("");
//           setCurrentRoll(null);
//         }
//       }
//     });

//     vapiInstance.on("speech-start", () => {
//       console.log("Assistant started speaking");
//       setCurrentRoll("assistant");
//     });
//     vapiInstance.on("speech-end", () => {
//       console.log("Assistant stopped speaking");
//       setCurrentRoll("user");
//     });
//   };
//   const endCall = () => {
//     if (!vapiInstance) return;
//     vapiInstance.stop();

//     vapiInstance.off("call-start");
//     vapiInstance.off("call-end");
//     vapiInstance.off("message");
//     setCallStarted(false);
//     setVapiInstance(null);
//   };
//   {
//     loading && <p>Loading session...</p>;
//   }
//   {
//     error && <p className="text-red-500">{error}</p>;
//   }

//   return (
//     <div className="p-5 border rounded-3xl bg-secondary">
//       <div className="flex justify-between items-center">
//         <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
//           {" "}
//           <Circle
//             className={`h-4 w-4 rounded-full ${
//               callStarted ? "bg-green-500" : "bg-red-500"
//             }`}
//           />
//           {callStarted ? "Connected..." : "Not Connected"}
//         </h2>
//         <h2 className="font-bold text-xl text-gray-400">00:00</h2>
//       </div>
//       {sessionDetails && (
//         <div className="flex flex-col items-center mt-10">
//           <Image
//             src={sessionDetails?.selectedDoctor?.image}
//             alt={sessionDetails?.selectedDoctor?.specialist ?? ""}
//             height={120}
//             width={120}
//             className="h-[100px] w-[100px] object-cover rounded-full"
//           />
//           <h2 className="mt-2 text-lg">
//             {sessionDetails?.selectedDoctor?.specialist}
//           </h2>
//           <p className="text-sm text-gray-400">AI Medical Voice Agent</p>
//           <div className="mt-32 overflow-y-auto">
//             {message?.map((msg: messages, index) => (
//               <h2 className="text-gray-400" key={index}>
//                 {msg.role} : {msg.text}
//               </h2>
//             ))}
//             {liveTranscript && liveTranscript?.length > 0 && (
//               <h2 className="text-lg">
//                 {currentRoll} : {liveTranscript}
//               </h2>
//             )}
//           </div>
//           {!callStarted ? (
//             <Button className="mt-20" onClick={StartCall}>
//               {" "}
//               <PhoneCall /> Start Call
//             </Button>
//           ) : (
//             <Button variant="destructive" onClick={endCall}>
//               <PhoneOff /> Disconnect
//             </Button>
//           )}
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
import { Circle, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import Provider from "@/app/provider";

type SessionDetail = {
  id: number;
  notes: string;
  createdOn: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
};

type messages = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const {sessionId} = useParams()
  const [sessionDetails, setSessionDetails] = useState<SessionDetail>()
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRole, setCurrentRole] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [message, setMessage] = useState<messages[]>([]);


  useEffect(() => {
    sessionId && GetSessionDetails();
  },[sessionId]);

  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId="+sessionId);
    console.log("session details =>", result.data);
    setSessionDetails(result.data);
  }

  const StartCall = () => {
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
  setVapiInstance(vapi);
  vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);
  vapi.on('call-start', () => {console.log('Call started')
    setCallStarted(true);
  });
vapi.on('call-end', () => {console.log('Call ended')
    setCallStarted(false);
});
vapi.on('message', (message) => {
  if (message.type === 'transcript') {
    const { role, transcript, transcriptType } = message;
    console.log(`${message.role}: ${message.transcript}`);
    if(transcriptType == 'partial') {
    setLiveTranscript(transcript);
    setCurrentRole(role);
    }
    else if(transcriptType == 'final') {
      setMessage((prev: any) => [...prev, {role: role, text: transcript}]);
      setLiveTranscript("");
      setCurrentRole(null);
    }
  }
});
 vapiInstance.on('speech-start', () => {
      console.log('Assistant started speaking');
      setCurrentRole("assistant");
    });
    vapiInstance.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setCurrentRole("user");
    });
  }
    const endCall = () => {
    if (!vapiInstance) return;
      vapiInstance.stop();
      vapiInstance.off('call-start');
      vapiInstance.off('call-end');
      vapiInstance.off('message');
      setCallStarted(false);
      setVapiInstance(null);
    
  };


  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          {" "}
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected..." : "Not Connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>
      {sessionDetails && (
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
          <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
         
            {message?.slice(-4).map((msg: messages, index) => (
              <h2 className="text-gray-400 p-2" key={index}>
                {msg.role} : {msg.text}
              </h2>
            ))}
            {liveTranscript && liveTranscript?.length > 0 && (
              <h2 className="text-lg">
                {currentRole} : {liveTranscript}
              </h2>
            )}
          </div>
          {!callStarted ? (
            <Button className="mt-20" onClick={StartCall}>
              {" "}
              <PhoneCall /> Start Call
            </Button>
          ) : (
            <Button variant="destructive" onClick={endCall}>
              <PhoneOff /> Disconnect
            </Button>
          )}
        </div>
      )}
    </div>
  );
  

}
export default MedicalVoiceAgent;