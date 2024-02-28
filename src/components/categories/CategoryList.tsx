import { useEffect, useState } from "react";
import { TransactionType } from "../../enum/transactionType";
import { Category as CategoryType } from "../../types/entities";
import Category from "./Category";

type Props = {
  categories: CategoryType[];
};

export default function CategoryList({ categories }: Props) {
  const [debits, setDebits] = useState<CategoryType[]>([]);
  const [credits, setCredits] = useState<CategoryType[]>([]);

  useEffect(() => {
    setDebits(() => {
      return categories.filter(
        (category) => category.type === TransactionType.DEBIT
      );
    });

    setCredits(() => {
      return categories.filter(
        (category) => category.type === TransactionType.CREDIT
      );
    });
  }, [categories]);

  return (
    <div className="flex flex-col">
      <div>
        <button>Add Category</button>
      </div>
      <div className="mb-2">
        <div className="bg-[#00246B] p-4 text-[#FFF] font-semibold text-center">
          CREDIT
        </div>
        <div>
          {credits.map((credit) => (
            <Category category={credit} />
          ))}
        </div>
      </div>
      <div className="mb-2">
        <div className="bg-[#00246B] p-4 text-[#FFF] font-semibold text-center">
          DEBIT
        </div>
        <div>
          {debits.map((debit) => (
            <Category category={debit} />
          ))}
        </div>
      </div>
    </div>
  );
}
