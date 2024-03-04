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
    <div className="flex flex-col mb-20">
      <div className="mb-2 h-auto">
        <div className="bg-[#00246B] p-4 text-[#FFF] font-semibold text-center">
          CREDIT
        </div>
        <div>
          {credits.length > 0 &&
            credits.map((credit) => (
              <Category key={`${credit.id}-credit`} category={credit} />
            ))}
          {credits.length === 0 && (
            <div className="bg-[#FFF] p-4 text-center font-bold">N/A</div>
          )}
        </div>
      </div>
      <div className="mb-2 h-auto">
        <div className="bg-[#00246B] p-4 text-[#FFF] font-semibold text-center">
          DEBIT
        </div>
        <div>
          {debits.length > 0 &&
            debits.map((debit) => (
              <Category key={`${debit.id}-debit`} category={debit} />
            ))}
          {debits.length === 0 && (
            <div className="bg-[#FFF] p-4 text-center font-bold">N/A</div>
          )}
        </div>
      </div>
    </div>
  );
}
