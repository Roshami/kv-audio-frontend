import { useState } from "react";
import "./register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const nevigate = useNavigate();

/*************  ✨ Codeium Command ⭐  *************/
    /**
     * Handles the submission of the registration form by preventing the default
     * submission behavior, making a POST request to the backend to create a new
     * user with the provided information, and then navigating to the login page
     * if the request is successful. If the request fails, an error message is
     * displayed to the user.
     * @param {React.FormEvent<HTMLFormElement>} e The form submission event.
     */
/******  46c56763-fb0c-4e05-81ca-70b77c372d65  *******/
    function handleOnSubmit(e) {
        e.preventDefault();
        console.log({ firstName, lastName, email, password, address, phone });

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, { 
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            address: address,
            phone: phone
        }).then((res) => {
            toast.success(res.data.message);
            nevigate("/login");
        }).catch((err) => {
            toast.error(err?.response?.data?.error||"An error occured");
        })  
    }

    return (
        <div className="bg-picture w-full h-screen flex justify-center items-center">
            <form onSubmit={handleOnSubmit}>
                <div className="w-[400px] h-[550px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col p-6">
                    <img src="/logo.png" alt="logo" className="w-[100px] h-[100px]  top-1 object-cover" />
                    <h2 className="text-white text-2xl mb-4">Register</h2>
                    <input type="text" className="w-[280px] h-[35px] bg-transparent border-b-2 border-white text-white text-lg outline-none mt-3" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" className="w-[280px] h-[35px] bg-transparent border-b-2 border-white text-white text-lg outline-none mt-3" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="email" className="w-[280px] h-[35px] bg-transparent border-b-2 border-white text-white text-lg outline-none mt-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" className="w-[280px] h-[35px] bg-transparent border-b-2 border-white text-white text-lg outline-none mt-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" className="w-[280px] h-[35px] bg-transparent border-b-2 border-white text-white text-lg outline-none mt-3" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input type="text" className="w-[280px] h-[35px] bg-transparent border-b-2 border-white text-white text-lg outline-none mt-3" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <button className="w-[280px] h-[40px] bg-[#efac38] text-white text-xl rounded-lg mt-6">Register</button>
                </div>
            </form>
        </div>
    );
}