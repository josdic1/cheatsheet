import { useState } from "react";
import { FilePlus2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CheatList } from "./CheatList";

export function FilterPanel({ allCheats, languages, categories }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const navigate = useNavigate();

  const handleLanguageSelect = (langId) => {
    setHasInteracted(true);
    setSelectedLanguage(langId);
  };

  const handleCategorySelect = (catId) => {
    setHasInteracted(true);
    setSelectedCategory(catId);
  };

  const displayedCheats = allCheats.filter((cheat) => {
    if (selectedLanguage && cheat.language_id !== selectedLanguage)
      return false;
    if (selectedCategory && cheat.category_id !== selectedCategory)
      return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        cheat.title?.toLowerCase().includes(term) ||
        cheat.code?.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const cheatsToShow = hasInteracted ? displayedCheats : [];

  return (
    <div className="filter-panel">
      {/* LANGUAGES */}
      <div className="filter-section">
        <label>LANGUAGES</label>
        <div className="language-buttons">
          <button
            onClick={() => handleLanguageSelect(null)}
            className={!selectedLanguage ? "active" : ""}
          >
            ALL
          </button>
          {languages.map((lang) => {
            const count = allCheats.filter(
              (c) => c.language_id === lang.id
            ).length;
            return (
              <button
                key={lang.id}
                onClick={() => handleLanguageSelect(lang.id)}
                className={selectedLanguage === lang.id ? "active" : ""}
              >
                {lang.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="filter-section">
        <label>CATEGORIES</label>
        <div className="category-buttons">
          <button
            onClick={() => handleCategorySelect(null)}
            className={!selectedCategory ? "active" : ""}
          >
            ALL
          </button>
          {categories.map((cat) => {
            const count = allCheats.filter(
              (c) => c.category_id === cat.id
            ).length;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={selectedCategory === cat.id ? "active" : ""}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          if (e.target.value) setHasInteracted(true);
          setSearchTerm(e.target.value);
        }}
      />

      {/* RESULTS */}
      <div className="results-count">
        {hasInteracted
          ? `DISPLAYING ${cheatsToShow.length} OF ${allCheats.length} TOTAL CHEATS`
          : "SELECT A FILTER OR SEARCH TO VIEW CHEATS"}
        <button onClick={() => navigate("/cheats/new")} className="new-cheat-button">
          <FilePlus2 size={14} />
        </button>
      </div>

      {/* CHEAT LIST */}
      <CheatList cheats={cheatsToShow} />
    </div>
  );
}
