import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faEllipsis,
  faFilePdf,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import DefaultLayout from "@/layout/DefaultLayout";
import Button from "@/components/ui/Button";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  profile_picture?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  pin_code?: string;
  cv?: string;
};

const Profile = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user: authUser, isLoggedIn, isLoadingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoadingAuth) return;

      if (!isLoggedIn || !authUser) {
        setError("Please log in to view your profile.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(
          `/job-seeker/${(authUser as any).userId}`
        );
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

  const handleEditProfile = () => {
    router.push("/talent/settings/profile");
  };

  const getFileNameFromUrl = (url: string) => {
    try {
      return decodeURIComponent(url).split("/").pop() || "CV Document";
    } catch {
      return "CV Document";
    }
  };

  const formatAddress = () => {
    if (!userData) return null;
    const parts = [
      userData.address_line_1,
      userData.address_line_2,
      userData.city,
      userData.pin_code,
    ];
    return parts.filter(Boolean).join(", ");
  };
  const fullAddress = formatAddress();

  if (isLoading || isLoadingAuth) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center min-h-screen bg-white">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="3x"
            className="text-gray-400"
          />
        </div>
      </DefaultLayout>
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
              <Button
                text="Edit Profile"
                style="secondary"
                onClick={handleEditProfile}
              />
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
                    {fullAddress && (
                      <p className="text-gray-500 mt-1 flex items-center">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="h-4 w-4 mr-2 text-gray-400"
                        />
                        {fullAddress}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {userData?.cv && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-500">
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
                        <p className="font-medium text-gray-800 text-sm">
                          {getFileNameFromUrl(userData.cv)}
                        </p>
                        <p className="text-sm text-gray-500">CV</p>
                      </div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                      <FontAwesomeIcon icon={faEllipsis} className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-500">Details</h2>
                <div className="bg-white rounded-lg border border-gray-400">
                  <div className="p-4 border-b border-gray-400">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-800">
                      {userData?.email}
                    </p>
                  </div>
                  {userData?.phone_number && (
                    <div className="p-4 border-b border-gray-400">
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-800">
                        {userData.phone_number}
                      </p>
                    </div>
                  )}
                  {fullAddress && (
                    <div className="p-4">
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-800">
                        {fullAddress}
                      </p>
                    </div>
                  )}
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
