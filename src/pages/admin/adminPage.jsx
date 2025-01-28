import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage() {
    return (
        <div className="w-full h-screen flex">
        
        <div className="w-[300px] h-full bg-green-200">

          <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <BsGraphDown />
            Dashboard
          </button>

          <Link to="/admin/booking" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegBookmark />
            Bookings
          </Link>

          <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <MdOutlineSpeaker />
            Items
          </button>

          <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
            <FaRegUser />
            Users
          </button>

        </div>

        <div className="w-[calc(100vw-300px)]  bg-red-900">
          <Routes path="/*">
          <Route path="/booking" element={<h1> Booking</h1>} />
          <Route path="/item" element={<h1> Item</h1>} />
          </Routes>
        </div>

      </div>

    )
}