import { useEffect, useState, useRef } from "react";
import { useStateValue } from "./provider/StateProvider";
const Input = ({ subtitle, check, index }) => {
    const [state, dispatch] = useStateValue()
    const [playingVideo, setPlayingVideo] = useState()

    const inputRef = useRef();

    useEffect(() => {
        const currentVideo = state.videos[state.currentVideo.index]
        setPlayingVideo(currentVideo)
    }, [])

    useEffect(() => {
        console.log('======= | PLAYER UPDATE | ========')
        const currentVideo = state.videos[state.currentVideo.index]
        setPlayingVideo(currentVideo)
        inputRef.current.value = ''
    }, [state.currentVideo])

    const handlerSubmit = () => {
        const userType = inputRef.current.value
        if (userType.toLowerCase().replace(' ', '').includes(playingVideo.en.toLowerCase().replace(' ', ''))) {
            alert('Correto')
        } else {
            console.log(userType, playingVideo.en)
            alert("Incorreto!")
        }

    }


    return (
        <div className="w-full items-center flex space-x-1 h-20">
            <textarea rows={10} ref={inputRef} className="outline-none rounded-md w-auto my-2 w-full  h-full py-3 px-2 font-bold text-black/90 border-b-2 border-black/60" />
            <button onClick={handlerSubmit} className="w-auto rounded-md bg-[#ffa900] font-semibold	 text-white uppercase h-full px-2">corrigir</button>
        </div>
    )
}

export default Input