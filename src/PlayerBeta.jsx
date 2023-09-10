import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player"
import { useStateValue } from "./provider/StateProvider";
import updateUser from "./provider/state";

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date;
}

const videos = [
    {
        timeToStart: 23,
        timeToEnd: 26,
        url: 'https://www.youtube.com/watch?v=ZbngCYyyKag',
        en: "I'm going to track you down",
        pt: "Eu vou te rastrear",
        dicas: "\"Pull yourself together\" é usado para incentivar alguém a recuperar o controle emocional."
    },
    {
        timeToStart: 33,
        timeToEnd: 36,
        url: 'https://www.youtube.com/watch?v=iJRJMQ-u_pQ',
        en: "I won't let the darkness consume me",
        pt: "Eu não vou deixar a escuridão me consumir.",
        dicas: "\"Pull yourself together\" é usado para incentivar alguém a recuperar o controle emocional."
    },
    {
        timeToStart: 6,
        timeToEnd: 9,
        url: 'https://www.youtube.com/watch?v=iJRJMQ-u_pQ',
        en: "I see your fear and it amuses me",
        pt: "Eu sinto o seu medo e isso me diverte.",
        dicas: "\"Pull yourself together\" é usado para incentivar alguém a recuperar o controle emocional."
    },
    {
        timeToStart: 60 + 37,
        timeToEnd: 60 + 39,
        url: 'https://www.youtube.com/watch?v=HLnNY2KiQEQ',
        en: "Pull yourself together",
        pt: "Se acalme",
        dicas: "\"Pull yourself together\" é usado para incentivar alguém a recuperar o controle emocional."
    },
    {
        timeToStart: (60 / 60) + 0,
        timeToEnd: (60 / 60) + 3,
        url: 'https://www.youtube.com/watch?v=6DQxUmfYvrI',
        en: "It gets pretty lonely out here",
        pt: "É muito solitário aqui fora"
    },
    {
        timeToStart: (60 / 60) + 40,
        timeToEnd: (60 / 60) + 41,
        url: 'https://www.youtube.com/watch?v=6DQxUmfYvrI',
        en: "I'll be back before you know it",
        pt: "Eu estarei de volta antes que você perceba"
    },
    {
        timeToStart: 60 + 23,
        timeToEnd: 60 + 25,
        url: 'https://www.youtube.com/watch?v=6DQxUmfYvrI',
        en: "How do you have this?",
        pt: "Como você tem isso?"
    },
    {
        timeToStart: 55,
        timeToEnd: 58,
        url: 'https://www.youtube.com/watch?v=WgU7P6o-GkM',
        en: "I've just been thinking about how to fix all of this",
        pt: "Só tenho pensado em como consertar tudo isso."
    }
]

const PlayerBeta = () => {
    const [indice, setIndice] = useState(0)
    const [repeat, setRepeat] = useState(0)
    const [state, dispatch] = useStateValue()
    const [wrongCount, setWrongCount] = useState(false)

    const playerRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        updateUser({ url: state.url }, dispatch, 'UPDATE')
        var date = new Date()
        console.log(date.addDays(7))
        console.log("========= |RENDER| ==========")
    }, [])

    /*useEffect(() => {
        console.log("========= |UPDATEUI| =========")
        updateUser({ playing: true }, dispatch, 'UPDATE')
    }, [updateUi])
*/
    const handlePlay = () => {
        console.log("onPlay")
        if (!state.playing) {
            updateUser({ playing: true }, dispatch, 'UPDATE')
        }
    }


    const handleProgress = (progress) => {
        const currentTime = progress.playedSeconds
        console.log(currentTime)
        if (currentTime >= videos[indice].timeToEnd) {
            if (repeat > 2) {
                console.log("###### STOP ######")
                console.log(videos[indice])
                updateUser({ playing: false }, dispatch, 'UPDATE')

            } else {
                setRepeat(prevValue => prevValue = prevValue + 1)
                playerRef.current.seekTo(parseFloat(videos[indice].timeToStart))

            }
        }
    }


    const nextVideo = () => {
        const nextIndex = indice + 1
        console.log("======= |NEXT| ========")
        console.log(videos[nextIndex])
        console.log("======= |FIM| =========")
        const nextUrl = videos[nextIndex]
        setRepeat(0)
        setIndice(nextIndex)
        playerRef.current.seekTo(parseFloat(videos[nextIndex].timeToStart))
    }

    const handlerSubmit = () => {
        const userType = inputRef.current.value
        if (userType.toLowerCase().replace(' ', '').includes(videos[indice].en.toLowerCase().replace(' ', ''))) {
            alert('Correto')
        } else {
            console.log(userType, videos.en)
            alert("Incorreto!")
        }

    }

    const handlePlayPause = () => {
        playerRef.current.seekTo(parseFloat(videos[indice].timeToStart))
        updateUser({ playing: true }, dispatch, 'UPDATE')
    }


    const handleRepeat = () => {

    }
    return (
        <main className="w-screen  h-screen bg-[#272b2e]">
            <div className="h-14 w-full bg-white"></div>
            <div className="grid xs:grid-cols-1 justify-items-center px-3 md:px-0 md:grid md:grid-cols-3">
                <div className="hidden md:block w-full text-white">1</div>
                <div className="grid justify-items-center w-full text-white">
                    <div className="w-full h-[350px]  py-3 h-56">
                        {
                            videos[indice] && (
                                <ReactPlayer
                                    width="100%"
                                    height="100%"
                                    playing={state.playing}
                                    onReady={() => handlePlayPause()}
                                    ref={playerRef}
                                    url={videos[indice].url}
                                    controls={false}
                                    onProgress={handleProgress}
                                    onPlay={handlePlay}
                                />
                            ) || (
                                <div>FIM</div>
                            )
                        }

                    </div>
                    {
                        videos[indice] && (
                            <div className="m-2 font-semibold text-sm flex space-x-1">
                                <button
                                    className="px-6 py-1 border-b-2 bg-[#f45438] rounded-sm hover:scale-105 bg-[#195c50]"
                                    type="button"
                                    onClick={handlePlay}
                                >
                                    {state.playing ? "Pause" : "Play"}
                                </button>
                                <button
                                    className="px-6 py-1 rounded-sm border-b-2 bg-[#f45438] hover:scale-105 bg-[#195c50]"
                                    type="button"
                                    onClick={handlePlayPause}
                                >Repetir</button>
                                <button
                                    className="px-6 py-1 rounded-sm border-b-2 bg-[#f45438] hover:scale-105 bg-[#195c50]"
                                    type="button"
                                    onClick={nextVideo}
                                >Próximo</button>
                            </div>
                        )
                    }
                    {
                        videos[indice] && (
                            <>
                                <div className="w-full rounded-sm m-2 text-center text-white bg-[#195c50]">
                                    {
                                        videos[indice] && videos[indice].pt
                                    }
                                </div>
                                <div className="w-full grid-cols-1 grid md:grid-cols-4  md:items-center flex space-y-1 md:space-x-1 h-20">
                                    <textarea rows={10} ref={inputRef} placeholder="Digite o que está escutando aqui." className="outline-none  resize-none col-span-3  rounded-md w-auto my-2 w-full  h-full py-3 px-3 font-bold text-black/90 border-b-2 border-black/60" />
                                    <button onClick={handlerSubmit} className="w-auto border-b-2 shadow-md rounded-sm bg-[#f45438] hover:bg-[#f45438]/90 font-semibold	 text-white uppercase h-full px-2">verificar</button>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className="w-full flex flex-col items-center  text-black/90">
                    <div className="w-2/3 py-4">
                        3
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PlayerBeta