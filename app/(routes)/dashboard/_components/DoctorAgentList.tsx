import { AIDoctorsAgent } from "@/shared/list";
import React from "react";
import DoctorAgentCard from "./DoctorAgentCard";

function DoctorAgentList() {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl">AI Spectalist Doctors Agent</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {AIDoctorsAgent.map((doctor, index) => (
          <div key={index}>
            <DoctorAgentCard doctorAgent={doctor} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorAgentList;
