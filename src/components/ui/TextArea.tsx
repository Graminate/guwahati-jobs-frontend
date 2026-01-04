import React, { useState, useRef, useEffect, useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faListUl,
  faListOl,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

interface TextAreaProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isRequired?: boolean;
  className?: string;
  rows?: number;
}

const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  isRequired = false,
  className = "",
  rows = 4,
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    handleInput();
  };

  return (
    <div className={clsx("flex flex-col w-full", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-bold text-gray-700 mb-2"
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        className={clsx(
          "relative min-h-[150px] bg-white border rounded-xl transition-all duration-200 flex flex-col overflow-hidden",
          isFocused ? "border-blue-500 ring-1 ring-blue-500" : "border-gray-300 hover:border-gray-400"
        )}
      >
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={clsx(
            "flex-1 p-4 outline-none text-gray-900 text-base leading-relaxed overflow-y-auto w-full [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-6 [&_ol]:ml-6",
            !value && "before:content-[attr(data-placeholder)] before:text-gray-300 before:absolute before:pointer-events-none"
          )}
          data-placeholder={placeholder}
          id={id}
        />
        
        {isFocused && (
          <div className="flex items-center space-x-4 px-4 py-3">
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); execCommand("bold"); }}
              className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-300"
              title="Bold"
            >
              <FontAwesomeIcon icon={faBold} className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); execCommand("italic"); }}
              className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-300"
              title="Italic"
            >
              <FontAwesomeIcon icon={faItalic} className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); execCommand("insertUnorderedList"); }}
              className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-300"
              title="Bullet List"
            >
              <FontAwesomeIcon icon={faListUl} className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); execCommand("insertOrderedList"); }}
              className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-300"
              title="Numbered List"
            >
              <FontAwesomeIcon icon={faListOl} className="w-4 h-4" />
            </button>

            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); execCommand("undo"); }}
              className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-300"
              title="Undo"
            >
              <FontAwesomeIcon icon={faRotateLeft} className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); execCommand("redo"); }}
              className="p-1 hover:bg-gray-50 rounded transition-colors text-gray-300"
              title="Redo"
            >
              <FontAwesomeIcon icon={faRotateRight} className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;
