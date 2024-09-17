import { AiOutlineHome } from "react-icons/ai"; 
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 

const Nav = () => {
    const location = useLocation(); 
    const [navBackground, setNavBackground] = useState(false);

    const user = useSelector((state) => state.auth); 

    useEffect(() => {
        const handleScroll = () => {
            setNavBackground(window.scrollY > 50 || location.pathname.includes('/single')); 
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    return (
        <nav className={`p-2 shadow-lg fixed w-full z-20 transition-colors duration-300 ${navBackground ? 'bg-white' : 'bg-transparent'}`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className={`${navBackground ? 'text-black' : 'text-white'} font-bold text-2xl`}>
                    <Link to='/'>📱 iPhone Store</Link>
                </div>

                <div>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className={`px-4 py-2 rounded-md focus:outline-none ${navBackground ? 'text-black bg-gray-200' : 'text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border border-white'}`}
                    />
                </div>

                <ul className="flex space-x-6 items-center">
                    <li>
                        <Link
                            to='/'
                            className={`${navBackground ? 'text-black' : 'text-white'} hover:text-blue-300 px-3 py-2 rounded-md text-lg font-semibold transition-colors duration-300`}
                        >
                            <AiOutlineHome className="text-2xl" />
                        </Link>
                    </li>
                    <li>
                        {user?.photo_url ? (
                            <img 
                                src={user?.photo_url} 
                                alt="User Profile" 
                                className="w-10 h-10 rounded-full object-cover" 
                            />
                        ) : (
                            <Link
                                to='/profile'
                                className={`${navBackground ? 'text-black' : 'text-white'} hover:text-blue-300 px-3 py-2 rounded-md text-lg font-semibold transition-colors duration-300`}
                            >
                                Profile
                            </Link>
                        )}
                    </li>
                    {!user?.token && (
                        <>
                            <li>
                                <Link
                                    to='/auth/login'
                                    className={`${navBackground ? 'text-black' : 'text-white'} hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold transition-colors duration-300`}
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/auth/signup'
                                    className={`${navBackground ? 'text-black' : 'text-white'} hover:text-green-400 px-3 py-2 rounded-md text-lg font-semibold transition-colors duration-300`}
                                >
                                    Signup
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
