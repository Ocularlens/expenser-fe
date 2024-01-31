type Props = {
  placeholder: string;
  name: string;
  Icon: React.ElementType;
};

export default function PasswordField({ placeholder, name, Icon }: Props) {
  return (
    <div className="flex w-full mb-4 border-2 border-[#00246B] rounded-lg">
      <div className="p-3 bg-[#CADCFC] rounded-tl-lg rounded-bl-lg">
        <Icon className="text-[#00246B]" />
      </div>
      <input
        className="w-full p-3 border-l border-[#00246B] rounded-r-lg focus:outline-none"
        type="password"
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
}
