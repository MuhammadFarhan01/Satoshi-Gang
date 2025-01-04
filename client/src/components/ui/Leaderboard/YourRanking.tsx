import { useContext } from "react";
import logo from "../../../assets/logo_white.svg";
import { ILeaderboardResponse } from "../../../types/type";
import { CProvider } from "../../../utils/ContextProvider";

const YourRanking = ({myRank}: {myRank: ILeaderboardResponse}) => {
    
    const setting = useContext(CProvider);
    return (
        <div>
            <div className='bg-[#fff] py-2 px-5 flex flex-col font-medium w-full rounded-[8px]'>
                <div
                    className="w-full rounded-[16px] py-2 flex items-center justify-between space-x-3">
                    <div className='w-fit bg-black p-2 rounded-xl'>
                        <img src={logo} alt="" className="w-6"/>
                    </div>
                    <div className="flex h-full flex-1 flex-col justify-center relative">
                        <div className='flex w-full flex-col justify-between h-full space-y-[2px]'>
                            <h1 className="text-[14px] text-nowrap line-clamp-1 font-medium text-black font-poppins">
                               {myRank?.User?.userId?.Username}
                            </h1>
                            <span className='flex items-center gap-1 flex-1 text-[12px]'>
                                <span className='text-[12px] text-nowrap font-medium font-poppins text-black'>
                                    {myRank?.User?.point} {setting?.Setting?.Symbol}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className='w-fit flex items-center justify-end flex-wrap text-[14px] relative px-1'>
                        <button
                            className={`font-semibold ease-in duration-200 text-black`}
                        >
                           #{myRank?.userRank}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YourRanking;