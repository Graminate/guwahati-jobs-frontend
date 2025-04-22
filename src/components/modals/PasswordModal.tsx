import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import TextField from "../ui/TextField";

type PasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (currentPass: string, newPass: string) => Promise<void> | void;
};

const PasswordModal = ({ isOpen, onClose, onSubmit }: PasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentPassword("");
      setNewPassword("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(currentPassword, newPassword);
      onClose();
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Change Password
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <FontAwesomeIcon icon={faX} className="size-6 text-gray-300" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              label="Password"
              type="password"
              value={currentPassword}
              onChange={(value: string) => setCurrentPassword(value)}
              placeholder="Enter your password"
              isRequired
              isDisabled={isSubmitting}
            />
          </div>

          <div className="mb-6">
            <TextField
              label="Password"
              type="password"
              value={newPassword}
              onChange={(value: string) => setNewPassword(value)}
              placeholder="Enter your password"
              isRequired
              isDisabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              text="Cancel"
              style="secondary"
              type="button"
              isDisabled={isSubmitting}
              onClick={onClose}
            />
            <Button
              text={isSubmitting ? "Setting..." : "Set new password"}
              style="primary"
              type="submit"
              isDisabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
