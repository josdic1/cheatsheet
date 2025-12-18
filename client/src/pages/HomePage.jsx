import { useAuth } from "../hooks/useAuth";
import { FilterPanel } from "../components/FilterPanel";

export function HomePage() {
  const { cheatsOnly, languages, categories } = useAuth();

  if (!cheatsOnly) {
    return <div>Loading...</div>;
  }

  return (
    <FilterPanel 
      allCheats={cheatsOnly} 
      languages={languages} 
      categories={categories} 
    />
  );
}