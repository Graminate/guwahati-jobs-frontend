import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faXmark,
  faBuilding,
  faPlus,
  faCamera,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import Dropdown from "@/components/ui/Dropdown";
import TextArea from "@/components/ui/TextArea";

const CompanyDetailsPage = () => {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("Graminate");
  const [website, setWebsite] = useState("24faw.com");
  const [employees, setEmployees] = useState("");
  const [industry, setIndustry] = useState("");
  const [country] = useState("India");
  const [about, setAbout] = useState("");
  const [mission, setMission] = useState("");
  const [benefits, setBenefits] = useState("");
  const [values, setValues] = useState("");
  const [isDeletionExpanded, setIsDeletionExpanded] = useState(false);

  const initialData = {
    companyName: "Graminate",
    website: "24faw.com",
    employees: "",
    industry: "",
  };

  const hasChanges = 
    companyName !== initialData.companyName ||
    website !== initialData.website ||
    employees !== initialData.employees ||
    industry !== initialData.industry;

  const sidebarItems = [
    { label: "Company Details", active: true },
    { label: "Career Page", active: false },
    { label: "Social Sharing", active: false },
    { label: "Offices", active: false },
    { label: "Pipelines", active: false },
    { label: "Email Templates", active: false },
    { label: "Scorecards", active: false },
    { label: "Team", active: false },
    { label: "Billing", active: false },
    { label: "Job Widget", active: false },
    { label: "Integrations", active: false },
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Settings Sidebar */}
      <aside className="w-72 flex flex-shrink-0 flex-col pt-6 bg-gray-50">
        <div className="px-6 mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>
        </div>

        <div className="px-6 mb-4">
          <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          <div className="px-3 mb-2 flex items-center space-x-2 text-xs font-bold uppercase tracking-wider mt-4">
            <FontAwesomeIcon icon={faBuilding} className="w-3 h-3" />
            <span>Graminate</span>
          </div>
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.label === "Company Details") router.push("/settings/company/details");
                if (item.label === "Career Page") router.push("/settings/company/career-page");
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-white bg-gray-300"
                  : "text-gray-600 hover:bg-gray-400"
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs font-medium">
                <FontAwesomeIcon icon={faBuilding} className="w-3 h-3" />
                <span>Graminate</span>
                <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Company Details</h1>
            </div>
            <Button 
              text="Save Changes" 
              style={hasChanges ? "primary" : "secondary"} 
              isDisabled={!hasChanges} 
            />
          </div>

          <div className="space-y-12">
            {/* Company Logo Section */}
            <section className="space-y-6">
              <h3 className="text-lg">Company logo</h3>
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCamera} className="w-6 h-6" />
                </div>
                <div className="space-y-3 pt-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Upload logo
                  </button>
                  <p className="text-xs leading-tight">
                    The picture must be at least 224×224px
                  </p>
                </div>
              </div>
            </section>

            {/* Company Information Section */}
            <section className="space-y-8">
              <h3 className="text-lg">Company information</h3>
              
              <div className="max-w-2xl space-y-6">
                <TextField
                  label="Company name"
                  isRequired
                  value={companyName}
                  onChange={setCompanyName}
                  placeholder="Enter company name"
                />

                <TextField
                  label="Company website"
                  isRequired
                  value={website}
                  onChange={setWebsite}
                  hasPrefix={true}
                  prefixText="https://"
                  placeholder="e.g. example.com"
                />

                <div className="grid grid-cols-1 gap-6">
                  <Dropdown
                    label="Number of employees *"
                    items={["1-10", "11-50", "51-200", "201-500", "500+"]}
                    selected={employees}
                    onSelect={setEmployees}
                    placeholder="Number of employees"
                    width="100%"
                    className="!w-full"
                  />

                  <Dropdown
                    label="Industry *"
                    items={["Engineering", "Marketing", "Sales", "HR", "Design", "Customer Support", "Operations"]}
                    selected={industry}
                    onSelect={setIndustry}
                    placeholder="Select an industry"
                    width="100%"
                    className="!w-full"
                  />

                  <TextField
                    label="Country"
                    value={country}
                    onChange={() => {}}
                    isReadOnly
                  />
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-lg">Social Media</h3>
              <div className="max-w-2xl">
                <Dropdown
                  selected="Add new profile"
                  icon={<FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5" />}
                  items={["LinkedIn", "Twitter", "Facebook", "Instagram"]}
                  onSelect={() => {}}
                />
              </div>
            </section>

            <hr className="border-gray-400" />

            {/* About Section */}
            <section className="space-y-6">
              <h3 className="text-lg">About</h3>
              <div className="max-w-2xl space-y-8">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <label className="text-gray-700">About your company</label>
                    <span className="text-gray-200">{about.length} / 1000</span>
                  </div>
                  <TextArea
                    value={about}
                    onChange={(val: string) => setAbout(val.substring(0, 1000))}
                    placeholder="Describe your company"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <label className="text-gray-700">Mission</label>
                    <span className="text-gray-200">{mission.length} / 1000</span>
                  </div>
                  <TextArea
                    value={mission}
                    onChange={(val: string) => setMission(val.substring(0, 1000))}
                    placeholder="Describe the mission of your company"
                  />
                </div>
              </div>
            </section>

            <hr className="border-gray-400" />

            {/* Benefits & values Section */}
            <section className="space-y-8">
              <h3 className="text-lg font-medium">Benefits & values</h3>
              <div className="max-w-2xl space-y-6">
                <Dropdown
                  label="Benefits"
                  placeholder="Select your company benefits"
                  items={["Health Insurance", "Paid Time Off", "Remote Work", "Flexible Hours", "Parental Leave"]}
                  selected={benefits}
                  onSelect={setBenefits}
                  width="100%"
                  className="!w-full"
                />

                <Dropdown
                  label="Values"
                  placeholder="Select your company values"
                  items={["Integrity", "Innovation", "Inclusion", "Transparency", "Customer First"]}
                  selected={values}
                  onSelect={setValues}
                  width="100%"
                  className="!w-full"
                />
              </div>
            </section>

            <hr className="border-gray-400" />

            {/* Account deletion Section */}
            <section className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">Account deletion</h3>
              <div className="max-w-2xl space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  This section allows you to permanently remove your account from our platform. If you no longer wish to use our services, you can initiate the account deletion process here. Please note that this action is irreversible and will result in the deletion of all your personal data associated with the account.
                </p>
                <button 
                  onClick={() => setIsDeletionExpanded(!isDeletionExpanded)}
                  className="text-blue-600 text-sm font-medium hover:underline focus:outline-none"
                >
                  {isDeletionExpanded ? "Show less" : "Show more"}
                </button>
                
                {isDeletionExpanded && (
                  <div className="pt-4">
                    <Button 
                      text="Delete Account"
                      style="delete"
                    />
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyDetailsPage;
