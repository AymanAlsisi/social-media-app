import { IoChatbubblesOutline } from 'react-icons/io5'

const NoRoom = ({ text, h }) => {
    return (
        <div className='no-room' style={{ height: h }}>
            <IoChatbubblesOutline size={80} />
            <h3>{text}</h3>
        </div>
    )
}

export default NoRoom