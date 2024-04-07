/* eslint-disable react/prop-types */
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";

const LikeButton = ({ like, onLike }) => {
    return (
        <div
            className={`flex items-center gap-1 hover:bg-slate-200 w-28 h-12 justify-center cursor-pointer p-1 rounded-md ${like ? 'text-[#0a66c2]' : 'text-[rgba(0,0,0,.835)]'}`}
            onClick={onLike}
        >
            {
                like ?
                    <FcLike size={25} />
                    :
                    <CiHeart size={25} />
            }
            <p className="text-[14px] font-[600]">Like</p>
        </div>
    )
}

export default LikeButton