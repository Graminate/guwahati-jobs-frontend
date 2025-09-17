import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faGlobe,
  faLink,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import SettingsLayout from "@/layout/SettingsLayout";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import Dropdown from "@/components/ui/Dropdown";

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

type OtherLink = {
  id: number;
  label: string;
  url: string;
  icon: any;
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

const initialLinks: OtherLink[] = [
  {
    id: 1,
    label: "Portfolio",
    url: "https://borneelphukan.com/Portfolio",
    icon: faGlobe,
  },
  {
    id: 2,
    label: "Personal website",
    url: "https://borneelphukan.com/",
    icon: faLink,
  },
];

const countries = ["Germany", "United States", "United Kingdom", "India"];
const phoneCodes = ["+49", "+1", "+44", "+91"];

const ProfileSettingsPage = () => {
  const [formData, setFormData] = useState<UserSettings>(mockUserData);
  const [initialData, setInitialData] = useState<UserSettings>(mockUserData);
  const [otherLinks, setOtherLinks] = useState<OtherLink[]>(initialLinks);
  const [initialOtherLinks, setInitialOtherLinks] =
    useState<OtherLink[]>(initialLinks);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const formIsDirty =
      JSON.stringify(formData) !== JSON.stringify(initialData);
    const linksAreDirty =
      JSON.stringify(otherLinks) !== JSON.stringify(initialOtherLinks);
    setIsDirty(formIsDirty || linksAreDirty);
  }, [formData, initialData, otherLinks, initialOtherLinks]);

  const handleFieldChange =
    (fieldName: keyof UserSettings) => (value: string) => {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    };

  const handleDropdownSelect =
    (fieldName: keyof UserSettings) => (value: string) => {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    };

  const handleLinkChange = (id: number, value: string) => {
    setOtherLinks(
      otherLinks.map((link) =>
        link.id === id ? { ...link, url: value } : link
      )
    );
  };

  const handleRemoveLink = (id: number) => {
    setOtherLinks(otherLinks.filter((link) => link.id !== id));
  };

  const handleAddLink = () => {
    const newLink: OtherLink = {
      id: Date.now(),
      label: "Another link",
      url: "",
      icon: faLink,
    };
    setOtherLinks([...otherLinks, newLink]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDirty) {
      console.log("Saving data:", { formData, otherLinks });
      setInitialData(formData);
      setInitialOtherLinks(otherLinks);
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
                  className="text-red-200 hover:text-red-100"
                />
              </button>
            </div>
            <p className="text-xs text-gray-200 ml-20 -mt-2">
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

            <Dropdown
              label="City of Residence"
              items={countries}
              selected={formData.country}
              onSelect={handleDropdownSelect("country")}
            />

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
              <div className="flex items-start space-x-2">
                <Dropdown
                  items={phoneCodes}
                  selected={formData.phoneCode}
                  onSelect={handleDropdownSelect("phoneCode")}
                />
                <TextField
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleFieldChange("phoneNumber")}
                  className="flex-1"
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

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Other links
          </h2>
          <div className="space-y-6">
            {otherLinks.map((link) => (
              <div key={link.id} className="relative">
                <TextField
                  label={link.label}
                  id={`link-${link.id}`}
                  value={link.url}
                  onChange={(value) => handleLinkChange(link.id, value)}
                  icon={
                    <FontAwesomeIcon
                      icon={link.icon}
                      className="text-gray-400 h-4 w-4"
                    />
                  }
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLink(link.id)}
                  className="absolute top-8 right-0 flex items-center pr-3 h-10"
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-gray-400 hover:text-gray-600 h-4 w-4"
                  />
                </button>
              </div>
            ))}
            <Button
              text="Add link"
              style="secondary"
              add={true}
              onClick={handleAddLink}
              width="large"
            />
          </div>
        </section>
      </div>
    </SettingsLayout>
  );
};

export default ProfileSettingsPage;
