import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function NavBar() {
  const { loggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav>
      {/* LEFT: BRANDING (Now a Home Link) */}
      <div className="nav-brand">
        <NavLink to="/" className="brand-link">
          <span className="cursor-blink">█</span> CHEAT_DB
        </NavLink>
        <span className="version">v1.0</span>
      </div>

      {/* RIGHT: MENU */}
      <div className="nav-menu">
        {loggedIn ? (
          <>
            <span className="user-info">OP: {user?.name?.toUpperCase()}</span>
            <span className="separator">|</span>
            
            <NavLink to='/' end>TERMINAL</NavLink>
            <NavLink to='/cheats/new'>NEW_ENTRY</NavLink>
            
            <button className="nav-logout-btn" onClick={handleLogout}>
              EXIT_SYSTEM
            </button>
          </>
        ) : (
          <div className="auth-links">
            <span className="status-offline">STATUS: DISCONNECTED</span>
            <NavLink to='/login'>INITIALIZE_SESSION</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}