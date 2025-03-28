import { useState, useEffect } from 'react'
import { IoImage, IoSend } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { getCurrentTime } from '../../assets/time/time'
import Chat from './Chat'
import LoadingChat from './LoadingChat'
import ImageSelector from './ImageSelector'

const Room = ({ socket, user, my_id }) => {
  const [form, setForm] = useState({
    text: '',
    img: ''
  })

  const [messages, setMessages] = useState([])

  const [isSendingImg, setIsSendingImg] = useState(false)

  const sendMessage = (e) => {
    e.preventDefault()
    if (form.text || form.img) {
      if (form.img) setIsSendingImg(true)
      socket.send(JSON.stringify({
        sender: my_id,
        receiver: user.id,
        content: form.text,
        img: form.img,
        time: getCurrentTime()
      }))
      setIsSelectingImage(false)
      setForm({
        text: '',
        img: ''
      })
    }
  }

  const [isLoading, setIsLoading] = useState(true)

  const [isSelectingImage, setIsSelectingImage] = useState(false)

  useEffect(() => {
    socket.addEventListener('message', (event) => {
      const recieved = JSON.parse(event.data)
      if (recieved.type === 'initial') {
        setMessages(recieved.messages)
        setIsLoading(false)
      } else {
        setMessages(prev => [...prev, recieved])
        setIsSendingImg(false)
      }
    })
  }, [user.id])

  if (isSelectingImage) return (
    <ImageSelector
      form={form}
      setForm={setForm}
      close={() => setIsSelectingImage(false)}
      username={user.username}
      sendMessage={sendMessage}
    />
  )

  return (
    <div className='direct'>
      <Link to={`/profile/${user.id}`} className="direct-top">
        <img src={user.img_url} alt="" />
        <p className="username">{user.username}</p>
      </Link>
      {
        isLoading ? <LoadingChat />
          : (
            <Chat
              data={messages}
              my_id={my_id}
              isSendingImg={isSendingImg}
            />
          )
      }
      <form className="direct-bottom" onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          placeholder='Message...'
          value={form.text}
          onChange={e => setForm(prev => ({ ...prev, text: e.target.value }))}
        />
        <div className="buttons">
          <button type='button' onClick={() => setIsSelectingImage(true)}>
            <IoImage size={25} color='#FFF' />
          </button>
          <button type="submit">
            <IoSend size={25} color='#FFF' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Room