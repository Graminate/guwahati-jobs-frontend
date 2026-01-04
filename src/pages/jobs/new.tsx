import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEye,
  faFileLines,
  faClipboardList,
  faSitemap,
  faUsers,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import Dropdown from "@/components/ui/Dropdown";

const CreateJobPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [tasks, setTasks] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");
  const [closing, setClosing] = useState("");
  const [workplace, setWorkplace] = useState("On-site");
  const [office, setOffice] = useState("Guwahati (Assam), India");
  const [language, setLanguage] = useState("English");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [employmentType, setEmploymentType] = useState("Employee");
  const [seniority, setSeniority] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [salaryCurrency, setSalaryCurrency] = useState("EUR");
  const [salaryPeriod, setSalaryPeriod] = useState("Per year");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const sidebarItems = [
    { id: "details", label: "Job Ad Details", icon: faFileLines },
    { id: "form", label: "Application Form", icon: faClipboardList },
    { id: "workflow", label: "Workflow", icon: faSitemap },
    { id: "team", label: "Hiring Team", icon: faUsers },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
            <span>Back</span>
          </button>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image src="/images/logo.png" alt="JOIN Logo" width={80} height={24} priority />
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-gray-600 p-2">
            <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
          </button>
          <button
            disabled
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
          >
            Save as draft
          </button>
          <Button
            text="Publish"
            style="primary"
            className="bg-blue-600 text-white hover:!bg-blue-700 px-6 py-2"
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-12">Create your job ad</h1>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`w-4 h-4 ${
                      activeTab === item.id ? "text-blue-600" : "text-gray-200"
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Form Content */}
          <main className="flex-1 rounded-2xl p-8 max-w-3xl">
            <div className="space-y-8">
              <TextField
                label="Job Title"
                isRequired={true}
                value={title}
                onChange={setTitle}
                placeholder="Enter job title"
                inputClassName="!rounded-xl !py-3 !px-4"
              />

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Intro
                </label>
                <textarea
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  placeholder="Include a brief introduction about your company and the role."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-300 text-gray-900 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Tasks <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={tasks}
                  onChange={(e) => setTasks(e.target.value)}
                  placeholder="Enter the job description, including main responsibilities and typical tasks."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-300 text-gray-900 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Define the job requirements, including experience, qualifications, and skills necessary to fulfill the role."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-300 text-gray-900 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Benefits
                </label>
                <textarea
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  placeholder="List any other perks and benefits that make your company a unique and attractive place to work."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-300 text-gray-900 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Closing
                </label>
                <textarea
                  value={closing}
                  onChange={(e) => setClosing(e.target.value)}
                  placeholder="Engage candidates with an invitation to apply and a brief description of what to expect regarding the hiring process."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-gray-300 text-gray-900 transition-all resize-none"
                />
              </div>

              <hr className="border-gray-400" />

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Additional Information</h3>
                
                  <div className="space-y-4">
                    <Dropdown
                      label="Workplace *"
                      items={["On-site", "Remote", "Hybrid"]}
                      selected={workplace}
                      onSelect={setWorkplace}
                    />

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-bold text-gray-700">
                          Office <span className="text-red-500">*</span>
                        </label>
                        <button className="text-blue-600 text-sm font-semibold hover:underline">Add office</button>
                      </div>
                      <Dropdown
                        items={["Guwahati (Assam), India"]}
                        selected={office}
                        onSelect={setOffice}
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-gray-400" />

                <Dropdown
                  label="Application form language *"
                  items={["English", "Hindi", "Assamese"]}
                  selected={language}
                  onSelect={setLanguage}
                />

                <hr className="border-gray-400" />

                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-1 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <Dropdown
                          label="Category *"
                          placeholder="Select category"
                          items={["Engineering", "Marketing", "Sales", "HR", "Design", "Customer Support", "Operations"]}
                          selected={category}
                          onSelect={setCategory}
                        />
                        <Dropdown
                          label="Sub-category"
                          placeholder="Select Sub-category"
                          items={["Frontend", "Backend", "Fullstack", "DevOps", "Mobile", "QA"]}
                          selected={subCategory}
                          onSelect={setSubCategory}
                          isDisabled={!category}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Dropdown
                          label="Employment Type *"
                          items={["Employee", "Freelance", "Internship", "Trainee", "Working Student"]}
                          selected={employmentType}
                          onSelect={setEmploymentType}
                        />
                        <Dropdown
                          label="Seniority"
                          placeholder="Select seniority level"
                          items={["Junior", "Mid", "Senior", "Lead", "Director", "Executive"]}
                          selected={seniority}
                          onSelect={setSeniority}
                        />
                      </div>
                    </div>
                    <div className="w-64 bg-gray-400 p-4 rounded-xl flex-shrink-0">
                      <p className="text-sm font-bold text-gray-900 mb-2">
                        The more specific the job category, the better the job ad can perform
                      </p>
                      <p className="text-xs">
                        If you cannot find a job category, please reach out to us.
                      </p>
                    </div>
                  </div>

                  <hr className="border-gray-400" />

                  <div className="flex gap-6">
                    <div className="flex-1 space-y-8">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Salary</label>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                            <input
                              type="text"
                              value={minSalary}
                              onChange={(e) => setMinSalary(e.target.value)}
                              placeholder="Min"
                              className="w-full px-4 py-3 outline-none text-sm text-gray-900 border-r border-gray-300"
                            />

                          </div>
                          <div className="flex-1 flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                            <input
                              type="text"
                              value={maxSalary}
                              onChange={(e) => setMaxSalary(e.target.value)}
                              placeholder="Max"
                              className="w-full px-4 py-3 outline-none text-sm text-gray-900 border-r border-gray-300"
                            />
                          </div>
                          <Dropdown
                            items={["Per year", "Per month", "Per week", "Per hour"]}
                            selected={salaryPeriod}
                            onSelect={setSalaryPeriod}
                            width="140px"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Skills</label>
                        <div className="flex gap-2">
                          <TextField
                            value={skillInput}
                            onChange={setSkillInput}
                            placeholder="Add skills needed for this job (e.g. project management, python, etc.)"
                            inputClassName="!rounded-xl !py-3 !px-4"
                            className="flex-1"
                          />
                          <Button
                            text="Add"
                            style="ghost"
                            add={true}
                            className="rounded-xl px-4 py-1"
                            onClick={() => {
                              if (skillInput.trim()) {
                                setSkills([...skills, skillInput.trim()]);
                                setSkillInput("");
                              }
                            }}
                          />
                        </div>
                        {skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {skills.map((skill, index) => (
                              <span key={index} className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border border-gray-300">
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                                  className="hover:text-blue-800 transition-colors"
                                >
                                  <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-64 bg-gray-400 p-4 rounded-xl flex-shrink-0">
                      <p className="text-sm font-bold mb-2">
                        Some job boards allow candidates to filter by salary
                      </p>
                      <p className="text-xs">
                        As a result, adding a salary range can increase your job's ranking and number of candidates.
                      </p>
                    </div>
                  </div>

                  <div className="pt-8">
                    <Button
                      text="Proceed to Application Form"
                      arrow="right"
                      width="large"
                      onClick={() => setActiveTab("form")}
                      className="px-4 py-2"
                    />
                  </div>
                </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPage;
