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

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
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

        const phoneParts = data.phone_number?.split(" ") || ["+49", ""];
        setFormData({
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phoneCountryCode: phoneParts[0] || "+49",
          phoneNumber: phoneParts.slice(1).join(" ") || "",
        });
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(err.message || "An unknown error occurred");
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
      const response = await fetch(
        `http://localhost:3000/users/${authUser?.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            email: formData.email,
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone_number:
              `${formData.phoneCountryCode} ${formData.phoneNumber}`.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      setIsEditing(false);
    } catch (err: any) {
      console.error("Error updating user:", err);
      setError(err.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

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
                            isRequired
                            name="first_name"
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
                            isRequired
                            name="last_name"
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
                            src={`https://eu.ui-avatars.com/api/?name=${encodeURIComponent(
                              userData?.first_name || "N"
                            )}+${encodeURIComponent(
                              userData?.last_name || "A"
                            )}&size=250&background=e0e7ff&color=4f46e5`}
                            alt="Profile"
                            className="w-20 h-20 rounded-full mr-3 border border-indigo-200 flex-shrink-0"
                          />

                          <div className="absolute bottom-1 -right-1 bg-indigo-200 hover:bg-indigo-100 text-white rounded-full p-1 cursor-pointer">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="w-6 h-4"
                            />
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
                            {/* <span>{formData.region}</span> */}
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
                )}

                {/* Keep existing CV section */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    CV
                  </h2>
                  <p className="text-gray-600 mb-6 text-sm">
                    This CV will by default be used for your future
                    applications. Of course, you will always have the option to
                    upload another CV during each application process.
                  </p>
                  <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <FontAwesomeIcon
                        icon={faPaperclip}
                        className="h-10 w-10"
                      />
                      <div>
                        <span className="font-medium text-gray-800">CV</span>
                        <p className="text-xs">.doc, .docx, .pdf, .rtf, .txt</p>
                      </div>
                    </div>
                    <button
                      onClick={() => console.log("Select file clicked")}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Select file
                    </button>
                  </div>
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
                          <span className=" text-xs bg-gray-400 px-2 py-1 rounded-full">
                            Optional
                          </span>
                        </p>
                        <TextField
                          value=""
                          onChange={() => {}}
                          placeholder="Enter LinkedIn URL"
                        />
                      </div>

                      <div className="pt-4">
                        <p className="text-gray-600 mb-1">
                          GitHub
                          <span className=" text-xs bg-gray-400 px-2 py-1 rounded-full">
                            Optional
                          </span>
                        </p>
                        <TextField
                          value=""
                          onChange={() => {}}
                          placeholder="Enter GitHub URL"
                        />
                      </div>

                      <div className="pt-4">
                        <p className="text-gray-600 mb-1">
                          Behance
                          <span className=" text-xs bg-gray-400 px-2 py-1 rounded-full">
                            Optional
                          </span>
                        </p>
                        <TextField
                          value=""
                          onChange={() => {}}
                          placeholder="Enter Behance URL"
                        />
                      </div>

                      <div className=" pt-4">
                        <p className="text-gray-600 mb-1">
                          Portfolio
                          <span className=" text-xs bg-gray-400 px-2 py-1 rounded-full">
                            Optional
                          </span>
                        </p>
                        <TextField
                          value=""
                          onChange={() => {}}
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
                          onClick={() => setIsEditingLinks(false)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-600">LinkedIn</p>
                        <a
                          href="https://www.linkedin.com/in/borneelphukan/"
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://www.linkedin.com/in/borneelphukan/
                        </a>
                      </div>

                      <div>
                        <p className="text-gray-600">GitHub</p>
                        <a
                          href="https://github.com/borneelphukan"
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://github.com/borneelphukan
                        </a>
                      </div>

                      <div>
                        <p className="text-gray-600">Portfolio</p>
                        <a
                          href="https://borneelphukan.com/Portfolio"
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          https://borneelphukan.com/Portfolio
                        </a>
                      </div>
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
