import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/meadiaUpload";

export default function UpdateItemPage() {
    const location = useLocation();

    console.log(location.state);

    const [productKey, setProductKey] = useState(location.state.key);
    const [productName, setProductName] = useState(location.state.name);
    const [productPrice, setProductPrice] = useState(location.state.price);
    const [productCategory, setProductCategory] = useState(location.state.categary);
    const [productDimensions, setProductDimensions] = useState(location.state.dimentions);
    const [productDescription, setProductDescription] = useState(location.state.description);
    const [productImage, setProductImage] = useState([]);
    const nevigate = useNavigate();


    async function handleUpdateItem(e) {

        let updatingImages = location.state.image
        
        if(productImage.length > 0) {

            const promises = []
            
                    for (let i = 0; i < productImage.length; i++) {
                        const promise = mediaUpload(productImage[i]);
                        promises.push(promise)
                    }

                    updatingImages = await Promise.all(promises);
            }

        //e.preventDefault();
        console.log(productKey, productName, productPrice, productCategory, productDimensions, productDescription);

        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            try {
                const result = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productKey}` , {
                    key: productKey,
                    name: productName,
                    price: productPrice,
                    categary: productCategory,
                    dimentions: productDimensions,
                    description: productDescription,
                    image: updatingImages
                },
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    })
                
                console.log(result);
                toast.success(result.data.message);

                nevigate("/admin/items")

            } catch (err) {
                console.log(err);
                toast.error(err.response.data.error);
            }
        } else {
            toast.error("You are not authorized to add items");
        }
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-[400px] flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-700 text-center">Update Item</h1>
                <input
                    disabled
                    type="text"
                    placeholder="Product Key"
                    className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setProductKey(e.target.value)}
                    value={productKey}
                />
                <input
                    type="text"
                    placeholder="Product Name"
                    className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                />
                <input
                    type="number"
                    placeholder="Product Price"
                    className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setProductPrice(e.target.value)}
                    value={productPrice}
                />
                <select
                    className="p-3 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setProductCategory(e.target.value)}
                    value={productCategory}
                >
                    <option value="audio">Audio</option>
                    <option value="lights">Lights</option>
                </select>
                <input
                    type="text"
                    placeholder="Product Dimensions"
                    className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setProductDimensions(e.target.value)}
                    value={productDimensions}
                />
                <textarea
                    placeholder="Product Description"
                    className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-24"
                    onChange={(e) => setProductDescription(e.target.value)}
                    value={productDescription}
                ></textarea>
                <input type="file" multiple onChange={(e) => setProductImage(e.target.files)} className="w-full p-2 border rounded"></input>
                <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 shadow-md" onClick={handleUpdateItem}>Update Product</button>

                <button className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition duration-300 shadow-md" onClick={() => nevigate("/admin/items")}>Cancel</button>
            </div>
        </div>
    );
}
