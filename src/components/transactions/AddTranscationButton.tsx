import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function AddTransactionButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/new-transaction");
  };

  return (
    <div className="bottom-5 right-5 opacity-100 fixed">
      <button
        className="animate-bounce text-5xl text-[#8AB6F9] bg-[#00246B] p-3 rounded-full"
        onClick={handleClick}
      >
        <IoIosAddCircleOutline />
      </button>
    </div>
  );
}
