import { Link, useLocation } from 'react-router-dom';
import { FaClipboardList, FaHome, FaTrophy, FaUserFriends } from 'react-icons/fa';

const BottomNavigation = () => {
    const location = useLocation().pathname;

    return (
        <div className='btm-nav bg-black flex justify-between items-center z-10'>
            <Link className={`flex flex-col ${location === '/' ? 'text-[#4c9ce2]' : 'text-white text-opacity-50'}  rounded-[10px] items-center justify-center text-[13px]`} to="/">
                <span className={`w-[60px] h-[34px] flex flex-col rounded-[24px] items-center justify-center text-[13px]`}>
                    <FaHome className='size-[22px]' />
                </span>
                <span className="font-medium font-poppins">Home</span>
            </Link>

            {/* <Link className={`flex flex-col ${location === '/mine' ? 'text-[#4c9ce2]' : 'text-white text-opacity-50'}  rounded-[10px] items-center justify-center text-[13px]`} to="/mine">
                <span className={`w-[60px] h-[34px] flex flex-col rounded-[24px] items-center justify-center text-[13px]`}>
                    <GiSwapBag className='size-[22px]' />
                </span>
                <span className="font-medium">Mine</span>
            </Link> */}

            <Link className={`flex flex-col ${location === '/leaderboard' ? 'text-[#4c9ce2]' : 'text-white text-opacity-50'}  rounded-[10px] items-center justify-center text-[13px]`} to="/leaderboard">
                <span className={`w-[60px] h-[34px] flex flex-col rounded-[24px] items-center justify-center text-[13px] `}>
                    <FaTrophy className='size-[22px]' />
                </span>
                <span className="font-medium font-poppins">Leaderboard</span>
            </Link>

            <Link className={`flex flex-col ${location === '/refer' ? 'text-[#4c9ce2]' : 'text-white text-opacity-50'}  rounded-[10px] items-center justify-center text-[13px]`} to="/refer">
                <span className={`w-[60px] h-[34px] flex flex-col rounded-[24px] items-center justify-center text-[13px]`}>
                    <FaUserFriends className='size-[22px]' />
                </span>
                <span className="font-medium font-poppins">Friends</span>
            </Link>

            <Link className={`flex flex-col ${location === '/earn' ? 'text-[#4c9ce2]' : 'text-white text-opacity-50'}  rounded-[10px] items-center justify-center text-[13px]`} to="/earn">
                <span className={`w-[60px] h-[34px] flex flex-col rounded-[24px] items-center justify-center text-[13px] `}>
                    <FaClipboardList className='size-[22px]' />
                </span>
                <span className="font-medium font-poppins">Earn</span>
            </Link>


        </div>
    );
};

export default BottomNavigation;