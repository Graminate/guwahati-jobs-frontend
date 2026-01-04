import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import RecruiterSidebar from "@/components/layout/RecruiterSidebar";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";

const ActiveJobsPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <DefaultLayout sidebar={<RecruiterSidebar user={user} />}>
      <div className="p-6 min-h-screen bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold text-gray-900">Active Jobs</h1>
          <Button 
            text="Create job" 
            style="primary" 
            add={true} 
            className="px-4 py-2" 
            onClick={() => router.push("/jobs/new")}
          />
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center mt-40 text-center">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 border border-gray-200 shadow-sm">
            <FontAwesomeIcon icon={faFileLines} className="text-gray-600 text-lg" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Create a job ad</h2>
          <p className="text-gray-200 mb-6 max-w-sm">
            Start by creating a job ad to get candidates.
          </p>
          <Button 
            text="Create job" 
            style="ghost" 
            add={true} 
            className="text-gray-100 hover:bg-gray-400 px-4 py-2"
            onClick={() => router.push("/jobs/new")}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ActiveJobsPage;
