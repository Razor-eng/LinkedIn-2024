/* eslint-disable react/prop-types */
const PopupAvatar = ({ src }) => {
    return (
        <div className="shadow-lg transition-all duration-300 ease-in-out cursor-pointer w-20 h-20 rounded-full p-1 border-2 border-gray-300">
            <img
                src={src || "/images/user.png"}
                className='rounded-full w-full h-full'
            />
        </div>
    )
}

export default PopupAvatar