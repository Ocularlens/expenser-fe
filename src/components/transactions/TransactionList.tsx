import { GroupByDateResp } from "../../types/transactionServiceTypes";
import Transaction from "./Transaction";

type Props = {
  transactions: GroupByDateResp;
};

export function TransactionList({ transactions }: Props) {
  const transactionArray = Object.entries(transactions).map(([key, data]) => {
    return { data, key };
  });

  return (
    <div className="flex flex-col">
      {transactionArray.length > 1 &&
        transactionArray.map(({ key, data }) => {
          return (
            <div className="mb-1" key={key}>
              <div className="bg-[#00246B] text-[#FFF] font-bold p-2 pl-4">{key}</div>
              {data.map((transaction) => (
                <Transaction transaction={transaction} key={transaction.id}/>
              ))}
            </div>
          );
        })}
    </div>
  );
}
