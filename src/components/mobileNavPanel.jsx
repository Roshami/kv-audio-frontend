import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { MdContacts, MdPhotoLibrary } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { CiHome, CiSpeaker } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function MobileNavPanel({ isOpen, setOpen }) {
    const [animate, setAnimate] = useState(false);
    const navigate = useNavigate();

    function goTo(route) {
        navigate(route);
        setOpen(false);
    }

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setAnimate(true), 10);
        } else {
            setAnimate(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setAnimate(false);
        setTimeout(() => setOpen(false), 300);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50">
                    {/* Overlay */}
                    <div 
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                    
                    {/* Panel */}
                    <div
                        className={`relative h-full w-4/5 max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out ${
                            animate ? "translate-x-0" : "-translate-x-full"
                        }`}
                    >
                        {/* Panel Header */}
                        <div className="flex items-center justify-between bg-accent p-4 h-24">
                            <img
                                src="/logo.png"
                                alt="logo"
                                className="h-16 w-16 rounded-full border-2 border-white/30 object-cover"
                            />
                            <button 
                                onClick={handleClose}
                                className="text-white hover:text-gray-200 transition-colors"
                            >
                                <IoMdClose className="h-8 w-8" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="space-y-1 p-4">
                            {[
                                { path: "/", icon: <CiHome className="h-6 w-6" />, label: "Home" },
                                { path: "/items", icon: <CiSpeaker className="h-6 w-6" />, label: "Items" },
                                { path: "/gallery", icon: <MdPhotoLibrary className="h-6 w-6" />, label: "Gallery" },
                                { path: "/booking", icon: <FaRegCalendarCheck className="h-6 w-6" />, label: "Booking" },
                                { path: "/contact", icon: <MdContacts className="h-6 w-6" />, label: "Contact" },
                            ].map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => goTo(item.path)}
                                    className="flex w-full items-center gap-3 rounded-lg p-3 text-lg font-semibold text-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/50"
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}