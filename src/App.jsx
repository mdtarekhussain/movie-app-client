import { useState, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import useAuth from "./Hook/useAuth";
import useAxios from "./Hook/useAxios";
import SearchContext from "./Page/SearchProvider";

const App = () => {
  const { user, logout } = useAuth();
  const axiosSecure = useAxios();
  const { query, setQuery, setIsSearching, setSearchResults } =
    useContext(SearchContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchMovies = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setIsSearching(false);
      setSearchResults([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      setIsSearching(true);
      const res = await axiosSecure.get(`/api/search?query=${trimmedQuery}`);
      setSearchResults(res.data?.slice(0, 250) || []);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Search failed", error);
      setSearchResults([]);
    }
  };

  return (
    <div>
      {/* Navbar */}

      <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10 overflow-x-auto justify-center items-center">
        <div className="flex items-center justify-center gap-2 px-4 py-4 lg:min-w-[600px]">
          {/* Logo */}
          <Link
            to="/"
            className="text-[14px] lg:text-[35px] whitespace-nowrap font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            🎬 MovieApp
          </Link>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchMovies()}
            className="flex-1 w-[30px] lg:min-w-[120px] pl-3 pr-2 lg:py-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* Search button */}
          <button
            onClick={searchMovies}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white lg:px-4 px-2 lg:py-2 rounded-full whitespace-nowrap"
          >
            Search
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className="text-sm lg:text-[20px] whitespace-nowrap bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Home
            </Link>
            {user && (
              <Link
                to="/favorites"
                className="text-sm lg:text-[20px] whitespace-nowrap bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Favorites
              </Link>
            )}
            {user ? (
              <button
                onClick={logout}
                className="text-sm lg:text-[20px] whitespace-nowrap border bg-gradient-to-r p-2 from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="text-sm whitespace-nowrap bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-3 py-2 rounded">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Hamburger for mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white text-2xl ml-2"
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 px-4 pb-4 space-y-3 text-white border-t border-white/20 pt-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              Home
            </Link>
            {user && (
              <Link
                to="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                Favorites
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="block text-left"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
