import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faEllipsis } from "@fortawesome/free-solid-svg-icons";

interface Application {
  id: string;
  company: string;
  title: string;
  logo: string | React.ReactNode;
  isLogoComponent: boolean;
  status: string;
  appliedDate: string;
}

interface ApplicationsCardProps {
  app: Application;
  getStatusBadgeStyle: (status: string) => string;
  className?: string;
}

const ApplicationsCard = ({
  app,
  getStatusBadgeStyle,
  className = "",
}: ApplicationsCardProps) => {
  return (
    <div
      className={`p-4 flex items-center justify-between hover:bg-gray-400 hover:rounded-lg transition-colors duration-150 ease-in-out ${className}`}
    >
      {/* Left side: Logo + Text */}
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-400 border border-gray-200 flex items-center justify-center overflow-hidden">
          {app.isLogoComponent ? (
            app.logo
          ) : typeof app.logo === "string" ? (
            <Image
              src={app.logo as string}
              alt={`${app.company} logo`}
              width={48}
              height={48}
              className="object-contain"
              onError={(e) =>
                (e.currentTarget.src = "/path/to/default/logo.png")
              }
            />
          ) : (
            <FontAwesomeIcon
              icon={faBriefcase}
              className="text-gray-400 text-2xl"
            />
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-800">
            {app.title}{" "}
            {app.status === "Not Available" && (
              <span
                className={`ml-2 text-xs font-medium px-2 py-0.5 rounded ${getStatusBadgeStyle(
                  app.status
                )}`}
              >
                not available
              </span>
            )}
          </p>
          <p className="text-sm text-gray-600">{app.company}</p>
        </div>
      </div>

      {/* Right side: Status + Date + Actions */}
      <div className="flex items-center space-x-4 md:space-x-10">
        <div className="text-right hidden sm:block">
          {app.status !== "Not Available" && (
            <span
              className={`text-xs font-medium px-2 py-1 rounded ${getStatusBadgeStyle(
                app.status
              )}`}
            >
              {app.status}
            </span>
          )}
          <p className="text-sm text-dark mt-1">Applied on {app.appliedDate}</p>
        </div>

        {/* Action Button */}
        <button className="text-gray-300 focus:outline-none px-2 py-1 rounded-md border border-gray-400 hover:bg-gray-500">
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      </div>
    </div>
  );
};

export default ApplicationsCard;
