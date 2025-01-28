import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import Home from "./home";
import Contact from "./contact";
import Gallery from "./gallery";
import Items from "./items";
import ErrorNotFound from "./error";

export default function HomePage() {
    return (
        <>
            <Header />
            <div className="w-full h-[calc(100vh-100px)]">
                <Routes path="/*">
                    <Route path="/" element={<Home />}></Route>
                    <Route  path="/contact" element={<Contact />}></Route>
                    <Route path="/gallery" element={<Gallery />}></Route>
                    <Route path="/items" element={<Items />}></Route>
                    <Route path="/*" element={<ErrorNotFound/>}></Route>
                </Routes>
                
            </div>
        </>
    )
}