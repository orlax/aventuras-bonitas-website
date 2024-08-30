import React from "react";

export const PrimarySelect = () => {
  return (
    <select className="bg-transparent text-white border-0 outline-none transition-all">
      <option value="0" selected className="transition-all m-4">
        Choose an option
      </option>
    </select>
  );
};
