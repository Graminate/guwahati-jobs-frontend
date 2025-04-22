import React, { useState } from "react";
import Head from "next/head";
import DefaultLayout from "@/layout/DefaultLayout";
import JobAlertCard from "@/components/cards/JobAlertCard";
import Button from "@/components/ui/Button";
import router from "next/router";
import Dropdown from "@/components/ui/Dropdown";
import PasswordModal from "@/components/modals/PasswordModal";
import DeleteAccountModal from "@/components/modals/DeletModal";

const CandidateDashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [isPasswordModalOpen, setIsPasswordModalOpen] =
    useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleSaveChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement logic to save the selected language
  };

  const handlePasswordSubmit = async (currentPass: string, newPass: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (currentPass === "password123" && newPass.length >= 8) {
      alert("Password changed successfully!");
      handleClosePasswordModal();
    } else {
      console.error("Password change failed (simulation)");
      alert(
        "Failed to change password. Please check your current password and try again."
      );

      throw new Error("Password change failed");
    }
  };

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "de", label: "Hindi" },
    { value: "es", label: "Assamese" },
  ];

  const activeApplications = [
    "Green Fusion GmbH: Fullstack Developer (m/f/d)",
    "Seeker: Software Engineer Backend (all genders)",
    "Pactos: Junior Full-Stack Developer - Graduates (f/m/x)",
    "Golf Post: Frontend Development Working Student in SportsTech Startup",
  ];

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);
  const handleDeleteAccountConfirm = async () => {
    // TODO: Implement actual account deletion API call
    console.log("Attempting to delete account...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Account deleted successfully (simulation)");
    alert("Your account has been deleted.");
    handleCloseDeleteModal();
    router.push("/logout");
  };

  return (
    <>
      <Head>
        <title>Dashboard - Candidate</title>
      </Head>
      <DefaultLayout>
        <div className="min-h-screen bg-gray-50/50 p-5">
          <div className="mx-auto">
            <h1 className="text-3xl font-bold text-black mb-6">Account</h1>
            <div className="flex flex-col gap-4">
              <JobAlertCard />
              <div className="border border-gray-500 rounded-lg shadow-sm bg-white w-full max-w-4xl mx-auto">
                <div className="p-4 md:p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Language
                  </h2>

                  <form onSubmit={handleSaveChanges}>
                    <div className="mb-4">
                      <Dropdown
                        items={languageOptions.map((opt) => opt.label)}
                        selected={
                          languageOptions.find(
                            (opt) => opt.value === selectedLanguage
                          )?.label || ""
                        }
                        onSelect={(item) => {
                          const selectedOption = languageOptions.find(
                            (opt) => opt.label === item
                          );
                          if (selectedOption) {
                            setSelectedLanguage(selectedOption.value);
                          }
                        }}
                        label="Select language"
                        placeholder="Choose a language"
                      />
                    </div>

                    {/* Change Password Link */}
                    <div className="mb-6">
                      <Button
                        text="Change password"
                        style="ghost"
                        type="button"
                        onClick={handleOpenPasswordModal}
                      />
                    </div>
                    <hr className="my-6 border-gray-400" />
                    <div className="flex justify-end space-x-3">
                      <Button
                        text="Cancel"
                        style="secondary"
                        type="button"
                        onClick={() => router.push("/candidate")}
                      />
                      <Button
                        text="Save Changes"
                        style="primary"
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Links section */}
        <div className="border border-gray-500 rounded-lg shadow-sm bg-white w-full max-w-4xl mx-auto">
          <div className="p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Important Links
            </h2>

            <ul className="space-y-2 mb-6">
              <li>
                <Button
                  text="Terms & Conditions"
                  style="ghost"
                  type="button"
                  onClick={() => router.push(`/terms-and-conditions`)}
                />
              </li>
              <li>
                <Button
                  text="Data Privacy Policy"
                  style="ghost"
                  type="button"
                  onClick={() => router.push(`/privacy-policy`)}
                />
              </li>
            </ul>

            <hr className="my-6 border-gray-400" />

            <p className="text-sm text-gray-600">
              If you don't agree with the terms,{" "}
              <button
                type="button"
                onClick={handleOpenDeleteModal}
                className="font-medium text-blue-600 hover:text-blue-700 hover:underline focus:outline-none"
              >
                see your options.
              </button>
            </p>
          </div>
        </div>

        <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={handleClosePasswordModal}
          onSubmit={handlePasswordSubmit}
        />
        <DeleteAccountModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteAccountConfirm}
          activeApplications={activeApplications}
        />
      </DefaultLayout>
    </>
  );
};

export default CandidateDashboard;
