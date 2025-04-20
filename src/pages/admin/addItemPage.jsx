import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/meadiaUpload";

export default function AddItemPage() {
    const [productKey, setProductKey] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState("audio");
    const [productDimensions, setProductDimensions] = useState("");
    const [productDescription, setProductDescription] = useState("");   
    const [productImage, setProductImage] = useState([]);
    const nevigate = useNavigate();

    async function handleAddItem(e) {
        const promises = []

        for (let i = 0; i < productImage.length; i++) {
            const promise = mediaUpload(productImage[i]);
            promises.push(promise)
            /*if (i == 5){
                toast.error("You can only upload 5 images at a time");
                break
            }*/
        }

        /*Promise.all(promises).then((result) => {
            console.log(result);
        }).catch((err) => {
            toast.error(err);
        })*/

        

        //e.preventDefault();
        console.log(productKey, productName, productPrice, productCategory, productDimensions, productDescription);
        
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            try {

                /*Promise.all(promises).then((result) => {
                    console.log(result);
                }).catch((err) => {
                    toast.error(err);
                })*/

                const imageUrl = await Promise.all(promises);

                const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
                    key: productKey,
                    name: productName,
                    price: productPrice,
                    categary : productCategory,
                    dimentions: productDimensions,
                    description: productDescription,
                    image: imageUrl
                },
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    })

                toast.success(result.data.message);

                nevigate("/admin/items")

            } catch (err) {
                toast.error(err.response.data.error);
            }
        } else {
            toast.error("You are not authorized to add items");
        }
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-[400px] flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-700 text-center">Add New Product</h1>
                <input
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
                <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 shadow-md" onClick={handleAddItem}>Add Product</button>

                <button className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition duration-300 shadow-md" onClick={() => nevigate("/admin/items")}>Cancel</button>
            </div>
        </div>
    );
}
