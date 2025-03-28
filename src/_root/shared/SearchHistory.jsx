import { Link } from 'react-router-dom'
import { IconBtn } from '../../components'

const SearchHistory = ({ data, setSearchHistory }) => {
    const onDeleteUser = (index) => {
        data.splice(index, 1)
        localStorage.setItem('search_history', data)
        setSearchHistory(data)
    }

    const onClearData = () => {
        localStorage.removeItem('search_history')
        setSearchHistory([])
    }
    return (
        <div className='search-history'>
            <div className="top">
                <p>Search History</p>
                <button type='button' onClick={onClearData}>Clear all</button>
            </div>
            {
                data.map((user, i) => {
                    return (
                        <div className="user">
                            <Link to={`/profile/${user.id}`}>
                                <img src={user.img_url} alt="" />
                                <p>{user.username}</p>
                            </Link>
                            <IconBtn
                                name={'close'}
                                size={25}
                                color={'white'}
                                action={() => onDeleteUser(i)}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SearchHistory