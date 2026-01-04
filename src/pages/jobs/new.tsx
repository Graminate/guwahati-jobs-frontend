import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faFileLines,
  faClipboardList,
  faSitemap,
  faUsers,
  faXmark,
  faTrash,
  faCalendar,
  faInfoCircle,
  faBriefcase,
  faLocationDot,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import Dropdown from "@/components/ui/Dropdown";
import TextArea from "@/components/ui/TextArea";
import Autocomplete from "@/components/ui/Autocomplete";
import { indianCities } from "@/constants/cities";

const CreateJobPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [tasks, setTasks] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");
  const [closing, setClosing] = useState("");
  const [office, setOffice] = useState("");
  const [language, setLanguage] = useState("English");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [employmentType, setEmploymentType] = useState("Employee");
  const [seniority, setSeniority] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [salaryPeriod, setSalaryPeriod] = useState("Per year");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  
  // Application Form States
  const [cvRequirement, setCvRequirement] = useState("Required");
  const [coverLetterRequirement, setCoverLetterRequirement] = useState("Optional");
  const [questions, setQuestions] = useState([
    { id: 1, question: "When are you available to start working with us?", answerType: "Date", isOptional: true, status: "Optional" }
  ]);

  const isMandatoryFieldEntered = 
    title.trim() !== "" || 
    tasks.trim() !== "" || 
    requirements.trim() !== "" || 
    category !== "" || 
    office.trim() !== "" || 
    language !== "English" || 
    employmentType !== "Employee";

  const isFormValid = 
    title.trim() !== "" && 
    tasks.trim() !== "" && 
    requirements.trim() !== "" && 
    category !== "" && 
    office.trim() !== "" && 
    language !== "" && 
    employmentType !== "";

  const sidebarItems = [
    { id: "details", label: "Job Ad Details", icon: faFileLines },
    { id: "form", label: "Application Form", icon: faClipboardList },
    { id: "workflow", label: "Workflow", icon: faSitemap },
    { id: "team", label: "Hiring Team", icon: faUsers },
  ];

  return (
    <div className="min-h-screen">
      <header className="bg-white px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <Button
            text="Back"
            style="secondary"
            arrow="left"
            onClick={() => router.back()}
          />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image src="/images/logo.png" alt="JOIN Logo" width={80} height={24} priority />
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex items-center group">
            <button className="text-gray-400 hover:text-gray-600 p-2">
              <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
            </button>
            {!isFormValid && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-gray-900 text-white text-[10px] py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[60] text-center shadow-xl">
                Complete all required fields to generate a preview of your job ad
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
              </div>
            )}
          </div>
          <Button
            text="Save as draft"
            style="secondary"
            isDisabled={!isMandatoryFieldEntered}
          />
          <Button
            text="Publish"
            style="primary"
            isDisabled={!isFormValid}
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8 mt-4">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === "details" || isFormValid) {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-600"
                      : (item.id === "details" || isFormValid ? "text-gray-600 hover:bg-gray-400" : "text-gray-300 cursor-not-allowed")
                  }`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`w-4 h-4 ${
                      activeTab === item.id ? "text-blue-600" : (item.id === "details" || isFormValid ? "text-gray-200" : "text-gray-100")
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Form Content */}
          <main className="flex-1 rounded-2xl p-8 max-w-4xl">
            {activeTab === "details" ? (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h1 className="text-2xl font-bold text-gray-900">Create your job ad</h1>
                </div>
                <TextField
                  label="Job Title"
                  isRequired={true}
                  value={title}
                  onChange={setTitle}
                  placeholder="Enter job title"
                />

                <TextArea
                  label="Intro"
                  value={intro}
                  onChange={setIntro}
                  placeholder="Include a brief introduction about your company and the role."
                />

                <TextArea
                  label="Tasks"
                  isRequired={true}
                  value={tasks}
                  onChange={setTasks}
                  placeholder="Enter the job description, including main responsibilities and typical tasks."
                />

                <TextArea
                  label="Requirements"
                  isRequired={true}
                  value={requirements}
                  onChange={setRequirements}
                  placeholder="Define the job requirements, including experience, qualifications, and skills necessary to fulfill the role."
                />

                <TextArea
                  label="Benefits"
                  value={benefits}
                  onChange={setBenefits}
                  placeholder="List any other perks and benefits that make your company a unique and attractive place to work."
                />

                <TextArea
                  label="Closing"
                  value={closing}
                  onChange={setClosing}
                  placeholder="Engage candidates with an invitation to apply and a brief description of what to expect regarding the hiring process."
                />

                <hr className="border-gray-400" />

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Additional Information</h3>
                  
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="block text-sm font-bold text-gray-700">
                            Office <span className="text-red-500">*</span>
                          </label>
                          <button className="text-blue-600 text-sm font-semibold hover:underline">Add office</button>
                        </div>
                        <Autocomplete
                          id="job-office"
                          value={office}
                          onChange={setOffice}
                          suggestions={indianCities}
                          placeholder="Search the city"
                          isRequired
                          name="job-office"
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
                        <p className="text-xs text-gray-700">
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
                            <TextField
                              value={minSalary}
                              onChange={setMinSalary}
                              placeholder="Min"
                              hasCurrency={true}
                              currencySymbol="₹"
                              className="flex-1"
                            />
                            <TextField
                              value={maxSalary}
                              onChange={setMaxSalary}
                              placeholder="Max"
                              hasCurrency={true}
                              currencySymbol="₹"
                              className="flex-1"
                            />
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
                              className="flex-1"
                            />
                            <Button
                              text="Add"
                              style="ghost"
                              add={true}
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
                        <p className="text-sm font-bold text-gray-900 mb-2">
                          Some job boards allow candidates to filter by salary
                        </p>
                        <p className="text-xs text-gray-700">
                          As a result, adding a salary range can increase your job's ranking and number of candidates.
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 text-center flex justify-center">
                      <Button
                        text="Proceed to Application Form"
                        arrow="right"
                        width="large"
                        onClick={() => setActiveTab("form")}
                        isDisabled={!isFormValid}
                        className="py-2"
                      />
                    </div>
                  </div>
              </div>
            ) : activeTab === "form" ? (
              <div className="space-y-10">
                <div className="text-center mb-12">
                  <h1 className="text-2xl font-bold">Target the right candidates</h1>
                </div>

                {/* Job Summary Card */}
                <div className="bg-white border border-gray-400 rounded-xl p-4 flex items-center gap-4 max-w-2xl mx-auto">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faFolderOpen} className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{title || "Job Title"}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm">
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faLocationDot} className="w-3.5 h-3.5" />
                        {`${office}`}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faBriefcase} className="w-3.5 h-3.5" />
                        {employmentType || "Employment Type"}
                      </span>
                      <span className="flex items-center gap-1.5">
                         <FontAwesomeIcon icon={faFolderOpen} className="w-3.5 h-3.5" />
                         {category || "Category"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Application Documents */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Application documents</h3>
                    <p className="text-sm mt-1">Customize the document requirements for this job.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 pb-8 border-b border-gray-100">
                    <Dropdown
                      label="CV"
                      items={["Required", "Optional", "Off"]}
                      selected={cvRequirement}
                      onSelect={setCvRequirement}
                    />
                    <Dropdown
                      label="Cover letter"
                      items={["Required", "Optional", "Off"]}
                      selected={coverLetterRequirement}
                      onSelect={setCoverLetterRequirement}
                    />
                  </div>
                </div>

                {/* Screening Questions */}
                <div className="space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold">Screening Questions</h3>
                      <span className="px-2.5 py-0.5 bg-gray-400 text-gray-600 text-[10px] font-bold rounded-full">Optional</span>
                    </div>
                    <p className="text-sm">Add screening questions to find the best candidates more easily</p>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex-1 space-y-6">
                      {questions.map((q, idx) => (
                        <div key={idx} className="bg-white border border-gray-400 rounded-2xl p-6 space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-bold">Start date</h4>
                            <div className="flex items-center gap-3">
                              <Dropdown
                                items={["Optional", "Required", "Knockout"]}
                                selected={q.status}
                                onSelect={(val) => {
                                  const newQuestions = [...questions];
                                  newQuestions[idx].status = val;
                                  newQuestions[idx].isOptional = val === "Optional";
                                  setQuestions(newQuestions);
                                }}
                                width="180px"
                                itemDescriptions={{
                                  "Optional": "Candidate is allowed to skip it",
                                  "Required": "Candidate will have to answer it",
                                  "Knockout": "Rejection email will be sent next day to the candidates who don't meet your requirements"
                                }}
                              />
                              <button className="text-red-200 hover:bg-gray-50 px-2.5 py-1.5 border border-gray-400 rounded-lg">
                                <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex gap-4">
                             <div className="flex-[2]">
                               <label className="block text-sm mb-1.5">Question</label>
                               <TextField
                                 value={q.question}
                                 onChange={(val) => {
                                   const newQuestions = [...questions];
                                   newQuestions[idx].question = val;
                                   setQuestions(newQuestions);
                                 }}
                                 placeholder="When are you available to start working with us?"
                               />
                             </div>
                             <div className="flex-1">
                               <label className="block text-sm mb-1.5">Answer type</label>
                               <Dropdown
                                 items={["Date", "Short text", "Long text", "Multiple choice"]}
                                 selected={q.answerType}
                                 onSelect={(val) => {
                                   const newQuestions = [...questions];
                                   newQuestions[idx].answerType = val;
                                   setQuestions(newQuestions);
                                 }}
                                 icon={<FontAwesomeIcon icon={faCalendar} className="w-3.5 h-3.5" />}
                                 width="100%"
                                 className="!w-full"
                               />
                             </div>
                          </div>
                        </div>
                      ))}

                      {/* Add Question Area */}
                      <div className="space-y-4 pt-4">
                        <h4 className="font-bold">Add question</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Current city", "Driver's license", "Visa status", 
                            "Onsite work", "Remote work", "English proficiency", 
                            "Employment type", "Shift Work", "Pronouns"
                          ].map((chip) => (
                            <button key={chip} className="px-4 py-2 bg-blue-400 text-blue-200 rounded-full text-sm hover:bg-blue-100 transition-colors">
                              {chip}
                            </button>
                          ))}
                          <Dropdown
                            items={["Custom Question"]}
                            selected="+ Custom"
                            onSelect={() => {}}
                            width="140px"
                            className="!w-auto"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Info Card */}
                    <div className="w-72 bg-blue-50 p-6 rounded-2xl h-fit space-y-4">
                      <div className="flex items-start gap-3">
                         <FontAwesomeIcon icon={faInfoCircle} className="w-4 h-4 text-blue-600 mt-1" />
                         <div>
                           <h4 className="font-bold text-gray-900 text-sm">New: Knockout questions</h4>
                           <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                            By setting a question as Knockout, you are able to automate the rejection of applications that do not fit the job (e.g. lack of work permit, excessive salary expectation). Candidates still appear in JOIN, but they will be automatically receiving a default rejection email the day after their application.
                           </p>
                           <button className="text-blue-600 text-xs font-bold mt-4 hover:underline">Learn more</button>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPage;
