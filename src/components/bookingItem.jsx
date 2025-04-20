import axios from "axios"
import { useEffect, useState } from "react"
import { addToCart, removeFromCart } from "../utils/cart"
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa6"

export default function BookingItem(props) {
    const { itemKey, qty, refresh } = props
    const [item, setItem] = useState(null)
    const [status, setStatus] = useState("loading") //loading, success, error

    useEffect(() => {
        if (status === "loading") {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`).then((res) => {
                console.log(res.data);
                setItem(res.data);
                setStatus("success");
            }).catch((err) => {
                console.log(err);
                setStatus("error");
                removeFromCart(itemKey)
                refresh() // load the cart again
            })
        }
    }, [status])

    if (status === "loading") {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-[50px] h-[50px] border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="w-full h-full flex justify-center items-center text-red-600">
                An error occured
            </div>
        )
    }

    return (
        <div className="flex w-[600px] my-2 item-center gap-4 p-4 bg-primary shadow-md rounded-lg border border-secondary relative">
            <div className="absolute  right-[-45px] text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-full cursor-pointer">
            <FaTrash 
            onClick={
                () => { 
                    removeFromCart(itemKey); refresh() 
                }
            } 
            />
            </div>
            {/* Product Image */}
            <img
                src={item.image[0]}
                alt={item.name}
                className="w-20 h-20 object-cover border border-secondary"></img>

            {/* Product Details */}
            <div className="flex flew-row items-center relative w-full">
                <h3 className="text-lg font-semibold text-accent">{item.name}</h3>
                <div className="flex absolute right-0">
                    <p className=" font-medium w-[70px] text-center">{item.price.toFixed(2)}</p>
                    <p className="font-medium w-[40px] text-center relative flex justify-center items-center">
                        <button className="absolute top-[-20px]  hover:text-accent"
                            onClick={
                                () => {
                                    addToCart(itemKey, +1)
                                    refresh()
                                }
                            }
                        ><FaArrowUp /></button>
                        {qty}
                        <button className="absolute bottom-[-20px] hover:text-accent"
                            onClick={
                                () => {
                                    if (qty == 1) {
                                        removeFromCart(itemKey)
                                        refresh()
                                    } else {
                                        addToCart(itemKey, -1)
                                        refresh()
                                    }
                                }
                            }
                        ><FaArrowDown /></button>
                    </p>
                    <p className="text-accent font-semibold">{(item.price * qty).toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}