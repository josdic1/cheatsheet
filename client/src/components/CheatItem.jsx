import { DateTimeInline } from "../components/DateTimeInline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Copy, Terminal, X, Check } from "lucide-react"; 
import { useState } from "react";

export function CheatItem({ cheat }) {
  const { deleteCheat, languages, categories } = useAuth();
  const navigate = useNavigate();
  
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const langName = languages?.find(l => l.id === cheat.language_id)?.name || "UNK";
  const catName = categories?.find(c => c.id === cheat.category_id)?.name || "UNK";

  const handleDelete = async () => {
    if (window.confirm("WARNING: DELETING DATA. CONFIRM?")) {
      await deleteCheat(parseInt(cheat.id));
    }
  };

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(cheat.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <tr className="cheat-item">
      <td className="title"><strong>{cheat.title}</strong></td>

      <td className="tags-cell">
        <div className="tag-wrapper">
          <span className="retro-badge lang-badge">[{langName.toUpperCase()}]</span>
          <span className="retro-badge cat-badge">{catName.toUpperCase()}</span>
        </div>
      </td>

      <td className="code-cell compact">
        <div className="compact-actions">
          <button 
            className={`mini-btn ${copied ? 'success' : ''}`} 
            onClick={handleCopy}
            title="COPY"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "COPIED" : "COPY"}</span>
          </button>

          <button 
            className="mini-btn action" 
            onClick={() => setShowCode(true)}
            title="VIEW"
          >
            <Terminal size={14} />
            <span>CODE</span>
          </button>
        </div>
      </td>

      <td className="notes">{cheat.notes}</td>
      <td><DateTimeInline value={cheat.created_at} /></td>
      <td><DateTimeInline value={cheat.updated_at} /></td>
      
      <td className="actions">
        <div className="action-buttons">
          <button className="btn-view" onClick={() => navigate(`/cheats/${cheat.id}`, { state: { cheat } })}>VIEW</button>
          <button className="btn-edit" onClick={() => navigate(`/cheats/${cheat.id}/edit`, { state: { cheat } })}>EDIT</button>
          <button className="btn-delete" onClick={handleDelete}>DEL</button>
        </div>

        {showCode && (
          <CodeModal 
            code={cheat.code} 
            title={cheat.title} 
            onClose={() => setShowCode(false)} 
          />
        )}
      </td>
    </tr>
  );
}

function CodeModal({ code, title, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="retro-modal-overlay" onClick={onClose}>
      <div className="retro-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{`>> SOURCE: ${title}`}</div>
          <div className="modal-controls">
            <button className={`modal-copy-btn ${copied ? 'success' : ''}`} onClick={handleCopy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? "COPIED" : "COPY"}</span>
            </button>
            <button className="close-btn" onClick={onClose}><X size={20} /></button>
          </div>
        </div>
        <div className="modal-body">
            <pre><code>{code}</code></pre>
        </div>
        <div className="modal-footer"><span>END_OF_FILE</span></div>
      </div>
    </div>
  );
}