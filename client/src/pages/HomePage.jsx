// src/pages/HomePage.jsx
import { useAuth } from "../hooks/useAuth";
import { FilterPanel } from "../components/FilterPanel";
import { CheatList } from "../components/CheatList";

export function HomePage() {
  const { user, cheatsOnly, languages, categories } = useAuth();

  if (!cheatsOnly) return <div>Loading...</div>;

  const asciiTitle = `
 ██████╗██╗  ██╗███████╗ █████╗ ████████╗███████╗██╗  ██╗███████╗███████╗████████╗
██╔════╝██║  ██║██╔════╝██╔══██╗╚══██╔══╝██╔════╝██║  ██║██╔════╝██╔════╝╚══██╔══╝
██║     ███████║█████╗  ███████║   ██║   ███████╗███████║█████╗  █████╗     ██║   
██║     ██╔══██║██╔══╝  ██╔══██║   ██║   ╚════██║██╔══██║██╔══╝  ██╔══╝     ██║   
╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████║██║  ██║███████╗███████╗   ██║   
 ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝   
                                    READY.
`;

  return (
    <>
      <div className="outrun-grid" />
      <pre className="ascii-title">{asciiTitle}</pre>

      <FilterPanel
        allCheats={cheatsOnly}
        languages={user.languages}
        categories={user.categories}
      />


    </>
  );
}
