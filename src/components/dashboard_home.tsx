import { useState } from "react";
import { FaEye, FaDownload, FaSuitcase } from "react-icons/fa";
import { IoPeopleSharp, IoMailUnread } from "react-icons/io5";
import users from "../Dummy Data/users.json";
import type { User } from "../utils/types";
import { useModal } from "../utils/hooks/useModal";
import Modal from "../utils/simpleModal";
import SummaryCard from "../utils/summaryCard";

const MAX_ITEMS = 3;

const SECTIONS: {
  title: string;
  type: "jobs" | "employees" | "candidates" | "payrolls";
}[] = [
  { title: "Applied Jobs", type: "jobs" },
  { title: "Employees", type: "employees" },
  { title: "Candidates", type: "candidates" },
  { title: "April Payrolls", type: "payrolls" },
];

const getInitials = (name: string) => name?.[0]?.toUpperCase() || "?";

const getSalary = () => `₦${(Math.random() * 300000 + 100000).toFixed(0)}`;
const getStatus = () => (Math.random() > 0.5 ? "Paid" : "Processing");
const getScore = () => Math.floor(Math.random() * 100);

const Home = () => {
  const modal = useModal();
  const [modalContent, setModalContent] = useState<{
    title: string;
    users: User[];
    type: "jobs" | "employees" | "candidates" | "payrolls";
  } | null>(null);

  const openModal = (
    type: "jobs" | "employees" | "candidates" | "payrolls",
    title: string
  ) => {
    setModalContent({ type, title, users });
    modal.open();
  };

  const renderUserItem = (user: User, type: string, key: number) => {
    const initials = getInitials(user.firstName);
    const name = `${user.firstName} ${user.lastName}`;
    const commonLeft = (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-white">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-sm">{name}</p>
        </div>
      </div>
    );

    switch (type) {
      case "employees":
        return (
          <div
            key={key}
            className="flex justify-between items-center bg-sky-100 px-3 py-2 rounded-md"
          >
            {commonLeft}
            <div className="text-xs text-gray-500">Role: {user.jobTitle}</div>
            <div className="flex gap-2">
              <button className="bg-green-500 p-2 rounded-full text-white">
                <FaEye />
              </button>
              <button className="bg-blue-700 p-2 rounded-full text-white">
                <FaDownload />
              </button>
            </div>
          </div>
        );

      case "candidates": {
        const score = getScore();
        return (
          <div
            key={key}
            className="flex justify-between items-center bg-sky-100 px-3 py-2 rounded-md"
          >
            {commonLeft}
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-semibold text-white px-2 py-1 rounded-full ${
                  score >= 60 ? "bg-blue-600" : "bg-red-600"
                }`}
              >
                {score}
              </span>
              <button className="bg-green-500 text-white rounded-full p-1">
                <FaEye />
              </button>
            </div>
          </div>
        );
      }

      case "payrolls": {
        const salary = getSalary();
        const status = getStatus();
        return (
          <div
            key={key}
            className="flex justify-between items-center bg-sky-100 px-3 py-2 rounded-md"
          >
            {commonLeft}
            <div>
              <p className="text-xs text-gray-500">Salary Amount: {salary}</p>
            </div>
            <div
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                status === "Paid" ? "text-green-700" : "text-yellow-800"
              }`}
            >
              {status}
            </div>
          </div>
        );
      }

      case "jobs":
      default:
        return (
          <div
            key={key}
            className="flex justify-between items-center bg-sky-100 px-3 py-2 rounded-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border p-1">
                🏢
              </div>
              <div>
                <p className="font-semibold text-sm">{user.jobTitle}</p>
                <p className="text-xs text-gray-500">{user.department}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">10 mins ago</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full w-full overflow-y-scroll flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="flex flex-col gap-8 px-4 py-6 w-full max-w-7xl">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard
              icon={<IoMailUnread className="w-10 h-10 mr-4 -rotate-12" />}
              value="138"
              label="Messages"
              bg="bg-yellow-400"
              text="text-black"
            />
            <SummaryCard
              icon={<FaSuitcase className="w-10 h-10 mr-4 -rotate-12" />}
              value="50"
              label="Jobs"
              bg="bg-blue-800"
              text="text-white"
            />
            <SummaryCard
              icon={<IoPeopleSharp className="w-10 h-10 mr-4" />}
              value="100"
              label="Candidates"
              bg="bg-green-600"
              text="text-white"
            />
          </div>

          {/* Dashboard Sections in 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SECTIONS.map(({ title, type }) => (
              <div key={type} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">{title}</h2>
                  <button
                    onClick={() => openModal(type, title)}
                    className="text-sm text-blue-600 underline"
                  >
                    See More
                  </button>
                </div>
                <div className="space-y-3">
                  {users
                    .slice(0, MAX_ITEMS)
                    .map((user, idx) => renderUserItem(user, type, idx))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={modal.close}
        title={modalContent?.title || ""}
      >
        <div className="space-y-3">
          {modalContent?.users.map((user, idx) =>
            renderUserItem(user, modalContent.type, idx)
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Home;