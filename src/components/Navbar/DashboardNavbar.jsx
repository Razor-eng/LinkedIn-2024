/* eslint-disable react/prop-types */
import { IoMdHome } from 'react-icons/io'
import { IoNotifications } from 'react-icons/io5'
import { BiSolidDownArrow } from 'react-icons/bi'
import { MdPeople, MdSearch, MdWork } from 'react-icons/md'
import { AiFillMessage, AiOutlineCloseCircle } from 'react-icons/ai'
import { GrApps } from 'react-icons/gr'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DashboardLogo from '../Logo/DashboardLogo'
import ProfilePopup from '../Modal/ProfilePopup'
import { getAllUsers } from '../../api/FirestoreApi'

const DashboardNavbar = ({ user }) => {
    const Icons = [
        {
            label: 'Home',
            Icon: IoMdHome,
            path: '/dashboard'
        },
        {
            label: 'My Network',
            Icon: MdPeople,
            path: '/connections'
        },
        {
            label: 'Jobs',
            Icon: MdWork
        },
        {
            label: 'Messaging',
            Icon: AiFillMessage
        },
        {
            label: 'Notifications',
            Icon: IoNotifications
        },
    ]
    const [users, setUsers] = useState([]);
    const [profilePopup, setProfilePopup] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);
    const location = useLocation();
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput]);

    return (
        <div className='hidden lg:flex justify-between pr-44 pl-44'>
            <div className='flex gap-2 items-center'>
                <DashboardLogo />
                <div className='flex items-center bg-[#EDF3F8] w-64 px-5 h-fit border-0 py-2 border-zinc-500 focus-within:border-2 focus-within:w-96 transition-all duration-150 ease-in-out rounded-lg relative'>
                    <MdSearch fontSize={20} />
                    <input
                        type="text"
                        placeholder='Search'
                        className='bg-[#EDF3F8] outline-none w-full'
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                    />
                    {searchInput &&
                        <AiOutlineCloseCircle
                            size={20}
                            color='#707070'
                            onClick={() => {
                                setSearchInput('');
                            }}
                            className='ml-[-28px] cursor-pointer'
                        />
                    }
                    {searchInput &&
                        <div className="absolute w-full max-h-[300px] rounded-md border border-[#bbbbbb] bg-white top-11 left-0 overflow-x-hidden z-50 overflow-y-auto">
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
            </div>
            <div className='flex pt-1'>
                <div className='flex gap-4 text-gray-500 border-r border-gray-300 pr-5'>
                    {Icons.map((item, id) => (
                        <div
                            key={id}
                            className={`flex flex-col items-center hover:text-gray-800 ${location.pathname === item.path ? 'text-gray-800 border-b-2 border-gray-800' : ''} cursor-pointer min-w-14`}
                            onClick={() => navigate(item.path)}
                        >
                            <item.Icon className='text-[25px]' />
                            <h2 className='text-sm font-light'>{item.label}</h2>
                        </div>
                    ))}
                    <div
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => setProfilePopup(!profilePopup)}
                    >
                        <img
                            src={user?.photoURL || '/images/user.png'}
                            alt="avatar"
                            className='rounded-full w-[25px]'
                        />
                        <h2 className='text-sm font-light flex items-center gap-1'>
                            Me
                            <BiSolidDownArrow fontSize={9} className='mt-1' />
                        </h2>
                        <ProfilePopup open={profilePopup} user={user} />
                    </div>
                </div>
                <div className='pl-5 flex gap-2 mr-10 text-gray-500'>
                    <div className="flex pt-1  flex-col items-center hover:text-gray-800 cursor-pointer min-w-14">
                        <GrApps className='text-xl' />
                        <h2 className='text-sm font-light flex items-center gap-1'>
                            For Business
                            <BiSolidDownArrow fontSize={9} className='mt-1' />
                        </h2>
                    </div>
                    <Link to={'/'}>
                        <button className='text-[#915907] text-xs ml-2 underline hover:text-[#5C3B09]'>Try Premium for ₹0</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DashboardNavbar