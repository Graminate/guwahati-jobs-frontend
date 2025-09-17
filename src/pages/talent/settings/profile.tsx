import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import SettingsLayout from "@/layout/SettingsLayout";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

type UserSettings = {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  linkedin: string;
  github: string;
  avatar: string | null;
};

const mockUserData: UserSettings = {
  firstName: "Borneel Bikash",
  lastName: "Phukan",
  country: "Germany",
  email: "borneelphukan@gmail.com",
  phoneCode: "+49",
  phoneNumber: "17671259396",
  linkedin: "https://www.linkedin.com/in/borneelphukan/",
  github: "https://github.com/borneelphukan",
  avatar: `https://ui-avatars.com/api/?name=Borneel+Phukan&size=128&background=f1f5f9&color=0f172a`,
};

const countries = ["Germany", "United States", "United Kingdom", "India"];
const phoneCodes = ["+49", "+1", "+44", "+91"];

const ProfileSettingsPage = () => {
  const [formData, setFormData] = useState<UserSettings>(mockUserData);
  const [initialData, setInitialData] = useState<UserSettings>(mockUserData);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setIsDirty(JSON.stringify(formData) !== JSON.stringify(initialData));
  }, [formData, initialData]);

  const handleFieldChange =
    (fieldName: keyof UserSettings) => (value: string) => {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDirty) {
      console.log("Saving data:", formData);
      setInitialData(formData);
    }
  };

  return (
    <SettingsLayout isDirty={isDirty} handleSubmit={handleSubmit}>
      <div className="space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            General information
          </h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={formData.avatar || ""}
                alt="Avatar"
                className="h-16 w-16 rounded-full"
              />
              <Button text="Upload Avatar" style="secondary" />
              <button type="button">
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-gray-400 hover:text-gray-600"
                />
              </button>
            </div>
            <p className="text-xs text-gray-500 ml-20 -mt-2">
              PNG or JPEG, at least 225x225px, max 10 Mb
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                label="First name"
                id="firstName"
                value={formData.firstName}
                onChange={handleFieldChange("firstName")}
              />
              <TextField
                label="Last name"
                id="lastName"
                value={formData.lastName}
                onChange={handleFieldChange("lastName")}
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country of residence
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleSelectChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <TextField
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={() => {}}
              isReadOnly
              inputClassName="bg-gray-400 cursor-not-allowed"
            />

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone number
              </label>
              <div className="flex">
                <select
                  id="phoneCode"
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleSelectChange}
                  className="rounded-l-md border-r-0 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {phoneCodes.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <TextField
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleFieldChange("phoneNumber")}
                  className="flex-1"
                  inputClassName="rounded-l-none"
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Professional links
          </h2>
          <div className="space-y-6">
            <TextField
              label="LinkedIn"
              id="linkedin"
              value={formData.linkedin}
              onChange={handleFieldChange("linkedin")}
              icon={
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-gray-400 h-4 w-4"
                />
              }
            />
            <TextField
              label="Github"
              id="github"
              value={formData.github}
              onChange={handleFieldChange("github")}
              icon={
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-gray-400 h-4 w-4"
                />
              }
            />
          </div>
        </section>
      </div>
    </SettingsLayout>
  );
};

export default ProfileSettingsPage;
