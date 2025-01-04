import WebApp from "@twa-dev/sdk";
import { useStoryCheckingMutation, useStoryCheckingStatusQuery } from "../../../redux/api/ExtraTaskEndpoint";
import { useContext } from "react";
import { CProvider } from "../../../utils/ContextProvider";

const DailyStoryCard = ({ media }: { media: string }) => {
    const [triggerDailyChecking] = useStoryCheckingMutation();
    const { data: checkingStatus } = useStoryCheckingStatusQuery(undefined);
    const setting = useContext(CProvider);

    
    const share_status = async () => {
        try {
            await WebApp.shareToStory(media);
        } catch (error) {
            console.error("Story sharing failed or was cancelled", error);
        } finally {
            setTimeout(() => {
                triggerDailyChecking(undefined)
            }, 15000);
        }
    }
    return (
        <div>
            <div className="carousel-item w-64 h-32 mr-4 ">
                <div className="bg-white bg-opacity-10 p-3 rounded-xl w-full relative">
                    <p className="uppercase font-poppins font-medium text-xl text-white">daily story</p>
                    <p className="capitalize font-poppins text-sm text-white text-opacity-80">Upload Story about {setting?.Setting?.ProjectName}!</p>
                    <div className="my-2 absolute bottom-2">
                        {
                            checkingStatus?.hasClaimed === true ?
                                <div className="px-5 py-1 w-fit bg-white font-poppins rounded-full bg-opacity-20 text-white text-opacity-50">Claimed</div> :
                                <div onClick={() => share_status()} className="px-5 cursor-pointer py-1 w-fit bg-white text-black font-poppins rounded-full" >Upload</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyStoryCard;