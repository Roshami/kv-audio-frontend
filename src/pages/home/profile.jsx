import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Profile() {
    const [userData, setUserData] = useState([]);
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        if (token) {
                    try {
                        const user = jwtDecode(token);
                        console.log(user);
                        setUserData(user);
                    } catch (error) {
                        console.error("Error decoding token:", error);
                    }
                }
    }, [token]);

    return (
        <div className=" h-[500px] bg-white border border-gray-100 rounded-2xl mx-10 my-14 shadow-2xl p-10">
             
        </div>
    )
}