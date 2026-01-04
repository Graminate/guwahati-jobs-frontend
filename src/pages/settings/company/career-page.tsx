import React, { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faXmark,
  faBuilding,
  faPlus,
  faImage,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

const CareerPageSettings = () => {
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [spontaneousApplication, setSpontaneousApplication] = useState(false);
  const [domain] = useState("join.com/companies/24fawcom");

  const sidebarItems = [
    { label: "Company Details", active: false, href: "/settings/company/details" },
    { label: "Career Page", active: true, href: "/settings/company/career-page" },
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
              onClick={() => item.href && router.push(item.href)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-white"
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
              <h1 className="text-2xl font-bold text-gray-900">Career page</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                text="Preview" 
                style="secondary" 
                icon={<FontAwesomeIcon icon={faEye} className="w-4 h-4" />}
              />
              <Button text="Save Changes" style="secondary" isDisabled={true} />
            </div>
          </div>

          <div className="flex gap-12">
            {/* Left Column */}
            <div className="flex-1 space-y-12">
              {/* Image Gallery */}
              <section className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Image Gallery</h3>
                <div className="border-2 border border-gray-400 rounded-2xl p-16 flex flex-col items-center justify-center space-y-4 bg-gray-50/10">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                    <FontAwesomeIcon icon={faImage} className="w-4 h-4" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-bold text-gray-900">Drag & drop image upload</p>
                    <p className="text-xs leading-tight max-w-xs mx-auto">
                      You can use 5 images smaller than 3.5MB and at least 752px by 480px.
                    </p>
                  </div>
                </div>
              </section>

              {/* Videos */}
              <section className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Videos</h3>
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                  <div className="text-center space-y-1">
                    <p className="font-bold text-gray-900 text-sm">No videos yet</p>
                    <p className="text-xs leading-tight">
                      You haven't added any videos yet. You can add videos from YouTube.
                    </p>
                  </div>
                  <button className="flex items-center space-x-2 text-blue-600 text-sm font-bold hover:text-blue-700 transition-colors">
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                    <span>Add video</span>
                  </button>
                </div>
              </section>

              {/* Domain */}
              <section className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Domain</h3>
                <TextField
                  value={domain}
                  onChange={() => {}}
                  hasPrefix={true}
                  prefixText="https://"
                  isReadOnly
                />
              </section>

               {/* Visibility Options */}
              <section className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-t border-gray-50 pt-8">Visibility Options</h3>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 pr-12">
                    <p className="font-bold text-gray-900 text-base">Spontaneous Application</p>
                    <p className="text-sm leading-relaxed">
                      Expand your talent pool by enabling candidates to apply to your company through a dedicated banner on the Career and Job Ad pages, whether they haven't found a suitable job or wish to express their interest in your company.
                    </p>
                  </div>
                  <button 
                    onClick={() => setSpontaneousApplication(!spontaneousApplication)}
                    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none mt-1 ${
                      spontaneousApplication ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span 
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        spontaneousApplication ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </section>
            </div>

            <div className="w-72 space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 text-sm">Profile Visibility</h4>
                  <p className="text-xs leading-relaxed">
                    You can temporarily hide your company profile.
                  </p>
                  <p className="text-xs leading-relaxed pt-2">
                    Setting your company to offline makes your career site and all its job listings unavailable to you, users, search engines, and job boards.
                  </p>
                </div>
                
                <div className="flex items-center space-x-3 pt-2">
                  <button 
                    onClick={() => setShowProfile(!showProfile)}
                    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      showProfile ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span 
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        showProfile ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="text-sm font-medium text-gray-700">Show my profile</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                <h4 className="font-bold text-gray-900 text-sm">Why upload images?</h4>
                <p className="text-xs leading-relaxed">
                  Showcasing images on your company profile is a great way to give candidates a feel for your culture and office space.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareerPageSettings;
