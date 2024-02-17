import { useEffect, useState } from "react";
import TransactionForm from "../components/transactions/TransactionForm";
import { retrieveCategories } from "../services/CategoryService";
import useAuthStore from "../store/authStore";
import { Category } from "../types/entities";

export default function NewTransactionPage() {
  const { token } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);

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
      <TransactionForm categories={categories} token={token} />
    </>
  );
}
