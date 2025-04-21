import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
    return (
        <div className="flex flex-col w-72 h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            {/* Product Image */}
            <div className="relative h-56 w-full overflow-hidden">
                <img 
                    src={item.image[0]} 
                    alt={item.name} 
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
            </div>

            {/* Product Info */}
            <div className="flex flex-col flex-grow p-5">
                <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {item.name}
                    </h3>
                    <span className="ml-2 text-lg font-bold text-indigo-600">
                        Rs. {item.price.toFixed(2)}
                    </span>
                </div>

                <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                    {item.description}
                </p>

                {/* Product Meta */}
                <div className="mt-4 space-y-1.5">
                    <div className="flex items-center text-sm text-gray-500">
                        <span className="w-20 text-gray-500">Category:</span>
                        <span className="font-medium text-gray-700">{item.categary}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <span className="w-20 text-gray-500">Dimensions:</span>
                        <span className="font-medium text-gray-700">{item.dimentions}</span>
                    </div>
                </div>

                {/* Availability */}
                <div className="mt-4 flex items-center">
                    <span className={`inline-flex items-center text-sm font-medium ${
                        item.avalibility ? 'text-green-600' : 'text-red-600'
                    }`}>
                        {item.avalibility ? (
                            <>
                                <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500"></span>
                                In Stock
                            </>
                        ) : (
                            <>
                                <span className="mr-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                                Out of Stock
                            </>
                        )}
                    </span>
                </div>

                {/* Spacer to push button to bottom */}
                <div className="flex-grow"></div>

                {/* View Details Button - now fixed to bottom */}
                <Link 
                    to={`/product/${item.key}`}
                    className="mt-4 w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-sm transition-all duration-200 hover:shadow-md"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}