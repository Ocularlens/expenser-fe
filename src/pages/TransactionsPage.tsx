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
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdate = useCallback(
    (month: number) => {
      setSearchParams({ month: month.toString() });

      // Navigate to the same page with updated query parameters
      navigate({ search: `?month=${month}` });
    },
    [navigate, setSearchParams]
  );

  const month = !searchParams.get("month")
    ? null
    : Number(searchParams.get("month"));

  useEffect(() => {
    setIsLoading(true);

    if (month)
      groupByDate(month, token)
        .then((result) => {
          setTransactions(result);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(true);
          console.log(error);
        });
  }, [token, month]);

  return (
    <>
      <MonthPicker updateMonth={handleUpdate} />
      {isLoading && (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!isLoading && <TransactionList transactions={transactions} />}
    </>
  );
}
