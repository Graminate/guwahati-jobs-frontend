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
  faX,
} from "@fortawesome/free-solid-svg-icons";
import DefaultLayout from "@/layout/DefaultLayout";
import Button from "@/components/ui/Button";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";
import TextField from "@/components/ui/TextField";
import axiosInstance from "@/utils/axiosInstance";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
  profile_picture?: string;
  region?: string;
  cv?: string;
  linkedin?: string;
  github?: string;
  behance?: string;
  portfolio?: string;
};

const Profile = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const { user: authUser, isLoggedIn, isLoadingAuth } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phoneCountryCode: "",
    phoneNumber: "",
    profile_picture: "",
    region: "",
    cv: "",
  });

  const [linksFormData, setLinksFormData] = useState({
    linkedin: "",
    github: "",
    behance: "",
    portfolio: "",
  });

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
        const response = await axiosInstance.get(`/users/${authUser.userId}`);

        const data: User = response.data;
        setUserData(data);

        const phoneParts = data.phone_number?.split(" ") || ["+49", ""];
        setFormData({
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phoneCountryCode: phoneParts[0] || "+49",
          phoneNumber: phoneParts.slice(1).join(" ") || "",
          profile_picture: data.profile_picture || "",
          region: data.region || "",
          cv: data.cv || "",
        });

        setLinksFormData({
          linkedin: data.linkedin || "",
          github: data.github || "",
          behance: data.behance || "",
          portfolio: data.portfolio || "",
        });
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [isLoggedIn, authUser, isLoadingAuth]);

  const handleEditClick = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    if (userData) {
      const phoneParts = userData.phone_number?.split(" ") || ["+49", ""];
      setFormData({
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        phoneCountryCode: phoneParts[0] || "+49",
        phoneNumber: phoneParts.slice(1).join(" ") || "",
        profile_picture: userData.profile_picture || "",
        region: userData.region || "",
        cv: userData.cv || "",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.put(`/users/${authUser?.userId}`, {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number:
          `${formData.phoneCountryCode} ${formData.phoneNumber}`.trim(),
        profile_picture: formData.profile_picture || null,
        region: formData.region || null,
        cv: formData.cv || null,
      });

      const updatedUser = response.data;
      setUserData(updatedUser);
      setIsEditing(false);
    } catch (err: any) {
      console.error("Error updating user:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLinks = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.put(`/users/${authUser?.userId}`, {
        linkedin: linksFormData.linkedin || null,
        github: linksFormData.github || null,
        behance: linksFormData.behance || null,
        portfolio: linksFormData.portfolio || null,
      });

      const updatedUser = response.data;
      setUserData(updatedUser);
      setIsEditingLinks(false);
    } catch (err: any) {
      console.error("Error updating links:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update professional links"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the component remains the same ...
  if (isLoadingAuth) {
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
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                Candidate Profile
              </h1>
              <p className="text-gray-600">
                Stand out against other candidates. Enrich your applications
                with your profile.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow lg:w-2/3 space-y-8">
                {isEditing ? (
                  <div className="bg-white rounded-lg shadow p-6 relative">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      Update Profile
                    </h2>
                    <div className="mb-5">
                      <div className="relative flex flex-col items-center my-2 w-20 h-20">
                        <img
                          src={
                            formData.profile_picture ||
                            `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                              userData?.first_name || "N"
                            )}+${encodeURIComponent(
                              userData?.last_name || "A"
                            )}&size=250&background=e0e7ff&color=4f46e5`
                          }
                          alt="Profile"
                          className="w-20 h-20 rounded-full mr-3 border border-indigo-200 flex-shrink-0"
                        />
                      </div>
                      <input
                        id="profile-picture-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                setFormData((prev) => ({
                                  ...prev,
                                  profile_picture: event.target
                                    ?.result as string,
                                }));
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Button
                        text="Update"
                        style="ghost"
                        type="button"
                        onClick={() =>
                          document
                            .getElementById("profile-picture-upload")
                            ?.click()
                        }
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <TextField
                          label="Email Address"
                          type="email"
                          value={formData.email}
                          onChange={(value) =>
                            handleChange({
                              target: { name: "email", value },
                            } as React.ChangeEvent<HTMLInputElement>)
                          }
                          placeholder="you@example.com"
                          isRequired
                          name="email"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <TextField
                            label="First Name"
                            type="text"
                            value={formData.first_name}
                            onChange={(value) =>
                              handleChange({
                                target: { name: "first_name", value },
                              } as React.ChangeEvent<HTMLInputElement>)
                            }
                            placeholder="John"
                            name="first_name"
                            isDisabled={true}
                          />
                        </div>

                        <div>
                          <TextField
                            label="Last Name"
                            type="text"
                            value={formData.last_name}
                            onChange={(value) =>
                              handleChange({
                                target: { name: "last_name", value },
                              } as React.ChangeEvent<HTMLInputElement>)
                            }
                            placeholder="Doe"
                            name="last_name"
                            isDisabled={true}
                          />
                        </div>
                      </div>

                      <div>
                        <TextField
                          label="Phone Number"
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(value) =>
                            handleChange({
                              target: { name: "phoneNumber", value },
                            } as React.ChangeEvent<HTMLInputElement>)
                          }
                          placeholder="Enter your phone number"
                          width="large"
                        />
                      </div>

                      <div>
                        <TextField
                          label="Region"
                          type="text"
                          value={formData.region}
                          onChange={(value) =>
                            handleChange({
                              target: { name: "region", value },
                            } as React.ChangeEvent<HTMLInputElement>)
                          }
                          placeholder="Enter your region"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <Button
                        style="secondary"
                        text="Cancel"
                        onClick={handleCancel}
                      />
                      <Button
                        style="primary"
                        text="Save Changes"
                        onClick={handleSave}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow p-6 relative">
                    <div
                      className="absolute top-4 right-4 text-indigo-200 cursor-pointer hover:text-indigo-400"
                      onClick={handleEditClick}
                    >
                      <FontAwesomeIcon icon={faPencil} className="size-5" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                      Profile
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                      <div className="flex flex-col text-center gap-2">
                        <div className="relative w-20 h-20 inline-block">
                          <img
                            src={
                              userData?.profile_picture ||
                              `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                                userData?.first_name || "N"
                              )}+${encodeURIComponent(
                                userData?.last_name || "A"
                              )}&size=250&background=e0e7ff&color=4f46e5`
                            }
                            alt="Profile"
                            className="w-20 h-20 rounded-full mr-3 border border-indigo-200 flex-shrink-0"
                          />
                        </div>
                        <input
                          id="profile-picture-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              console.log("Selected profile picture:", file);
                              // Handle file upload here
                            }
                          }}
                        />
                        <Button
                          text="Update"
                          style="ghost"
                          type="button"
                          onClick={() =>
                            document
                              .getElementById("profile-picture-upload")
                              ?.click()
                          }
                        />
                      </div>

                      <div className="flex-grow text-center sm:text-left">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {userData?.first_name} {userData?.last_name}
                        </h3>
                        <div className="space-y-2 text-gray-600">
                          {userData?.region && (
                            <div className="flex items-center justify-center sm:justify-start">
                              <FontAwesomeIcon
                                icon={faMapMarkedAlt}
                                className="mr-2 text-gray-400"
                              />
                              <span>{userData.region}</span>
                            </div>
                          )}
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
                )}

                {/* Add CV section here */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    CV
                  </h2>
                  <p className="text-gray-600 mb-6 text-sm">
                    This CV will by default be used for your future
                    applications. Of course, you will always have the option to
                    upload another CV during each application process.
                  </p>

                  {userData?.cv ? (
                    <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <FontAwesomeIcon
                          icon={faPaperclip}
                          className="h-10 w-10 text-gray-400"
                        />
                        <div>
                          <a
                            href={userData.cv}
                            className="font-medium text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View CV
                          </a>
                          <p className="text-xs">
                            .doc, .docx, .pdf, .rtf, .txt
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          document.getElementById("cv-upload")?.click()
                        }
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-400"
                      >
                        Replace file
                      </button>
                      <input
                        id="cv-upload"
                        type="file"
                        accept=".doc,.docx,.pdf,.rtf,.txt"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            // Handle file upload here
                            const file = e.target.files[0];
                            console.log("Selected file:", file);
                            // You would typically upload this to your backend here
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <FontAwesomeIcon
                          icon={faPaperclip}
                          className="h-10 w-10"
                        />
                        <div>
                          <span className="font-medium text-gray-800">CV</span>
                          <p className="text-xs">
                            .doc, .docx, .pdf, .rtf, .txt
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          document.getElementById("cv-upload")?.click()
                        }
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-400"
                      >
                        Select file
                      </button>
                      <input
                        id="cv-upload"
                        type="file"
                        accept=".doc,.docx,.pdf,.rtf,.txt"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            // Handle file upload here
                            const file = e.target.files[0];
                            console.log("Selected file:", file);
                            // You would typically upload this to your backend here
                          }
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Professional Links section */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Professional links
                    </h2>
                    <FontAwesomeIcon
                      icon={isEditingLinks ? faX : faPencil}
                      className="text-indigo-200 cursor-pointer hover:text-indigo-400 size-5"
                      onClick={() => setIsEditingLinks(!isEditingLinks)}
                    />
                  </div>

                  {isEditingLinks ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-600 mb-1">
                          LinkedIn
                          <span className="text-xs bg-gray-400 px-2 py-1 rounded-full ml-2">
                            Optional
                          </span>
                        </p>
                        <TextField
                          value={linksFormData.linkedin}
                          onChange={(value) =>
                            setLinksFormData((prev) => ({
                              ...prev,
                              linkedin: value,
                            }))
                          }
                          placeholder="Enter LinkedIn URL"
                        />
                      </div>

                      <div>
                        <p className="text-gray-600 mb-1">
                          GitHub
                          <span className="text-xs bg-gray-400 px-2 py-1 rounded-full ml-2">
                            Optional
                          </span>
                        </p>
                        <TextField
                          value={linksFormData.github}
                          onChange={(value) =>
                            setLinksFormData((prev) => ({
                              ...prev,
                              github: value,
                            }))
                          }
                          placeholder="Enter GitHub URL"
                        />
                      </div>

                      <div>
                        <p className="text-gray-600 mb-1">
                          Behance
                          <span className="text-xs bg-gray-400 px-2 py-1 rounded-full ml-2">
                            Optional
                          </span>
                        </p>
                        <TextField
                          value={linksFormData.behance}
                          onChange={(value) =>
                            setLinksFormData((prev) => ({
                              ...prev,
                              behance: value,
                            }))
                          }
                          placeholder="Enter Behance URL"
                        />
                      </div>

                      <div>
                        <p className="text-gray-600 mb-1">
                          Portfolio
                          <span className="text-xs bg-gray-400 px-2 py-1 rounded-full ml-2">
                            Optional
                          </span>
                        </p>
                        <TextField
                          value={linksFormData.portfolio}
                          onChange={(value) =>
                            setLinksFormData((prev) => ({
                              ...prev,
                              portfolio: value,
                            }))
                          }
                          placeholder="Enter Portfolio URL"
                        />
                      </div>

                      <div className="flex justify-end space-x-3 mt-6">
                        <button
                          onClick={() => setIsEditingLinks(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <Button
                          style="primary"
                          text="Save changes"
                          onClick={handleSaveLinks}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userData?.linkedin && (
                        <div>
                          <p className="text-gray-600">LinkedIn</p>
                          <a
                            href={userData.linkedin}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {userData.linkedin}
                          </a>
                        </div>
                      )}

                      {userData?.github && (
                        <div>
                          <p className="text-gray-600">GitHub</p>
                          <a
                            href={userData.github}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {userData.github}
                          </a>
                        </div>
                      )}

                      {userData?.behance && (
                        <div>
                          <p className="text-gray-600">Behance</p>
                          <a
                            href={userData.behance}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {userData.behance}
                          </a>
                        </div>
                      )}

                      {userData?.portfolio && (
                        <div>
                          <p className="text-gray-600">Portfolio</p>
                          <a
                            href={userData.portfolio}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {userData.portfolio}
                          </a>
                        </div>
                      )}

                      {!userData?.linkedin &&
                        !userData?.github &&
                        !userData?.behance &&
                        !userData?.portfolio && (
                          <p className="text-gray-400">
                            No professional links provided
                          </p>
                        )}
                    </div>
                  )}
                </div>
              </div>

              {/* Completeness section */}
              <div className="lg:w-1/3 order-first lg:order-last">
                <div className="bg-indigo-200 rounded-lg shadow p-5 text-white">
                  <h2 className="text-lg font-semibold mb-4">Completeness</h2>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 rounded-md bg-blue-700">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-white mr-3 flex-shrink-0"
                      />
                      <span className="text-sm font-medium">Profile photo</span>
                    </div>
                    <div className="flex items-center p-3 rounded-md">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="text-white mr-3 flex-shrink-0"
                      />
                      <span className="text-sm font-medium">Add CV</span>
                    </div>
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
