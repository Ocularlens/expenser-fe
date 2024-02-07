import { TransactionType } from "../../enum/transactionType";
import { Transaction as Model } from "../../types/entities";
import NumberFormatter from "../../utils/NumberFormat";

type Props = {
  transaction: Model;
};

export default function Transaction({ transaction }: Props) {
  const symbol =
    transaction.category.type === TransactionType.CREDIT ? "-" : "+";

  return (
    <div className="flex flex-row bg-[#FFF] border-b border-[#CADCFC]">
      <div className="basis-1/2 pl-4 p-5">
        <div className="font-bold text-xl">{transaction.category.name}</div>
        <div className="text-xs">{transaction.notes}</div>
      </div>
      <div
        className={`basis-1/2 p-5 text-right ${
          transaction.category.type === TransactionType.CREDIT
            ? "text-[red]"
            : "text-[green]"
        }`}
      >
        {symbol} PHP {NumberFormatter(transaction.amount, 2)}
      </div>
    </div>
  );
}
