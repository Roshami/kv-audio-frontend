export default function VerifyEmail() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[400px] h-[300px] bg-white shadow-lg rounded-lg flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">Verify Email</h1>
                <p className="text-gray-500">Please verify your email to continue</p>
                <input type="number" placeholder="OTP" value={otp} onChange={(e)=>setOtp(e.target.value)} className="border p-2 rounded-lg w-[80%]"/>
                <button onClick={handleVerifyEmail} className="bg-blue-500 text-white p-2 rounded-lg w-[80%]">Verify</button>
            </div>
        </div>
    )
}