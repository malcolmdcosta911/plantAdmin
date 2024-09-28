import { CategoryInterface } from "@/models/PlantModel";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const MultiSelectDropdown = ({
  options,
  onChange,
  defaultValue,
}: {
  options: CategoryInterface[];
  onChange: (value: string[]) => void;
  defaultValue: string[];
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility

  useEffect(() => {
    if (defaultValue?.length) {
      setSelectedOptions(defaultValue);
    }
  }, [defaultValue]);

  function handleChange(e) {
    const isChecked = e.target.checked;
    const option = e.target.value;

    const selectedOptionSet = new Set([...selectedOptions]);

    if (isChecked) {
      selectedOptionSet.add(option);
    } else {
      selectedOptionSet.delete(option);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  }

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <div className="relative w-80">
    //   <button
    //     type="button"
    //     onClick={toggleDropdown}
    //     className="bg-white text-left rounded-md px-4 py-2 w-full text-sm font-medium text-black hover:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
    //   >
    //     {/* {selectedOptions?.length > 0
    //       ? selectedOptions.join(", ")
    //       : "Select options"} */}
    //     {selectedOptions?.length && options?.length > 0
    //       ? selectedOptions
    //           .map(
    //             (optionId) =>
    //               options.find((option) => option._id === optionId)?.name
    //           )
    //           .join(", ")
    //       : "Select options"}
    //   </button>
    //   {isOpen && (
    //     <ul className="absolute left-0 mt-2 w-full bg-white shadow-lg max-h-20 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
    //       {options?.length > 0
    //         ? options.map((option, index) => (
    //             <li
    //               key={index}
    //               className="cursor-pointer select-none relative py-2 pl-3 pr-9"
    //             >
    //               <div className="flex items-center">
    //                 <input
    //                   checked={selectedOptions.includes(option._id)}
    //                   type="checkbox"
    //                   className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
    //                   onChange={handleChange}
    //                   value={option._id}
    //                 />
    //                 <span className="ml-2 block truncate">{option.name}</span>
    //               </div>
    //             </li>
    //           ))
    //         : null}
    //     </ul>
    //   )}
    // </div>
    <Popover>
      <PopoverTrigger className="block px-4 py-2  text-left bg-white rounded-md w-80 text-sm font-medium text-black hover:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black">
        <div
        //className="bg-white text-left rounded-md px-4 py-2 w-full text-sm font-medium text-black hover:bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black"
        >
          {selectedOptions?.length && options?.length > 0
            ? selectedOptions
                .map(
                  (optionId) =>
                    options.find((option) => option._id === optionId)?.name
                )
                .join(", ")
            : "Select options"}
        </div>
      </PopoverTrigger>
      <PopoverContent className=" max-h-24 overflow-auto p-1  bg-white w-80">
        <ul
        // className="w-full"
        //className="absolute left-0 mt-2 w-full bg-white shadow-lg max-h-20 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          {options?.length > 0
            ? options.map((option, index) => (
                <li
                  key={index}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9"
                >
                  <div className="flex items-center">
                    <input
                      checked={selectedOptions.includes(option._id)}
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-black transition duration-150 ease-in-out accent-black"
                      onChange={handleChange}
                      value={option._id}
                    />
                    <span className="ml-2 block truncate">{option.name}</span>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelectDropdown;
