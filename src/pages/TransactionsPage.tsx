import { useEffect, useState } from "react";
import { TransactionList } from "../components/transactions/TransactionList";
import { groupByDate } from "../services/TransactionService";
import useAuthStore from "../store/authStore";
import { GroupByDateResp } from "../types/transactionServiceTypes";

export default function TransactionsPage() {
  const { token } = useAuthStore();
  const [transactions, setTransactions] = useState<GroupByDateResp>({});

  useEffect(() => {
    groupByDate(1, token)
      .then((result) => {
        setTransactions(result);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <TransactionList transactions={transactions} />
    </div>
  );
}
