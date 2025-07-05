import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

export type doctorAgent = {
  id: number;
  specialist: string;
  image: string;
  description: string;
  agentPrompt: number;
};
type props = {
  doctorAgent: doctorAgent;
};

function DoctorAgentCard({ doctorAgent }: props) {
  return (
    <div>
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={300}
        className="w-full h-[250px] object-cover rounded-xl"
      />
      <h2 className="font-bold mt-1">{doctorAgent.specialist}</h2>
      <p className="line-clamp-2 text-sm text-gray-500">
        {doctorAgent.description}
      </p>
      <Button className="w-full m-2">Start Consultation <IconArrowRight /></Button>
    </div>
  );
}

export default DoctorAgentCard;
