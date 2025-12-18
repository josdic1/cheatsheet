import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function NavBar() {
  const { loggedIn, logout, user} = useAuth()

  const isLoggedIn = loggedIn;

  const handleLogout = async () => {
    await logout()
  }

  return (
      <>
      <nav>
      { isLoggedIn ?
        <div>
          <span>Hello, {user?.name}</span>
          <NavLink to='/'> Home </NavLink>
          <button onClick={handleLogout}>Logout</button>
        </div> : 
          <div>
          <NavLink to='/login'> Login </NavLink>
        </div>
      }
      </nav>
      </>
  );
}