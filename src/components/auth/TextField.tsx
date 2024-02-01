import { Path, UseFormRegister } from "react-hook-form";
import { IAuthForm } from "../../types/authTypes";

type Props = {
  placeholder: string;
  name: Path<IAuthForm>;
  Icon: React.ElementType;
  register: UseFormRegister<IAuthForm>;
  error: string | undefined;
  minLength?: number;
};

export default function TextField({
  placeholder,
  name,
  Icon,
  register,
  error,
  minLength,
}: Props) {
  return (
    <div className={error ? "mb-2" : "mb-4"}>
      <div
        className={`flex w-full border-2 ${
          error ? "border-red-500" : "border-[#00246B]"
        } rounded-lg`}
      >
        <div className="p-3 bg-[#CADCFC] rounded-tl-lg rounded-bl-lg">
          <Icon className={error ? "text-red-500" : "text-[#00246B]"} />
        </div>
        <input
          className={`w-full p-3 border-l ${
            error ? "border-red-500" : "border-[#00246B]"
          } rounded-r-lg focus:outline-none`}
          type="text"
          placeholder={placeholder}
          {...register(name, {
            required: `${placeholder} is required`,
            minLength,
          })}
        />
      </div>
      {error && <p className="mt-2 pl-2 text-red-500">{error}</p>}
    </div>
  );
}
