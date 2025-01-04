import ranks from "../../../assets/ranks.svg";
import logo from "../../../assets/logo.png";
import three from "../../../assets/madel/3th.png";
import second from "../../../assets/madel/2th.png";
import one from "../../../assets/madel/1th.png";
import { UserLeaderboard } from "../../../types/Leaderboard.interface";

interface props {
    top3: UserLeaderboard[],
    close: React.Dispatch<boolean>
}

const UserRanking = ({ top3, close }: props) => {


    return (
        <>
            <div className='w-full flex flex-col pt-24 space-y-3 justify-center items-center relative p-3'>
                <div className='w-full flex items-center justify-center gap-4 relative mt-10'>
                    {top3?.slice(0, 3)?.map((leader, index) => (
                        <div key={index} className={`flex flex-col items-center justify-center ${index === 0 ? 'absolute mt-[-100px]' : index === 1 ? 'absolute left-8 mt-[-50px]' : 'absolute right-6 mt-[-4px]'}`}>
                            <img src={[one, second, three][index]} alt={`Top ${index + 1}`} className='w-[40px]' />
                            <h2 className='font-medium text-[11px] pt-3 pb-1'>
                                {leader?.userId?.Name}
                            </h2>

                            <div className='flex items-center space-x-1 text-[11px] font-semibold'>
                                <img src={logo} alt='dfc' className='w-[12px] rounded-full' />
                                <span>{leader?.point}</span>
                            </div>
                        </div>
                    ))}
                </div>


                <div className='flex flex-col w-[85%] items-center justify-center !mb-[-60px]'>


                    <img src={ranks} alt='' className='' />

                </div>

                <div className='w-full relative bg-[#090600] rounded-[8px] leadershadow flex flex-col space-y-2'>
                    <button
                        className="bg-btn4 h-[45px] flex justify-center items-center bg-white text-black space-x-2 font-medium w-full rounded-[8px]"
                        onClick={() => close(true)}
                    >
                        <img src={logo} alt="fdfvds" className="w-[14px] rounded-full" />
                        <span>Boost your Rank</span>
                    </button>

                </div>
            </div >
        </>
    );
};

export default UserRanking;
