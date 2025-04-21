import { useState } from "react";

export default function ImageSlider(props) {
    const images = props.images
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="w-full h-full flex flex-col items-center">
            <img src={selectedImage} className="w-auto h-[300px] md:h-[400px] object-cover" alt=""></img>
            <div className="w-full h-[90px] mt-[20px] flex justify-center">
                {
                    images.map((image, index) => {
                        return (
                            <img key={index} src={image} className={`w-[70px] h-[70px] mr-[2px] object-cover cursor-pointer ${image == selectedImage && "border-[3px] border-accent"}`}  
                            onClick={
                                () => {
                                    setSelectedImage(image)
                                }
                            } 
                            alt="product"></img>
                        )
                    })
                }
            </div>
        </div>
    ) 
}