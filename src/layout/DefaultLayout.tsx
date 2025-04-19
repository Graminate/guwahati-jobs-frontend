import React from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type Props = {
  children: React.ReactNode;
};

const PlatformLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-light text-dark">
      <Navbar />
      <div className="flex-1 p-4">{children}</div>

      <Footer />
    </div>
  );
};

export default PlatformLayout;
