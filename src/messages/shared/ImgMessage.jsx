import { getMessageTime } from "../../assets/time/time"

const ImgMessage = ({ data, my_id }) => {
    return (
        <div className = {`img-message ${data.sender === my_id ? 'my-img-message' : 'user-img-message'}`}>
            <img src={data.img_url} alt="" />
            <p className="caption">{data.content}</p>
            <span className="time">{getMessageTime(data.time)}</span>
        </div>
    )
}

export default ImgMessage