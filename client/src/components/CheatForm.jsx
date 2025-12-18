import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function CheatForm() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { createCheat, updateCheat, user } = useAuth(); 
    const [cheat, setCheat] = useState(state?.cheat || null);
    const [languages, setLanguages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
      title: "",
      code: "",
      notes: "",
      language_id: "",
      category_id: "",
      user_id: ""
    });

    const isEditMode = Boolean(id);

    if (user == null) {
      return <div>Loading user...</div>;
    }


useEffect(() => {
  if (!isEditMode) return;
  if (cheat) {
    setFormData({
      title: cheat.title || "",
      code: cheat.code || "",
      notes: cheat.notes || "",
      language_id: cheat.language_id || "",
      category_id: cheat.category_id || "",
      user_id: cheat.user_id || ""
    });
  }
}, [cheat, isEditMode]);

useEffect(() => {
  async function fetchLanguages() {
    try {
      const response = await fetch('/api/languages');
      const data = await response.json();
      setLanguages(data);
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  }

  async function fetchCategories() {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  fetchLanguages();
  fetchCategories();
}, [user]);

function onClear() {
  setFormData({
    title: "",
    code: "",
    notes: ""
  });
}

function onCancel() {
  navigate("/")
  onClear()
}


const onChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
}

async function onSubmit(e) {
  e.preventDefault()
  if (isEditMode) {
    const result = await updateCheat(id, formData)
    if (!result.success) {
      alert(`Error: ${result.error}`) 
    }
  } else {
    const newCheatData = {
      ...formData,
      user_id: user.id
    }
    const result = await createCheat(newCheatData)
    if (!result.success) {
      alert(`Error: ${result.error}`)
    }
  }
  navigate("/");
}



  return <>
  <button onClick={() => navigate(-1)}>Go Back</button>
  <div>{isEditMode ? "Edit" : "New"}</div>
  <form onSubmit={onSubmit}>
    <label htmlFor="title">Title: </label>
    <input
      type="text"
      id="title"
      name="title"
      value={formData.title}
      onChange={onChange}
      required
    />


    <label htmlFor="language_id">Language: </label>
    <select id="language_id" name="language_id" onChange={onChange} value={formData.language_id} required>
      <option value="" default disabled>Select a language</option>
      {languages.map(lang => (
        <option key={lang.id} value={lang.id}>{lang.name}</option>
      ))}
      </select>


    <label htmlFor="category_id">Category: </label>
    <select id="category_id" name="category_id" onChange={onChange} value={formData.category_id} required>
            <option value="" default disabled>Select a category</option>
      {categories.map(cat => (
        <option key={cat.id} value={cat.id}>{cat.name}</option>
      ))}
      </select>


  <label htmlFor="code">Code: </label>

        <textarea
          id="code"
          name="code"
          value={formData.code}
          onChange={onChange}
          rows="10"
          required
        />

        <label htmlFor="notes">Notes: </label>

        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={onChange}
          rows="3"
         />

    <button type="submit">{isEditMode ? "Edit" : "Create"}</button>
    <button type="button" onClick={onClear}>Clear</button>
  </form>
    
  </>;
}
