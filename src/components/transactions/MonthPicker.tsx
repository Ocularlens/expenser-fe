import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  updateMonth(month: number): void;
};

export default function MonthPicker({ updateMonth }: Props) {
  const [date, setDate] = useState(new Date());

  const increaseDate = () => {
    setDate((date) => {
      let newDate = new Date(date);
      const newMonth = newDate.getMonth() + 1;
      newDate = new Date(newDate.setMonth(newMonth));
      return newDate;
    });
  };

  const decreaseDate = () => {
    setDate((date) => {
      let newDate = new Date(date);
      const newMonth = newDate.getMonth() - 1;
      newDate = new Date(newDate.setMonth(newMonth));
      return newDate;
    });
  };

  useEffect(() => {
    updateMonth(date.getMonth() + 1);
  }, [date, updateMonth]);

  return (
    <div className="flex flex-row bg-[#FFF] mb-2 border rounded-md">
      <div className="basis-1/4 flex justify-center">
        <button className="text-5xl" onClick={decreaseDate}>
          <FaChevronLeft />
        </button>
      </div>
      <div className="basis-1/2 flex justify-center items-center font-bold">
        {date.toLocaleString("default", { month: "long" }).toUpperCase()}{" "}
        {date.getFullYear()}
      </div>
      <div className="basis-1/4 flex justify-center">
        <button className="text-5xl" onClick={increaseDate}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
