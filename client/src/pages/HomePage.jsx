// HomePage.jsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { CheatList } from "../components/CheatList";
import { FilterContainer } from "../components/FilterContainer";

export function HomePage() {
  const { cheatsOnly, user } = useAuth();
  const [languageFilter, setLanguageFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  if (!cheatsOnly) {
    return <div>Loading...</div>;
  }

  const filteredCheats = cheatsOnly.filter(cheat => {
    const matchesLanguage = languageFilter === "all" || cheat.language_id === languageFilter;
    const matchesCategory = categoryFilter === "all" || cheat.category_id === categoryFilter;
    return matchesLanguage && matchesCategory;
  });

  return (
    <>
      <FilterContainer 
        user={user}
        setLanguageFilter={setLanguageFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <CheatList cheats={filteredCheats} />
    </>
  );
}