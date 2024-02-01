import React from "react";

type Props = {
  setShowPass(state: React.SetStateAction<boolean>): void;
};

export default function CheckBox({ setShowPass }: Props) {
  return (
    <div className="mb-2 pl-2">
      <input
        type="checkbox"
        onChange={() => {
          setShowPass((prev) => !prev);
        }}
        className="bg-[#00246B] h-5 w-5"
      />
      <label className="ml-2 text-[#00246B] font-semibold">Show Password</label>
    </div>
  );
}
