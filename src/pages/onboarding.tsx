import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import RecruiterSidebar from "@/components/layout/RecruiterSidebar";
import { useAuth } from "@/context/AuthContext";

const OnboardingPage = () => {
  const { user } = useAuth();

  return (
    <DefaultLayout sidebar={<RecruiterSidebar user={user} />}>
      <div className="p-8">
      </div>
    </DefaultLayout>
  );
};

export default OnboardingPage;
