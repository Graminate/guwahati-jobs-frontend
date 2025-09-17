import React, { useState, useEffect } from "react";
import SettingsLayout from "@/layout/SettingsLayout";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";

const MiscSettingsPage = () => {
  const [language, setLanguage] = useState("English");
  const [initialLanguage, setInitialLanguage] = useState("English");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [initialNotificationsEnabled, setInitialNotificationsEnabled] =
    useState(true);
  const [isDirty, setIsDirty] = useState(false);

  const availableLanguages = ["English", "Spanish", "German", "French"];

  useEffect(() => {
    const languageChanged = language !== initialLanguage;
    const notificationsChanged =
      notificationsEnabled !== initialNotificationsEnabled;
    setIsDirty(languageChanged || notificationsChanged);
  }, [
    language,
    initialLanguage,
    notificationsEnabled,
    initialNotificationsEnabled,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDirty) {
      console.log("Saving settings:", { language, notificationsEnabled });
      setInitialLanguage(language);
      setInitialNotificationsEnabled(notificationsEnabled);
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      console.log("Deleting account...");
    }
  };

  return (
    <SettingsLayout isDirty={isDirty} handleSubmit={handleSubmit}>
      <div className="space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Application settings
          </h2>
          <div className="space-y-6 max-w-md">
            <Dropdown
              label="App language"
              items={availableLanguages}
              selected={language}
              onSelect={setLanguage}
            />
          </div>
        </section>

        <section>
          <Button
            text="Delete my account"
            onClick={handleDeleteAccount}
            style="delete"
          />
        </section>
      </div>
    </SettingsLayout>
  );
};

export default MiscSettingsPage;
