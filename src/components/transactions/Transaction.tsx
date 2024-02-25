import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { TransactionType } from "../../enum/transactionType";
import { Transaction as Model } from "../../types/entities";
import NumberFormatter from "../../utils/NumberFormat";

type Props = {
  transaction: Model;
  deleteTransaction(id: number): void;
};

export default function Transaction({ transaction, deleteTransaction }: Props) {
  const symbol =
    transaction.category.type === TransactionType.CREDIT ? "-" : "+";

  return (
    <div className="flex flex-row bg-[#FFF] border-b border-[#CADCFC]">
      <div className="basis-1/2 pl-4 p-5">
        <div className="font-bold text-xl">{transaction.category.name}</div>
        <div className="text-xs">{transaction.notes}</div>
      </div>
      <div className="flex flex-col basis-1/2 p-5 text-right">
        <div className="flex text-2xl justify-end">
          <Link
            to={`/update-transaction/${transaction.id}`}
            className="text-[blue]"
          >
            <FaRegEdit />
          </Link>
          <button
            className="text-[red]"
            onClick={() => {
              deleteTransaction(transaction.id as number);
            }}
          >
            <MdOutlineDeleteForever />
          </button>
        </div>
        <div
          className={`${
            transaction.category.type === TransactionType.CREDIT
              ? "text-[red]"
              : "text-[green]"
          }`}
        >
          {symbol} PHP {NumberFormatter(transaction.amount, 2)}
        </div>
      </div>
    </div>
  );
}
