import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useStateValue } from "./provider/StateProvider";
import updateUser from "./provider/state";

const PlayerComponent = ({ repeat }) => {
  const [play, setPlay] = useState()
  const playerRef = useRef();
  const [count, setCount] = useState(0)
  const [state, dispatch] = useStateValue()
  const [playingVideo, setPlayingVideo] = useState()

  useEffect(() => {
    console.log('##### UPDATE')
    const currentVideo = state.videos[state.currentVideo.index]
    setPlayingVideo(currentVideo)
    setPlay(state.playStatus.playing)
  }, [])

  useEffect(() => {
    if (repeat) {
      console.log('#### RELOAD')
      playerRef.current.seekTo(playingVideo.timeToStart, 'seconds');
      setCount(0)
    }
  }, [repeat])


  useEffect(() => {
    console.log('======= | PLAYER UPDATE | ========')
    const currentVideo = state.videos[state.currentVideo.index]
    setPlayingVideo(currentVideo)
    playerRef.current.seekTo(currentVideo.timeToStart, 'seconds');
    setCount(0)
    // if (playerRef) {
    //   setPlayingVideo(currentVideo)
    //   console.log(currentVideo)
    //   playerRef.current.seekTo(currentVideo.timeToStart, 'seconds');
    //   setCount(0)
    //   updateUser({ playing: true }, dispatch, 'STOP_VIDEO')
    // }
  }, [state.currentVideo])


  useEffect(() => {
    console.log('#### UPDATE COUNT', count)
  }, [count])


  const onReady = useCallback(() => {
    if (playingVideo) {
      console.log('#### READY', playingVideo.timeToStart)
      playerRef.current.seekTo(playingVideo.timeToStart, 'seconds');
    }
  }, [playerRef.current])

  const hadlerPlayVideo = () => {
    console.log('======= | PLAY VIDEO | =======')
  }

  useEffect(() => {
    const status = state.playStatus.playing
    console.log("### PAUSE EFFECT", status)
    if (play !== status) {
      setPlay(status)
    }
  }), [state.playStatus]

  const onProgress = (progress) => {
    const progresso = progress.playedSeconds
    const timeOut = playingVideo.timeToEnd
    const remain = timeOut - progresso
    console.log('### TIME', progresso, '### REMAIN', remain)
    if (remain <= 0) {
      setCount(prev => prev + 1)
      if (count >= 2) {
        return updateUser({ playing: false }, dispatch, 'STOP_VIDEO')
      }
      playerRef.current.seekTo(playingVideo.timeToStart, 'seconds');
      //updateUser({ playing: false }, dispatch, 'STOP_VIDEO')
    }
    /*if (progress.playedSeconds >= playingVideo.timeToEnd) {
      if (count < 2) {
        console.log('#### CONTADOR', progress.playedSeconds, playingVideo.timeToEnd)
        setCount(value => value += 1)
        playerRef.current.seekTo(playingVideo.timeToStart, 'seconds');
      }
      if (count >= 2) {
        updateUser({ playing: false }, dispatch, 'STOP_VIDEO')
      }
    }*/

  }

  const onPause = () => {
    console.log('###### PAUSE #########', count)
    if (count < 2) {
      updateUser({ playing: true }, dispatch, 'STOP_VIDEO')
    }
  }

  return (
    <>
      <div className="">


        <ReactPlayer
          height={500}
          style={{ width: '100%' }}
          ref={playerRef}
          playing={play}
          url={playingVideo?.url}
          onPlay={hadlerPlayVideo}
          onReady={onReady}
          onProgress={onProgress}
          onPause={onPause}
        />



      </div>
    </>
  )
}

export default PlayerComponent