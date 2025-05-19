import { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";

export function useSearchFilter(options: string[]) {
  const [selected, setSelected] = useState(options[0]);
  const [search, setSearch] = useState("");

  const SearchComponent = () => (
    <div className="flex w-full max-w-2xl h-12 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Dropdown */}
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative min-w-[150px] w-1/3 h-full">
          <ListboxButton className="bg-blue-900 text-white w-full h-full px-4 py-2 text-left text-sm font-semibold flex justify-between items-center">
            {selected}
            <div className="flex flex-col">
              <FaChevronUp className="ml-2 text-xs" />
              <FaChevronDown className="ml-2 text-xs" />
            </div>
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 w-full bg-white border shadow-lg rounded-md overflow-hidden text-sm">
            {options.map((option) => (
              <ListboxOption
                key={option}
                value={option}
                className={({ selected: isSelected, active }) =>
                  `cursor-pointer px-4 py-2 ${
                    active
                      ? "bg-blue-100 text-blue-900"
                      : isSelected
                      ? "bg-blue-50 font-medium"
                      : "text-black"
                  }`
                }
              >
                {option}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      {/* Search Input */}
      <div className="flex-1 flex max-lg:w-2/3 lg:w-[400px] h-full items-center px-3 py-2 text-gray-600 bg-white">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-full outline-none text-sm placeholder-gray-400"
        />
        <FaSearch className="text-lg ml-2 text-gray-400" />
      </div>
    </div>
  );

  return { selected, search, SearchComponent };
}
