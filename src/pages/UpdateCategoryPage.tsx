import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryForm from "../components/categories/CategoryForm";
import AuthError from "../errors/AuthError";
import { retrieveCategory } from "../services/CategoryService";
import useAuthStore from "../store/authStore";
import { Category } from "../types/entities";

export default function UpdateCategoryPage() {
  const { setToken } = useAuthStore();
  const [category, setCategory] = useState<Category>();

  const { id } = useParams();

  useEffect(() => {
    retrieveCategory(id as unknown as number)
      .then((result) => setCategory(result))
      .catch((error) => {
        if (error instanceof AuthError) return setToken("");
        console.log(error);
      });
  }, [id, setToken]);

  return (
    <>
      <CategoryForm category={category} />
    </>
  );
}
