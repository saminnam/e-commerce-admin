import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import MobileSiderBar from "../components/MobileSiderBar";

const DashboardLayout = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [hoveringSidebar, setHoveringSidebar] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <Sidebar
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
        hoveringSidebar={hoveringSidebar}
        setHoveringSidebar={setHoveringSidebar}
      />
      {/* <MobileSiderBar /> */}
      <MainContent
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
        hoveringSidebar={hoveringSidebar}
      >
        {children}
      </MainContent>
    </div>
  );
};

export default DashboardLayout;
