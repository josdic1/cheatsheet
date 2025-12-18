import { Outlet } from "react-router-dom";
import { AuthProvider } from "./providers/Provider";

function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default App;