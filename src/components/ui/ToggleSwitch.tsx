import React from "react";

interface ToggleSwitchProps {
  options: {
    value: string;
    label: string;
  }[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  className?: string;
}

const ToggleSwitch = ({
  options,
  activeTab,
  setActiveTab,
  className = "",
}: ToggleSwitchProps) => {
  return (
    <div
      className={`inline-flex bg-gray-400 rounded-lg p-0.5 space-x-1 mb-6 ${className}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setActiveTab(option.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 ${
            activeTab === option.value
              ? "bg-white font-semibold text-indigo-200 shadow-sm"
              : "bg-transparent font-semibold text-gray-700 hover:bg-white/60"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleSwitch;
