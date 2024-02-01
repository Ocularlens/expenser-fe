import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div className="border border-[#00246B] rounded-lg bg-[#FFF] p-3 mt-20">
      {children}
    </div>
  );
}
