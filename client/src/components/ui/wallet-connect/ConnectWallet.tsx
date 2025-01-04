import { useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";
import premium_icon from "../../../assets/logo.png";
import { PiHandWithdrawFill } from "react-icons/pi";

const ConnectWallet = () => {
    const [tonConnectUI] = useTonConnectUI();
    const [modal, setModal] = useState(false);
    return (
        <div>
            <dialog open={modal} id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Withdraw is unable!</h3>
                    <p className="py-4">Withdrawal will be unlocked when token lauch and airdrop distributed, make sure you connect your wallet to be eligible for withdrawal!</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={() => setModal(false)}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <img src={premium_icon} alt="prem" className="w-32 mx-auto pt-8" />

            {
                tonConnectUI?.connected ?
                    <div onClick={() => tonConnectUI.openModal()} className={`bg-blue-600 bg-opacity-40 w-52 text-white font-poppins text-sm font-normal flex justify-center items-center p-3 rounded-full mx-auto my-2 gap-1`}>
                        <PiHandWithdrawFill className="text-xl" />
                        {String(tonConnectUI?.account?.publicKey).slice(0, 15) + "..."}
                    </div>
                    :
                    <div onClick={() => tonConnectUI.openModal()} className={`bg-blue-600 bg-opacity-40 w-52 text-white font-poppins text-sm font-normal flex justify-center items-center p-3 rounded-full mx-auto my-2 gap-1`}>
                        <PiHandWithdrawFill className="text-xl" />
                        Connect Wallet
                    </div>
            }
            <div className="bg-white bg-opacity-10 text-white font-poppins text-sm font-normal w-52 justify-center p-3 rounded-full mx-auto my-2 flex gap-1 items-center" onClick={() => setModal(true)}>
                <PiHandWithdrawFill className="text-xl" />
                Withdraw to wallet
            </div>
        </div>
    );
};

export default ConnectWallet;