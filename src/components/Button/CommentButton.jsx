/* eslint-disable react/prop-types */
import { VscCommentDiscussion } from "react-icons/vsc";

const CommentButton = ({ comment, setComment }) => {
    return (
        <div
            className={`flex items-center gap-1 hover:bg-slate-200 w-28 h-12 justify-center cursor-pointer p-1 rounded-md ${comment ? 'text-[#0a66c2]' : 'text-[rgba(0,0,0,.835)]'}`}
            onClick={() => setComment(!comment)}
        >
            <VscCommentDiscussion size={25} />
            <p className="text-[14px] font-[600]">Comments</p>        </div>
    )
}

export default CommentButton