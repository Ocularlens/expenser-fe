import CategoryForm from "../components/categories/CategoryForm";
import useAuthStore from "../store/authStore";

export default function AddCategoryPage() {
  const { token } = useAuthStore();
  return (
    <>
      <CategoryForm token={token} />
    </>
  );
}
