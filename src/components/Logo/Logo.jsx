import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
const Logo = ({ size }) => {
    return (
        <Link to={'/'}>
            <h2 className={`text-[#0A66C2] w-fit font-bold ${size || 'text-2xl'} flex gap-1`}>Linked <span className="text-white bg-[#0A66C2] px-1">in</span></h2>
        </Link>
    )
}

export default Logo