import { Link } from 'react-router-dom'
import './home.css'
import CardSlider from '../../components/CardSlider'


export default function Home() {
    return (
        <div className="w-full h-full">

            <div className="hero-bg-picture w-full h-[550px] md:h-[350px]  flex flex-col items-center justify-center">
                <div className="w-full h-full bg-black/50 flex flex-col items-center justify-center px-[20px] pt-[20px]">

                    <h1 className="text-5xl font-bold text-white text-center">Premium Audio Rentals for Every Event</h1>
                    <p className="text-white text-center text-2xl">From studio mics to festival speakers,we’ve got you covered.</p>

                    <div className='flex flex-col sm:flex-row sm:gap-10'>
                        <Link to="/items" className="w-[200px] h-[50px] bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 mt-5 text-center text-2xl"> Order Now</Link>

                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center mt-10">Featured Products</h1>
                <div className="flex">
                    <div className="W-[49%] bg-amber-300">
                        <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center mt-10">Featured Products</h1>
                    </div>
                    <div className="W-[49%]"><CardSlider /></div>
                </div>
            </div>
        </div>
    )
}