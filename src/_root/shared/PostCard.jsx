import { useState, useEffect } from 'react'
import axios from 'axios'
import { IconBtn } from '../../components'
import { getCurrentTime, timeAgo } from "../../assets/time/time"
import { protocols } from '../../api/protocols'
import { Link } from 'react-router-dom'
import SharePost from './SharePost'

const PostCard = ({ data, my_id, openModal, setShareData }) => {
    const [post, setPost] = useState(null)
    useEffect(() => {
        setPost({
            ...data,
            color: data.like_state ? 'crimson' : 'white',
            icon: data.like_state ? 'heart' : 'heart-outline',
            count: data.like
        })
    }, [])

    const handleLike = () => {
        axios.post(`${protocols.http}/like`, JSON.stringify({
            user_id: my_id,
            post_id: post.id
        }))

        if (post.color === "crimson") {
            setPost(prev => ({
                ...prev,
                color: 'white',
                count: prev.count - 1,
                icon: 'heart-outline'
            }))
        } else {
            setPost(prev => ({
                ...prev,
                color: 'crimson',
                count: prev.count + 1,
                icon: 'heart'
            }))
        }
    }

    if (!post) return null;
    return (
        <div className='post-card'>
            <div className="top">
                <Link to={`/profile/${post.user.id}`} className="user">
                    <img src={post.user.img_url} alt="" />
                    <div className="text">
                        <p className='username'>{post.user.username}</p>
                        <p className='time'>{timeAgo(post.time)}</p>
                    </div>
                </Link>
                <p className="caption">{post.caption}</p>
            </div>
            <img className='post-img' src={post.img_url} alt="" />
            <div className="bottom">
                <div className="likes">
                    <IconBtn name={post.icon} color={post.color} size={'20px'} action={handleLike} />
                    <span className="like-count">{post.count}</span>
                </div>
                <IconBtn name={'share'} color={'white'} size={'20px'} action={() => {
                    new Promise(resolve => {
                        openModal()
                        resolve()
                    })
                        .then(() => {
                            setShareData({
                                sender: my_id,
                                content: post.caption,
                                time: getCurrentTime(),
                                img_url: post.img_url,
                                link: `/post/${post.id}`,
                                post_id: post.id
                            })
                        })
                }} />
            </div>
        </div>
    )
}

export default PostCard