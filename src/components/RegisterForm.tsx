import { FaClipboardUser, FaRegCircleUser } from "react-icons/fa6";
import { TbPassword } from "react-icons/tb";
import PasswordField from "./PasswordField";
import { SubmitButton } from "./SubmitButton";
import TextField from "./TextField";

export default function RegisterForm() {
  return (
    <form className="border border-[#00246B] rounded-lg bg-[#FFF] p-3 mt-20">
      <h1 className="text-center text-[#00246B] mb-3 font-semibold">CREATE ACCOUNT</h1>
      <TextField
        placeholder="Firstname"
        name="firstname"
        Icon={FaClipboardUser}
      />
      <TextField
        placeholder="Lastname"
        name="lastname"
        Icon={FaClipboardUser}
      />
      <TextField
        placeholder="Username"
        name="username"
        Icon={FaRegCircleUser}
      />
      <PasswordField placeholder="Password" name="password" Icon={TbPassword} />
      <SubmitButton text="SUBMIT" />
    </form>
  );
}
