import { Link, useNavigate } from 'react-router-dom'
import './home.css'
import SearchBar from '../../components/searchBar';
import { useState } from 'react';
import ReviewsCard from '../../components/reviewsCard';
import AddReview from '../../components/addreview';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import CardSlider from '../../components/cardSlider';


export default function Home() {
    const [modleOpen, setModleOpen] = useState(false);
    const [formData, setFormData] = useState({
        category: "All"
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = (query) => {
        console.log("Search term:", query);
        navigate(`/items?search=${query}`);
    };

    return (
        <div className="w-full h-full">

            {/* Hero Section */}
            <div className="hero-bg-picture w-full h-[550px] md:h-[350px]  flex flex-col items-center justify-center">
                <div className="w-full h-full bg-black/50 flex flex-col items-center justify-center px-[20px] pt-[20px]">

                    <h1 className="text-5xl font-bold text-white text-center">Premium Audio Rentals for Every Event</h1>
                    <p className="text-white text-center text-2xl">From studio mics to festival speakers,we’ve got you covered.</p>

                    <div className='flex flex-col sm:flex-row sm:gap-10'>
                        <Link to="/items" className="w-[200px] h-[50px] bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-accent transition-transform transform hover:scale-105 mt-5 text-center text-2xl"> Order Now</Link>
                        <Link to="/contact" className="w-[200px] h-[50px] bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-accent transition-transform transform hover:scale-105 mt-5 text-center text-2xl">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Product Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center mt-10">Featured Products</h1>

                {/* Search and Filter Section for laptop */}
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:W-[49%]">
                        <div className="p-4">
                            <SearchBar onSearch={handleSearch} />
                        </div>
                        <div className="p-4">
                            <div className='flex flex-col justify-center items-center px-3' >
                                <h2 className="text-3xl font-bold text-purple-900  text-center mt-5 cursor-pointer">All Categories</h2>
                                <Link to="/items?category=Microphones" className="w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-5 text-center text-xl cursor-pointer">
                                    Microphones
                                </Link>
                                <Link to="/items?category=Mixers" className="w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer">
                                    Mixers
                                </Link>
                                <Link to="/items?category=Speakers" className='w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer'>
                                    Speakers
                                </Link>
                                <Link to="/items?category=Amplifiers" className='w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer'>
                                    Amplifiers
                                </Link>
                                <Link to="/items?category=Wireless Mics" className='w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer'>
                                    Wireless Mics
                                </Link>
                                <Link to="/items?category=DJ Gear" className='w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer'>
                                    DJ Gear
                                </Link>
                                <Link to="/items?category=Lighting" className='w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer'>
                                    Lighting
                                </Link>
                                <Link to="/items?category=Accessories" className='w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer'>
                                    Accessories
                                </Link>
                            </div>
                        </div>

                        
                    </div>

                    {/* Card Slider */}
                    <div className="w-full md:W-[49%] "><CardSlider /></div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-purple-900 text-center m-5">Customer Reviews</h2>
                <div className="flex">

                    <div className="flex justify-center items-end w-[49%] relative">
                        <div className="flex justify-center items-center">
                            <img src="/system.png" alt="system" />
                        </div>
                        <button
                        onClick={() => setModleOpen(true)}
                        className="h-[45px] bg-accent/50 text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-5 text-center text-xl cursor-pointer absolute mb-5">Add your comment</button>
                    </div>
                    <div className="flex flex-col justify-center items-center w-[49%] px-11 bg-amber-300">

                        <ReviewsCard />
                    </div>
                </div>
            </div>


            {/* add review Section */}
            {modleOpen && <div className="w-full h-full bg-[#000000a9] mx-auto flex fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 justify-center items-center">
                <div className=" flex  items-center relative">
                    <IoMdCloseCircleOutline className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-700 z-52" onClick={() => setModleOpen(false)} />
                    <AddReview/>
                </div>              
            </div>}


        </div>
    )
}