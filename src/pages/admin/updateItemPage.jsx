import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/meadiaUpload";


export default function UpdateItemPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        key: location.state?.key || "",
        name: location.state?.name || "",
        price: location.state?.price || 0,
        category: location.state?.categary || "Microphones",
        dimensions: location.state?.dimentions || "",
        description: location.state?.description || "",
        images: []
    });
    const [existingImages] = useState(location.state?.image || []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({
            ...prev,
            images: e.target.files
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("You are not authorized to update items");
            }

            let updatedImages = [...existingImages];
            
            // Upload new images if any
            if (formData.images.length > 0) {
                const uploadPromises = [];
                for (let i = 0; i < formData.images.length && i < 5; i++) {
                    uploadPromises.push(mediaUpload(formData.images[i]));
                }
                const newImageUrls = await Promise.all(uploadPromises);
                updatedImages = [...updatedImages, ...newImageUrls];
            }

            // Update product data
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/${formData.key}`,
                {
                    key: formData.key,
                    name: formData.name,
                    price: parseFloat(formData.price),
                    categary: formData.category,
                    dimentions: formData.dimensions,
                    description: formData.description,
                    image: updatedImages
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(response.data.message);
            navigate("/admin/items");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.error || err.message || "Failed to update product");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Update Product</h1>
                        <p className="text-gray-600 mt-1">Edit the product details below</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="key" className="block text-sm font-medium text-gray-700 mb-1">
                                Product Key
                            </label>
                            <input
                                type="text"
                                id="key"
                                name="key"
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                                value={formData.key}
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                Price (Rs.)
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                min="0"
                                step="0.01"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                                value={formData.price}
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                                value={formData.category}
                            >
                                <option value="Microphones">Microphones</option>
                                <option value="Mixers">Mixers</option>
                                <option value="Speakers">Speakers</option>
                                <option value="Amplifiers">Amplifiers</option>
                                <option value="Wireless Mics">Wireless Mics</option>
                                <option value="DJ Gear">DJ Gear</option>
                                <option value="Lighting">Lighting</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-1">
                                Dimensions
                            </label>
                            <input
                                type="text"
                                id="dimensions"
                                name="dimensions"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                                value={formData.dimensions}
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange}
                                value={formData.description}
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Existing Images
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {existingImages.map((img, index) => (
                                    <img 
                                        key={index} 
                                        src={img} 
                                        alt={`Product ${index}`}
                                        className="w-16 h-16 object-cover rounded border border-gray-200"
                                    />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                                Add New Images (Max 5)
                            </label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                multiple
                                accept="image/*"
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSubmitting ? 'Updating...' : 'Update Product'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("/admin/items")}
                                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}