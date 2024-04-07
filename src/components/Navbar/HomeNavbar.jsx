import { GrArticle } from 'react-icons/gr'
import { MdOutlineDesktopWindows, MdPeople, MdWork } from 'react-icons/md'
import { RiMovieLine } from 'react-icons/ri'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'

const HomeNavbar = () => {
    const Icons = [
        {
            label: 'Articles',
            Icon: GrArticle
        },
        {
            label: 'People',
            Icon: MdPeople
        },
        {
            label: 'Learning',
            Icon: RiMovieLine
        },
        {
            label: 'People',
            Icon: MdWork
        },
        {
            label: 'Get the app',
            Icon: MdOutlineDesktopWindows
        },
    ]

    return (
        <div className='flex justify-between'>
            <div>
                <Logo />
            </div>
            <div className='flex gap-5'>
                <div className='hidden md:flex gap-8 text-gray-500 border-r border-gray-300 pr-5'>
                    {Icons.map((item, id) => (
                        <div key={id} className='flex flex-col items-center hover:text-gray-800 cursor-pointer'>
                            <item.Icon className='text-2xl' />
                            <h2 className='text-sm font-light'>{item.label}</h2>
                        </div>
                    ))}
                </div>
                <div className='pl-5 flex gap-1 sm:gap-2 sm:mr-10'>
                    <Link to={'/signup'}>
                        <button className='text-gray-700 rounded-full hover:bg-zinc-100 sm:px-3 py-1 md:px-6 md:py-3'>Join now</button>
                    </Link>
                    <Link to={'/login'}>
                        <button className='text-[#1462BA] border border-[#1462BA] hover:text-blue-900 hover:bg-[#F0F7FE] px-3 py-1 md:px-6 md:py-3 rounded-full'>Sign in</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomeNavbar