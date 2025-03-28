import { IoChatbubblesOutline } from "react-icons/io5"

const EmptyRoom = () => {
  return (
    <div className="empty-room">
      <IoChatbubblesOutline size={100} color="#FFF" />
      <h3>No Chat selected.</h3>
      <p>Select a chat to start a conversetion.</p>
    </div>
  )
}

export default EmptyRoom