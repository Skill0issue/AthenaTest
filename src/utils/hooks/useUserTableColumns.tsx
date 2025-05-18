import { FaChevronDown } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type { User } from "../types";

export const useUserTableColumns = () => {
  return [
    { 
      name: "Name(s)",
      selector: (row: User) => row.firstName + " " + row.lastName,
      sortable: true,
      grow: 2,
    },
    {
      name: "Dept",
      selector: (row: User) => row.department || "Design",
      sortable: true,
    },
    {
      name: "Job Title",
      selector: (row: User) => row.jobTitle || "UI UX Designer",
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row: User) => row.startDate || "28/04/2022",
      sortable: true,
    },
    {
      name: "Category",
      selector: (row: User) => row.category || "Full time",
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row: User) => row.gender || "Male",
      sortable: true,
    },
    {
      name: "Actions",
      cell: () => (
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="bg-blue-600 w-32 flex items-center justify-center gap-3 text-white px-3 py-1 rounded-md">
            <div className="h-full w-full py-1">Action</div>{" "}
            <FaChevronDown className="w-4 h-3 p-0.5 rounded-full  bg-white text-black" />
          </MenuButton>
          <MenuItems className="absolute top-7 mt-2 w-32 origin-top-right bg-blue-600 text-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-10">
            <div className="py-1">
              <MenuItem>
                {({ active }) => (
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      active ? "bg-blue-100" : ""
                    }`}
                  >
                    View Profile
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      active ? "bg-blue-100" : ""
                    }`}
                  >
                    Edit Profile
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      ),
    },
  ];
};
