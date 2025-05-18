import { useState,useMemo } from "react";
import { FaFilter } from "react-icons/fa";
import Modal from "react-modal";
import DataTable from "react-data-table-component";
import userData from "../Dummy Data/users.json";
import { useModal } from "../utils/hooks/useModal";
import { useExportCSV } from "../utils/hooks/useExportCSV";
import { useUserTableColumns } from "../utils/hooks/useUserTableColumns";
import type { User } from "../utils/types";

Modal.setAppElement("#root");

const customStyles = {
  rows: {
    style: {
      minHeight: "60px",
      backgroundColor: "#f9fbfd",
      fontWeight: "500",
      borderBottom: "none !important",
      "&:nth-child(odd)": {
        backgroundColor: "#adc3f3",
        borderRadius: "0.5rem",
        margin: "8px 0 8px",
      },
    },
  },
  headCells: {
    style: { backgroundColor: "#e6f0fd", fontWeight: "bold", fontSize: "16px" },
  },
  cells: { style: { fontSize: "14px", color: "#111827" } },
};

const DashboardEM = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filterModal = useModal();
  const detailModal = useModal();
  const exportCSV = useExportCSV(userData);
  const columns = useUserTableColumns();

  // optimized for performance uses O(1) time complexity instead of O(n)
  // to get the user data from the userData array
  const userMap = useMemo(() => {
    const map = new Map<string, User>();
    userData.forEach((user) => map.set(user.id, user));
    return map;
  }, []);


  const handleRowClick = (row: User) => {
    const user = userMap.get(row.id); // Fetch by ID
    if (user) {
      setSelectedUser(user);
      detailModal.open();
    }
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Dashboard / Employee Management
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
          <h2 className="text-xl font-semibold">Employee Management</h2>

          <div className="flex gap-4 items-center">
            <button
              onClick={filterModal.open}
              className="bg-gray-200 px-3 py-2 rounded-md flex items-center gap-2 text-black"
            >
              <FaFilter /> Filter
            </button>

            <button
              onClick={exportCSV}
              className="bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Export CSV
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={userData}
          onRowClicked={handleRowClick}
          pagination
          customStyles={customStyles}
          highlightOnHover
          pointerOnHover
          responsive
        />
      </div>

      {/* Filter Modal */}
      <Modal
        isOpen={filterModal.isOpen}
        onRequestClose={filterModal.close}
        className="max-w-lg mx-auto bg-white p-6 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black/30 flex items-center justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Filter Employees</h2>
        <input
          className="w-full border px-3 py-2 mb-3 rounded"
          placeholder="Search by Name"
        />
        <select className="w-full border px-3 py-2 rounded mb-3">
          <option value="">Select Department</option>
          <option value="Design">Design</option>
          <option value="IT">IT</option>
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={filterModal.close}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Close
          </button>
          <button className="px-4 py-2 rounded bg-blue-600 text-white">
            Apply
          </button>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={detailModal.isOpen}
        onRequestClose={detailModal.close}
        className="max-w-lg mx-auto bg-white p-6 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center"
      >
        {selectedUser && (
          <div className="space-y-2">
            <h2 className="text-xl font-bold">
              {selectedUser.firstName} {selectedUser.lastName}
            </h2>
            <p>
              <strong>Email:</strong> {selectedUser.Email}
            </p>
            <p>
              <strong>Dept:</strong> {selectedUser.department}
            </p>
            <p>
              <strong>Job Title:</strong> {selectedUser.jobTitle}
            </p>
            <p>
              <strong>Start:</strong> {selectedUser.startDate}
            </p>
            <p>
              <strong>Category:</strong> {selectedUser.category}
            </p>
            <p>
              <strong>Gender:</strong> {selectedUser.gender}
            </p>
            <p>
              <strong>Admin:</strong> {selectedUser.isAdmin ? "Yes" : "No"}
            </p>
            <div className="text-right">
              <button
                onClick={detailModal.close}
                className="mt-4 px-4 py-2 bg-gray-200 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashboardEM;
