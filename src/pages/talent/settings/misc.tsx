import React, { useState, useEffect } from "react";
import SettingsLayout from "@/layout/SettingsLayout";

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
            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                App language
              </label>
              <select
                id="language"
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="px-4 py-2 text-sm font-medium text-red-100 bg-red-300 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete my account
          </button>
        </section>
      </div>
    </SettingsLayout>
  );
};

export default MiscSettingsPage;
