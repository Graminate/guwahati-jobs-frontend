import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";

type Props = {
  children: React.ReactNode;
  noSidebar?: boolean;
};

const DefaultLayout = ({ children, noSidebar = false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-light text-dark">
      <Navbar />
      <div className="flex flex-1">
        {!noSidebar && <Sidebar />}
        <main className={`flex-1 ${noSidebar ? "" : ""}`}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
