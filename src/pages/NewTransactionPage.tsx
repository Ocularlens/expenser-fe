import { useEffect, useState } from "react";
import TransactionForm from "../components/transactions/TransactionForm";
import AuthError from "../errors/AuthError";
import { retrieveCategories } from "../services/CategoryService";
import useAuthStore from "../store/authStore";
import { Category } from "../types/entities";

export default function NewTransactionPage() {
  const { setToken } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    retrieveCategories()
      .then((result) => {
        setCategories(result);
      })
      .catch((error) => {
        if (error instanceof AuthError) return setToken("");
        console.log(error);
      });
  }, [setToken]);

  return (
    <>
      <TransactionForm categories={categories} />
    </>
  );
}
