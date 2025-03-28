import { useNavigate } from "react-router"
import { getMessageTime } from "../../assets/time/time"

const PostMessage = ({ data, my_id }) => {
    const navigate = useNavigate()
    return (
        <div onClick={(e) => navigate(data.link)} className={`post-message ${data.sender === my_id ? "my-post-message" : "user-post-message"}`}>
            <p>Click to see post.</p>
            <img src={data.img_url} alt="" />
            <span className="caption">{data.caption}</span>
            <span className="time">{getMessageTime(data.time)}</span>
        </div>
    )
}

export default PostMessage