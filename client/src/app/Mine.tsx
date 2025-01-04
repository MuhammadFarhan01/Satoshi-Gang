
import { usePointTableQuery } from "../redux/api/UserEndpoint";
import { useClaimFarmingMutation, useGetFarmingStatusQuery, useStartFarmingMutation } from "../redux/api/FarmingEndpoint";
import { useEffect, useRef, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { LuTimer } from "react-icons/lu";
import { FaLongArrowAltRight } from "react-icons/fa";
import BuyMiningBoostItem from "../components/modal/BuyMiningBoostItem";
import BuyMiningBoostItemAfterClick from "../components/modal/BuyMiningBoostItemAfterClick";
import TMiningPower from "../types/Mining.Power.interface";


const Mine = () => {
    const { data: PointTableData, isFetching: PointTableLoading } = usePointTableQuery(undefined);
    const { data: FarmingDataStatus } = useGetFarmingStatusQuery(undefined);
    const [StartFarming] = useStartFarmingMutation();
    const [ClaimFarming] = useClaimFarmingMutation();
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null); // Ref to store the interval
    const [BoostItem, setBoostItem] = useState<TMiningPower | undefined>(undefined);
    const [showBoostingModal, setShowBoostingModal] = useState(false);

    const formatTime = (seconds: number): string => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');

        return `${Number(h) > 0 ? h : 0}h ${Number(m) > 0 ? m : 0}m`;
    };


    // Function to calculate percentage of time remaining
    const calculatePercentage = (timePassed: number, totalTime: number): number => {
        return (timePassed / totalTime) * 100;
    };

    function time(time: string) {
        const miningTimeInMinutes = Number(time);

        let formattedMiningTime;

        if (miningTimeInMinutes >= 60) {
            const hours = Math.floor(miningTimeInMinutes / 60);
            const remainingMinutes = miningTimeInMinutes % 60;
            formattedMiningTime = `${hours} hour${hours > 1 ? 's' : ''}${remainingMinutes > 0 ? ` and ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}` : ''}`;
        } else {
            formattedMiningTime = `${miningTimeInMinutes} minute${miningTimeInMinutes > 1 ? 's' : ''}`;
        }
        return formattedMiningTime;
    }

    useEffect(() => {
        if (FarmingDataStatus?.data?.farm?.createdAt && FarmingDataStatus?.data?.farm?.farmingEndTime) {
            const createdAtTimestamp = new Date(FarmingDataStatus.data.farm.createdAt).getTime();
            const farmingEndTime = parseInt(FarmingDataStatus.data.farm.farmingEndTime);
            const totalFarmingTime = (farmingEndTime - createdAtTimestamp) / 1000; // Total time in seconds

            let secondsPassed = Math.floor((Date.now() - createdAtTimestamp) / 1000);

            intervalRef.current = setInterval(() => {
                secondsPassed++;
                const timeLeft = totalFarmingTime - secondsPassed;

                // Update the farming percentage and time left in the UI
                const percentageLeft = calculatePercentage(secondsPassed, totalFarmingTime);
                const timeLeftFormatted = formatTime(timeLeft);

                // setPercentage(percentageLeft); // Update the state with the calculated percentage (as a number)

                if (document.getElementById('countdown')) {
                    document.getElementById('countdown')!.textContent = `${Number(secondsPassed * Number(FarmingDataStatus?.data?.setting?.Mining_Rewards) / (Number(FarmingDataStatus?.data?.setting?.Mining_Time) * 60)).toFixed(2)}`;
                }
                if (document.getElementById('percentage')) {
                    document.getElementById('percentage')!.style.width = `${percentageLeft}%`;
                }
                if (document.getElementById('time-left')) {
                    document.getElementById('time-left')!.textContent = `${timeLeftFormatted.slice(0, 8)}`;
                }

                // Stop the countdown when time is up
                if (secondsPassed >= totalFarmingTime) {
                    clearInterval(intervalRef.current!);
                    if (document.getElementById('countdown')) {
                        document.getElementById('countdown')!.textContent = Number(FarmingDataStatus?.data?.setting?.Mining_Rewards).toFixed(2);
                    }
                }
            }, 1000);

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current); // Cleanup the interval on unmount
                }
            };
        }
    }, [FarmingDataStatus]);

    return (
        <div className="p-3 relative min-h-[85vh] w-full">
            <div className="relative flex justify-center items-center w-full">
                <div className="bg-white bg-opacity-10 px-4 rounded-full font-poppins">
                    <span className="text-white text-opacity-80 font-ubuntu">Balance</span> <span className="text-white">{Number(PointTableData?.data?.points?.point ? PointTableData?.data?.points?.point : 0).toFixed(2)}</span>
                </div>
            </div>
            <BuyMiningBoostItemAfterClick data={BoostItem} setBoostItem={setBoostItem} />
            <BuyMiningBoostItem open={showBoostingModal} close={setShowBoostingModal} setBoostItem={setBoostItem} />

            {/* <div className={`${BoostItem?._id && 'hidden'}`}>
            </div> */}
            {
                PointTableLoading ?
                    <div className="flex justify-center items-center flex-col ">
                        <div className="size-32 my-5 border-2 rounded-full skeleton bg-white relative overflow-hidden border-white border-opacity-20">
                            <img src="https://doghousesclonev01.vercel.app/fan.webp" className="absolute flex justify-center items-center z-10 " alt="" />
                            <img src="https://doghousesclonev01.vercel.app/static/media/fanbg.eb7c4774e758e6bdbc8c.webp" className="flex justify-center items-center relative z-0" alt="" />
                        </div>

                        <div className="bg-white bg-opacity-15 w-full p-3 rounded-xl">
                            <div className="w-full relative flex justify-center items-center cursor-pointer" onClick={() => StartFarming(undefined)}>
                                <p className="text-white text-center font-medium">Mined Tokens</p>
                                <CiCircleInfo className="text-white absolute right-0" />
                            </div>
                            <p className="font-poppins text-3xl text-white text-center font-bold my-1 ">
                                0.00
                            </p>
                            <div className="flex justify-center items-center gap-1 text-white">
                                <LuTimer /> <span>00h 00m</span>
                            </div>
                            <p className="pt-3 pb-1 font-medium text-[10px] text-[#93792b] flex items-center justify-center space-x-[2px]">
                                <img src="https://doghousesclonev01.vercel.app/starsorange.svg" alt="star" className="size-2" />
                                900 tokens profit per 8 hour
                            </p>
                        </div>

                        <div className="w-full flex items-center justify-between space-x-2 mt-2">
                            <button onClick={() => StartFarming(undefined)} className={`w-[48%] px-4 py-3 flex items-center justify-center text-center rounded-[8px] font-semibold text-[14px] bg-white bg-opacity-15 ${FarmingDataStatus?.data?.isPass === true && FarmingDataStatus?.data?.farm?.claim === true && 'bg-yellow-500 bg-opacity-100 text-black text-opacity-100'}`}>Mining..</button>

                            <button onClick={async () => {
                                await ClaimFarming(FarmingDataStatus?.data?.farm?._id);
                                await location.reload();
                            }} className={`w-[48%] px-4 py-3 flex items-center justify-center text-center rounded-[8px] font-semibold text-[14px] bg-white bg-opacity-15 text-[#888]${FarmingDataStatus?.data?.isPass === true && FarmingDataStatus?.data?.farm?.claim === false && 'bg-yellow-500 bg-opacity-100 text-black text-opacity-100'}`}>Claim</button></div>
                    </div>
                    :
                    <div className="flex justify-center items-center flex-col ">

                        <div className="size-32 my-5 border-2 rounded-full bg-white relative overflow-hidden border-white border-opacity-20">
                            <img src="https://doghousesclonev01.vercel.app/fan.webp" className="absolute flex justify-center items-center z-10 " alt="" id={`${FarmingDataStatus?.data?.isPass === false && FarmingDataStatus?.data?.farm?.claim === false && 'fan'}`} />
                            <img src="https://doghousesclonev01.vercel.app/static/media/fanbg.eb7c4774e758e6bdbc8c.webp" className="flex justify-center items-center relative z-0" alt="" />
                        </div>

                        <div className="bg-white bg-opacity-15 w-full p-3 rounded-xl ">
                            <div className="w-full relative flex justify-center items-center cursor-pointer" onClick={() => StartFarming(undefined)}>
                                <p className="text-white text-center font-medium">Mined Tokens</p>
                                <CiCircleInfo className="text-white absolute right-0" />
                            </div>
                            <p className="font-poppins text-3xl text-white text-center font-bold my-1" id="countdown">
                                0.00
                            </p>
                            <div className="flex justify-center items-center gap-1 text-white">
                                <LuTimer /> <span id="time-left">00h 00m </span>
                            </div>
                            <p className="pt-3 pb-1 font-medium text-[10px] text-[#93792b] flex items-center justify-center space-x-[2px]">
                                <img src="https://doghousesclonev01.vercel.app/starsorange.svg" alt="star" className="size-2" />
                                {Number(FarmingDataStatus?.data?.setting?.Mining_Rewards).toFixed(2)} tokens profit per {time(FarmingDataStatus?.data?.setting?.Mining_Time)}
                            </p>
                        </div>

                        <div className="w-full flex items-center justify-between space-x-2 mt-2">
                            <button onClick={() => StartFarming(undefined)} className={`w-[48%] px-4 py-3 flex items-center justify-center text-center rounded-[8px] font-semibold text-[14px] bg-white  ${FarmingDataStatus?.data?.isPass === true && FarmingDataStatus?.data?.farm?.claim === true ? 'bg-yellow-500 bg-opacity-100 text-black text-opacity-100' : `bg-opacity-15`}`}>Mining..</button>

                            <button
                                onClick={() => ClaimFarming(FarmingDataStatus?.data?.farm?._id)}
                                className={`w-[48%] px-4 py-3 flex items-center justify-center text-center rounded-[8px] font-semibold text-[14px] bg-white text-[#888] 
    ${FarmingDataStatus?.data?.isPass === true && FarmingDataStatus?.data?.farm?.claim === false
                                        ? 'bg-yellow-500 bg-opacity-100 text-black text-opacity-100'
                                        : ' bg-opacity-15'}`
                                }
                            >
                                Claim
                            </button>

                        </div>


                    </div>
            }

            <div
                onClick={() => {
                    setShowBoostingModal(true);
                }}
                className="w-full py-3 rounded-lg bg-white flex items-center cursor-pointer justify-center gap-2 text-black font-poppins mt-4">
                Boost Mining <FaLongArrowAltRight />
            </div>

        </div>
    );
};

export default Mine;
