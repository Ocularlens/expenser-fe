import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import Spinner from "../components/Spinner";
import MonthPicker from "../components/transactions/MonthPicker";
import { TransactionList } from "../components/transactions/TransactionList";
import AuthError from "../errors/AuthError";
import { deleteTransaction, groupByDate } from "../services/TransactionService";
import useAuthStore from "../store/authStore";
import { GroupByDateResp } from "../types/transactionServiceTypes";

export default function TransactionsPage() {
  const { token, setToken } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<GroupByDateResp>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number>();

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
      groupByDate(month)
        .then((result) => {
          setTransactions(result);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error instanceof AuthError) return setToken("");
          console.log(error);
        });
  }, [token, month, setToken]);

  const openModal = async (id: number) => {
    setIsModal(true);
    setIdToDelete(id);
  };

  const handleDelete = async () => {
    setIsModal(false);
    try {
      await deleteTransaction(idToDelete as number);
      setTransactions((prev) => {
        const transactions = prev;
        const newTransactions: GroupByDateResp = {};
        Object.entries(transactions).forEach(([key, transactionList]) => {
          const index = transactionList.findIndex(
            (transaction) => transaction.id === idToDelete
          );

          if (index !== -1) {
            transactionList.splice(index, 1);
          }

          if (transactionList.length !== 0) {
            newTransactions[key] = transactionList;
          }
        });
        return newTransactions;
      });
    } catch (error) {
      if (error instanceof AuthError) return setToken("");
      console.log(error);
    }
  };

  const closeModal = () => setIsModal(false);

  return (
    <>
      <MonthPicker updateMonth={handleUpdate} />
      {isLoading && (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <>
          <TransactionList
            deleteTransaction={openModal}
            transactions={transactions}
          />
          <ConfirmationModal
            message="Are you sure you want to delete this transaction?"
            title="Delete Transaction"
            isOpen={isModal}
            closeModal={closeModal}
            confirm={handleDelete}
          />
        </>
      )}
    </>
  );
}
