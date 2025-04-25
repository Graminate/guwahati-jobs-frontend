import React from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import DefaultLayout from "@/layout/DefaultLayout";
import Button from "@/components/ui/Button";
import Head from "next/head";

const candidateData = {
  name: "Borneel Bikash Phukan",
  location: "Germany",
  email: "borneelphukan@gmail.com",
  phone: "+4917671259396",
  profileImageUrl: "/placeholder-profile.jpg",
  cvUploaded: false,
  professionalLinksAdded: true,
};

const Profile = () => {
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

  return (
    <>
      <Head>Profile</Head>
      <DefaultLayout>
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                Candidate Profile
              </h1>
              <p className="text-gray-600">
                Stand out against other candidates. Enrich your applications
                with your JOIN profile.
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
                            "First"
                          )}+${encodeURIComponent(
                            "Last"
                          )}&size=250&background=e0e7ff&color=4f46e5`}
                          height={200}
                          width={200}
                          alt="Profile"
                          className="w-20 h-20 rounded-full mr-3 border border-indigo-200 flex-shrink-0"
                        />

                        <div className="absolute bottom-1 -right-1 bg-indigo-200 hover:bg-indigo-100 text-white rounded-full p-1">
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
                        {candidateData.name}
                      </h3>
                      <div className="space-y-2 text-gray-600">
                        <div className="flex items-center justify-center sm:justify-start">
                          <FontAwesomeIcon
                            icon={faMapMarkedAlt}
                            className="mr-2 text-gray-400"
                          />

                          <span>{candidateData.location}</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="mr-2 text-gray-400"
                          />

                          <a
                            href={`mailto:${candidateData.email}`}
                            className="hover:text-blue-600"
                          >
                            {candidateData.email}
                          </a>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start">
                          <FontAwesomeIcon
                            icon={faPhone}
                            className="mr-2 text-gray-400"
                          />

                          <a
                            href={`tel:${candidateData.phone}`}
                            className="hover:text-blue-600"
                          >
                            {candidateData.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                        className="text-gray-500 size-20"
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
              </div>
              <div className="lg:w-1/3 order-first lg:order-last">
                <div className="bg-indigo-200 rounded-lg shadow p-5 text-white">
                  <h2 className="text-lg font-semibold mb-4">Completeness</h2>
                  <div className="space-y-2">
                    {renderCompletenessItem("Profile photo", true)}
                    {renderCompletenessItem(
                      "Add CV",
                      candidateData.cvUploaded,
                      true
                    )}

                    {renderCompletenessItem(
                      "Professional links",
                      candidateData.professionalLinksAdded
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
