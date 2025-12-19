import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function CheatForm() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { languages, categories, createCheat, updateCheat, user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: state?.cheat?.title || "",
    code: state?.cheat?.code || "",
    notes: state?.cheat?.notes || "",
    language_id: state?.cheat?.language_id || "",
    category_id: state?.cheat?.category_id || "",
    user_id: user?.id || "",
  });

  const isEditMode = Boolean(id);

  // 1. RE-ADD SCROLL SYNC LOGIC FOR THE GRID
  useEffect(() => {
    const handleScroll = () => {
      const grid = document.querySelector('.outrun-grid');
      if (grid) {
        grid.style.backgroundPosition = `0 0, 0 0, 0 ${window.scrollY}px`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user && !formData.user_id) {
        setFormData(prev => ({ ...prev, user_id: user.id }));
    }
  }, [user, formData.user_id]);

  if (!user) return <div className="loading-state">AUTHENTICATING...</div>;

  function onClear() {
    setFormData({
      title: "",
      code: "",
      notes: "",
      language_id: "",
      category_id: "",
      user_id: user.id
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
        alert(`ERROR: ${result.error}`);
        return;
      }
    } else {
      const result = await createCheat(formData);
      if (!result.success) {
        alert(`ERROR: ${result.error}`);
        return;
      }
    }
    navigate("/");
  }

  return (
    <>
      {/* 2. RE-ADD THE GRID ELEMENT */}
      <div className="outrun-grid" />

      <div className="form-page-wrapper">
        <div className="retro-panel form-panel">
          
          <div className="form-header">
            <button className="nav-btn" onClick={() => navigate(-1)}>{`< BACK`}</button>
            <h2>{isEditMode ? ">> MODIFY_SEQUENCE" : ">> INITIATE_NEW_CHEAT"}</h2>
          </div>

          <form onSubmit={onSubmit} className="cheat-form">
            <div className="form-group">
              <label htmlFor="title">TITLE_IDENTIFIER</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={onChange}
                placeholder="ENTER TITLE..."
                required
                autoFocus
              />
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="language_id">SYNTAX_LANG</label>
                <select
                  id="language_id"
                  name="language_id"
                  onChange={onChange}
                  value={formData.language_id}
                  required
                >
                  <option value="" disabled> SELECT LANGUAGE... </option>
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group half">
                <label htmlFor="category_id">CATEGORY_TAG</label>
                <select
                  id="category_id"
                  name="category_id"
                  onChange={onChange}
                  value={formData.category_id}
                  required
                >
                  <option value="" disabled> SELECT CATEGORY... </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="code">CODE_BLOCK</label>
              <textarea
                id="code"
                name="code"
                value={formData.code}
                onChange={onChange}
                rows="12"
                className="code-input terminal-input" 
                placeholder="// ENTER CODE SOURCE HERE"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">ANNOTATIONS</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={onChange}
                rows="3"
                placeholder="OPTIONAL METADATA..."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="action-primary">
                {isEditMode ? "EXECUTE_UPDATE" : "COMPILE_NEW"}
              </button>
              <button type="button" onClick={onClear} className="action-secondary">
                RESET_FIELDS
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}