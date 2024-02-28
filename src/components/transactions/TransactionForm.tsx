import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TransactionType } from "../../enum/transactionType";
import {
  addTransaction,
  updateTransaction,
} from "../../services/TransactionService";
import { Category, Transaction } from "../../types/entities";
import { ITransactionForm } from "../../types/transactionTypes";

type Props = {
  categories: Category[];
  token: string;
  transaction?: Transaction;
};

export default function TransactionForm({
  categories,
  token,
  transaction,
}: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ITransactionForm>();
  const [transactionType, setTransactionType] = useState(
    TransactionType.CREDIT
  );
  const navigate = useNavigate();
  const handleSetType = (type: TransactionType) => setTransactionType(type);

  const borderBottomColor =
    transactionType === TransactionType.CREDIT
      ? "border-[#FF3131]"
      : "border-[#228B22]";

  const onSubmit: SubmitHandler<ITransactionForm> = (data) => {
    if (data.notes === "") delete data.notes;

    const handleApiRequest = new Promise<void>((resolve, reject) => {
      if (!transaction)
        return addTransaction(data, token)
          .then(() => resolve())
          .catch((error) => reject(error));

      return updateTransaction(data, token, transaction.id as unknown as number)
        .then(() => resolve())
        .catch((error) => reject(error));
    });

    handleApiRequest
      .then(() => {
        navigate("/transactions");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (transaction) {
      Object.entries(transaction).forEach(([key, value]) => {
        if (key === "category") {
          return setValue("categoryId", value?.id);
        }
        if (key === "transactionDate")
          return setValue("transactionDate", new Date(value));
        return setValue(key as keyof ITransactionForm, value);
      });

      setTransactionType(transaction.category.type);
    }
  }, [transaction, setValue]);

  return (
    <div className="bg-[#FFF] rounded-md mt-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`flex flex-row w-full border-b ${borderBottomColor} p-4 pb-0 mb-3`}
        >
          <div className="flex justify-center basis-1/2">
            <button
              className={`${
                transactionType === TransactionType.CREDIT ? "font-bold" : ""
              }`}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                handleSetType(TransactionType.CREDIT);
              }}
            >
              CREDIT
            </button>
          </div>
          <div className="flex justify-center basis-1/2">
            <button
              className={`${
                transactionType === TransactionType.DEBIT ? "font-bold" : ""
              }`}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                handleSetType(TransactionType.DEBIT);
              }}
            >
              DEBIT
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex flex-col border rounded-md p-2 mb-2 focus-within:border-[#8AB6F9]">
            <label className="text-sm font-bold ml-2">Amount</label>
            <input
              className="text-xl ml-2 mr-2 focus:outline-0 focus:bg-none"
              autoComplete="off"
              type="number"
              placeholder="Enter amount"
              step="0.01"
              {...register("amount", {
                required: "Amount is is required",
                min: 1,
              })}
            />
          </div>
          {errors.amount && (
            <p className="mt-2 mb-2 pl-2 text-red-500">
              {errors.amount.message}
            </p>
          )}
          <div className="flex flex-col border rounded-md p-2 mb-2 focus-within:border-[#8AB6F9]">
            <label className="text-sm font-bold ml-2">Category</label>
            <select
              className="text-xl ml-2 mr-2 focus:outline-0 focus:bg-none"
              defaultValue={""}
              {...register("categoryId", { required: "Category is required" })}
            >
              <option value={""} disabled>
                Select category
              </option>
              {categories
                .filter((category) => category.type === transactionType)
                .map((category) => (
                  <option
                    key={`${category.id}-${category.type}`}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          {errors.categoryId && (
            <p className="mt-2 mb-2 pl-2 text-red-500">
              {errors.categoryId.message}
            </p>
          )}
          <div className="flex flex-col border rounded-md p-2 mb-2 focus-within:border-[#8AB6F9]">
            <label className="text-sm font-bold ml-2">Note</label>
            <input
              className="text-xl ml-2 mr-2 focus:outline-0 focus:bg-none"
              autoComplete="off"
              type="text"
              placeholder="Enter note"
              {...register("notes", {
                minLength: {
                  value: 6,
                  message: "Note should atleast be 6 characters long",
                },
              })}
            />
          </div>
          {errors.notes && (
            <p className="mt-2 mb-2 pl-2 text-red-500">
              {errors.notes.message}
            </p>
          )}
          <div className="flex flex-col border rounded-md p-2 mb-2 focus-within:border-[#8AB6F9]">
            <label className="text-sm font-bold ml-2">Date</label>
            <Controller
              control={control}
              name="transactionDate"
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <DatePicker
                  className="text-xl ml-2 mr-2 focus:outline-0 focus:bg-none"
                  showTimeSelect
                  selected={field.value}
                  onChange={(date: Date) => field.onChange(date)}
                  dateFormat="Pp"
                  placeholderText="Enter date"
                  maxDate={new Date()}
                />
              )}
            />
          </div>
          {errors.transactionDate && (
            <p className="mt-2 mb-2 pl-2 text-red-500">
              {errors.transactionDate.message}
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
