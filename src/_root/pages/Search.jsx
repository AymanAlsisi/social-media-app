import { useState, useEffect } from 'react'
import axios from 'axios'
import { IoSearch } from "react-icons/io5"
import "../CSS/Search.css"
import { Spiner } from "../../components"
import { UnSearched, SearchNotFound, SearchResult, SearchHistory } from '../shared'
import { useStateProvider } from "../../context/StateProvider"
import { protocols } from "../../api/protocols"

const Search = () => {
  const { user } = useStateProvider()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  const findUsers = async (username) => {
    setSearch(username)
    try {
      setIsSearching(true)
      const res = await axios.get(`${protocols.http}/search?q=${username}`)
      setUsers(res.data.users)
      setIsSearching(false)
    } catch (error) {
      setIsSearching(false)
    }
  }

  
  const [searchHistory, setSearchHistory] = useState([])
  
  const fetchSearchHistoryData = async () => {
    try {
      const data = localStorage.getItem('search_history')
      if (data) setSearchHistory(JSON.parse(data))
    } catch (error) {
  console.log(error)
} finally {
      setIsSearching(false)
    }
  }
  
  useEffect(() => {
    fetchSearchHistoryData()
  }, [])

  console.log(searchHistory)

  return (
    <div className="search">
      <h3>Find your friends easily.</h3>
      <div className="search-input">
        <input
          type="text"
          placeholder='Enter username'
          onChange={e => findUsers(e.target.value.trim())}
        />
        <IoSearch size={18} color='grey' />
      </div>
      <>
        {
          isSearching ? <Spiner h={'50vh'} />
            : search === null ? (
              <>
                {
                  searchHistory.length === 0 ? <UnSearched />
                    : <SearchHistory
                      data={searchHistory}
                      setSearchHistory={setSearchHistory}
                    />
                }
              </>
            )
              : search === "" ? (
                <>
                  {
                    searchHistory.length !== 0 ? <SearchHistory
                      data={searchHistory}
                      setSearchHistory={setSearchHistory}
                    />
                      : null
                  }
                </>
              )
                : search && users.length === 0 ? <SearchNotFound search={search} />
                  : <SearchResult
                    search={search}
                    users={users}
                    my_id={user.id}
                    search_history={searchHistory}
                    setSearchHistory={setSearchHistory}
                  />
        }
      </>
    </div>
  )
}

export default Search