import React, { useState, useId, forwardRef } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="size-6 text-red-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
    />
  </svg>
);

const HelpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="size-5 text-gray-500 cursor-pointer"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
    />
  </svg>
);

type BaseInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | "value"
  | "onChange"
  | "type"
  | "disabled"
  | "className"
  | "id"
  | "required"
  | "readOnly"
>;

type Props = BaseInputProps & {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  state?: "error" | "success" | "default";
  type?: React.HTMLInputTypeAttribute;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isRequired?: boolean;
  width?: "small" | "medium" | "large" | "full" | "auto";
  className?: string;
  inputClassName?: string;
  id?: string;
  telephone?: boolean;
  hasHelpIcon?: boolean;
  countryCode?: string;
  hasCurrency?: boolean;
  currencySymbol?: string;
};

const TextField = forwardRef<HTMLInputElement, Props>(
  (
    {
      label = "",
      value,
      onChange,
      placeholder = "",
      errorMessage = "This field is required",
      helperText = "",
      isDisabled = false,
      isReadOnly = false,
      state = "default",
      type = "text",
      icon,
      iconPosition = "left",
      isRequired = false,
      width = "full",
      className = "",
      inputClassName = "",
      id: providedId,
      telephone = false,
      hasHelpIcon = false,
      countryCode = "+91",
      hasCurrency = false,
      currencySymbol = "₹",
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = providedId || `${generatedId}-input`;
    const descriptionId = `${inputId}-description`;

    const [showPassword, setShowPassword] = useState(false);

    const isError = state === "error";
    const isSuccess = state === "success";
    const hasHelperText = !!helperText && !isError;
    const hasErrorMessage = isError && !!errorMessage;

    const actualInputType = type === "password" && showPassword ? "text" : type;

    const togglePasswordVisibility = () => {
      if (type === "password") {
        setShowPassword(!showPassword);
      }
    };

    const baseInputClasses =
      "text-sm rounded-md block w-full p-2.5 placeholder-gray-300 focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed read-only:opacity-70 read-only:cursor-default transition-all duration-200";

    const stateClasses = clsx({
      "border border-gray-300 focus:ring-indigo-100 focus:border-indigo-200":
        !isError && !isSuccess,
      "border border-green-500 focus:ring-green-500 focus:border-green-500":
        isSuccess,
      "border border-red-500 focus:ring-red-100 focus:border-red-500":
        isError,
    });

    const iconPaddingClasses = clsx({
      "pl-10": icon && iconPosition === "left",
      "pr-12":
        (icon && iconPosition === "right") || type === "password" || isError,
      "pl-20": telephone,
      "pr-10": hasCurrency,
    });

    const widthClass = clsx({
      "w-1/4": width === "small",
      "w-1/2": width === "medium",
      "w-3/4": width === "large",
      "w-full": width === "full",
      "w-auto": width === "auto",
    });

    const ariaDescribedBy =
      hasErrorMessage || hasHelperText ? descriptionId : undefined;
    const ariaInvalid = isError ? true : undefined;

    return (
      <div className={clsx("flex flex-col", widthClass, className)}>
        {label && (
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor={inputId}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            {hasHelpIcon && <HelpIcon />}
          </div>
        )}
        <div className="relative flex items-center">
          {telephone && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none z-10">
              <div className="flex items-center space-x-1 bg-gray-500 rounded px-2 py-1.5 text-sm font-medium text-gray-dark">
                <span>{countryCode}</span>
                <svg
                  className="size-3.5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          )}

          {hasCurrency && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none z-10">
              <div className="flex items-center bg-gray-500 text-gray-100 rounded px-2 py-1.5 text-sm font-medium border border-gray-400">
                <span>{currencySymbol}</span>
              </div>
            </div>
          )}

          {icon && iconPosition === "left" && !telephone && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={actualInputType}
            className={clsx(
              baseInputClasses,
              stateClasses,
              iconPaddingClasses,
              inputClassName
            )}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            aria-describedby={ariaDescribedBy}
            aria-invalid={ariaInvalid}
            aria-required={isRequired}
            {...rest}
          />

          {/* Right Icon / Password Toggle / Error Icon */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isError ? (
              <ErrorIcon />
            ) : type === "password" ? (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="size-4 text-gray-300"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="size-4 text-gray-300"
                  />
                )}
              </button>
            ) : icon && iconPosition === "right" ? (
              <div className="pointer-events-none">{icon}</div>
            ) : null}
          </div>
        </div>

        {(hasErrorMessage || hasHelperText) && (
          <div
            id={descriptionId}
            className={clsx("mt-1.5 text-sm flex items-center", {
              "text-red-500 font-medium": isError,
              "text-gray-300": !isError,
            })}
          >
            <p>{isError ? errorMessage : helperText}</p>
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
