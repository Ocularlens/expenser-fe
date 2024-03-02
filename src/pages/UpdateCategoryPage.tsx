import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryForm from "../components/categories/CategoryForm";
import { retrieveCategory } from "../services/CategoryService";
import useAuthStore from "../store/authStore";
import { Category } from "../types/entities";

export default function UpdateCategoryPage() {
  const { token } = useAuthStore();
  const [category, setCategory] = useState<Category>();

  const { id } = useParams();

  useEffect(() => {
    retrieveCategory(id as unknown as number, token)
      .then((result) => setCategory(result))
      .catch((error) => console.log(error));
  }, [id, token]);

  return (
    <>
      <CategoryForm category={category} token={token} />
    </>
  );
}
