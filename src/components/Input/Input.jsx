/* eslint-disable react/prop-types */
const Input = ({ type, placeholder, value, setValue }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => setValue(e.target.value)}
            className="border p-3 py-4 rounded-lg w-[85vw] md:w-96 border-zinc-300 outline-zinc-400 bg-transparent"
        />
    )
}

export default Input