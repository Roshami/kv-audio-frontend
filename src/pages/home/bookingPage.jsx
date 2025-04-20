import { useEffect, useState } from "react"
import { formatDate, loadCart } from "../../utils/cart"
import BookingItem from "../../components/bookingItem";
import toast from "react-hot-toast";
import axios from "axios";
import { use } from "react";

export default function BookingPage() {
    const [cart, setCart] = useState(loadCart())
    const [startDate, setStartDate] = useState(formatDate(new Date()))
    const [endDate, setEndDate] = useState(formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)))
    const [total, setTotal] = useState(0)
    const daysBettween = Math.max((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24), 1)

    function reloadCart() {
        setCart(loadCart())
        calculateTotal()
    }

    function calculateTotal() {
        const cartInfo = loadCart()
        cartInfo.startingDate = startDate
        cartInfo.endingDate = endDate
        cartInfo.days = daysBettween

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`,
            cartInfo
        ).then((res) => {
            console.log(res.data);
            setTotal(res.data.total)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        calculateTotal()
    }, [startDate, endDate])

    function handleBookingCreation(){
        const cart = loadCart()
        cart.startingDate = startDate
        cart.endingDate = endDate
        cart.days = daysBettween
        
        const token = localStorage.getItem("token");
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
            headers: { 
                Authorization: `Bearer ${token}` 
            }
        }).then((res) => {
            console.log(res.data);
            localStorage.removeItem("cart")
            toast.success("Booking created successfully");
            setCart(loadCart())
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to create booking");
        })
    }

    const days = daysBettween

    return (
        <div className="w-full h-full flex flex-col items-center gap-6 p-4">
            <h1 className="text-2xl font-bold">Create Booking</h1>

            {/* Date Picker Section */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <label className="flex flex-col">
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded p-2"
                    />
                </label>
                <label className="flex flex-col">
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded p-2"
                    />
                </label>
            </div>

            {/* Days Count */}
            <div className="text-lg">
                Duration: <span className="font-semibold">{days > 0 ? days : 0}</span> {days === 1 ? "day" : "days"}
            </div>

            {/* Booking Items */}
            <div className="w-full flex flex-wrap justify-center gap-4">
                {cart.orderedItems.map((item) => (
                    <div key={item.key}>
                        <BookingItem itemKey={item.key} qty={item.qty} refresh={reloadCart} />
                    </div>
                ))}
            </div>

            <div className="w-full flex justify-center mt-4">
                <p className="text-accent font-semibold">Total: {total.toFixed(2)}</p>
            </div>

            <div className="w-full flex justify-center mt-4">
                <button className=" w-[300px] h-[50px] bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 text-[25px] font-bold flex justify-center items-center"
                onClick={
                    ()=>{
                        handleBookingCreation()
                        console.log("Create Booking");
                }
            }
                >Create Booking</button>
            </div>
        </div>
    )
}
