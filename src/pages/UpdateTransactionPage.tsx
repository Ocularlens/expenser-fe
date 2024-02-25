import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TransactionForm from "../components/transactions/TransactionForm";
import { retrieveCategories } from "../services/CategoryService";
import { retrieveTransaction } from "../services/TransactionService";
import useAuthStore from "../store/authStore";
import { Category, Transaction } from "../types/entities";

export default function UpdateTransactionPage() {
  const { token } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [transaction, setTransaction] = useState<Transaction>();

  const { id } = useParams();

  useEffect(() => {
    retrieveTransaction(token, id as unknown as number)
      .then((result) => setTransaction(result))
      .catch((error) => console.log(error));
  }, [id, token]);

  // retrieveCategories
  useEffect(() => {
    retrieveCategories(token)
      .then((result) => {
        setCategories(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <>
      <TransactionForm
        transaction={transaction}
        categories={categories}
        token={token}
      />
    </>
  );
}
