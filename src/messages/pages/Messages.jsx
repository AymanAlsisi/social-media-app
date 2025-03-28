import React from 'react'
import { useMediaQuery } from 'react-responsive'
import "../CSS/Messages.css"
import { protocols } from "../../api/protocols"
import { useStateProvider } from "../../context/StateProvider"
import { EmptyRoom, Rooms } from "../shared"

const Messages = () => {
  const { user, token } = useStateProvider()
  const isLargeScreen = useMediaQuery({
    minWidth: "700px"
  })
  const rooms = new WebSocket(`${protocols.ws}/ws/chats/?token=${token}`)
  return (
    <>
      <Rooms
        socket={rooms}
        my_id={user.id}
        token={token}
      />
      {isLargeScreen && <EmptyRoom />}
    </>
  )
}

export default Messages