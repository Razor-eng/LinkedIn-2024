import { PiShareLight } from "react-icons/pi";

const ShareButton = () => {
    return (
        <div
            className="flex items-center gap-1 hover:bg-slate-200 w-28 h-12 justify-center cursor-pointer p-1 rounded-md hover:text-[#0a66c2] text-[rgba(0,0,0,.835)]"
        >
            <PiShareLight size={25} />
            <p className="text-[14px] font-[600]">Share</p>
        </div>
    )
}

export default ShareButton