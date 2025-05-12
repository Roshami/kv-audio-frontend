import { StarIcon } from "@heroicons/react/16/solid";

export default function ReviewsCard({ review }) {
    return (
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-100">
            <div className="p-4">
                {/* User Info */}
                <div className="flex items-start space-x-3">
                    <img 
                        src={review.profilePicture || '/default-avatar.png'} 
                        alt={review.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-50"
                    />
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-800 truncate">{review.name}</h3>
                        <p className="text-sm text-gray-500 truncate">{review.email}</p>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mt-3">
                    <div className="flex">
                        {[...Array(5)].map((_, index) => (
                            <StarIcon 
                                key={index} 
                                className={`h-5 w-5 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            />
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                        {review.rating}.0
                    </span>
                </div>

                {/* Comment */}
                <div className="mt-3">
                    <p className="text-gray-700 text-sm line-clamp-3">
                        {review.comment}
                    </p>
                </div>

                {/* Date (optional) */}
                {review.date && (
                    <div className="mt-3 text-xs text-gray-400">
                        {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}