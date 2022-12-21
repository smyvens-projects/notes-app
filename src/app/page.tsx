"use client"

import { useRef } from "react"
import PopupWindow from "~/components/PopupWindow"

export default function Page() {
    const showPopup = useRef<HTMLButtonElement>(null)
    return (
        <div className="w-full h-screen flex items-center justify-center flex-col gap-3">
            <h1 className="text-6xl text-secondary-600 font-loudrina-shadow">Smyvens</h1>
            <h2 className="text-3xl text-container-600 font-gilroy font-extralight">Hello World</h2>
            <h2 className="text-3xl text-primary-600 font-poppins font-extralight">
                So happy to have you
            </h2>
            <button type="button" ref={showPopup}>
                show popup
            </button>
            <PopupWindow trigger={showPopup} location={{ left: "600px", top: "100px" }}>
                <p className="w-96">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, quam dolor,
                    asperiores, doloremque temporibus cupiditate laborum harum ipsum ipsa facilis
                    fuga vitae necessitatibus sequi quas n
                </p>
            </PopupWindow>
        </div>
    )
}
