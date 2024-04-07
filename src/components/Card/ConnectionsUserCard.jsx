/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { getConnections } from "../../api/FirestoreApi";
import { MdPersonAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom"

const ConnectionsUserCard = ({ user, addUser, currentUser }) => {
    const navigate = useNavigate();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (currentUser && user) {
            getConnections(currentUser?.id, user?.id, setIsConnected);
        }
    }, [currentUser, user])

    return (
        !isConnected &&
        <div className="border-2 border-zinc-200 shadow-md hover:scale-105 transition-all duration-200 ease-in-out w-96 md:w-[40%] min-h-[350px] m-[10px] flex flex-col items-center p-6 gap-3 relative h-fit">
            <img
                src={user?.photoURL || "/images/user.png"}
                className="w-24 h-24 rounded-full object-cover"
                onClick={() =>
                    navigate(`/${user?.displayName.split(' ').join('')}`, {
                        state: { id: user?.id, email: user?.email }
                    })
                }
            />
            <div className="flex flex-col gap-1">
                <p
                    className="text-[16px] font-[600] hover:text-[#1179ae] cursor-pointer hover:underline"
                    onClick={() =>
                        navigate(`/${user?.displayName.split(' ').join('')}`, {
                            state: { id: user?.id, email: user?.email }
                        })
                    }
                >{user?.displayName}</p>
                <p className="text-[14px] font-[400]">{user?.headline}</p>
            </div>
            <div className="absolute bottom-0 w-full pb-2">
                <p className="text-[12px] font-[400] text-zinc-500">{user?.college}</p>
                <div
                    className="w-full px-3 pb-2 transition-all duration-200 ease-in-out active:scale-95"
                    onClick={() => addUser(user.id)}
                >
                    <button
                        className="w-full h-10 flex justify-center items-center gap-3 font-medium p-1 bg-transparent border-2 text-[#2769ac] rounded-full hover:bg-slate-100 hover:text-[#1179ae] border-[#1179ae] hover:border-[#2467a9]"
                    >
                        <MdPersonAdd />
                        <p>Connect</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConnectionsUserCard