import { useAuth } from "../hooks/useAuth";
import { CheatList } from "../components/CheatList";

export function HomePage() {
  const { cheatsOnly } = useAuth();

  if (!cheatsOnly) {
    return <div>Loading...</div>;
  }

  return <CheatList cheats={cheatsOnly} />;
}