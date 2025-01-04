import { useContext } from "react";
import { UserLeaderboard } from "../../../types/Leaderboard.interface";
import ImageWithFallback from "../../shared/ImageFallback";
import { CProvider } from "../../../utils/ContextProvider";

interface props {
    item: UserLeaderboard,
    index: number
}

const Leaderboard_Item = ({ item, index }: props) => {
    const rndInt = Math.floor(Math.random() * 5) + 1;
    const setting_data = useContext(CProvider);

    return (
        <div className={`h-16 mt-0 rounded-2xl flex items-center gap-3 px-3 overflow-hidden w-full`}>
            <div className="size-11 p-[2px] rounded-full relative">
                <ImageWithFallback random_number={rndInt} name={item?.userId?.Name} />
            </div>
            <div className="flex justify-between items-center ">
                <div className="">
                    <p className="font-roboto text-sm text-white flex gap-1">{item?.userId?.Name}</p>
                    <p className="font-roboto text-xs text-[#999999]">{Number(item?.point).toFixed(0)} <strong>{setting_data?.Setting?.Symbol}</strong></p>
                </div>
                <p className="font-roboto text-xs font-bold absolute right-5">#{index + 1}</p>
            </div>
        </div>
    );
};

export default Leaderboard_Item;