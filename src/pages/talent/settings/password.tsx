import React, { useState, useEffect } from "react";
import SettingsLayout from "@/layout/SettingsLayout";
import TextField from "@/components/ui/TextField";

const PasswordSettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [canSaveChanges, setCanSaveChanges] = useState(false);

  useEffect(() => {
    const isFormValid =
      currentPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmPassword.length > 0;
    setCanSaveChanges(isFormValid);
  }, [currentPassword, newPassword, confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSaveChanges) return;

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    console.log("Changing password...");
  };

  return (
    <SettingsLayout isDirty={canSaveChanges} handleSubmit={handleSubmit}>
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Account settings
        </h2>
        <div className="space-y-6 max-w-md">
          <TextField
            type="password"
            id="currentPassword"
            label="Current password"
            value={currentPassword}
            onChange={setCurrentPassword}
            isRequired
          />
          <TextField
            type="password"
            id="newPassword"
            label="New password"
            value={newPassword}
            onChange={setNewPassword}
            isRequired
          />
          <TextField
            type="password"
            id="confirmPassword"
            label="Confirm new password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            isRequired
          />
        </div>
      </section>
    </SettingsLayout>
  );
};

export default PasswordSettingsPage;
