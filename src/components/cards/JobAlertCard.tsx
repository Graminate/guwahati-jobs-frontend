import {
  faChevronDown,
  faFile,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import Button from "../ui/Button"; // Assuming Button component exists

type FilterType =
  | "Language"
  | "Workplace"
  | "Seniority"
  | "Job Type"
  | "Category"
  | "Industry"
  | "Minimum Salary"
  | "Benefits";

// Define preference types - adjust or make distinct from FilterType if needed
type PreferenceType =
  | "Company Size"
  | "Funding Stage"
  | "Team Size"
  | "Remote Policy"
  | "Values"
  | "Tools & Skills"; // Example preferences

const allFilters: FilterType[] = [
  "Language",
  "Workplace",
  "Seniority",
  "Job Type",
  "Category",
  "Industry",
  "Minimum Salary",
  "Benefits",
];

const allPreferences: PreferenceType[] = [
  "Company Size",
  "Funding Stage",
  "Team Size",
  "Remote Policy",
  "Values",
  "Tools & Skills",
];

const JobAlertCard = () => {
  const [showForm, setShowForm] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isPreferenceDropdownOpen, setIsPreferenceDropdownOpen] =
    useState(false);
  const [availableFilters] = useState<FilterType[]>(allFilters);
  const [availablePreferences] = useState<PreferenceType[]>(allPreferences);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const preferenceDropdownRef = useRef<HTMLDivElement>(null);

  const handleAddClick = () => {
    setShowForm(true);
    setIsFilterDropdownOpen(false);
    setIsPreferenceDropdownOpen(false);
  };

  const handleCancelClick = () => {
    setShowForm(false);
    setIsFilterDropdownOpen(false);
    setIsPreferenceDropdownOpen(false);
  };

  const handleSaveJobAlert = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Saving job alert...");
    setShowForm(false);
    setIsFilterDropdownOpen(false);
    setIsPreferenceDropdownOpen(false);
  };

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen((prev) => !prev);
    setIsPreferenceDropdownOpen(false); // Close other dropdown
  };

  const togglePreferenceDropdown = () => {
    setIsPreferenceDropdownOpen((prev) => !prev);
    setIsFilterDropdownOpen(false); // Close other dropdown
  };

  const handleAddFilter = (filter: FilterType) => {
    console.log("Add filter:", filter);
    setIsFilterDropdownOpen(false);
    // TODO: Add filter logic
  };

  const handleAddPreference = (preference: PreferenceType) => {
    console.log("Add preference:", preference);
    setIsPreferenceDropdownOpen(false);
    // TODO: Add preference logic
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setIsFilterDropdownOpen(false);
      }
      if (
        preferenceDropdownRef.current &&
        !preferenceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPreferenceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border border-gray-500 rounded-lg shadow-sm bg-white w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-500">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-800">Job Alerts</h2>
          <span className="bg-blue-300 text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Beta
          </span>
        </div>
        {!showForm && (
          <Button
            type="button"
            text="Add job alert"
            style="ghost"
            onClick={handleAddClick}
            add
          />
        )}
      </div>

      <div className="p-4 md:p-6">
        {!showForm ? (
          <div className="text-center py-12 flex flex-col items-center">
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              <FontAwesomeIcon icon={faFile} className="size-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No job alerts
            </h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
              Create job alerts to receive relevant job opportunities directly
              in your inbox. For each job alert, we'll send up to 6 job openings
              once per week.
            </p>
            <Button
              type="button"
              text="Add job alert"
              style="primary"
              onClick={handleAddClick}
              add
            />
          </div>
        ) : (
          <form onSubmit={handleSaveJobAlert}>
            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                Filters
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                We will only show you jobs that fulfill these must-have
                criteria.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter job title"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For example, product manager, graphic designer, frontend
                    developer
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="location"
                    name="location"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="berlin">Berlin, Germany</option>
                    <option value="munich">Munich, Germany</option>
                    <option value="hamburg">Hamburg, Germany</option>
                    <option value="remote_de">Remote (Germany)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Include up to three locations. You can select countries,
                    cities, or both.
                  </p>
                </div>
              </div>

              <div
                className="relative inline-block text-left"
                ref={filterDropdownRef}
              >
                <div>
                  <button
                    type="button"
                    onClick={toggleFilterDropdown}
                    className="inline-flex gap-1 items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    id="filters-menu-button"
                    aria-expanded={isFilterDropdownOpen}
                    aria-haspopup="true"
                  >
                    <FontAwesomeIcon icon={faPlus} className="size-4" />
                    Add filters
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="size-4 text-gray-500"
                    />
                  </button>
                </div>

                {isFilterDropdownOpen && (
                  <div
                    className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="filters-menu-button"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      {availableFilters.map((filter) => (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => handleAddFilter(filter)}
                          className="w-full text-left text-gray-700 flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          tabIndex={-1}
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="size-3 text-gray-500"
                          />
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                Preferences
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Your preferences will help us to recommend you the best fitting
                jobs. These are nice-to-have factors, but no deal-breakers.
              </p>

              <div
                className="relative inline-block text-left"
                ref={preferenceDropdownRef}
              >
                <div>
                  <button
                    type="button"
                    onClick={togglePreferenceDropdown}
                    className="inline-flex gap-1 items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    id="preferences-menu-button"
                    aria-expanded={isPreferenceDropdownOpen}
                    aria-haspopup="true"
                  >
                    <FontAwesomeIcon icon={faPlus} className="size-4" />
                    Add preferences
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="size-4 text-gray-500"
                    />
                  </button>
                </div>

                {isPreferenceDropdownOpen && (
                  <div
                    className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="preferences-menu-button"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      {availablePreferences.map((preference) => (
                        <button
                          key={preference}
                          type="button"
                          onClick={() => handleAddPreference(preference)}
                          className="w-full text-left text-gray-700 flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          tabIndex={-1}
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="size-3 text-gray-500"
                          />
                          {preference}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex sm:flex-col md:flex-row md:justify-end gap-3 mx-auto">
              <Button
                text="Cancel"
                style="secondary"
                type="button"
                onClick={handleCancelClick}
              />
              <Button text="Add job alert" style="primary" type="submit" />
            </div>

            <div className="mt-6 bg-gray-500 text-gray-600 text-sm p-3 rounded-md">
              This feature is currently in beta and is available only for jobs
              in Guwahati. You'll receive one email per job alert each week,
              featuring up to 6 relevant job opportunities.
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default JobAlertCard;
