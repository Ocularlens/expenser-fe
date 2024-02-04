import { useEffect, useState } from "react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { FaClipboardUser, FaRegCircleUser } from "react-icons/fa6";
import { TbPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/AuthService";
import { IAuthForm } from "../../types/authTypes";
import Card from "../Card";
import { SubmitButton } from "../SubmitButton";
import CheckBox from "./Checkbox";
import PasswordField from "./PasswordField";
import TextField from "./TextField";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IAuthForm>();

  const [showPass, setShowPass] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const navigate = useNavigate();

  const username = getValues().username;

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

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    const isSuccess = await registerUser(data);

    if (typeof isSuccess === "string") {
      setUsernameError(isSuccess);
      return;
    }

    return navigate("/login");
  };

  useEffect(() => {
    setUsernameError("");
  }, [username]);

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
          apiError={usernameError}
        />
        <PasswordField
          placeholder="Password"
          name="password"
          Icon={TbPassword}
          register={register}
          error={getErrorMessage(errors.password, 6)}
          pattern={{
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/,
            message:
              "Password should have At least one lowercase letter, At least one uppercase letter, At least one digit, At least one special character, Minimum length of 6 characters.",
          }}
          showPassword={showPass}
        />
        <PasswordField
          placeholder="Confirm Password"
          name="confirmPassword"
          Icon={TbPassword}
          register={register}
          error={getErrorMessage(errors.confirmPassword, 6)}
          passwordStr={getValues().password}
          isConfirmPassword
          showPassword={showPass}
        />
        <CheckBox setShowPass={setShowPass} />
        <SubmitButton text="SUBMIT" />
        <Link
          to="/login"
          className="border border-[#00246B] bg-[#FFF] text-[#00246B] w-full flex rounded-lg p-3 mt-2 justify-center font-bold"
        >
          BACK TO LOGIN
        </Link>
      </form>
    </Card>
  );
}
