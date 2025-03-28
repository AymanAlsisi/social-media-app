import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useParams } from 'react-router'
import axios from 'axios'
import "../CSS/Direct.css"
import { protocols } from "../../api/protocols"
import { useStateProvider } from "../../context/StateProvider"
import { Room, Rooms } from "../shared"

const Direct = () => {
  const { user, token } = useStateProvider()
  const isLargeScreen = useMediaQuery({
    minWidth: "700px"
  })

  const [otherUser, setOtherUser] = useState(null)

  const { room_id } = useParams()

  const user_id = room_id.split('_').find(e => Number(e) !== Number(user.id))

  const rooms = new WebSocket(`${protocols.ws}/ws/chats/?token=${token}`)
  const room = new WebSocket(`${protocols.ws}/ws/chat/${room_id}/`)

  const config = {
    headers: {
      "Authorization": `Token ${token}`
    }
  }

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${protocols.http}/profile/${user_id}`, config)
      setOtherUser(res.data.profile)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [user_id])

  if (!otherUser) return null;
  return (
    <>
      {isLargeScreen && <Rooms
        socket={rooms}
        my_id={user.id}
        token={token}
      />}
      <Room
        socket={room}
        user={otherUser}
        my_id={user.id}
      />
    </>
  )
}

export default Direct