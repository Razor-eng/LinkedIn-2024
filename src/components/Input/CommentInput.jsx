/* eslint-disable react/prop-types */
import { IoSend } from "react-icons/io5";

const CommentInput = ({ value, setValue, onComment }) => {
    return (
        <div className="mx-6 relative">
            <input
                type='text'
                placeholder='Enter a Comment'
                value={value}
                onChange={e => setValue(e.target.value)}
                className="border mt-2 p-2 w-full border-zinc-400 outline-zinc-600 bg-transparent"
            />
            {
                value &&
                <div className="absolute right-1 rounded-full bottom-1 hover:bg-slate-200 cursor-pointer p-2" onClick={onComment}>
                    <IoSend className="text-[#0a66c2]" />
                </div>
            }
        </div>
    )
}

export default CommentInput