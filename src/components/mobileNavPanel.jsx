import { IoMdClose } from "react-icons/io"
import { useEffect, useState } from "react"
import { MdContacts, MdPhotoLibrary } from "react-icons/md"
import { FaRegCalendarCheck } from "react-icons/fa6"
import { CiHome, CiSpeaker } from "react-icons/ci"
import { useNavigate } from "react-router-dom"

export default function MobileNavPanel({ isOpen, setOpen }) {
    const [animate, setAnimate] = useState(false)
    const navigate = useNavigate();

    function goTo(route) {
		navigate(route);
		setOpen(false);
	}

    useEffect(() => {
        if (isOpen) {
            // Start animation slightly after mount
            setTimeout(() => setAnimate(true), 10)
        } else {
            setAnimate(false)
        }
    }, [isOpen])

    const handleClose = () => {
        setAnimate(false)
        setTimeout(() => setOpen(false), 300) // match transition duration
    }

    return (
        <>
            {isOpen && (
                <div className="w-full h-full bg-[#00000070] fixed top-0 left-0 flex justify-start items-start z-50">
                    <div
                        className={`w-[calc(100vw-90px)] h-full bg-white relative transition-transform duration-300 ease-in-out 
                        ${animate ? "translate-x-0" : "-translate-x-full"}`}
                    >
                        <div className="bg-accent w-full h-[100px] flex justify-center items-center">
                            <img
                                src="/logo.png"
                                alt="logo"
                                className="w-[100px] h-[100px] object-cover border-[1px] absolute left-1 rounded-full"
                            />
                            <IoMdClose
                                className="text-3xl font-bold m-1 absolute right-3 cursor-pointer"
                                onClick={handleClose}
                            />
                        </div>
                        {/* Navigation Links */}
						<div
							onClick={() => {
								goTo("/");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<CiHome className="text-2xl" />
							Home
						</div>
                        <div
							onClick={() => {
								goTo("/items");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<CiSpeaker className="text-2xl" />
							Items
						</div>

						<div
							onClick={() => {
								goTo("/gallery");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<MdPhotoLibrary className="text-2xl" />
							Gallery
						</div>                        

						<div
							onClick={() => {
								goTo("/booking");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<FaRegCalendarCheck className="text-2xl" />
							Booking
						</div>

						<div
							onClick={() => {
								goTo("/contact");
							}}
							className="text-[20px] text-accent m-1 p-2 flex items-center gap-2 cursor-pointer hover:bg-accent/10 rounded-md"
						>
							<MdContacts className="text-2xl" />
							Contact
						</div>

						
                           
					
                    </div>
                    
                </div>
            )}
        </>
    )
}
