import { useMediaQuery } from "react-responsive"
import PostMessage from "./PostMessage"
import ImgMessage from "./ImgMessage"
import TextMessage from "./TextMessage"
import NoRoom from "./NoRoom"

const Chat = ({ data, my_id, isSendingImg }) => {
    const isLargeScreen = useMediaQuery({
        minWidth: "700px"
    })
    let messages = []
    messages.unshift(...data)
    messages.reverse()
    if (data.length === 0) return <NoRoom
        text={'No Messages yet'}
        h={isLargeScreen ? '80vh' : '65vh'}
    />
    return (
        <div className="direct-body">
            {
                isSendingImg && (
                    <div className="sending-img">
                        <div className="spiner"></div>
                    </div>
                )
            }
            {
                messages.map((message, i) => {
                    if (message.link && message.img_url) {
                        return (
                            <PostMessage key={i} data={message} my_id={my_id} />
                        )
                    }
                    if (message.img_url && !message.link) {
                        return (
                            <ImgMessage key={i} data={message} my_id={my_id} />
                        )
                    } else {
                        return (
                            <TextMessage key={i} data={message} my_id={my_id} />
                        )
                    }
                })
            }
        </div>
    )
}

export default Chat