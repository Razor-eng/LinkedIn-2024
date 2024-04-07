/* eslint-disable react/prop-types */
const Avatar = ({ src }) => {
    return (
        <div className="shadow-lg transition-all duration-300 ease-in-out cursor-pointer w-16 h-16 rounded-full p-1 border-2 border-gray-100">
            <img
                src={src ? src : "/images/user.png"}
                className='rounded-full w-full h-full'
            />
        </div>
    )
}

export default Avatar