import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className="bg-gray-800 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">
                    <Link to='/'>BrandLogo</Link>
                </div>
                <ul className="flex space-x-6">
                    <li>
                        <Link
                            to='/'
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/profile'
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            to='/auth'
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                        >
                            Auth
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav
