import { useEffect, useState } from "react";
import CategoryList from "../components/categories/CategoryList";
import { retrieveCategories } from "../services/CategoryService";
import useAuthStore from "../store/authStore";
import { Category } from "../types/entities";

export default function UserCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { token } = useAuthStore();

  useEffect(() => {
    retrieveCategories(token, true)
      .then((result) => setCategories(result))
      .catch((error) => console.log(error));
  }, [token]);

  console.log(categories);

  return <CategoryList categories={categories} />;
}
