import { useState } from "react"

export default function Testing() {
    const [count, setCount] = useState(0)
    //coconut, banana, apple, other
    const [itemName, setItemName] = useState("coconut")

    return (
        <div className="w-full  h-screen flex flex-col justify-center items-center">
            <h1 className="text-5xl">{count} {itemName}s</h1>

            <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                () => {
                    const newCount = count + 1
                    setCount(newCount)
                }
            }>
                count
            </button>

            <div className="w-full p-4 flex justify-evenly items-center">
                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                    () => {
                        setItemName("Coconut")
                    }
                }>
                    Coconut
                </button>
                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                    () => {
                        setItemName("Banana")
                    }
                }>
                    Banana
                </button>
                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                    () => {
                        setItemName("Apple")
                    }
                }>
                    Apple
                </button>
                <button className="w-[200px] h-[60px] bg-black text-3xl text-white rounded-lg" onClick={
                    () => {
                        setItemName("Other")
                    }
                }>
                    Other
                </button>
            </div>
        </div>
    )
}