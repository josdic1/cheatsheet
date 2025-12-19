import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth"; 
import { DateTimeInline } from "../components/DateTimeInline";
import { Check } from "lucide-react"; 

export function CheatPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { loading, cheats } = useAuth(); 
  
  const [cheat, setCheat] = useState(state?.cheat || null);
  const [copied, setCopied] = useState(false);

  // 1. SCROLL SYNC FOR GRID
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

  // 2. DATA RETRIEVAL
  useEffect(() => {
    if (cheat) return;
    if (loading) return;

    const found = cheats?.find(c => c.id === parseInt(id, 10));
    if (found) {
      setCheat(found);
    } else {
      navigate("/");
    }
  }, [id, cheat, loading, cheats, navigate]);

  // 3. COPY LOGIC
  const handleCopy = async () => {
    if (!cheat) return;
    try {
      await navigator.clipboard.writeText(cheat.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Fixed syntax here: just use the string directly
  if (!cheat) return <div className="loading-state">{">> ACCESSING_MEMORY_BLOCK..."}</div>;

  return (
    <>
      <div className="outrun-grid" />
      
      <div className="page-wrapper detail-view">
        <div className="retro-panel cheat-detail-panel">
          
          {/* HEADER NAV */}
          <div className="detail-header">
            <button className="nav-btn" onClick={() => navigate(-1)}>
              {`< RETURN_ROOT`}
            </button>
            <div className="system-id">
              MEM_ADDR: 0x{cheat.id.toString(16).padStart(4, '0').toUpperCase()}
            </div>
            <button className="nav-btn" onClick={() => navigate(`/cheats/${cheat.id}/edit`, { state: { cheat } })}>
              {`MODIFY_DATA >`}
            </button>
          </div>

          {/* MAIN TITLE WITH GLITCH EFFECT */}
          <h1 className="glitch-title" data-text={cheat.title}>
            {cheat.title}
          </h1>

          {/* META DATA CLUTTER STRIP */}
          <div className="meta-strip">
            <div className="meta-item">
              <span className="label">SYNTAX:</span>
              <span className="value">{cheat.language_id ? "DEFINED" : "NULL"}</span>
            </div>
            <div className="meta-item">
              <span className="label">CLASS:</span>
              <span className="value">{cheat.category_id ? "SECURE" : "PUBLIC"}</span>
            </div>
            <div className="meta-item">
              <span className="label">SIZE:</span>
              <span className="value">{cheat.code.length}B</span>
            </div>
          </div>

          {/* CODE TERMINAL */}
          <div className="terminal-screen large" onClick={handleCopy} title="CLICK_TO_EXTRACT">
            <div className="source-view-label">
              {copied ? (
                <>
                  <Check size={12} strokeWidth={3} /> EXTRACTION_COMPLETE
                </>
              ) : (
                ':: SOURCE_VIEW ::'
              )}
            </div>
            <pre><code>{cheat.code}</code></pre>
            <div className="scanline-overlay"></div>
          </div>

          {/* NOTES / FOOTER */}
          <div className="detail-footer">
            <div className="notes-block">
              {/* Fixed syntax here as well */}
              <div className="label">{">> ANNOTATIONS:"}</div>
              <p>{cheat.notes || "NO_DATA_AVAILABLE"}</p>
            </div>
            
            <div className="timestamps">
              <div>INIT: <DateTimeInline value={cheat.created_at} /></div>
              <div>LAST_MOD: <DateTimeInline value={cheat.updated_at} /></div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}