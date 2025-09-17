import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faEllipsis,
  faGlobe,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import DefaultLayout from "@/layout/DefaultLayout";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  profile_picture?: string;
  region?: string;
  cv?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  website?: string;
};

const Profile = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user: authUser, isLoggedIn, isLoadingAuth } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoadingAuth) return;

      if (!isLoggedIn || !authUser) {
        setError("Please log in to view your profile.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(`/users/${authUser.userId}`);
        setUserData(response.data);
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "An error occurred while fetching your profile."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn, authUser, isLoadingAuth]);

  const getFileNameFromUrl = (url: string) => {
    try {
      return decodeURIComponent(url).split("/").pop() || "CV Document";
    } catch {
      return "CV Document";
    }
  };

  if (isLoading || isLoadingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          size="3x"
          className="text-gray-400"
        />
      </div>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <div className="min-h-screen bg-white p-8 text-center text-red-600">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <>
      <Head>
        <title>
          {userData
            ? `${userData.first_name} ${userData.last_name}'s Profile`
            : "Profile"}
        </title>
      </Head>
      <DefaultLayout>
        <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8 font-sans">
          <div className="max-w-2xl mx-auto">
            <header className="flex justify-end mb-6">
              <button className="bg-white text-sm font-medium text-gray-200 py-2 px-4 border border-gray-400 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Edit Profile
              </button>
            </header>

            <main className="space-y-8">
              <div className="bg-white rounded-lg border border-gray-400 p-6">
                <div className="flex items-start space-x-5">
                  <img
                    src={
                      userData?.profile_picture ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        userData?.first_name || "N"
                      )}+${encodeURIComponent(
                        userData?.last_name || "A"
                      )}&size=96&background=f1f5f9&color=0f172a`
                    }
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="flex-grow">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {userData?.first_name} {userData?.last_name}
                    </h1>
                    <p className="text-gray-500 mt-1">{userData?.region}</p>
                    <div className="flex items-center space-x-2 mt-4">
                      {userData?.github && (
                        <a
                          href={userData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                          <FontAwesomeIcon
                            icon={faGithub}
                            className="text-gray-600 h-4 w-4"
                          />
                        </a>
                      )}
                      {userData?.linkedin && (
                        <a
                          href={userData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                          <FontAwesomeIcon
                            icon={faLinkedin}
                            className="text-gray-600 h-4 w-4"
                          />
                        </a>
                      )}
                      {userData?.portfolio && (
                        <a
                          href={userData.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                          <FontAwesomeIcon
                            icon={faGlobe}
                            className="text-gray-600 h-4 w-4"
                          />
                        </a>
                      )}
                      {userData?.website && (
                        <a
                          href={userData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200"
                        >
                          <FontAwesomeIcon
                            icon={faGlobe}
                            className="text-gray-600 h-4 w-4"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {userData?.cv && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-200">
                    Documents
                  </h2>
                  <div className="bg-white rounded-lg border border-gray-400 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          className="text-gray-600 h-5 w-5"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-200 text-sm">
                          {getFileNameFromUrl(userData.cv)}
                        </p>
                        <p className="text-sm text-gray-200">CV</p>
                      </div>
                    </div>
                    <button className="text-gray-200 hover:text-gray-700">
                      <FontAwesomeIcon icon={faEllipsis} className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-100">Details</h2>
                <div className="bg-white rounded-lg border border-gray-400">
                  <div className="p-4 border-b border-gray-400">
                    <p className="text-xs text-gray-200">Email</p>
                    <p className="text-sm font-medium text-gray-800">
                      {userData?.email}
                    </p>
                  </div>
                  {userData?.phone && (
                    <div className="p-4 border-b border-gray-400">
                      <p className="text-xs text-gray-200">Phone</p>
                      <p className="text-sm font-medium text-gray-800">
                        {userData.phone}
                      </p>
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-xs text-gray-200">Location</p>
                    <p className="text-sm font-medium text-gray-800">
                      {userData?.region}
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Profile;
