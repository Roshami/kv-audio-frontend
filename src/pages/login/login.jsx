import { useState } from "react";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(email, password);
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        axios.post(`${backendUrl}/api/users/login`, {
            email: email,
            password: password

        }).then((res) => {
            console.log(res);
            toast.success("Login successful");
            const user = res.data.user

            //save the token to local storage
            localStorage.setItem("token", res.data.token);

            if(user.role === "Admin"){
                navigate("/admin/")
            }else{
                navigate("/")
            }

        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.error);
        })
    }

    return (
        <div className="bg-picture w-full h-screen flex justify-center items-center">
            <form onSubmit={handleOnSubmit}>
                <div className="w-[400px] h-[400px] backdrop-blur-xl rounded-2xl flex justify-center items-center flex-col">
                    <img src="/logo.png" alt="logo" className="w-[100px] h-[100px]  top-1 object-cover" />

                    <input type="email" className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-6" placeholder="Email"
                        value={email}

                        onChange={
                            (e) => {
                                setEmail(e.target.value);
                            }
                        }

                    />

                    <input type="password" className="w-[300px] h-[30px] bg-transparent border-b-2 border-white text-white text-xl outline-none mt-6" placeholder="Password"
                        value={password}

                        onChange={
                            (e) => {
                                setPassword(e.target.value);
                            }
                        }

                    />

                    <button className="w-[300px] h-[40px] bg-[#efac38] text-white text-2xl rounded-lg my-8" >Login</button>

                </div>
            </form>
        </div>
    );
}