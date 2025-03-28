import { Link } from "react-router-dom"

const SearchResult = ({ users, search, my_id, setSearchHistory, search_history }) => {
    const onClickOnUser = (user) => {
        setSearchHistory(prev => [...prev, user])
        localStorage.setItem('search_history', JSON.stringify([...search_history, user]))
    }
    return (
        <div className="search-result">
            <p>Result of searching "{search}"</p>
            {
                users.map((user, i) => {
                    return (
                        <div className="list">
                            {
                                user.id === my_id ? null
                                    :
                                    <Link onClick={() => onClickOnUser(user)} key={i} to={`/profile/${user.id}`}>
                                        <img src={user.img_url} alt="" />
                                        <p className="username">{user.username}</p>
                                    </Link>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SearchResult