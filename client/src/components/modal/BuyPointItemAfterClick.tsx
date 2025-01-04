import { IoClose } from "react-icons/io5";
import ton_icon from "../../assets/ton.png";
import icon from "../../assets/logo.png";
import { SendTransactionRequest, useTonConnectUI } from "@tonconnect/ui-react";
import React, { useContext, useEffect } from "react";
import { CProvider } from "../../utils/ContextProvider";
import toast from "react-hot-toast";
import PointHouse from "../../types/PointHouse.interface";
import { usePurchasePointHouseMutation } from "../../redux/api/PointHouseEndpoint";
const BuyPointItemAfterClick = ({ data, setBoostItem }: { setBoostItem: React.Dispatch<PointHouse | undefined>, data: PointHouse | undefined }) => {
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

    const [triggerPurchase, { status }] = usePurchasePointHouseMutation();

    const Boost = async () => {
        triggerPurchase({ id: data?._id });
        setBoostItem(undefined);
    };


    useEffect(() => {
        switch (status) {
            case "fulfilled":
                toast.dismiss();
                toast.success('Point Purchased!');
                break;

            case "pending":
                toast.dismiss();
                toast.loading('Purchasing...');
                break;

            case "rejected":
                toast.dismiss();
                toast.error('Purchase Faild!');
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
                    <img src={icon} alt="logo" className="mx-auto size-28" />
                    <p className="font-poppins text-center text-2xl text-white">{data?.token} ${_data?.Setting?.Symbol}</p>
                    <p className="font-poppins text-white text-sm text-opacity-70 text-center">Get {data?.token} ${_data?.Setting?.Symbol} and boost your earnings and ranks!</p>

                    <div className="flex justify-between items-center gap-3 my-2">
                        <div className="flex-1 bg-white bg-opacity-10 rounded-md p-2 font-poppins flex  gap-1 text-white text-xs">Price: <img src={ton_icon} alt="ton cion" className="size-4 rounded-full relative overflow-hidden" /> {data?.price} TON</div>
                        <div className="flex-1 bg-white bg-opacity-10 rounded-md p-2 font-poppins flex  gap-1 text-white text-xs">Token: <img src={icon} alt="ton cion" className="size-4" /> {data?.token}</div>
                    </div>

                    <div onClick={async () => {
                        if (tonConnectUI?.connected) {
                            // Boost();
                            const result = await tonConnectUI.sendTransaction(transaction);
                            if (result?.boc) {
                                Boost();
                            }
                        } else {
                            tonConnectUI.openModal();
                            setBoostItem(undefined);
                        }
                    }} className="flex items-center cursor-pointer gap-2 bg-yellow-300 text-white p-2 rounded-xl justify-center">
                        <img src={ton_icon} alt="ton icon" className="size-8" />
                        <p className="font-ubuntu text-xl font-medium text-black">Connect Wallet</p>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default BuyPointItemAfterClick;