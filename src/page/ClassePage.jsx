import { useEffect, useState } from "react"
import Input from "../Input"
import PlayerComponent from "../Player"
import { useStateValue } from "../provider/StateProvider"
import updateUser from "../provider/state"

const ClassePage = () => {
    const [state, dispatch] = useStateValue()
    const [repeat, setRepeat] = useState(false)
    const [currentVideo, setCurrentVideo] = useState()

    useEffect(() => {

    }, [])


    const handlerNextVideo = () => {
        updateUser({ index: state.currentVideo.index + 1 }, dispatch, 'NEXT_VIDEO')
    }


    const repeatVideo = () => {
        setRepeat(true)
    }

    const handlerPlayVideo = () => {
        console.log('====== | START PLAY | ======')
        updateUser({ playing: true }, dispatch, 'STOP_VIDEO')
    }


    return (
        <>
            <div className="w-screen h-screen  bg-[#111111]">
                <div className="w-full bg-white h-16"></div>
                <div className="grid inset-0 h-[calc(100%-65px)] overflow-auto grid-flow-col">
                    <div className=" ">
                        <div className="bg-white w-48 h-full">

                        </div>
                    </div>
                    <div className=" justify-items-center md:grid md:grid-col-1">
                        <PlayerComponent />
                        <div className="flex w-auto space-x-2 justify-center p-2">
                            <button className="w-10 p-2 text-white h-10 rounded-full bg-[#4cbee1]" onClick={repeatVideo}>
                                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"></path>
                                </svg>
                            </button>
                            <button className="w-10 p-2 text-white h-10 rounded-full bg-[#4cbee1]" onClick={handlerPlayVideo}>
                                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"></path>
                                </svg>
                            </button>
                            <button className="w-10 p-2 text-white h-10 rounded-full bg-[#4cbee1]" onClick={handlerNextVideo}>
                                <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="w-full">
                            <Input />
                        </div>
                    </div>
                    <div className="flex flex-col items-start text-white text-center w-80 p-3 w-8">
                        <div>
                            <p>{state.currentVideo.index}</p>
                        </div>
                        <div className="my-2 ">
                            <label className="font-semibold">Tradução</label>
                            <p className="bg-green-600 font-semibold">{state.videos[state.currentVideo.index].pt}</p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ClassePage