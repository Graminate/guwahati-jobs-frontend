import Button from "@/components/ui/Button";
import DefaultLayout from "@/layout/DefaultLayout";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

const JobRecommendation = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Jobs for you</title>
      </Head>
      <DefaultLayout>
        <div className="flex flex-col bg-white p-4 sm:p-8">
          <h1 className="mb-8 text-2xl font-bold sm:mb-16 sm:text-3xl">
            Jobs for you
          </h1>

          <div className="flex flex-grow flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-500">
              <FontAwesomeIcon
                icon={faFile}
                className="w-8 h-8 text-gray-200"
              />
            </div>

            <h2 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl">
              No jobs to recommend
            </h2>

            <p className="mb-6 max-w-sm text-sm text-gray-600 sm:text-base">
              For job recommendations to appear here you need to create a job
              alert. You can do so in your account settings.
            </p>
            <Button
              type="button"
              text="Create job alert"
              style="secondary"
              onClick={() =>
                router.push("/candidate/settings/account?createAlert=true")
              }
            />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default JobRecommendation;
