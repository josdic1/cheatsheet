import { NavLink } from "react-router-dom";


export function NavBar({ currentTheme, setCurrentTheme }) {


  return (
    <>
    <nav>
    <NavLink to="/">Home</NavLink>
    </nav>
    </>
  );
}