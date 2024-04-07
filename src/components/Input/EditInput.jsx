/* eslint-disable react/prop-types */
const EditInput = ({ type, placeholder, value, setValue }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => setValue(e.target.value)}
            className="border p-2 rounded-lg w-full border-zinc-400 outline-zinc-600 bg-transparent"
        />
    )
}

export default EditInput