/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { addConnection, getAllUsers } from "../../api/FirestoreApi";
import ConnectionsUserCard from "../Card/ConnectionsUserCard";

const ConnectionsBody = ({ currentUser }) => {
    const [users, setUsers] = useState([]);

    const addUser = (id) => {
        addConnection(currentUser?.id, id);
    }

    useEffect(() => {
        getAllUsers(setUsers, currentUser?.id);
    }, [currentUser?.id])

    return (
        <div className="w-full flex justify-center h-[90vh]">
            <div className="flex flex-col h-[96%] p-[10px] lg:px-24 m-[30px] border md:w-[50%] shadow-md bg-zinc-100 overflow-y-auto">
                <div>
                    <h1 className="text-xl mb-2 text-gray-500 font-semibold">Suggested Users:</h1>
                </div>
                <div className="flex gap-[10px] text-center md:justify-between flex-wrap">
                    {users.map((user, id) => (
                        <ConnectionsUserCard key={id} user={user} currentUser={currentUser} addUser={addUser} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ConnectionsBody