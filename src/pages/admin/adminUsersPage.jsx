import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log(res.data);
				setUsers(res.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			} finally {
				setLoading(false);
			}
		};
        if(loading){
            fetchUsers();
        }
	}, [loading]);


    function handleBlockUser(email){
        
        const token = localStorage.getItem("token");

        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data.data); // Make sure to access the correct path
            setLoading(true);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Users</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm uppercase text-left">
                                <th className="py-3 px-4">Profile</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Phone</th>
                                <th className="py-3 px-4">Address</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <img
                                            src={user.profilePicture}
                                            alt={`${user.firstName} ${user.lastName}`}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="py-3 px-4 font-medium">{user.firstName} {user.lastName}</td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">{user.phone}</td>
                                    <td className="py-3 px-4">{user.address}</td>
                                    <td className="py-3 px-4" >
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'Admin' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 cursor-pointer" onClick={()=>{handleBlockUser(user.email)}}>
                                        <span className={`px-2 py-1  rounded-full text-xs font-semibold ${user.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                            {user.isBlocked ? 'Blocked' : 'Active'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
