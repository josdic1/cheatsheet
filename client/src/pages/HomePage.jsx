import { useAuth } from "../hooks/useAuth";
import { FilterPanel } from "../components/FilterPanel";

export function HomePage() {
  const { cheatsOnly, languages, categories } = useAuth();

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
        languages={languages}
        categories={categories}
      />
    </>
  );
}