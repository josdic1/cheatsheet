import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function CheatForm() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { languages, categories, createCheat, updateCheat, user } = useAuth();
  const [cheat, setCheat] = useState(state?.cheat || null);
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    notes: "",
    language_id: "",
    category_id: "",
    user_id: "",
  });

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!isEditMode) return;
    if (cheat) {
      setFormData({
        title: cheat.title || "",
        code: cheat.code || "",
        notes: cheat.notes || "",
        language_id: cheat.language_id || "",
        category_id: cheat.category_id || "",
        user_id: cheat.user_id || "",
      });
    }
  }, [cheat, isEditMode]);

  if (user == null) {
    return <div className="loading">Loading user...</div>;
  }

  function onClear() {
    setFormData({
      title: "",
      code: "",
      notes: "",
      language_id: "",
      category_id: "",
    });
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (isEditMode) {
      const result = await updateCheat(id, formData);
      if (!result.success) {
        alert(`Error: ${result.error}`);
      }
    } else {
      const newCheatData = {
        ...formData,
        user_id: user.id,
      };
      const result = await createCheat(newCheatData);
      if (!result.success) {
        alert(`Error: ${result.error}`);
      }
    }
    navigate("/");
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <button onClick={() => navigate(-1)}>← BACK</button>
        <h2>{isEditMode ? ">> EDIT CHEAT <<" : ">> NEW CHEAT <<"}</h2>
      </div>

      <form onSubmit={onSubmit} className="cheat-form">
        <div className="form-group">
          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Enter cheat title..."
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="language_id">LANGUAGE</label>
            <select
              id="language_id"
              name="language_id"
              onChange={onChange}
              value={formData.language_id}
              required
            >
              <option value="" disabled>
                Select language...
              </option>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category_id">CATEGORY</label>
            <select
              id="category_id"
              name="category_id"
              onChange={onChange}
              value={formData.category_id}
              required
            >
              <option value="" disabled>
                Select category...
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="code">CODE</label>
          <textarea
            id="code"
            name="code"
            value={formData.code}
            onChange={onChange}
            rows="10"
            placeholder="Enter your code snippet..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">NOTES</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={onChange}
            rows="3"
            placeholder="Optional notes..."
          />
        </div>

        <div className="form-actions">
          <button type="submit">{isEditMode ? "UPDATE" : "CREATE"}</button>
          <button type="button" onClick={onClear}>
            CLEAR
          </button>
        </div>
      </form>
    </div>
  );
}