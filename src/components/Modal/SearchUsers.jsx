/* eslint-disable react/prop-types */
import { AiOutlineCloseCircle } from 'react-icons/ai'

const SearchUsers = ({ setIsSearch, searchInput, setSearchInput }) => {
    return (
        <div className="w-[50%] ml-2 flex items-center">
            <input
                type="text"
                placeholder="Search Users..."
                className="w-full h-[30px] bg-white border border-[#bbbbbb] rounded-lg text-[#212121] pl-[10px] outline-none focus:border-[#707070] placeholder:text-[14px] text-[14px]"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
            />
            <AiOutlineCloseCircle
                size={20}
                color='#707070'
                onClick={() => {
                    setIsSearch(false);
                    setSearchInput('');
                }}
                className='ml-[-28px]'
            />
        </div>
    )
}

export default SearchUsers