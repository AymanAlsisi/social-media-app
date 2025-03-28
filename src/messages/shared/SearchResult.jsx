import { useNavigate } from 'react-router'
import axios from 'axios'
import { protocols } from '../../api/protocols'

const SearchResult = ({ users, search, config, my_id }) => {
    const navigate = useNavigate()
    const goToRoom = (user_id) => {
        axios.get(`${protocols.http}/room/${user_id}`, config)
            .then(res => navigate(`/direct/${res.data.room_id}`))
    }


    if (users.length === 0 && search) return <p className="not-found">
        No result for searching "{search}"
    </p>
    return (
        <div className='searched-list'>
            {
                users.map((user, i) => {
                    if (user.id === my_id) return null;
                    return (
                        <>
                            <input
                                type="button"
                                style={{ display: 'none' }}
                                id={user.id}
                                onClick={(e) => goToRoom(user.id)}
                            />
                            <label htmlFor={user.id} className="user" key={i}>
                                <img src={user.img_url} alt="" />
                                <p className="username">{user.username}</p>
                            </label>
                        </>
                    )
                })
            }
        </div>
    )
}

export default SearchResult