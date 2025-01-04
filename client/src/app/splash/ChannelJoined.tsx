import { useNavigate } from "react-router-dom";
import chat from "../../assets/strikers/chatting.gif";
import { FaTelegram } from "react-icons/fa";
import PageState from "../../components/ui/PageState";
import { useCheckChannnelJoinQuery } from "../../redux/api/SettingEndpoint";
import WebApp from "@twa-dev/sdk";
import { useContext, useState } from "react";
import { CProvider } from "../../utils/ContextProvider";
import { useSplashSeenMutation } from "../../redux/api/UserEndpoint";

const ChannelJoined = () => {
    const setting_data = useContext(CProvider);
    const [clickJoin, setClickJoin] = useState(false);
    const [TriggerSplash] = useSplashSeenMutation();
    const navigate = useNavigate();
    const { data } = useCheckChannnelJoinQuery({
        channel: String(setting_data?.Setting?.TelegramChannel).split("https://t.me/")[1],
        user_id: WebApp.initDataUnsafe.user?.id
    });

    return (
        <div className="max-h-screen min-h-screen bg-black p-3 relative">
            <PageState serial={4} />
            <img src={chat} className="mx-auto" />
            {
                data?.data?.join === true ?
                    <p className="font-montserrat text-green-500 text-2xl font-bold text-center my-5">Sound cool! you are already a member of {setting_data?.Setting?.ProjectName}</p> :
                    <p className="font-montserrat text-red-500 text-2xl font-bold text-center my-5">Oh! You haven't joined our channel yet. Please join to receive rewards.</p>
            }

            <div className="w-full p-3 bg-white bg-opacity-10 rounded-lg flex justify-between items-center gap-3">
                <FaTelegram className="text-white text-4xl" />
                <div className="flex flex-col ">
                    <p className="text-white font-montserrat capitalize font-bold text-xl">Join telegram</p>
                    <p className="text-white font-montserrat capitalize text-opacity-50 text-xs">please join our telegram channel for getting updates</p>
                </div>
                {
                    !clickJoin ?
                        data?.data?.join ?
                            <button className="text-black px-3 py-1 w-20 rounded-full font-medium font-montserrat bg-white">Joined</button> :
                            <div className="w-20 flex justify-center items-center" onClick={() => {
                                setClickJoin(true);
                                WebApp.openTelegramLink(setting_data?.Setting?.TelegramChannel as string);
                            }}>
                                <div className="text-white px-3 py-1  rounded-full font-medium font-montserrat bg-blue-600">Join</div>
                            </div> :
                        <button onClick={() => location.reload()} className="text-black px-3 py-1 w-20 rounded-full font-medium font-montserrat bg-white">Check</button>
                }
            </div>
            {
                data?.data?.join ?
                    <div onClick={async () => {
                        await TriggerSplash(undefined);
                        navigate('/', { replace: true })
                    }} className="font-montserrat text-2xl font-bold text-white bg-blue-500  p-2 text-center rounded-lg absolute bottom-10 w-[90vw] left-[50%] -translate-x-[50%]">Next</div>
                    :
                    <div className="font-montserrat text-2xl font-bold text-white bg-blue-500  p-2 text-center rounded-lg absolute bottom-10 w-[90vw] left-[50%] cursor-pointer -translate-x-[50%]">Join Channel First</div>
            }
        </div>
    );
};

export default ChannelJoined;