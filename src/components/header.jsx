import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
    const [navPanelOpen, setNavPanelOpen] = useState(false);
    const token = localStorage.getItem("token");

    return (
        <header className="w-full h-[100px]  shadow-xl flex justify-center items-center relative bg-accent text-white">
            <img src="/logo.png" alt="logo" className="w-[100px] h-[100px] object-cover border-[1px] absolute left-1 rounded-full" />
            <div className="hidden w-[450px]  md:flex justify-evenly items-center">
                <Link to="/" className="text-[22px] m-1">Home</Link>
                <Link to="/contact" className="text-[22px] m-1">Contact</Link>
                <Link to="/gallery" className="text-[22px] m-1">Gallery</Link>
                <Link to="/items" className="text-[22px] m-1">Items</Link>
                <Link to="/booking" className="text-[22px] m-1 absolute right-70"><FaCartShopping /></Link>
            </div>
            
            <GiHamburgerMenu
                className="absolute right-5 text-[24px] md:hidden cursor-pointer"
                onClick={() => {
                    setNavPanelOpen(true);
                }}
            />

            {token != null && 
            <button
                onClick={
                    () => {
                        localStorage.removeItem("token")
                        window.location.href = "/login"
                    }
                }
                className="hidden md:block absolute right-8 text-[24px] cursor-pointer">
                Logout
            </button>
            }

            {token == null && 
            <Link to="/login" className="hidden md:block absolute right-35 text-[24px] cursor-pointer">
                Login
            </Link>
            }

            {token == null && 
            <Link to="/register" className="hidden md:block absolute right-8 text-[24px] cursor-pointer">
                Sign Up
            </Link>
            }

            <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />
        </header>
    )
}