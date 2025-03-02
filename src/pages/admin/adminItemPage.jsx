import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

export default function AdminItemPage() {
    const [items, setItems] = useState([]);
    const [itemLoaded, setItemLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        if (!itemLoaded) {
            const token = localStorage.getItem("token");
            axios.get("http://localhost:3000/api/products", {
                headers: { "Authorization": `Bearer ${token}` }
            }).then(
                (res) => {
                    console.log(res);
                    setItems(res.data);
                    setItemLoaded(true);
                }).catch((err) => {
                    console.log(err);
                });
        }

    }, [itemLoaded]);

    const handleDelete = (key) => {
        if (window.confirm("Are you sure you want to delete thiS item?")) {
            setItems(items.filter((item) => item.key !== key));
            const token = localStorage.getItem("token");
            axios.delete(`http://localhost:3000/api/products/${key}`, {
                headers: { "Authorization": `Bearer ${token}` }
            }).then((res) => {
                console.log(res);
                setItemLoaded(false);
            }).catch((err) => {
                console.log(err);
            })
        }
    };


    return (
        <div className="w-full h-full p-6 flex flex-col justify-center items-center">
            {!itemLoaded && <div className="border-4 my-4 border-b-green-700 w-[100px] h-[100px] rounded-full animate-spin border-gray-300"></div>}
            {itemLoaded && <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                            <th className="py-2 px-4">Key</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Price</th>
                            <th className="py-2 px-4">Category</th>
                            <th className="py-2 px-4">Dimensions</th>
                            <th className="py-2 px-4">Availability</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((product) => (
                            <tr key={product.key} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4 text-center">{product.key}</td>
                                <td className="py-3 px-4">{product.name}</td>
                                <td className="py-3 px-4 text-center">${product.price}</td>
                                <td className="py-3 px-4">{product.categary}</td>
                                <td className="py-3 px-4">{product.dimentions}</td>
                                <td className="py-3 px-4 text-center">
                                    <span className={`px-3 py-1 rounded-md text-white ${product.avalibility ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {product.avalibility ? "Available" : "Not Available"}
                                    </span>
                                </td>
                                <td className="py-3 px-4 flex gap-3 justify-center">
                                    <button onClick={() => navigate(`/admin/items/edit`, {
                                        state: product
                                    })} className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700">Edit</button>
                                    <button onClick={() => handleDelete(product.key)} className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-700">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}

            <Link to="/admin/items/add" className="fixed bottom-6 right-6 hover:text-red-900">
                <CiCirclePlus className="text-[70px]" />
            </Link>
        </div>
    );
}
