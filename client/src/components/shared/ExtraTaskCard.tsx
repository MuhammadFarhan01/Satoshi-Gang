/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useTon_TransectionMutation } from "../../redux/api/ExtraTaskEndpoint";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CProvider } from "../../utils/ContextProvider";
import { FaCheckCircle } from "react-icons/fa";


const ExtraTaskCard = ({ data }: { data: any }) => {
    const [triggerTonTransection] = useTon_TransectionMutation();
    const [tonConnectUI] = useTonConnectUI();
    const setting_data = useContext(CProvider);

    const amountInNanotons = (Number(setting_data?.Setting?.TonTransectionTonAmount) * 1e9).toString();

    const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
        messages: [
            {
                address: setting_data?.Setting?.TonAddress as string,
                amount: amountInNanotons
            }
        ]
    };

    const OnclickTransection = async () => {
        try {
            const trx = await tonConnectUI.sendTransaction(transaction);
            if (trx?.boc) {
                toast.promise(
                    triggerTonTransection(tonConnectUI.account),
                    {
                        loading: 'loading',
                        error: 'something went wrong!',
                        success: 'success'
                    }
                )
            }
        } catch (error) {
            console.error("Error during transaction:", error);
            toast.error("Transection is not complete!")
        }
    };

    const onclickTrans = () => {
        // toast.promise(
        //     triggerTonTransection(tonConnectUI.account),
        //     {
        //         loading: 'loading',
        //         error: 'something went wrong!',
        //         success: 'success'
        //     }
        // )
        if (tonConnectUI?.connected) {
            triggerTonTransection(tonConnectUI.account)

            OnclickTransection();
        } else {
            tonConnectUI.openModal();
            toast.error("Your wallet is not connected!")
        }
    }

    return (
        <div>
            <div className="relative py-4">
                <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.1839 17.7069C13.6405 18.6507 13.3688 19.1226 13.0591 19.348C12.4278 19.8074 11.5723 19.8074 10.941 19.348C10.6312 19.1226 10.3595 18.6507 9.81613 17.7069L5.52066 10.2464C4.76864 8.94024 4.39263 8.28717 4.33762 7.75894C4.2255 6.68236 4.81894 5.65591 5.80788 5.21589C6.29309 5 7.04667 5 8.55383 5H15.4462C16.9534 5 17.7069 5 18.1922 5.21589C19.1811 5.65591 19.7745 6.68236 19.6624 7.75894C19.6074 8.28717 19.2314 8.94024 18.4794 10.2464L14.1839 17.7069ZM11.1 16.3412L6.56139 8.48002C6.31995 8.06185 6.19924 7.85276 6.18146 7.68365C6.14523 7.33896 6.33507 7.01015 6.65169 6.86919C6.80703 6.80002 7.04847 6.80002 7.53133 6.80002H7.53134L11.1 6.80002V16.3412ZM12.9 16.3412L17.4387 8.48002C17.6801 8.06185 17.8008 7.85276 17.8186 7.68365C17.8548 7.33896 17.665 7.01015 17.3484 6.86919C17.193 6.80002 16.9516 6.80002 16.4687 6.80002L12.9 6.80002V16.3412Z" fill="#fff"></path></svg>

                        <div className="">
                            <p className="font-ubuntu text-sm text-white capitalize font-medium">Make a TON transaction</p>
                            <p className="font-ubuntu text-xs text-white capitalize text-opacity-60">+{setting_data?.Setting?.TransectionRewards} {setting_data?.Setting?.Symbol}</p>
                        </div>
                    </div>

                    <div className="">
                        {
                            data?.data?.trans?.title === "Ton Transection" ?
                                <button
                                    className="px-5 py-1 bg-white bg-opacity-10 rounded-2xl text-white line-clamp-1"
                                >
                                    <FaCheckCircle className="text-white text-xl" />
                                </button>
                                :
                                <button onClick={onclickTrans} className="px-5 h-fit py-1 font-poppins font-medium bg-white text-black rounded-full">Start</button>
                        }
                    </div>
                </div>
                <div className="absolute bottom-0 w-[80vw] hidden h-[1px] bg-[#EDFD5D80] bg-opacity-50 right-0"></div>
            </div>
            {/* 
            {InviteTask(5)}
            {InviteTask(10)}
            {InviteTask(25)}
            {InviteTask(50)}
            {InviteTask(100)} */}

        </div>
    );
};

export default ExtraTaskCard;