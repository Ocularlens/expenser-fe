import { GroupByDateResp } from "../../types/transactionServiceTypes";
import Transaction from "./Transaction";

type Props = {
  transactions: GroupByDateResp;
  deleteTransaction(id: number): void;
};

export function TransactionList({ transactions, deleteTransaction }: Props) {
  const transactionArray = Object.entries(transactions).map(([key, data]) => {
    return { data, key };
  });

  if (transactionArray.length === 0) {
    return (
      <div className="flex justify-center mt-3 font-semibold">
        NO TRANSACTIONS FOUND FOR THIS MONTH
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {transactionArray.length > 0 &&
        transactionArray.map(({ key, data }) => {
          return (
            <div className="mb-1" key={key}>
              <div className="bg-[#00246B] text-[#FFF] font-bold p-2 pl-4">
                {key}
              </div>
              {data.map((transaction) => (
                <Transaction
                  deleteTransaction={deleteTransaction}
                  transaction={transaction}
                  key={transaction.id}
                />
              ))}
            </div>
          );
        })}
    </div>
  );
}
