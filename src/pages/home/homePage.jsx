import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Home from "./home";
import Contact from "./contact";
import Gallery from "./gallery";
import Items from "./items";
import ErrorNotFound from "./error";
import ProductOverview from "./productOverview";
import BookingPage from "./bookingPage";
import Profile from "./profile";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1">
                <div className="mx-auto w-full py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/product/:key" element={<ProductOverview />} />
                        <Route path="/items" element={<Items />} />
                        <Route path="/booking" element={<BookingPage />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/*" element={<ErrorNotFound />} />
                    </Routes>
                </div>
            </main>
        </div>
    )
}