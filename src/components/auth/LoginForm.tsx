import { useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbPassword } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IAuthForm } from "../../types/authTypes";
import Card from "../Card";
import { SubmitButton } from "../SubmitButton";
import CheckBox from "./Checkbox";
import PasswordField from "./PasswordField";
import TextField from "./TextField";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>();

  const [showPass, setShowPass] = useState(false);

  function getErrorMessage(
    error: FieldError | undefined,
    minLength: number
  ): string | undefined {
    if (!error) return;

    switch (error.type) {
      case "minLength":
        return `Mininimum length is (${minLength})`;
      default:
        return error.message;
    }
  }

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-[#00246B] ml-3 mb-8 mt-3 font-semibold text-2xl">
          SIGN IN
        </h1>
        <TextField
          placeholder="Username"
          name="username"
          Icon={FaRegCircleUser}
          register={register}
          error={getErrorMessage(errors.username, 5)}
        />
        <PasswordField
          placeholder="Password"
          name="password"
          Icon={TbPassword}
          register={register}
          error={getErrorMessage(errors.password, 6)}
          showPassword={showPass}
        />
        <CheckBox setShowPass={setShowPass} />
        <SubmitButton text="SUBMIT" />
        <Link
          to="/register"
          className="border border-[#00246B] bg-[#FFF] text-[#00246B] w-full flex rounded-lg p-3 mt-2 justify-center font-bold"
        >
          REGISTER
        </Link>
      </form>
    </Card>
  );
}
