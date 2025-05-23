import { Outlet, Link } from "react-router-dom";
import useAuth from "./Hook/useAuth";

const App = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      {/* Fixed Navbar with custom bg and fixed text color */}
      <nav
        className="fixed top-0 left-0 w-full z-50 
        bg-[#ffffff2b] backdrop-blur-md 
        text-black text-[14px]  flex justify-between 
        items-center px-4 py-2 shadow-md"
      >
        <h1 className="lg:text-2xl text-[15px] font-bold text-indigo-700">
          🎬 MovieApp
        </h1>
        <div className="space-x-6 lg:text-[17px] font-semibold">
          <Link to="/" className="text-blue-800">
            Home
          </Link>
          {user && (
            <Link to="/favorites" className="text-purple-800">
              Favorites
            </Link>
          )}
          {user ? (
            <button onClick={logout} className="text-red-600">
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-green-700">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Page content with top padding to prevent overlap */}
      <div className="pt-20 px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
