import toast from "react-hot-toast";
import { useDailyCheckingMutation, useDailyCheckingStatusQuery } from "../../../redux/api/ExtraTaskEndpoint";

const DailyChecking = () => {
    const [triggerDailyChecking] = useDailyCheckingMutation();
    const { data: checkingStatus } = useDailyCheckingStatusQuery(undefined);

    return (
        <div className="carousel-item w-64 h-32 mr-4 ">
            <div className="bg-white bg-opacity-10 p-3 rounded-xl relative w-full">
                {
                    <div >
                        <p className="uppercase font-poppins font-medium text-xl text-white">daily checking</p>
                        <p className="capitalize font-poppins text-sm text-white text-opacity-80">complete daily check-in and win rewards!</p>
                        <div className={`my-2 absolute bottom-2 `}>
                            {
                                checkingStatus?.hasClaimed === true ?
                                    <div className="px-5 py-1 w-fit bg-white font-poppins rounded-full bg-opacity-20 text-white text-opacity-50">Claimed</div> :
                                    <div onClick={() => {
                                        toast.promise(
                                            triggerDailyChecking(undefined),
                                            {
                                                loading: 'loading',
                                                success: 'success',
                                                error: 'something went wrong!'
                                            }
                                        )
                                    }} className="px-5 cursor-pointer py-1 w-fit bg-white text-black font-poppins rounded-full" >Check</div>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>

    );
};

export default DailyChecking;