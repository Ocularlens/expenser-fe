import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Category as CategoryType } from "../../types/entities";

type Props = {
  category: CategoryType;
};

export default function Category({ category }: Props) {
  return (
    <div className="flex flex-row bg-[#FFF] p-4">
      <div className="basis-1/2">{category.name}</div>
      <div className="basis-1/2 flex text-2xl justify-end">
        <Link to={`/update-category/${category.id}`} className="text-[blue]">
          <FaRegEdit />
        </Link>
      </div>
    </div>
  );
}
