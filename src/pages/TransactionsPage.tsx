import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import MonthPicker from "../components/transactions/MonthPicker";
import { TransactionList } from "../components/transactions/TransactionList";
import { groupByDate } from "../services/TransactionService";
import useAuthStore from "../store/authStore";
import { GroupByDateResp } from "../types/transactionServiceTypes";

export default function TransactionsPage() {
  const { token } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<GroupByDateResp>({});
  const [monthIndex, setMonthIndex] = useState(
    Number(searchParams.get("month")) || 1
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdate = useCallback(
    (month: number) => {
      setSearchParams({ month: month.toString() });

      // Navigate to the same page with updated query parameters
      navigate({ search: `?month=${month}` });

      setMonthIndex(month);
    },
    [navigate, setSearchParams]
  );

  useEffect(() => {
    const month = !searchParams.get("month")
      ? 1
      : Number(searchParams.get("month"));

    setIsLoading(true);

    groupByDate(month, token)
      .then((result) => {
        setTransactions(result);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(true);
        console.log(error);
      });
  }, [token, monthIndex, searchParams]);

  return (
    <div>
      <MonthPicker updateMonth={handleUpdate} />
      {isLoading && (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!isLoading && <TransactionList transactions={transactions} />}
    </div>
  );
}
