import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
    return (
        <div className="w-[300px] h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 p-5 transition-transform transform hover:scale-105 hover:shadow-2xl m-4">
            <img 
                src={item.image[0]} 
                alt={item.name} 
                className="w-full h-52 object-cover rounded-xl"
            />
            <div className="mt-4 text-center">
                <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                <p className="text-gray-600 text-sm mt-2 truncate">{item.description}</p>
                <p className="mt-3 text-gray-900 font-bold text-lg">${item.price}</p>
                <p className="text-gray-500 text-sm">Category: <span className="font-medium">{item.categary}</span></p>
                <p className="text-gray-500 text-sm">Dimensions: <span className="font-medium">{item.dimentions}</span></p>
                <p className={`mt-3 text-sm font-medium ${item.avalibility ? 'text-green-600' : 'text-red-600'}`}>
                    {item.avalibility ? "✔ In Stock" : "✖ Out of Stock"}
                </p>
                <Link to={`/product/${item.key}`} className="mt-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:scale-105">
                    View Details
                </Link>
            </div>
        </div>
    );
}
