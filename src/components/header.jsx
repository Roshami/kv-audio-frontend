import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
    const [navPanelOpen, setNavPanelOpen] = useState(false);
    const token = localStorage.getItem("token");

    return (
        <header className="w-full h-[80px] shadow-md bg-accent text-white fixed top-0 left-0 z-50">
            <div className="container mx-auto h-full px-4 flex justify-between items-center relative">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <img 
                        src="/logo.png" 
                        alt="logo" 
                        className="w-16 h-16 object-cover rounded-full border-2 border-white/30" 
                    />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link 
                        to="/" 
                        className="text-xl font-medium hover:text-gray-300 transition-colors duration-200"
                    >
                        Home
                    </Link>
                    <Link 
                        to="/items" 
                        className="text-xl font-medium hover:text-gray-300 transition-colors duration-200"
                    >
                        Items
                    </Link>
                    <Link 
                        to="/gallery" 
                        className="text-xl font-medium hover:text-gray-300 transition-colors duration-200"
                    >
                        Gallery
                    </Link>
                    <Link 
                        to="/contact" 
                        className="text-xl font-medium hover:text-gray-300 transition-colors duration-200"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Desktop Auth/Cart */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link 
                        to="/booking" 
                        className="text-2xl hover:text-gray-300 transition-colors duration-200"
                    >
                        <FaCartShopping />
                    </Link>
                    
                    {token ? (
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = "/login";
                            }}
                            className="text-xl font-medium hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="text-xl font-medium hover:text-gray-300 transition-colors duration-200 cursor-pointer"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="text-xl font-medium bg-white text-accent px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-2xl focus:outline-none"
                    onClick={() => setNavPanelOpen(true)}
                >
                    <GiHamburgerMenu />
                </button>
            </div>

            {/* Mobile Navigation Panel */}
            <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />
        </header>
    )
}