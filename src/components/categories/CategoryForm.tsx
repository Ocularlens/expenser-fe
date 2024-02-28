import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TransactionType } from "../../enum/transactionType";
import { addCategory } from "../../services/CategoryService";
import { ICategoryForm } from "../../types/categoryTypes";

type Props = {
  token: string;
};

export default function CategoryForm({ token }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICategoryForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ICategoryForm> = (data) => {
    console.log(data);

    const handleApiRequest = new Promise<void>((resolve, reject) => {
      addCategory(data, token)
        .then(() => resolve())
        .catch((error) => reject(error));
    });

    handleApiRequest
      .then(() => {
        navigate("/my-categories");
      })
      .catch((error) => console.log(error));
  };

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
            <p className="mt-2 mb-2 pl-2 text-red-500">{errors.categoryName.message}</p>
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
