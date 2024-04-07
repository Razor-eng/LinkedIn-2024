import { Link } from "react-router-dom"

const CircularLogo = () => {
    return (
        <Link to={'/'}>
            <span className="text-white bg-[#0A66C2] py-2 w-[50px] rounded-full ml-[20px] text-3xl font-bold sm:flex items-center justify-center hidden">in</span>
        </Link>
    )
}

export default CircularLogo