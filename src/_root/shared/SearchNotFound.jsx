import React from 'react'
import { IoSad } from "react-icons/io5"

const SearchNotFound = ({ search }) => {
    return (
        <div className='not-found'>
            <IoSad size={50} color='#FFF' />
            <p>Your search "{search}" didn't match any username.</p>
            <p>Suggestions:</p>
            <ul>
                <li>Make sure that all words are spelled correctly.</li>
                <li>Try different keywords.</li>
                <li>Try more general keywords.</li>
            </ul>
        </div>
    )
}

export default SearchNotFound