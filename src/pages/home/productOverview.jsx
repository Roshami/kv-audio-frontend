import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {
    const params = useParams();
    const key = params.key;
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`).then((res) => {
           //console.log(res.data);
            setProduct(res.data);
            setLoadingStatus("loaded");
        }).catch((err) => {
            console.log(err);
            setLoadingStatus("error");
        })
    },[])

    return (
        <div className="w-full h-full flex justify-center ">
        {
            loadingStatus === "loading" &&
            <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[50px] h-[50px] border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                </div>            
        }
        {
            loadingStatus === "loaded" &&
            <div className="w-full h-full pt-[190px] md:pt-0 flex flex-col md:flex-row justify-center items-center">
                <h1 className="text-2xl my-6 md:hidden  font-bold text-accent text-center ">{product.name}</h1>
                <div className="w-full md:w-[49%]">
                    <ImageSlider images={product.image} />
                </div>
                <div className="w-full md:w-[49%] p-2 h-full flex flex-col items-center text-center">
                    <h1 className="hidden md:block text-3xl font-bold text-gray-800">{product.name}</h1>
                    <h2 className="text-2xl font-bold text-gray-800">{product.categary}</h2>
                    <h3 className="text-2xl  text-gray-800 ">{product.dimentions}</h3>
                    <p className="text-gray-800">{product.description}</p>
                    <p className="text-gray-800">Rs. {product.price.toFixed(2)}</p>
                    <button className="w-[200px] h-[50px] bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105" onClick={
                        ()=>{
                            addToCart(product.key, 1);
                            toast.success("Added to Cart");
                            console.log(loadCart());   
                        }
                        }>Add to Cart</button>
                </div>
            </div>
        }
        {
            loadingStatus === "error" &&
            <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-3xl font-bold text-gray-800">Error Occured</h1>
            </div>
        }
        </div>
    )
}