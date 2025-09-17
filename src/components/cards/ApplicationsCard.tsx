import React from "react";
import Image from "next/image";

export type ApplicationStatus = "Submitted" | "In Review";

export interface JobApplication {
  id: string;
  logo: string;
  company: string;
  title: string;
  status: ApplicationStatus;
  appliedText: string;
}

const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
  const baseStyle = "px-3 py-1 text-xs font-medium rounded-full";
  let specificStyle = "";

  if (status === "Submitted") {
    specificStyle = " border border-gray-300 text-gray-700";
  } else if (status === "In Review") {
    specificStyle = " border border-gray-300 text-gray-800";
  }

  return <span className={`${baseStyle} ${specificStyle}`}>{status}</span>;
};

const ApplicationCard = ({ app }: { app: JobApplication }) => (
  <div className="bg-white border border-gray-400 rounded-xl p-5 flex flex-col h-full min-h-[180px] shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 relative">
        <Image
          src={app.logo}
          alt={`${app.company} logo`}
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />
      </div>
      <StatusBadge status={app.status} />
    </div>
    <div className="flex-grow">
      <h3 className="font-semibold text-gray-800">{app.company}</h3>
      <p className="text-sm text-gray-200">{app.title}</p>
    </div>
    <div className="flex justify-between items-center mt-4">
      <p className="text-xs text-gray-200">{app.appliedText}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>
);

export default ApplicationCard;
