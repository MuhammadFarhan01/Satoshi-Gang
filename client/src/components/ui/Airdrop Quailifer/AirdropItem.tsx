import { useContext } from "react";
import { AirdropItemInterface, IWalletInfo } from "../../../types/ExtraTask.interface";
import { CProvider } from "../../../utils/ContextProvider";

const AirdropItem = ({ item }: { item: AirdropItemInterface }) => {
    const wallet: IWalletInfo = JSON.parse(item?.walletInfo as string);
    const getRandomColor = () => {
        const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
        return colors[Math.floor(Math.random() * colors.length)];
    };
    const setting_data = useContext(CProvider);

    return (
        <div className="bg-white text-xs text-white relative overflow-hidden justify-between font-poppins p-4 gap-3 rounded-xl bg-opacity-10 flex items-center">
            <div className="flex items-center gap-3 w-fit">
                <div className='w-fit'>
                    <div className={`flex items-center justify-center h-[38px] w-[38px] rounded-full p-1 ${getRandomColor()}`}>
                        <span className='font-semibold text-[14px] text-black'>{String(item?.userId?.Name).slice(0, 2)}</span>
                    </div>
                </div>
                <div className="">
                    <p className="text-sm">{item?.userId?.Name}</p>
                    <p className="text-xs text-opacity-50 text-white">{item?.userId?.Username ? `@${item?.userId?.Username}` : item?.userId?.TgId}</p>
                </div>
            </div>

            <div className="relative w-full">
                <p className="whitespace-normal text-end text-white text-opacity-50">{wallet?.address}</p>
                <p className="text-end text-white text-opacity-50">{item?.pointId?.point} {setting_data?.Setting?.Symbol}</p>
            </div>
        </div>
    );
};

export default AirdropItem;