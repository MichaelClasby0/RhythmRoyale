import PrimaryContent from "../layout/PrimaryContent";
import useKeyPress from "../hooks/useKeyPress";

export default function Record() {
  const { isDown, beats } = useKeyPress(" ");

  return <PrimaryContent></PrimaryContent>;
}
