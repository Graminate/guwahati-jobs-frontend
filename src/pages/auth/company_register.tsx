import React, { useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

import { industryOptions } from "@/constants/enums";

type CompanyRegisterFormData = {
  companyName: string;
  websitePrefix: string;
  websiteDomain: string;
  headquarters: string;
  selectedIndustry?: string;
};

const PlaceholderLogo = ({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) => (
  <div
    className={`flex items-center justify-center h-8 text-gray-300 text-xs rounded ${className}`}
  >
    {name}
  </div>
);

const TestimonialSection = () => (
  <figure className="mt-8 rounded-lg bg-gray-50 p-6 shadow-sm">
    <blockquote className="text-base text-gray-700">
      <p>
        Guwahati-jobs is great to use! We have a much larger amount of
        candidates. Guwahati-jobs fits seamlessly into our process and is a
        unique and efficient candidate generation tool, giving us access to
        highly relevant job boards we didn't know before and at the same time
        reducing enormously our effort in recruiting.”
      </p>
    </blockquote>
    <figcaption className="mt-4 flex items-center space-x-3">
      <PlaceholderLogo
        name="Adidas"
        className="h-10 w-10 rounded-full flex-shrink-0"
      />
      <div className="flex-1">
        <div className="font-semibold text-gray-900">Sven Hinrichs</div>
        <div className="text-sm">Senior Manager Sports Marketing UEFA</div>
      </div>
    </figcaption>
  </figure>
);

const TrustedCompanies = () => {
  const companies = [
    "company 1",
    "company 2",
    "company 3",
    "company 4",
    "company 5",
    "company 6",
    "company 7",
    "company 8",
  ];

  return (
    <div className="mt-10">
      <p className="text-center text-sm font-medium">
        Trusted by over 80,000 companies
      </p>
      <div className="mt-5 grid grid-cols-3 items-center justify-items-center gap-x-6 gap-y-6 sm:grid-cols-4 lg:gap-x-8">
        {companies.map((company) => (
          <PlaceholderLogo
            key={company}
            name={company}
            className="grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition"
          />
        ))}
      </div>
    </div>
  );
};

const CompanyRegisterForm = ({
  formData,
  onFormDataChange,
  onSubmit,
}: {
  formData: CompanyRegisterFormData;
  onFormDataChange: (
    field: keyof CompanyRegisterFormData,
    value: string
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const handleIndustrySelect = (item: string) => {
    const selectedOption = industryOptions.find((opt) => opt.label === item);
    if (selectedOption) {
      onFormDataChange("selectedIndustry", selectedOption.value);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
      <div>
        <TextField
          label="Company Name"
          value={formData.companyName}
          onChange={(value) => onFormDataChange("companyName", value)}
          placeholder="Guwahati-Jobs"
          isRequired
          name="company_name"
        />
      </div>

      <div className="mt-1 flex rounded-md shadow-sm">
        <TextField
          label="Company Website (Optional)"
          value={formData.websiteDomain}
          onChange={(value) => onFormDataChange("websiteDomain", value)}
          placeholder="Company Website"
          name="company_website"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="company-hq"
            className="block text-sm font-medium text-gray-700"
          >
            Where is your company headquartered?{" "}
            <span className="text-red-500">*</span>
          </label>
        </div>
        <input
          type="text"
          name="company-hq"
          id="company-hq"
          required
          placeholder="Search the address"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={formData.headquarters}
          onChange={(e) => onFormDataChange("headquarters", e.target.value)}
        />
      </div>

      <div>
        <Dropdown
          items={industryOptions.map((opt) => opt.label)}
          selected={
            industryOptions.find(
              (opt) => opt.value === formData.selectedIndustry
            )?.label || ""
          }
          onSelect={handleIndustrySelect}
          label="What industry is your company in?"
          placeholder="Search industries"
        />
      </div>

      <div className="flex flex-col">
        <Button text="Continue" style="primary" type="submit" />
      </div>

      <p className="text-center text-sm">
        Already have a recruiter account?{" "}
        <a
          href="/auth/company_login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Log in
        </a>
      </p>
    </form>
  );
};

export default function CompanyRegister() {
  const [formData, setFormData] = useState<CompanyRegisterFormData>({
    companyName: "",
    websitePrefix: "https://",
    websiteDomain: "",
    headquarters: "",
    selectedIndustry: undefined,
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Registration submitted:", {
      companyName: formData.companyName,
      website: formData.websitePrefix + formData.websiteDomain,
      headquarters: formData.headquarters,
      industry: formData.selectedIndustry,
    });
  };

  const handleFormDataChange = (
    field: keyof CompanyRegisterFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
          <div className="lg:py-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome! Let's get started
            </h1>
            <p className="mt-2 text-base text-gray-600">
              To create your free account, we just need a few details.
            </p>
            <CompanyRegisterForm
              formData={formData}
              onFormDataChange={handleFormDataChange}
              onSubmit={handleFormSubmit}
            />
          </div>

          <div className="mt-10 lg:mt-0">
            <div className="text-left">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Join over <span className="text-blue-600">100 companies</span>{" "}
                countrywide who hire faster using Guwahati-Jobs.
              </h2>
              <TestimonialSection />
              <TrustedCompanies />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
