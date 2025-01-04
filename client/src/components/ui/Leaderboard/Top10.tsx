import logo from "../../../assets/logo_black.svg";
import { UserLeaderboard } from "../../../types/Leaderboard.interface";
import first from "../../../assets/madel/1th.png";
import second from "../../../assets/madel/2th.png";
import third from "../../../assets/madel/3th.png";
import fourth from "../../../assets/madel/4th.png";
import fifth from "../../../assets/madel/5th.png";
import sixth from "../../../assets/madel/6th.png";
import seventh from "../../../assets/madel/7th.png";
import eighth from "../../../assets/madel/8th.png";
import ninth from "../../../assets/madel/9th.png";
import tenth from "../../../assets/madel/10th.png";
import { useContext } from "react";
import { CProvider } from "../../../utils/ContextProvider";

const Top10 = ({ Leaderboard }: { Leaderboard: UserLeaderboard[] }) => {
  
    const setting = useContext(CProvider);

    return (
        <div className="p-2 mt-5">
            {
                Leaderboard?.map((item: UserLeaderboard, index: number) => (
                    <div
                        key={index}
                        className="relative flex py-4 items-center justify-between space-x-3 bg-white bg-opacity-10 w-full p-3 rounded-lg mb-2">
                        <div className='w-fit bg-white p-2 rounded-xl'>
                            <img src={logo} alt="" className="w-6" />
                        </div>
                        <div className="flex h-full flex-1 flex-col justify-center relative">
                            <div className='flex w-full flex-col justify-between h-full space-y-[2px]'>
                                <h1 className="text-[14px] text-nowrap line-clamp-1 font-medium text-white font-poppins">
                                    {item?.userId?.Name}
                                </h1>
                                <span className='flex items-center gap-1 flex-1 text-[12px]'>
                                    <span className='text-[12px] text-nowrap font-medium font-poppins text-white text-opacity-70'>
                                        {item?.point ? item?.point : 0} {setting?.Setting?.Symbol}
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className='w-fit flex items-center justify-end flex-wrap text-[14px] relative px-1'>
                            <div
                                className={`font-semibold ease-in duration-200`}
                            >
                                <img src={[first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth][index]} alt={item?.userId?.Name} className="w-[20px]" />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Top10;