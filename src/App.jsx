import { Outlet, Link } from "react-router-dom";

import useAuth from "./Hook/useAuth";

const App = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <h1 className="text-2xl">🎬 MovieApp</h1>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          {user && <Link to="/favorites">Favorites</Link>}
          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
