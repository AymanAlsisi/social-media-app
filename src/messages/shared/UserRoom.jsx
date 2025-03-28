import { useEffect, useState } from 'react'
import { timeAgo } from "../../assets/time/time"
import { useNavigate } from 'react-router'
import axios from 'axios'
import { protocols } from '../../api/protocols'

const UserRoom = ({ data, my_id, socket, config }) => {
    const [item, setItem] = useState(null)

    const navigate = useNavigate()

    const goToRoom = () => {
        axios.get(`${protocols.http}/room/${item.id}`, config)
            .then(res => navigate(`/direct/${res.data.room_id}`))
    }

    useEffect(() => {
        setItem(data)
        socket.addEventListener('message', (event) => {
            const recieved = JSON.parse(event.data)
            if (recieved.type === "last_message") {
                if (data.id === recieved.id) {
                    setItem({ ...recieved })
                }
            }
        })
    }, [])
    if (!item) return null
    return (
        <>
            <input onClick={goToRoom} type="button" id={`room-${item.id}`} style={{ display: 'none' }} />
            <label htmlFor={`room-${item.id}`}>
                <div className="left">
                    <img src={item.img_url} alt="" />
                    <div className="text">
                        <p className="username">{item.username}</p>
                        <p className="message">
                            {my_id === item.sender ? "You: " : ""}{item.link && !item.m_img_url ? 'Shared a post' : !item.link && item.m_img_url ? 'Sent an image' : item.last_message.length >= 20 ? item.last_message.slice(0, 24) + "..." : item.last_message}
                        </p>
                    </div>
                </div>
                <span className="time">{timeAgo(item.time)}</span>
            </label>
        </>
    )
}

export default UserRoom