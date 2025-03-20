import { useState } from "react"
import mediaUpload from "../utils/meadiaUpload";

export default function Testing() {
    const [file, setFile] = useState(null);

    function uploadFile() {
        console.log(file);
        mediaUpload(file).then((url)=>{
            console.log(url);
        })
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <input type="file" multiple onChange={
                (e) => {
                    setFile(e.target.files[0])
                }
            } />

            <button className="w-[200px] h-[50px] bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105" onClick={uploadFile}>
                Upload
            </button>
        </div>
    )
}