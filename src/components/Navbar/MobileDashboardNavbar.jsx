/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar } from "antd"
import CircularLogo from "../Logo/CircularLogo"
import { AiOutlineBell, AiOutlineHome, AiOutlineMessage, AiOutlineSearch, AiOutlineUserSwitch } from 'react-icons/ai'
import { BsBriefcase } from 'react-icons/bs'
import { useEffect, useState } from "react"
import SearchUsers from "../Modal/SearchUsers"
import { getAllUsers } from "../../api/FirestoreApi"
import { Link, useNavigate } from "react-router-dom"
import ProfilePopupMobile from "../Modal/ProfilePopupMobile"

const MobileDashboardNavbar = ({ user }) => {
    const [users, setUsers] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const NavItems = [
        {
            icon: AiOutlineSearch,
            onClick: () => setIsSearch(true)
        },
        {
            icon: AiOutlineHome,
            path: '/dashboard'
        },
        {
            icon: AiOutlineUserSwitch,
            path: '/connections'
        },
        {
            icon: BsBriefcase
        },
        // {
        //     icon: AiOutlineMessage
        // },
        // {
        //     icon: AiOutlineBell
        // },
    ]
    const [profilePopup, setProfilePopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers(setUsers, user?.id)
    }, [user]);

    const handleSearch = () => {
        if (searchInput) {
            setSearchedUsers(
                users.filter((user) => {
                    return Object.values(user).join('').toLowerCase().includes(searchInput.toLowerCase());
                })
            )
        } else {
            setSearchedUsers([]);
        }
    }

    useEffect(() => {
        if (searchInput) {
            handleSearch();
        }
    }, [searchInput]);


    return (
        <div className="lg:hidden w-full h-[70px] flex items-center">
            <CircularLogo />
            {isSearch ?
                <div className="w-full flex relative">
                    <SearchUsers searchInput={searchInput} setSearchInput={setSearchInput} setIsSearch={setIsSearch} />
                    {searchInput &&
                        <div className="absolute w-[200px] max-h-[240px] rounded-md border border-[#bbbbbb] bg-white top-9 left-2 z-50 overflow-scroll">
                            {searchedUsers?.map((user, id) => (
                                <div
                                    key={id}
                                    className="flex py-3 items-center gap-2 p-1 border hover:bg-zinc-200 cursor-pointer"
                                    onClick={() =>
                                        navigate(`/${user?.displayName.split(' ').join('')}`, {
                                            state: { id: user?.id, email: user?.email }
                                        })
                                    }
                                >
                                    <img src={user?.photoURL || '/images/user.png'} className="w-[40px] h-[40px] object-cover rounded-full" />
                                    <p className="text-[13px] text-zinc-600 font-[500]">{user?.displayName}</p>
                                </div>
                            ))}
                        </div>
                    }
                </div>
                :
                <div className="flex items-center justify-between w-[55%] ml-[30px]">
                    {NavItems.map((item, id) => (
                        <Link key={id} to={item.path}>
                            <item.icon
                                size={30}
                                className="cursor-pointer text-zinc-500 hover:text-zinc-800"
                                onClick={item.onClick}
                            />
                        </Link>
                    ))}
                </div>
            }
            <div
                className="absolute right-[30px] cursor-pointer w-[40px]"
                onClick={() => setProfilePopup(!profilePopup)}
            >
                <Avatar src={user?.photoURL || '/images/user.png'} alt="" className="w-10 h-10" />
                <div className="relative right-10 bottom-8">
                    <ProfilePopupMobile open={profilePopup} user={user} />
                </div>
            </div>
        </div>
    )
}

export default MobileDashboardNavbar