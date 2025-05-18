import Sidebar from "../components/sidebar";
import {
  Messages,
  Candidates,
  Jobs,
  Resumes,
  LeaveManagement,
  PerformanceManagement,
  PayrollManagement,
} from "../components/dashboard_dummy_components";
import DashboardEM from "../components/dashboard_employee_managment";
import Home from "../components/dashboard_home";
import { useSearchFilter } from "../utils/searchbar";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaWrench } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { HiBars3BottomLeft } from "react-icons/hi2";

export type View =
  | "home"
  | "messages"
  | "jobs"
  | "candidates"
  | "resumes"
  | "EM"
  | "leave"
  | "performance"
  | "payroll";

const Dashboard = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const Log = localStorage.getItem("isLoggedin");

    if (!user || Log) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => { 
    const handleResize = () => {
      if (window.innerWidth > 1420) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>("home");

  const { SearchComponent } = useSearchFilter([
    "All Candidates",
    "Shortlisted",
    "Rejected",
    "Interviewed",
  ]);

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <Home />;
      case "EM":
        return <DashboardEM />;
      case "messages":
        return <Messages />;
      case "jobs":
        return <Jobs />;
      case "candidates":
        return <Candidates />;
      case "resumes":
        return <Resumes />;
      case "leave":
        return <LeaveManagement />;
      case "performance":
        return <PerformanceManagement />;
      case "payroll":
        return <PayrollManagement />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="bg-sky-200 overflow-y-auto w-screen flex h-screen">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(false)}
          setActiveView={setCurrentView}
          activeView={currentView}
        />

        {/* Main section */}
        <section className="flex-1 overflow-y-auto relative">
          {/* Top bar */}
          <div className="text-white inset-0 h-16 flex mt-6 items-center justify-between px-10 static">
            <button
              className={` ${
                sidebarOpen && (window.innerWidth < 1024)
                  ? "invisible"
                  : "visible"
              } z-50 text-black flex items-center justify-center text-4xl w-16 h-full rounded-full`}
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              <HiBars3BottomLeft className="stroke-1" />
            </button>

            {/* Search + Filter */}
            <div className="p-4">
              <SearchComponent />
            </div>

            {/* Icons */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-6 mr-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 flex text-2xl items-center justify-center">
                    <FaBell />
                  </div>
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-xs text-white rounded-full flex items-center justify-center">
                    1
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-500 text-2xl flex items-center justify-center">
                  <FaWrench color="black" />
                </div>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-2xl flex items-center justify-center">
                    <IoMdMail />
                  </div>
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-xs text-white rounded-full flex items-center justify-center">
                    13
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Render current page */}
          <div className="pt-4 relative" id="dashboard">
            {renderView()}
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
