import toast from "react-hot-toast";
import { useFindRefererQuery } from "../redux/api/UserEndpoint";
import ImageWithFallback from "../components/shared/ImageFallback";
import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import { CProvider } from "../utils/ContextProvider";
import refer_image from "../assets/refer.svg";
import { LuMessageCircle } from "react-icons/lu";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import WebApp from "@twa-dev/sdk";

const Refer = () => {
    const { data: ReferList } = useFindRefererQuery(undefined);
    const [refer, setRefer] = useState(false);
    const Setting = useContext(CProvider);

    return (
        <div className={`p-5 relative min-h-[85vh] overflow-hidden`}>
            <div className={`${refer === true && 'blur-md'} overflow-auto`}>
                <p className="font-poppins text-white text-4xl">INVITE FRIENDS</p>
                <p className="font-poppins text-white text-[25px] font-medium">SHARE <span className="text-white text-opacity-40">YOUR INVITATION LINK & </span>GET 10% <span className="text-white text-opacity-40">OF FRIEND'S POINTS</span></p>
                <div className="bg-white bg-opacity-10 rounded-xl p-3">
                    <div className="text-white text-opacity-50 font-poppins text-center">
                        {
                            ReferList?.data?.refer_list?.length === 0 ?
                                (<>
                                    <img src={refer_image} alt="" className="w-40 mx-auto" />
                                    <p>There is nothing else.</p>
                                    <p>Invite to get more rewards.</p>
                                </>) :
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                ReferList?.data?.refer_list?.map((item: any, index: number) => (
                                    <div className="flex  justify-between items-center gap-3 " key={index}>
                                        <div className="flex items-center gap-3">
                                            <div className="size-9 bg-gray-400 rounded-full">
                                                <ImageWithFallback name={item?.Name as string} random_number={1} />
                                            </div>
                                            <p className="font-roboto text-sm text-white">{item?.Name as string}</p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>

            {
                refer === true &&
                <div className="relative z-20">
                    <dialog id="my_modal_5" open className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box py-0 pb-5 border-t bg-black">
                            <div className="my-5 relative w-full flex items-center">
                                <p className="text-white text-xl font-poppins font-bold">Invite</p>
                                <IoClose onClick={() => setRefer(false)} className="text-2xl absolute right-0 text-white" />
                            </div>

                            <div className="bg-white bg-opacity-10 p-4 rounded-xl mb-10">
                                <div
                                    onClick={() => {
                                        const referCode = ReferList?.data?.me?.ReferCode;
                                        const shareText = `Join me on ${Setting?.Setting?.ProjectName} and let's earn together! Use my invite link to join the fun. 🌟`;
                                        const shareUrl = `https://t.me/share/url?url=${Setting?.Setting?.MiniAppLink}?startapp=${referCode}&text=${encodeURIComponent(shareText)}`;
                                        WebApp.openTelegramLink(shareUrl);
                                    }}
                                    className="w-full p-[1px] rounded-md flex gap-3 items-center justify-between pb-3 cursor-pointer"
                                >
                                    <div className="flex gap-3 items-center">
                                        <LuMessageCircle className="text-2xl text-white" />
                                        <p className="w-full py-2 rounded-md font-roboto text-white font-medium">Send message</p>
                                    </div>
                                    <MdOutlineKeyboardArrowRight className="text-2xl text-white text-opacity-50" />
                                </div>

                                <div className="mx-auto h-[1px] w-[70%] bg-white bg-opacity-30"></div>

                                <div
                                    onClick={() => {
                                        toast.success('refer link copyed!');
                                        navigator.clipboard.writeText(`${Setting?.Setting?.MiniAppLink}?startapp=` + ReferList?.data?.me?.ReferCode);
                                    }}
                                    className="w-full p-[1px] rounded-md flex gap-3 items-center justify-between pt-3 cursor-pointer"
                                >
                                    <div className="flex gap-3 items-center">
                                        <FaCopy className="text-2xl text-white" />
                                        <p className="w-full py-2 rounded-md font-roboto text-white font-medium">Copy link</p>
                                    </div>
                                    <MdOutlineKeyboardArrowRight className="text-2xl text-white text-opacity-50" />
                                </div>
                            </div>
                        </div>
                    </dialog>
                </div>
            }

            <button onClick={()=> setRefer(true)} className="bg-[#4c9ce2] p-3 w-[90%] rounded-lg text-white font-medium text-xl font-poppins absolute bottom-0 left-[50%] -translate-x-[50%]">Invite</button>
        </div>
    );
};

export default Refer;