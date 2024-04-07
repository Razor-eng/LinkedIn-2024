/* eslint-disable react/prop-types */
const Button = ({ title, onClick }) => {
    return (
        <button
            className="w-full font-medium text-sm p-1 bg-transparent border-2 text-[#2769ac] rounded-full hover:bg-slate-100 hover:text-[#1179ae] border-[#1179ae] hover:border-[#2467a9]"
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Button