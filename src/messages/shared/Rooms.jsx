import { useState, useEffect } from 'react'
import { IoSearch } from "react-icons/io5"
import axios from 'axios'
import { protocols } from '../../api/protocols'
import UserRoom from './UserRoom'
import LoadingRooms from './LoadingRooms'
import SearchResult from './SearchResult'
import NoRoom from './NoRoom'

const Rooms = ({ socket, my_id, token }) => {
  const [rooms, setRooms] = useState([])
  const config = {
    headers: {
      "Authorization": `Token ${token}`
    }
  }

  const [isLoading, setIsLoading] = useState(true)

  const [users, setUsers] = useState([])
  const [search, setSearch] = useState(null)

  const searchForUsers = (username) => {
    setSearch(username)
    axios.get(`${protocols.http}/search?q=${username}`)
      .then(res => setUsers(res.data.users))
  }

  useEffect(() => {
    socket.addEventListener('message', (event) => {
      const recieved = JSON.parse(event.data)
      if (recieved.type === "initial") {
        setRooms(recieved.chats)
        setIsLoading(false)
      } else if (recieved.type === "new_message") {
        setRooms(prev => [...prev, recieved])
      }
    })
  }, [])
  return (
    <div className='messages'>
      <div className="search-input">
        <input
          type="text"
          placeholder='Search for users...'
          onChange={e => searchForUsers(e.target.value)}
        />
        <IoSearch size={22} color='grey' />
      </div>
      {
        isLoading ? <LoadingRooms />
          : search ? <SearchResult
            users={users}
            search={search}
            config={config}
            my_id={my_id}
          />
            :
            rooms.length === 0 ? <NoRoom text={'No Chats yet'} h={'40vh'} />
              :
              (
                <>
                  <h3>Messages</h3>
                  <div className="rooms-list">
                    {
                      rooms.map((room, i) => {
                        return (
                          <UserRoom
                            key={i}
                            data={room}
                            my_id={my_id}
                            socket={socket}
                            config={config}
                          />
                        )
                      })
                    }
                  </div>
                </>
              )
      }
    </div>
  )
}

export default Rooms