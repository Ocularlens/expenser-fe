
type Props = {
  text: string;
};
export function SubmitButton({ text }: Props) {
  return (
    <button className="text-[#FFF] bg-[#00246B] w-full flex rounded-lg p-3 justify-center font-bold">
      {text}
    </button>
  );
}
