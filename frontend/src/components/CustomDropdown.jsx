import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Custom Dropdown compatible with React Hook Form
const CustomDropdown = ({ options, value, onChange, error }) => {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find((opt) => opt.label === value);

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`w-full flex justify-between items-center border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-300"
                    }`}
            >
                <div className="flex items-center gap-2">
                    {selectedOption?.icon}
                    <span>{selectedOption?.label || "Select..."}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}

            {open && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {options.map((opt) => (
                        <li
                            key={opt.label}
                            className="px-4 py-2 flex items-center gap-2 hover:bg-indigo-100 cursor-pointer"
                            onClick={() => {
                                onChange(opt.label);
                                setOpen(false);
                            }}
                        >
                            {opt.icon}
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;