import React from "react";
import { useUser } from "../utils/hooks/userUser";
import type { View } from "../pages/dashboard";
import {
  FaHome,
  FaEnvelope,
  FaBriefcase,
  FaUsers,
  FaFileAlt,
  FaUserTie,
  FaBookOpen,
  FaBalanceScale,
  FaMoneyBillWave,
  FaPowerOff,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import BannerImage from "../assets/sidebar_banner.jpeg";

type SubMenuItem = { name: string; link: View; icon: IconType };
type MenuItem = {
  name: string;
  link: View;
  icon: IconType;
  submenu?: SubMenuItem[];
  badge?: number;
};
type Menu = { [category: string]: MenuItem[] };

const menu: Menu = {
  Features: [
    { name: "Dashboard", link: "home", icon: FaHome },
    { name: "Messages", link: "messages", icon: FaEnvelope, badge: 13 },
  ],
  Recruitment: [
    { name: "Jobs", link: "jobs", icon: FaBriefcase },
    { name: "Candidates", link: "candidates", icon: FaUsers },
    { name: "Resumes", link: "resumes", icon: FaFileAlt },
  ],
  Organization: [
    {
      name: "Employee Management",
      link: "EM",
      icon: FaUserTie,
      submenu: [{ name: "Leave Management", link: "leave", icon: FaBookOpen }],
    },
    {
      name: "Performance Management",
      link: "performance",
      icon: FaBalanceScale,
    },
  ],
  "KRIS Pay": [
    { name: "Payroll Management", link: "payroll", icon: FaMoneyBillWave },
  ],
};

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  setActiveView: (view: View) => void;
  activeView: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  activeView,
  setActiveView,
}) => {
  const handleItemClick = (view: View) => {
    setActiveView(view);
    if (window.innerWidth < 1420) toggleSidebar();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    toggleSidebar();
    window.location.href = "/login";
  }

  const { userName } = useUser();

  return (
    <>
      {/* Click-outside overlay (only on small screens) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-0 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 lg:w-[18%] max-w-[80%] h-95/100 bg-[#0c1a3c] text-white flex flex-col font-poppins rounded-br-3xl pt-12 transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      lg:static lg:translate-x-0 lg:flex lg:w-[18%]"`}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Profile */}
          <div className="flex items-center gap-4 p-6">
            <div className="h-16 w-16 rounded-full border-2 p-1 border-white">
              <img
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=kris"
                alt="avatar"
                className="rounded-full"
              />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold">{userName} Admin</h1>
              <p className="text-gray-400 text-sm lg:text-base">Admin</p>
            </div>
          </div>

          {/* Menu */}
          <nav className="px-6 text-sm lg:text-base">
            {Object.entries(menu).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h2 className="text-xs lg:text-sm text-gray-400 capitalize mb-2">
                  {category}
                </h2>
                <ul className="space-y-2">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.link;

                    return (
                      <li key={item.name}>
                        <button
                          type="button"
                          onClick={() => handleItemClick(item.link)}
                          className={`w-full text-left flex items-center justify-between px-3 py-2 rounded ${
                            isActive
                              ? "bg-yellow-400 text-black font-semibold"
                              : "hover:text-yellow-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="text-lg" />
                            <span>{item.name}</span>
                          </div>
                          {item.badge && (
                            <span className="bg-red-600 text-white text-[10px] rounded-full px-1 py-0.5 border border-white">
                              {item.badge}
                            </span>
                          )}
                        </button>

                        {/* Submenu */}
                        {item.submenu && (
                          <ul className="mt-2 ml-7 space-y-1 text-sm lg:text-base">
                            {item.submenu.map((sub) => (
                              <li key={sub.name}>
                                <button
                                  type="button"
                                  onClick={() => handleItemClick(sub.link)}
                                  className="w-full text-left text-gray-300 hover:text-white flex items-center gap-2"
                                >
                                  <sub.icon />
                                  {sub.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="px-6 pb-4 shrink-0">
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <FaPowerOff />
            Log Out
          </button>
        </div>

        {/* Bottom Banner */}
        <div
          className="w-full h-12 bg-cover bg-center rounded-br-3xl shrink-0"
          style={{ backgroundImage: `url(${BannerImage})` }}
        ></div>
      </aside>
    </>
  );
};

export default Sidebar;
