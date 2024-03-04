import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TransactionForm from "../components/transactions/TransactionForm";
import AuthError from "../errors/AuthError";
import { retrieveCategories } from "../services/CategoryService";
import { retrieveTransaction } from "../services/TransactionService";
import useAuthStore from "../store/authStore";
import { Category, Transaction } from "../types/entities";

export default function UpdateTransactionPage() {
  const { token, setToken } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [transaction, setTransaction] = useState<Transaction>();

  const { id } = useParams();

  useEffect(() => {
    retrieveTransaction(id as unknown as number)
      .then((result) => setTransaction(result))
      .catch((error) => console.log(error));
  }, [id, token]);

  // retrieveCategories
  useEffect(() => {
    retrieveCategories()
      .then((result) => {
        setCategories(result);
      })
      .catch((error) => {
        if (error instanceof AuthError) return setToken("");
        console.log(error);
      });
  }, [token, setToken]);

  return (
    <>
      <TransactionForm transaction={transaction} categories={categories} />
    </>
  );
}
