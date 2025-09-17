import React, { useState, useId, forwardRef } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-5 text-red-200"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
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
      "text-sm rounded-md block w-full p-2.5 placeholder-gray-300 focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed read-only:opacity-70 read-only:cursor-default";

    const stateClasses = clsx({
      "border border-gray-400 text-gray-900 focus:ring-indigo-200 focus:border-indigo-200":
        !isError && !isSuccess,
      "border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500":
        isSuccess,
      "border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
        isError,
    });

    const iconPaddingClasses = clsx({
      "pl-10": icon && iconPosition === "left",
      "pr-10": (icon && iconPosition === "right") || type === "password",
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
          <label
            htmlFor={inputId}
            className="block mb-1 text-sm font-medium text-dark"
          >
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && iconPosition === "left" && (
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

          {/* Right Icon / Password Toggle */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {type === "password" ? (
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
            className={clsx("mt-1 text-sm flex items-center", {
              "text-red-600": isError,
              "text-gray-300": !isError,
            })}
          >
            {isError && <ErrorIcon />}
            <p className={clsx({ "ml-1": isError })}>
              {isError ? errorMessage : helperText}
            </p>
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
