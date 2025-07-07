import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemPage from "./adminItemPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminOrdersPage";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import AdminReviewPage from "./adminReviewPage";
import LoadingSpinner from "../../components/loadingSpinner";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    setLoading(true);
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const user = res.data;
      if (user.role === "Admin") {
        setUserValidated(true);
      } else {
        window.location.href = "/";
      }
    }).catch((err) => {
      console.error(err);
      window.location.href = "/login";
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-accent text-white rounded-lg shadow-lg"
      >
        <FiMenu className="text-xl" />
      </button>

      {/* Sidebar */}
      <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transform transition-transform duration-300 ease-in-out
        fixed md:static inset-y-0 left-0  w-64 bg-accent text-white z-40 `}
      >
        <div className="flex flex-col h-full p-4 scroll-auto">

          <div className="flex items-center justify-center space-x-4">
            <img
              src="/logo.png"
              alt="logo"
              className="w-16 h-16 object-cover rounded-full border-2 border-white/30"
            />
          </div>

          <h1 className="text-xl font-bold p-4 border-b border-blue-700 mb-4">Admin Dashboard</h1>

          <nav className="space-y-2 flex-1">
            <Link
              to="/admin"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BsGraphDown className="mr-3 text-lg" />
              Dashboard
            </Link>

            <Link
              to="/admin/orders"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaRegBookmark className="mr-3 text-lg" />
              Orders
            </Link>

            <Link
              to="/admin/items"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MdOutlineSpeaker className="mr-3 text-lg" />
              Items
            </Link>

            <Link to="/admin/reviews" className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors">
              <GoCommentDiscussion className="mr-3 text-lg" />
              Reviews
            </Link>

            <Link
              to="/admin/users"
              className="flex items-center p-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaRegUser className="mr-3 text-lg" />
              Users
            </Link>
          </nav>

          <div className="p-4 border-t border-blue-700">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="w-full py-2 bg-red-400 hover:bg-red-700 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#00000080] bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {userValidated && (
          <Routes>
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/items" element={<AdminItemPage />} />
            <Route path="/items/add" element={<AddItemPage />} />
            <Route path="/reviews" element={<AdminReviewPage />} />
            <Route path="/items/edit" element={<UpdateItemPage />} />
          </Routes>
        )}
      </div>
    </div>
  );
}