import React from "react";
import ApplicationCard, {
  JobApplication,
} from "@/components/cards/ApplicationsCard";
import DefaultLayout from "@/layout/DefaultLayout";
import Head from "next/head";

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
  {
    id: "4",
    logo: "/logos/priojet-logo.svg",
    company: "PRIOjet GmbH",
    title: "Software Developer Full Stack (m/f/d)",
    status: "Submitted",
    appliedText: "Applied 20 days ago",
  },
  {
    id: "5",
    logo: "/logos/glorya-logo.svg",
    company: "Glorya GmbH",
    title: "Full Stack Engineer - AI Software Start-up",
    status: "Submitted",
    appliedText: "Applied 28 days ago",
  },
  {
    id: "6",
    logo: "/logos/meister-logo.svg",
    company: "Meister Systems GmbH",
    title: "Softwareentwickler (m/w/d)",
    status: "In Review",
    appliedText: "Applied about 2 months ago",
  },
];

const AllApplicationsPage = () => {
  return (
    <>
      <Head>
        <title>Applications</title>
      </Head>
      <DefaultLayout>
        <div className="bg-white min-h-screen font-sans p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <main>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  All Applications
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applications.map((app) => (
                  <ApplicationCard key={app.id} app={app} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default AllApplicationsPage;
