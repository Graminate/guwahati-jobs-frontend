import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type DeleteAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void> | void;
  activeApplications: string[];
}

const DeleteAccountModal = ({
  isOpen,
  onClose,
  onDelete,
  activeApplications = [],
}: DeleteAccountModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Close modal on Escape key press
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
      setIsDeleting(false);
    }
  }, [isOpen]);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const applicationCount = activeApplications.length;

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="delete-account-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2
            id="delete-account-title"
            className="text-xl font-semibold text-gray-800"
          >
            Delete Account
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
            disabled={isDeleting}
          >
            <FontAwesomeIcon icon={faX} className="size-6" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm text-gray-700">
          <p>
            If you don't agree to the Guwahati-jobs Terms & Conditions and Data Privacy
            Policy, you can delete your account.
          </p>

          {applicationCount > 0 && (
            <>
              <p>
                You currently have {applicationCount} active application
                {applicationCount > 1 ? "s" : ""}. If you delete your account,
                these employers will no longer be able to see your applications
                on Guwahati-Jobs.in:
              </p>
              <div className="bg-gray-500 p-3 rounded text-xs text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                {activeApplications.map((app, index) => (
                  <p key={index}>{app}</p>
                ))}
              </div>
            </>
          )}

          <p className="font-medium pt-2">
            Are you sure you want to delete your account?
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-3">
          <Button
            text="Cancel"
            style="secondary"
            type="button"
            onClick={onClose}
            isDisabled={isDeleting}
          />
          <Button
            text={isDeleting ? "Deleting..." : "Delete Account"}
            style="primary"
            type="button"
            onClick={handleDeleteConfirm}
            isDisabled={isDeleting}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
