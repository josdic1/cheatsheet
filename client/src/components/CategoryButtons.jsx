import { useAuth } from "../hooks/useAuth";

export function CategoryButtons({ setCategoryFilter }) {
  const { user } = useAuth();

  if (!user?.categories || user?.categories.length === 0) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="category-buttons">
      <button type="button" onClick={() => setCategoryFilter("all")}>All</button>
      {user?.categories.map((category) => (
        <button type="button" key={category.id} onClick={() => setCategoryFilter(category.id)}>
          {category.name}
        </button>
      ))}
    </div>
  );
}