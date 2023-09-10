import { useEffect, useState } from "react"
import Input from "./Input"
import PlayerComponent from "./Player"
import reducerController from "./provider/useReducer"
import ClassePage from "./page/ClassePage"
import { ContextProvider } from "./provider/StateProvider"
import initialState from "./provider/initialState"
import PlayerBeta from "./PlayerBeta"

export default function App() {

  return (
    <>
      <ContextProvider initialState={initialState} reducer={reducerController}>
        {/* <ClassePage /> */}
        <PlayerBeta />
      </ContextProvider>
    </>
  )

}
