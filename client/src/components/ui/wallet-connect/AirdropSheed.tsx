import { FaCheckDouble } from "react-icons/fa";
import { HiMiniGift } from "react-icons/hi2";
import { MdAttachMoney, MdHistoryToggleOff } from "react-icons/md";
interface UserActivity {
    checkin: number;
    refer: number;
    transection: number;
    story: number;
    farming: number;
    task: number;
}
const AirdropSheed = ({data}: {data: UserActivity}) => {
    return (
        <div className="border-t-2 border-white  rounded-t-3xl w-full p-3 mt-5">
            <p className="text-xl font-poppins text-white text-center mt-5">Airdrop Qualifiers</p>
            <p className="text-sm font-poppins text-white text-opacity-70 text-center">Listing and launching soon, all activities are important for qualification!</p>

            <div className="bg-white bg-opacity-10 flex gap-3 items-center justify-between rounded-xl mt-2 p-3">
                <div className="flex items-center gap-1">
                    <MdAttachMoney className="text-white text-3xl" />
                    <p className="text-white font-poppins">Tasks reward</p>
                </div>

                <p className="font-poppins text-xl text-white">{data?.task}</p>
            </div>

            <div className="bg-white bg-opacity-10 flex gap-3 items-center justify-between rounded-xl mt-2 p-3">
                <div className="flex items-center gap-1">
                    <HiMiniGift className="text-white text-3xl" />
                    <p className="text-white font-poppins">Mining reward</p>
                </div>
                <p className="font-poppins text-xl text-white">{data?.farming}</p>
            </div>
            <div className="bg-white bg-opacity-10 flex gap-3 items-center justify-between rounded-xl mt-2 p-3">
                <div className="flex items-center gap-1">
                    <FaCheckDouble className="text-white text-3xl" />
                    <p className="text-white font-poppins">Check-in reward</p>
                </div>
                <p className="font-poppins text-xl text-white">{data?.checkin}</p>
            </div>
            <div className="bg-white bg-opacity-10 flex gap-3 items-center justify-between rounded-xl mt-2 p-3">
                <div className="flex items-center gap-1">
                    <MdHistoryToggleOff className="text-white text-3xl" />
                    <p className="text-white font-poppins">Story Upload reward</p>
                </div>
                <p className="font-poppins text-xl text-white">{data?.story}</p>
            </div>
        </div>
    );
};

export default AirdropSheed;