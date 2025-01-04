import { IoClose } from "react-icons/io5";
import ton_icon from "../../assets/ton.png";
import icon from "../../assets/logo.png";
import TMiningPower from "../../types/Mining.Power.interface";
import { SendTransactionRequest, useTonConnectUI } from "@tonconnect/ui-react";
import React, { useContext, useEffect } from "react";
import { CProvider } from "../../utils/ContextProvider";
import { useBoostingMiningMutation } from "../../redux/api/UserEndpoint";
import toast from "react-hot-toast";

const BuyMiningBoostItemAfterClick = ({ data, setBoostItem }: { setBoostItem: React.Dispatch<TMiningPower | undefined>, data: TMiningPower | undefined }) => {
    const [tonConnectUI] = useTonConnectUI();
    const _data = useContext(CProvider);

    const transaction: SendTransactionRequest = {
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
        messages: [
            {
                address: _data?.Setting?.TonAddress as string,
                amount: (parseFloat(data?.price as string) * 1e9).toString(),
            },
        ],
    };

    const [triggerBoost, { status }] = useBoostingMiningMutation();

    const Boost = async () => {
        triggerBoost({ id: data?._id });
    };


    useEffect(() => {
        switch (status) {
            case "fulfilled":
                toast.dismiss();
                toast.success('Mining Boosted!');
                break;

            case "pending":
                toast.dismiss();
                toast.loading('Boosting...');
                break;

            case "rejected":
                toast.dismiss();
                toast.error('Mining Boosting Faild!');
                break;

            default:
                toast.dismiss();
                break;
        }
    }, [status]);

    return (
        <div>
            <dialog open={data?._id ? true : false} className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box bg-slate-900 rounded-t-3xl border-t-2 border-yellow-500 shadow-yellow-500">
                    <div onClick={()=> setBoostItem(undefined)} className="bg-white bg-opacity-10 rounded-full p-1 w-fit text-white text-3xl absolute right-6 top-3">
                        <IoClose />
                    </div>

                    <div className="size-24 mx-auto mt-10 border-2 rounded-full bg-white relative overflow-hidden border-white border-opacity-20">
                        <img src="https://doghousesclonev01.vercel.app/fan.webp" className="absolute flex justify-center items-center z-10 " alt="" />
                        <img src="https://doghousesclonev01.vercel.app/static/media/fanbg.eb7c4774e758e6bdbc8c.webp" className="flex justify-center items-center relative z-0" alt="" />
                    </div>

                    <p className="font-poppins text-white text-xl text-center mt-4">{data?.power}x mining rig power</p>
                    <p className="font-poppins text-white text-sm text-opacity-70 text-center">Boost your mining rig capacity to earn {data?.pph} profit per hour!</p>

                    <div className="flex justify-between items-center gap-3 my-2">
                        <div className="flex-1 bg-white bg-opacity-10 rounded-md p-2 font-poppins flex  gap-1 text-white text-xs">Price: <img src={ton_icon} alt="ton cion" className="size-4 rounded-full relative overflow-hidden" /> {data?.price} TON</div>
                        <div className="flex-1 bg-white bg-opacity-10 rounded-md p-2 font-poppins flex  gap-1 text-white text-xs">Profit: <img src={icon} alt="ton cion" className="size-4" /> {data?.pph} PPH</div>
                    </div>

                    <div onClick={async () => {
                        if (tonConnectUI?.connected) {
                            const result = await tonConnectUI.sendTransaction(transaction);
                            if (result?.boc) {
                                Boost();
                            }
                        }
                        tonConnectUI.openModal();
                        setBoostItem(undefined);
                    }} className="flex items-center cursor-pointer gap-2 bg-yellow-300 text-white p-2 rounded-xl justify-center">
                        <img src={ton_icon} alt="ton icon" className="size-8" />
                        <p className="font-ubuntu text-xl font-medium text-black">Connect Wallet</p>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default BuyMiningBoostItemAfterClick;