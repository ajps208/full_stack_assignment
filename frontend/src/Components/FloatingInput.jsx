import { memo } from "react";

export const FloatingInput = memo(
  ({ label, type = "text", value, error, onChange }) => {
    return (
      <div className="relative mb-6">
        <input
          type={type}
          value={value}
          placeholder=" "
          onChange={onChange}
          className="peer w-full py-2 bg-transparent border-b-2 border-gray-100 outline-none focus:border-blue-600 transition"
        />

        <label
          className="absolute left-0 top-2 text-gray-400 text-sm transition-all
          peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600
          peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
        >
          {label}
        </label>

        {error && (
          <p className="text-[10px] text-red-500 mt-1 font-semibold uppercase">
            {error}
          </p>
        )}
      </div>
    );
  },
);
