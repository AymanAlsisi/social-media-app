import React, { useState } from 'react'
import { IconBtn } from '../../components'
import { IoClose, IoSearch } from 'react-icons/io5'
import axios from 'axios'
import toast from 'react-hot-toast'
import { protocols } from '../../api/protocols'

const SharePost = ({ close, data }) => {
    const [users, setUsers] = useState([])

    const sharePost = async (receiver_id) => {
        try {
            const res = await axios.post(`${protocols.http}/share_post`, JSON.stringify({
                ...data,
                receiver: receiver_id
            }))
            return toast.success("Post was sent successfully!")
        } catch (error) {
            console.log(error)
            return toast.error("Couldn't send post")
        }
    }

    const searchForUsers = (username) => {
        axios.get(`${protocols.http}/search?q=${username}`)
            .then(res => setUsers(res.data.users))
    }
    return (
        <div className='share-post'>
            <div className="top">
                <p>Share Post</p>
                <button onClick={close} style={{ backgroundColor: 'transparent', display: 'flex' }}>
                    <IoClose size={25} color='white' />
                </button>
            </div>
            <div className="search-input">
                <input
                    type="text"
                    placeholder='Search for users...'
                    onChange={e => searchForUsers(e.target.value)}
                />
                <IoSearch size={22} color='grey' />
            </div>
            <div className="users">
                {
                    users.map((user, i) => {
                        return (
                            <div className="user" key={i}>
                                <div className="left">
                                    <img src={user.img_url} alt="" />
                                    <p className="username">{user.username}</p>
                                </div>
                                <button onClick={() => sharePost(user.id)}>Send</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SharePost