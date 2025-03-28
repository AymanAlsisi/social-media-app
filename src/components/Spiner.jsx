import "./style.css"

const Spiner = ({ h }) => {
    return (
        <div className='outer-spiner' style={{ height: h }}>
            <div className="inner-spiner"></div>
        </div >
    )
}

export default Spiner