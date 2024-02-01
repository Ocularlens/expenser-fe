import { Path, UseFormRegister } from "react-hook-form";
import { IRegisterForm } from "../types/registerTypes";

type Props = {
  placeholder: string;
  name: Path<IRegisterForm>;
  Icon: React.ElementType;
  register: UseFormRegister<IRegisterForm>;
  error: string | undefined;
  pattern?: { value: RegExp; message: string };
  isConfirmPassword?: boolean;
  passwordStr?: string;
};

export default function PasswordField({
  placeholder,
  name,
  Icon,
  register,
  error,
  pattern,
  isConfirmPassword,
  passwordStr,
}: Props) {
  const errors = error?.split(",");

  const passwordMatchMessage = "Password does not match";

  return (
    <div className={`flex-row ${error ? "mb-2" : "mb-4"}`}>
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
          type="password"
          placeholder={placeholder}
          {...register(name, {
            required: `${placeholder} is required`,
            pattern,
            ...(isConfirmPassword
              ? {
                  validate: (value) =>
                    passwordStr === value || passwordMatchMessage,
                }
              : {}),
          })}
        />
      </div>
      {errors && errors.length > 1 && (
        <ul>
          {errors.map((error) => (
            <li className="mt-2 pl-2 text-red-500">{error}</li>
          ))}
        </ul>
      )}
      {errors && errors.length === 1 && (
        <p className="mt-2 pl-2 text-red-500">{error}</p>
      )}
      {/* {isConfirmPassword && passwordStr !== value && (
        <p className="mt-2 pl-2 text-red-500">{passwordMatchMessage}</p>
      )} */}
    </div>
  );
}
