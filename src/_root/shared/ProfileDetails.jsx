import { useEffect, useState } from 'react'
import axios from 'axios'
import { app_colors } from "../../assets/colors/colors"
import { protocols } from '../../api/protocols'
import { useNavigate } from 'react-router'

const ProfileDetails = ({ data, my_id, config }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        setUser({
            ...data,
            followers: data.followers,
            btn: {
                text: data.following ? "Following" : "Follow",
                bg: data.following ? app_colors.info : "transparent",
                color: data.following ? app_colors.secondary : app_colors.info
            }
        })
    }, [])

    const hanldeFollow = () => {
        axios.post(`${protocols.http}/follow`, JSON.stringify({
            user_id: user.id,
            follower_id: my_id
        }))

        if (user.btn.text === "Following") {
            setUser(prev => ({
                ...prev,
                followers: prev.followers - 1,
                btn: {
                    text: "Follow",
                    bg: "transparent",
                    color: app_colors.info
                }
            }))
        } else {
            setUser(prev => ({
                ...prev,
                followers: prev.followers + 1,
                btn: {
                    text: "Following",
                    bg: app_colors.info,
                    color: app_colors.secondary
                }
            }))
        }
    }

    const navigate = useNavigate()

    const getRoom = () => {
        axios.get(`${protocols.http}/room/${user.id}`, config)
            .then(res => navigate(`/direct/${res.data.room_id}`))
    }

    if (!user) return null;
    return (
        <div className="profile-details">
            <div className="top">
                <img src={user.img_url} alt="" />
                <div className="text">
                    <p>{user.posts}</p>
                    <p>Posts</p>
                </div>
                <div className="text">
                    <p>{user.followers}</p>
                    <p>Followers</p>
                </div>
                <div className="text">
                    <p>{user.follows}</p>
                    <p>Following</p>
                </div>
            </div>
            <div className="body">
                <p className="username">{user.username}</p>
                <p className="email">{user.email}</p>
                <p className="bio">{user.bio}</p>
            </div>
            <div className="bottom">
                {user.state && <button onClick={() => navigate("/profile/update")} className='edit'>Edit Profile</button>}
                {!user.state && <button onClick={hanldeFollow} style={{ backgroundColor: user.btn.bg, color: user.btn.color }} className='follow'>{user.btn.text}</button>}
                {!user.state && <button onClick={getRoom} className='message'>Message</button>}
            </div>
        </div>
    )
}

export default ProfileDetails