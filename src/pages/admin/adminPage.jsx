import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemPage from "./adminItemPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";


export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">

      <div className="w-[200px] h-full bg-green-200">

        <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
          <BsGraphDown />
          Dashboard
        </button>

        <Link to="/admin/booking" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
          <FaRegBookmark />
          Bookings
        </Link>

        <Link to="/admin/items" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
          <MdOutlineSpeaker />
          Items
        </Link>

        <Link to="/admin/users" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'>
          <FaRegUser />
          Users
        </Link>

      </div>

      <div className="w-[calc(100vw-200px)]">
        <Routes path="/*">
          <Route path="/booking" element={<h1> Booking</h1>}/>
          <Route path="/users" element={<AdminUsersPage/>}/>
          <Route path="/items" element={<AdminItemPage/>}/>
          <Route path="/items/add" element={<AddItemPage/>}/>
          <Route path="/items/edit" element={<UpdateItemPage/>}/>
        </Routes>
      </div>

    </div>

  )
}