import clsx from "clsx";

type Props = {
  text?: string;
  arrow?: "" | "up" | "down" | "left" | "right";
  style?: "primary" | "secondary" | "ghost" | "home" | "delete";
  isDisabled?: boolean;
  width?: "small" | "medium" | "large";
  add?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
};

const Button = ({
  text = "Button",
  arrow = "",
  style = "primary",
  isDisabled = false,
  width,
  add = false,
  type = "button",
  onClick,
  className = "",
  icon,
}: Props) => {
  const getWidth = (): string => {
    switch (width) {
      case "small":
        return "w-1/12";
      case "medium":
        return "w-1/6";
      case "large":
        return "w-full";
      default:
        return "";
    }
  };

  const getButtonClass = (): string => {
    switch (style) {
      case "home":
        return "bg-white text-sm my-10 py-3 px-7 rounded-md shadow-lg hover:bg-black hover:text-white border border-solid border-black";
      case "primary":
        return "bg-blue-200 text-sm hover:bg-blue-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:opacity-50 text-white justify-center";
      case "secondary":
        return "bg-white text-sm disabled:text-gray-400 disabled:bg-transparent disabled:border-gray-300 hover:bg-gray-300 hover:bg-light text-gray-200 hover:text-gray-200 border border-gray-300 justify-center";
      case "ghost":
        return "bg-transparent hover:bg-gray-500 text-sm font-semibold text-gray-200 justify-center disabled:text-gray-300 disabled:bg-transparent";
      case "delete":
        return "bg-red-300 text-sm hover:bg-red-400 disabled:bg-red-300 disabled:text-light disabled:opacity-50 text-red-100 justify-center";
      default:
        return "";
    }
  };

  const buttonClass = `${getButtonClass()} py-1 px-2 rounded rounded-md ${getWidth()}`;

  const arrowIcons: Record<string, string> = {
    up: "M5 15l5-5 5 5",
    down: "M5 11l5 5 5-5",
    left: "M15 19l-7-7 7-7",
    right: "M9 5l7 7-7 7",
  };

  const addIcon = add ? "M12 4.5v15m7.5-7.5h-15" : "";

  return (
    <button
      type={type}
      className={`${buttonClass} ${className} flex items-center`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {add && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 mr-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={addIcon} />
        </svg>
      )}

      {arrow === "left" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={arrowIcons[arrow]}
          />
        </svg>
      )}

      {icon && <span className={clsx("flex items-center", text && "mr-2")}>{icon}</span>}
      {text}

      {["right", "up", "down"].includes(arrow) && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={arrowIcons[arrow]}
          />
        </svg>
      )}
    </button>
  );
};

export default Button;
