import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TransactionType } from "../../enum/transactionType";
import AuthError from "../../errors/AuthError";
import { addCategory, updateCategory } from "../../services/CategoryService";
import useAuthStore from "../../store/authStore";
import { ICategoryForm } from "../../types/categoryTypes";
import { Category } from "../../types/entities";

type Props = {
  category?: Category;
};

export default function CategoryForm({ category }: Props) {
  const { setToken } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ICategoryForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ICategoryForm> = (data) => {
    const handleApiRequest = new Promise<void>((resolve, reject) => {
      if (!category)
        return addCategory(data)
          .then(() => resolve())
          .catch((error) => reject(error));

      return updateCategory(data, category.id as unknown as number)
        .then(() => resolve())
        .catch((error) => reject(error));
    });

    handleApiRequest
      .then(() => {
        navigate("/my-categories");
      })
      .catch((error) => {
        if (error instanceof AuthError) return setToken("");
        console.log(error);
      });
  };

  useEffect(() => {
    if (category) {
      Object.entries(category).forEach(([key, value]) => {
        if (key === "name") return setValue("categoryName", value);
        return setValue(key as keyof ICategoryForm, value);
      });
    }
  }, [category, setValue]);

  return (
    <div className="mt-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4 rounded-md bg-[#FFF]">
          <div className="flex flex-col border rounded-md p-2 mb-2 focus-within:border-[#8AB6F9]">
            <label className="text-sm font-bold ml-2">Category Type</label>
            <select
              className="text-xl ml-2 mr-2 focus:outline-0 focus:bg-none"
              {...register("type", { required: "Type is required" })}
            >
              {(
                Object.keys(TransactionType) as Array<
                  keyof typeof TransactionType
                >
              ).map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col border rounded-md p-2 mb-2 focus-within:border-[#8AB6F9]">
            <label className="text-sm font-bold ml-2">Category Name</label>
            <input
              className="text-xl ml-2 mr-2 focus:outline-0 focus:bg-none"
              autoComplete="off"
              type="text"
              placeholder="Enter name"
              {...register("categoryName", {
                required: "Name is is required",
                minLength: {
                  value: 6,
                  message: "Name should atleast be 6 characters long",
                },
              })}
            />
          </div>
          {errors.categoryName && (
            <p className="mt-2 mb-2 pl-2 text-red-500">
              {errors.categoryName.message}
            </p>
          )}
          <button
            type="submit"
            className="bg-[#8AB6F9] rounded-md items-center w-full p-4 text-white font-bold"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
}
