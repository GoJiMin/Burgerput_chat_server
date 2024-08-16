type Props = {
  message: string;
};

export default function InfoMessage({ message }: Props) {
  return <p className="text-center text-[14px] text-black">{message}</p>;
}
