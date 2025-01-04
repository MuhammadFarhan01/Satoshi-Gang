import { useContext } from "react";
import { useLeaderboardQuery } from "../../redux/api/UserEndpoint";
import Top10 from "../ui/Leaderboard/Top10";
import { UserLeaderboard } from "../../types/Leaderboard.interface";
import logo from "../../assets/logo_black.svg";
import YourRanking from "../ui/Leaderboard/YourRanking";
import Loading from "../ui/Loading";
import { CProvider } from "../../utils/ContextProvider";
import trophy from "../../assets/image/trophy.png";

const AllTimeLeaderboard = () => {
    const { data, isLoading } = useLeaderboardQuery(undefined);
    const setting = useContext(CProvider);

    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <img src={trophy} alt="trophy" className="mx-auto" />
            <p className="font-poppins text-center font-bold text-2xl text-white">Leaderboard</p>
            <div className="relative p-2">
                <YourRanking myRank={data?.data[0]} />
            </div>
            <div className="relative -top-5">
                <Top10 Leaderboard={data?.data?.slice(1, 3)} />
            </div>

            <div className="flex flex-col gap-2 px-2 relative -top-7">
                {
                    data?.data?.slice(4, 100)?.map((item: UserLeaderboard, index: number) =>
                        <div
                            key={index}
                            className="relative flex py-4 items-center justify-between space-x-3 bg-white bg-opacity-10 w-full p-3 rounded-lg ">
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
                                    #{index + 3}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AllTimeLeaderboard;