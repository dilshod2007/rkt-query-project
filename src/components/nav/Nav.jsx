import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useGetProductsQuery } from '../../redux/api/ProductsApi'; // Adjust the import path
import '../nav/navbar.css';

const Nav = () => {
  const location = useLocation();
  const [navBackground, setNavBackground] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const user = useSelector((state) => state.auth); 

  useEffect(() => {
    const handleScroll = () => {
      setNavBackground(window.scrollY > 50 || location.pathname.includes("/single"));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const results = Array.isArray(products) ? products.filter(product =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm)
      ) : [];
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products.</div>;

  return (
    <>
      {/* Sidebar */}
      <nav className={`custom-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={toggleSidebar}>
            <AiOutlineClose />
          </button>
        </div>
        <ul className="navbar-list">
          <li>
            <Link to="/" className="nav-link" onClick={toggleSidebar}>
              <AiOutlineHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faUser} className="nav-icon" />
              <span>Profile</span>
            </Link>
          </li>
          {!user?.token ? (
            <>
              <li>
                <Link to="/auth/login" className="nav-link" onClick={toggleSidebar}>
                  <FontAwesomeIcon icon={faSignInAlt} className="nav-icon" />
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link to="/auth/signup" className="nav-link" onClick={toggleSidebar}>
                  <FontAwesomeIcon icon={faUserPlus} className="nav-icon" />
                  <span>Sign Up</span>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <img
                src={user?.photo_url}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </li>
          )}
        </ul>
      </nav>

      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Main Navigation Bar */}
      <nav className={`p-2 shadow-lg fixed w-full z-20 transition-colors duration-300 ${navBackground ? 'bg-white' : 'bg-transparent'}`}>
        <div className="container mx-auto flex items-center">
          {/* Left side (hamburger menu and logo) */}
          <div className="flex items-center">
            <div className="hamburger" onClick={toggleSidebar}>
              <AiOutlineMenu />
            </div>

            <div className={`${navBackground ? 'text-black' : 'text-white'} font-bold text-2xl ml-4`}>
              <Link to='/'>📱 iPhone Store</Link>
            </div>
          </div>

          {/* Centered search input */}
          <div className="flex-grow flex justify-center relative">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              className={`px-4 py-2 rounded-md focus:outline-none ${navBackground ? 'text-black bg-gray-200' : 'text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border border-white'}`}
            />
            {searchTerm && filteredProducts.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 mt-1 z-10">
                {filteredProducts.map((product) => (
                  <li key={product.id} className="p-2 hover:bg-gray-100">
                    <Link to={`/product/${product.id}`} onClick={() => setSearchTerm("")}>
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
