import { IoIosAddCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddButton() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (location.pathname === "/my-categories")
      return navigate("/new-category");

    return navigate("/new-transaction");
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
