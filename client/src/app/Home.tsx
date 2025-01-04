import { usePointTableQuery } from "../redux/api/UserEndpoint";
import { useContext } from "react";
import { CProvider } from "../utils/ContextProvider";
import { TonConnectButton } from "@tonconnect/ui-react";
import logo_white from "../assets/logo_white.svg";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import WebApp from "@twa-dev/sdk";

const Home = () => {
    const { data: pointData } = usePointTableQuery(undefined);
    const setting_data = useContext(CProvider);

    return (
        <div className="min-h-[85vh] relative p-3">
            <TonConnectButton className="mx-auto mt-5" />
            <img src={logo_white} alt="logo white" className="w-40 mx-auto" />
            <div className="flex justify-center items-center gap-1">
                <p className="text-5xl font-bold text-white font-poppins text-center">{pointData?.data?.points?.point ? pointData?.data?.points?.point : 0}</p>
                <p className="text-white text-xl font-poppins font-medium">{setting_data?.Setting?.Symbol}</p>
            </div>

            <div className="absolute bottom-0 w-[90%] left-[50%] -translate-x-[50%]">
                <div onClick={()=>{
                    WebApp.openTelegramLink(setting_data?.Setting?.TelegramChannel as string);
                }} className="flex justify-between cursor-pointer items-center gap-2 border rounded-xl border-white border-opacity-50 p-4 mb-5">
                    <div className="flex justify-center gap-2 items-center">
                        <FaPeopleGroup className="text-2xl text-white" />
                        <p className="font-medium font-poppins text-white">Join our community</p>
                    </div>
                    <MdOutlineKeyboardArrowRight className="text-2xl text-white text-opacity-50" />
                </div>

                <div className="flex cursor-pointer justify-between items-center gap-2 border rounded-xl border-opacity-50 border-white p-4">
                    <div className="flex justify-center gap-2 items-center">
                        <BsTwitterX className="text-2xl text-white" />
                        <p className="font-medium font-poppins text-white">Follow on X</p>
                    </div>
                    <MdOutlineKeyboardArrowRight className="text-2xl text-white text-opacity-50" />
                </div>
            </div>

            {/* <RewardsTracking /> */}
        </div>
    );
};

export default Home;