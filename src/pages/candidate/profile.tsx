import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEnvelope,
  faMapMarkedAlt,
  faPaperclip,
  faPencil,
  faPhone,
  faPlus,
  faTrash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import DefaultLayout from "@/layout/DefaultLayout";
import Button from "@/components/ui/Button";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
};

const Profile = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user: authUser, isLoggedIn, isLoadingAuth } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);

      if (isLoadingAuth) return;

      if (!isLoggedIn || !authUser) {
        setError("Please log in to view your profile");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/users/${authUser.userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const data: User = await response.json();
        setUserData(data);
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(err.message || "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn, authUser, isLoadingAuth]);

  const handleSelectFileClick = () => {
    console.log("Select file clicked");
  };

  const renderCompletenessItem = (
    text: string,
    completed: boolean,
    highlighted: boolean = false
  ) => (
    <div
      className={`flex items-center p-3 rounded-md ${
        highlighted ? "bg-blue-700" : ""
      }`}
    >
      {completed ? (
        <FontAwesomeIcon
          icon={faCheck}
          className="text-white mr-3 flex-shrink-0"
        />
      ) : (
        <FontAwesomeIcon
          icon={faPlus}
          className="text-white mr-3 flex-shrink-0"
        />
      )}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );

  if (isLoadingAuth || isLoading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center min-h-screen">
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
          <span className="ml-4 text-xl">Loading Profile...</span>
        </div>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-center text-red-600">
          <h1 className="text-2xl font-bold mb-4">Error loading profile</h1>
          <p>{error}</p>
          {!isLoggedIn && (
            <Button
              text="Go to Login"
              style="primary"
              onClick={() => (window.location.href = "/login")}
            />
          )}
        </div>
      </DefaultLayout>
    );
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <DefaultLayout>
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                {userData?.role === "employee" ? "Candidate" : "Employer"}{" "}
                Profile
              </h1>
              <p className="text-gray-600">
                {userData?.role === "employee"
                  ? "Stand out against other candidates. Enrich your applications with your profile."
                  : "Manage your employer profile and job postings."}
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow lg:w-2/3 space-y-8">
                <div className="bg-white rounded-lg shadow p-6 relative">
                  <div className="absolute top-4 right-4 text-indigo-200 cursor-pointer">
                    <FontAwesomeIcon icon={faPencil} className="size-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Profile
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="flex flex-col text-center gap-2">
                      <div className="relative w-20 h-20 inline-block">
                        <img
                          src={`https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                            userData?.first_name || "N"
                          )}+${encodeURIComponent(
                            userData?.last_name || "A"
                          )}&size=250&background=e0e7ff&color=4f46e5`}
                          alt="Profile"
                          className="w-20 h-20 rounded-full mr-3 border border-indigo-200 flex-shrink-0"
                        />
                        <div className="absolute bottom-1 -right-1 bg-indigo-200 hover:bg-indigo-100 text-white rounded-full p-1 cursor-pointer">
                          <FontAwesomeIcon icon={faTrash} className="w-6 h-4" />
                        </div>
                      </div>
                      <Button
                        text="Update"
                        style="ghost"
                        type="button"
                        onClick={() => {}}
                      />
                    </div>

                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {userData?.first_name} {userData?.last_name}
                      </h3>
                      <div className="space-y-2 text-gray-600">
                        <div className="flex items-center justify-center sm:justify-start">
                          <FontAwesomeIcon
                            icon={faMapMarkedAlt}
                            className="mr-2 text-gray-400"
                          />
                          <span>{/* Location data if available */}</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="mr-2 text-gray-400"
                          />
                          <a
                            href={`mailto:${userData?.email}`}
                            className="hover:text-blue-600"
                          >
                            {userData?.email}
                          </a>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start">
                          <FontAwesomeIcon
                            icon={faPhone}
                            className="mr-2 text-gray-400"
                          />
                          {userData?.phone_number ? (
                            <a
                              href={`tel:${userData.phone_number}`}
                              className="hover:text-blue-600"
                            >
                              {userData.phone_number}
                            </a>
                          ) : (
                            <span>Not provided</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {userData?.role === "employee" && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      CV
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm">
                      This CV will by default be used for your future
                      applications. Of course, you will always have the option
                      to upload another CV during each application process.
                    </p>
                    <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <FontAwesomeIcon
                          icon={faPaperclip}
                          className="text-gray-500 h-10 w-10"
                        />
                        <div>
                          <span className="font-medium text-gray-800">CV</span>
                          <p className="text-xs text-gray-500">
                            .doc, .docx, .pdf, .rtf, .txt
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleSelectFileClick}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Select file
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="lg:w-1/3 order-first lg:order-last">
                <div className="bg-indigo-200 rounded-lg shadow p-5 text-white">
                  <h2 className="text-lg font-semibold mb-4">Completeness</h2>
                  <div className="space-y-2">
                    {renderCompletenessItem("Profile photo", !!userData)}
                    {renderCompletenessItem(
                      "Add CV",
                      false,
                      userData?.role === "employee"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Profile;
