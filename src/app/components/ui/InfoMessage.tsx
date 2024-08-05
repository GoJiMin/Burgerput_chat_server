type Props = {
  message: string;
};

export default function InfoMessage({ message }: Props) {
  return <p>{message}</p>;
}
