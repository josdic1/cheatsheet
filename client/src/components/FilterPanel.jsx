import { useState } from "react";
import { FilePlus2, X, Code, Terminal, Cpu, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CheatList } from "./CheatList";

export function FilterPanel({ allCheats, languages, categories }) {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // REMOVED: hasInteracted state. We want to see data immediately.

  const navigate = useNavigate();

  const handleLanguageSelect = (langId) => {
    // If clicking the same one, toggle it off
    if (selectedLanguage === langId) {
        setSelectedLanguage(null);
    } else {
        setSelectedLanguage(langId);
    }
  };

  const handleCategorySelect = (catId) => {
    if (selectedCategory === catId) {
        setSelectedCategory(null);
    } else {
        setSelectedCategory(catId);
    }
  };

  const displayedCheats = allCheats.filter((cheat) => {
    if (selectedLanguage && cheat.language_id !== selectedLanguage) return false;
    if (selectedCategory && cheat.category_id !== selectedCategory) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        cheat.title?.toLowerCase().includes(term) ||
        cheat.code?.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="filter-wrapper">
      <div className="retro-panel filter-panel">
        
        {/* HEADER / CONTROLS */}
        <div className="filter-controls">
            
          {/* SEARCH */}
          <div className="search-section">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="SEARCH_DATABASE..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="clear-btn">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="new-btn-wrapper">
             <button onClick={() => navigate("/cheats/new")} className="new-cheat-button main-action">
              <FilePlus2 size={20} /> <span>NEW_ENTRY</span>
            </button>
          </div>
        </div>

        {/* LANGUAGES TILES */}
        <div className="filter-section">
          <label>SYNTAX_FILTER</label>
          <div className="button-grid">
            <button
              onClick={() => handleLanguageSelect(null)}
              className={!selectedLanguage ? "tile-btn active" : "tile-btn"}
            >
              <Terminal size={24} />
              <div className="tile-info">
                <span className="tile-label">ALL</span>
                <span className="tile-count">{allCheats.length}</span>
              </div>
            </button>
            {languages.map((lang) => {
              const count = allCheats.filter(c => c.language_id === lang.id).length;
              return (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageSelect(lang.id)}
                  className={selectedLanguage === lang.id ? "tile-btn active" : "tile-btn"}
                >
                  <Code size={24} />
                  <div className="tile-info">
                    <span className="tile-label">{lang.name}</span>
                    <span className="tile-count">{count}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CATEGORIES TILES */}
        <div className="filter-section">
          <label>CLASS_FILTER</label>
          <div className="button-grid">
             <button
              onClick={() => handleCategorySelect(null)}
              className={!selectedCategory ? "tile-btn active" : "tile-btn"}
            >
              <Cpu size={24} />
              <div className="tile-info">
                <span className="tile-label">ALL</span>
                <span className="tile-count">{allCheats.length}</span>
              </div>
            </button>
            {categories.map((cat) => {
              const count = allCheats.filter(c => c.category_id === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={selectedCategory === cat.id ? "tile-btn active" : "tile-btn"}
                >
                  <Database size={24} />
                  <div className="tile-info">
                    <span className="tile-label">{cat.name}</span>
                    <span className="tile-count">{count}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS BAR */}
        <div className="results-count">
            <span>SYSTEM_STATUS:</span>
            <span className="blink-text">
                {displayedCheats.length > 0 
                    ? `${displayedCheats.length} RECORDS_FOUND` 
                    : "NO_MATCHES_FOUND"}
            </span>
        </div>

      </div>

      {/* CHEAT LIST (Passed directly, no gatekeeping) */}
      <CheatList cheats={displayedCheats} />
    </div>
  );
}