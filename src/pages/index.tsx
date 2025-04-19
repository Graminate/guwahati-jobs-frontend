import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import axiosInstance from "@/utils/axiosInstance";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Job {
  id: number;
  title: string;
  company_name: string;
  location: string;
  employment_type: string;
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/jobs")
      .then((response) => setJobs(response.data))
      .catch((err) => console.error("Failed to fetch jobs:", err));
  }, []);

  return (
    <>
      <Head>
        <title>Guwahati Jobs – Find Your Next Opportunity</title>
        <meta
          name="description"
          content="Search jobs in Guwahati for developers, designers, marketers, and more."
        />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-gray-50 mt-5">
        {/* Hero Section */}
        <section className="bg-white py-20 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find Your Best Career in Guwahati
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Browse thousands of jobs and connect with top companies in the
            region.
          </p>
          <Link
            href="/jobs"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Browse Jobs
          </Link>
        </section>

        {/* Featured Jobs */}
        <section className="py-12 px-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Featured Jobs
          </h2>

          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs posted yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.slice(0, 6).map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <div className="bg-white shadow-md hover:shadow-lg transition rounded-md p-5 cursor-pointer">
                    <h3 className="text-lg font-semibold text-blue-600">
                      {job.title}
                    </h3>
                    <p className="text-gray-700">{job.company_name}</p>
                    <p className="text-sm text-gray-500">
                      {job.location} · {job.employment_type}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
