import { Category as CategoryType } from "../../types/entities";

type Props = {
  category: CategoryType;
};

export default function Category({ category }: Props) {
  return <div className="bg-[#FFF] p-4">{category.name}</div>;
}
