import React, { useState } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import DefaultLayout from "@/layout/DefaultLayout";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import ApplicationsCard from "@/components/cards/ApplicationsCard";

type ApplicationStatus =
  | "Submitted"
  | "In Review"
  | "Selected"
  | "Unavailable";
type ActiveTab = "jobApplications" | "spontaneousApplications";

interface JobApplication {
  id: string;
  logo: string | React.ReactNode;
  title: string;
  company: string;
  status: ApplicationStatus;
  appliedDate: string;
  isLogoComponent?: boolean;
}

const sampleJobApplications: JobApplication[] = [
  {
    id: "1",
    logo: "/logos/green-fusion.png",
    title: "Fullstack Developer (m/f/d)",
    company: "Green Fusion GmbH",
    status: "Submitted",
    appliedDate: "04/12/2025",
  },
];

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("jobApplications");

  return (
    <>
      <Head>
        <title>Dashboard - Candidate</title>
      </Head>
      <DefaultLayout>
        <div className="min-h-screen bg-gray-50/50 p-5">
          <div className="mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

            {/* Toggle Bar */}
            <ToggleSwitch
              options={[
                { value: "jobApplications", label: "Job Applications" },
                {
                  value: "spontaneousApplications",
                  label: "Spontaneous Applications",
                },
              ]}
              activeTab={activeTab}
              setActiveTab={(value) => setActiveTab(value as ActiveTab)}
            />

            {/* Content Area */}
            <div className="bg-white shadow-sm rounded-lg">
              {activeTab === "jobApplications" && (
                <div className="divide-y divide-gray-200">
                  {sampleJobApplications.length > 0 ? (
                    sampleJobApplications.map((app) => (
                      <ApplicationsCard
                        app={{
                          id: "1",
                          company: "Tech Corp",
                          title: "Frontend Developer",
                          logo: "/logo.png",
                          isLogoComponent: false,
                          status: "Unavailable",
                          appliedDate: "2023-05-15",
                        }}
                        getStatusBadgeStyle={(status) => {
                          if (status === "Submitted")
                            return "bg-gray-400 text-dark";
                          if (status === "In Review")
                            return "bg-blue-400 text-blue-200";
                          if (status === "Selected")
                            return "bg-green-300 text-green-200";
                          if (status === "Unavailable")
                            return "bg-red-400 text-red-200";
                          return "bg-gray-500 text-dark";
                        }}
                      />
                    ))
                  ) : (
                    <p className="p-6 text-center text-gray-500">
                      No job applications found.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "spontaneousApplications" && (
                <div className="p-10 flex flex-col items-center justify-center text-center min-h-[300px]">
                  <div className="w-16 h-16 mb-4 rounded-full bg-gray-500 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faBook}
                      className="text-3xl text-white"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    You don't have any spontaneous applications
                  </h2>
                  <p className="text-sm text-gray-600 max-w-md">
                    Apply to companies you would like to work for, even when
                    they have no suitable position available. Find the
                    spontaneous application form on the company's career page on
                    JOIN under 'Open Positions'.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default CandidateDashboard;
