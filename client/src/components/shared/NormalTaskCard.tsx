import { FaBookReader, FaCheckCircle, FaMousePointer, FaTelegramPlane, FaUserFriends, FaYoutube } from "react-icons/fa";
import { ITask } from "../../admin/TaskManagement";
import HandleTaskClaimLogic from "./HandleTaskClaimLogic";
import { FaXTwitter } from "react-icons/fa6";
import { MdAddTask } from "react-icons/md";
import { GiUpgrade } from "react-icons/gi";
import { useContext } from "react";
import { CProvider } from "../../utils/ContextProvider";

const NormalTaskCard = ({ item }: { item: ITask }) => {
    const setting_data = useContext(CProvider);
    return (
        <div>
            <div className="relative py-4">
                <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                        {
                            (() => {
                                switch (item?.category) {
                                    case 'visit':
                                        return <FaMousePointer className="text-3xl text-white" />;
                                    case 'x':
                                        return <FaXTwitter className="text-3xl text-white" />;
                                    case 'read':
                                        return <FaBookReader className="text-3xl text-white" />;
                                    case 'telegram':
                                        return <FaTelegramPlane className="text-3xl text-white" />;
                                    case 'invite':
                                        return <FaUserFriends className="text-3xl text-white" />;
                                    case 'youtube':
                                        return <FaYoutube className="text-3xl text-white" />;
                                    case 'boost':
                                        return <GiUpgrade className="text-3xl text-white" />;
                                    default:
                                        return <MdAddTask className="text-3xl text-white" />;
                                }
                            })()
                        }

                        <div className="">
                            <p className="font-ubuntu text-sm text-white capitalize font-medium">{item?.title}</p>
                            <p className="font-ubuntu text-xs text-white capitalize text-opacity-60">+{item?.point} {setting_data?.Setting?.Symbol}</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        {
                            item?.completed === true ? <>
                                <button
                                    className="px-5 py-1 bg-white bg-opacity-10 rounded-2xl text-white line-clamp-1"
                                >
                                    <FaCheckCircle className="text-white text-xl" />
                                </button>
                            </> :
                                <HandleTaskClaimLogic item={item} />
                        }
                    </div>
                </div>

                <div className="absolute hidden bottom-0 w-[80vw] h-[1px] bg-[#EDFD5D80] bg-opacity-50 right-0"></div>
            </div>
        </div>
    );
};

export default NormalTaskCard;