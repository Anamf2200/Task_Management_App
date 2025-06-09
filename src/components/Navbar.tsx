import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../redux/users/auth/authSlice';
import { selectTokenValue } from '../redux/users/auth/auth.Selector';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const token = useSelector(selectTokenValue);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let role = '';
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.error('Invalid token');
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!token) return null;

  return (
    <nav className="bg-amber-500 text-white py-3 shadow-md sticky top-0">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex space-x-6">
          {role === 'admin' && (
            <>
              <Link to="/home" className="hover:text-yellow-100 font-medium transition">
                Admin Access
              </Link>
              <Link to="/dashboard" className="hover:text-yellow-100 font-medium transition">
                Create Task
              </Link>
              <Link to="/task" className="hover:text-yellow-100 font-medium transition">
                Current Tasks
              </Link>
            </>
          )}
        </div>

         
        <button
          onClick={handleLogout}
          className="bg-white text-amber-600 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
