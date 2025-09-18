import React, { useState, useEffect } from "react";
import ApplicationCard, {
  JobApplication,
} from "@/components/cards/ApplicationsCard";
import DefaultLayout from "@/layout/DefaultLayout";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/context/AuthContext";

const applications: JobApplication[] = [
  {
    id: "1",
    logo: "/logos/priojet-logo.svg",
    company: "PRIOjet GmbH",
    title: "Software Developer Full Stack (m/f/d)",
    status: "Submitted",
    appliedText: "Applied 20 days ago",
  },
  {
    id: "2",
    logo: "/logos/glorya-logo.svg",
    company: "Glorya GmbH",
    title: "Full Stack Engineer - AI Software Start-up",
    status: "Submitted",
    appliedText: "Applied 28 days ago",
  },
  {
    id: "3",
    logo: "/logos/meister-logo.svg",
    company: "Meister Systems GmbH",
    title: "Softwareentwickler (m/w/d)",
    status: "In Review",
    appliedText: "Applied about 2 months ago",
  },
];

const TalentPage = () => {
  const [firstName, setFirstName] = useState("User");
  const { user: authUser, isLoadingAuth } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoadingAuth || !authUser) {
        return;
      }

      try {
        const response = await axiosInstance.get(
          `/job-seeker/${authUser.userId}`
        );

        if (response.data && response.data.first_name) {
          setFirstName(response.data.first_name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [authUser, isLoadingAuth]);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <DefaultLayout>
      <div className="bg-white min-h-screen font-sans p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10">
            <p className="text-md text-gray-200">{currentDate}</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">
              {getGreeting()}, {firstName}
            </h1>
          </header>

          <main>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Applications
              </h2>
              <a
                href="/talent/applications"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                See all &gt;
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {applications.slice(0, 4).map((app) => (
                <ApplicationCard key={app.id} app={app} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TalentPage;
