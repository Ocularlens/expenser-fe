import { useEffect, useState } from "react";
import CategoryList from "../components/categories/CategoryList";
import AuthError from "../errors/AuthError";
import { retrieveCategories } from "../services/CategoryService";
import useAuthStore from "../store/authStore";
import { Category } from "../types/entities";

export default function UserCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { setToken } = useAuthStore();

  useEffect(() => {
    retrieveCategories(true)
      .then((result) => setCategories(result))
      .catch((error) => {
        if (error instanceof AuthError) return setToken("");
        console.log(error);
      });
  }, [setToken]);

  return <CategoryList categories={categories} />;
}
