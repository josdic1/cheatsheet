import { useAuth } from "../hooks/useAuth";

export function LanguageButtons({ setLanguageFilter }) {
  const { user } = useAuth();

  if (!user?.languages || user?.languages.length === 0) {
    return <div>Loading languages...</div>;
  }

  return (
    <div className="language-buttons">
      <button type="button" onClick={() => setLanguageFilter("all")}>All</button>
      {user?.languages.map((language) => (
        <button type="button" key={language.id} onClick={() => setLanguageFilter(language.id)}>
          {language.name}
        </button>
      ))}
    </div>
  );
}