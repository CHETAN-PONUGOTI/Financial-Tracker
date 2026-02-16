import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Hide Navbar for unauthenticated pages
  if (!user || location.pathname === '/login' || location.pathname === '/register') return null;

  const handleLogout = () => {
    logout(); // Clears user state and localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 mb-6 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-indigo-600">FinanceTracker</Link>
          <div className="flex gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition ${location.pathname === '/' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/explorer" 
              className={`text-sm font-medium transition ${location.pathname === '/explorer' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Transactions
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 font-medium hidden md:block">
            {user.name}
          </span>
          <button 
            onClick={handleLogout}
            className="text-sm font-semibold text-red-500 hover:text-red-700 border border-red-100 hover:bg-red-50 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;