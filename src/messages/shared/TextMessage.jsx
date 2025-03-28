import { getMessageTime } from "../../assets/time/time"

const TextMessage = ({ data, my_id }) => {
    return (
        <div className={`text-message ${data.sender === my_id ? 'my-message' : 'user-message'}`}>
            <span className="content">{data.content}</span>
            <span className="time">{getMessageTime(data.time)}</span>
        </div>
    )
}

export default TextMessage