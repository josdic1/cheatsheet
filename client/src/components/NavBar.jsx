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
      {loggedIn ? (
        <div>
          <span>Hello, {user?.name}</span>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/cheats'>New</NavLink>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <span>You must login or register</span>
          <NavLink to='/login'>Login</NavLink>
        </div>
      )}
    </nav>
  );
}