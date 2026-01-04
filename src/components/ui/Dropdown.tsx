import { useState, useRef, useEffect } from "react";

type Props = {
  items: string[];
  selected: string;
  onSelect: (item: string) => void;
  direction?: "up" | "down";
  label?: string | null;
  placeholder?: string;
  width?: string;
  className?: string;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  itemDescriptions?: Record<string, string>;
};

const Dropdown = ({
  items,
  selected,
  onSelect,
  direction = "down",
  label = null,
  placeholder = "Select an option",
  width = "180px",
  className = "",
  isDisabled = false,
  icon,
  itemDescriptions,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownId = `dropdown-${Math.random().toString(36).substring(2, 15)}`;

  const toggleDropdown = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (item: string) => {
    onSelect(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative w-full md:w-auto ${className}`} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={dropdownId}
          className="block mb-1 text-sm font-medium text-dark"
        >
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <button
        id={dropdownId}
        className="w-full border border-gray-300 text-dark text-sm p-2 rounded-xl flex justify-between items-center transition-all focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={toggleDropdown}
        disabled={isDisabled}
        style={{
          minWidth: width,
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          {icon && <span className="text-gray-400">{icon}</span>}
          {selected || placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul
          className={`absolute ${
            direction === "up" ? "bottom-full mb-2" : "top-full mt-2"
          } left-0 bg-white text-dark shadow-md rounded overflow-hidden z-50`}
          style={{
            minWidth: width,
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
          role="listbox"
        >
          {items.map((item) => (
            <li
              key={item}
              role="option"
              tabIndex={0}
              className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                selected === item
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
              onClick={() => handleSelect(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  handleSelect(item);
                }
              }}
              aria-selected={selected === item}
            >
              <div className="flex flex-col">
                <span className={`font-normal ${selected === item ? "text-blue-600" : "text-gray-900"}`}>
                  {item}
                </span>
                {itemDescriptions && itemDescriptions[item] && (
                  <span className={`text-[11px] leading-tight ${selected === item ? "text-blue-200" : "text-gray-200"}`}>
                    {itemDescriptions[item]}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
