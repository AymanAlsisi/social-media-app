import { IoSearchCircle } from "react-icons/io5"

const UnSearched = () => {
    return (
        <div className="unsearched">
            <IoSearchCircle size={50} color='#FFF' />
            <p>Here you can find your friends.</p>
            <p>Enter the username of the user you want correctlly.</p>
        </div>
    )
}

export default UnSearched