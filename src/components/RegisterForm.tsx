import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { FaClipboardUser, FaRegCircleUser } from "react-icons/fa6";
import { TbPassword } from "react-icons/tb";
import { IRegisterForm } from "../types/registerTypes";
import Card from "./Card";
import PasswordField from "./PasswordField";
import { SubmitButton } from "./SubmitButton";
import TextField from "./TextField";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IRegisterForm>();

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

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-[#00246B] ml-3 mb-8 mt-3 font-semibold text-2xl">
          SIGN UP
        </h1>
        <TextField
          placeholder="Firstname"
          Icon={FaClipboardUser}
          name="firstname"
          register={register}
          error={getErrorMessage(errors.firstname, 3)}
          minLength={3}
        />
        <TextField
          placeholder="Lastname"
          name="lastname"
          Icon={FaClipboardUser}
          register={register}
          error={getErrorMessage(errors.lastname, 3)}
          minLength={3}
        />
        <TextField
          placeholder="Username"
          name="username"
          Icon={FaRegCircleUser}
          register={register}
          error={getErrorMessage(errors.username, 5)}
          minLength={5}
        />
        <PasswordField
          placeholder="Password"
          name="password"
          Icon={TbPassword}
          register={register}
          error={getErrorMessage(errors.password, 6)}
          pattern={{
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/,
            message:
              "Password should have At least one lowercase letter, At least one uppercase letter, At least one digit, At least one special character, Minimum length of 6 characters.",
          }}
        />
        <PasswordField
          placeholder="Confirm Password"
          name="confirmPassword"
          Icon={TbPassword}
          register={register}
          error={getErrorMessage(errors.confirmPassword, 6)}
          passwordStr={getValues().password}
          isConfirmPassword
        />
        <SubmitButton text="SUBMIT" />
      </form>
    </Card>
  );
}
