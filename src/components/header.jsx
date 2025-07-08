import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";
import { jwtDecode } from "jwt-decode";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

export default function Header() {
    const [navPanelOpen, setNavPanelOpen] = useState(false);
    const token = localStorage.getItem("token");
    const [userData, setUserData] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (token) {
            try {
                const user = jwtDecode(token);
                setUserData(user);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <header className="w-full h-20 shadow-md bg-accent text-white fixed top-0 left-0 z-50">
            <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3">
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full border-2 border-white/30"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <Link
                        to="/"
                        className="text-lg font-medium hover:text-gray-300 transition-colors duration-200 px-2 py-1"
                    >
                        Home
                    </Link>
                    <Link
                        to="/items"
                        className="text-lg font-medium hover:text-gray-300 transition-colors duration-200 px-2 py-1"
                    >
                        Items
                    </Link>
                    <Link
                        to="/gallery"
                        className="text-lg font-medium hover:text-gray-300 transition-colors duration-200 px-2 py-1"
                    >
                        Gallery
                    </Link>
                    <Link
                        to="/contact"
                        className="text-lg font-medium hover:text-gray-300 transition-colors duration-200 px-2 py-1"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Desktop Auth/Cart */}
                <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                    <Link
                        to="/booking"
                        className="p-2 text-xl hover:text-gray-300 transition-colors duration-200 relative"
                    >
                        <FaCartShopping />
                        
                    </Link>

                    {token ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <img
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                                    src={userData?.profilePicture || '/default-avatar.png'}
                                    alt="User profile"
                                />
                                <FiChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {userData?.firstName} {userData?.lastName}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {userData?.email}
                                        </p>
                                    </div>
                                    
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <FiLogOut className="mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-lg font-medium hover:text-gray-300 transition-colors duration-200 px-3 py-1"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-lg font-medium bg-white text-accent px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                    {token ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <img
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                                    src={userData?.profilePicture || '/default-avatar.png'}
                                    alt="User profile"
                                />
                                <FiChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 overflow-hidden">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {userData?.firstName} {userData?.lastName}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {userData?.email}
                                        </p>
                                    </div>
                                    
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <FiLogOut className="mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-lg font-semibold hover:text-gray-300 transition-colors duration-200 px-3 py-1"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-lg font-semibold bg-white text-accent px-4 py-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                    <button
                        className="text-2xl focus:outline-none"
                        onClick={() => setNavPanelOpen(true)}
                    >
                        <GiHamburgerMenu />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Panel */}
            <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />
        </header>
    );
}