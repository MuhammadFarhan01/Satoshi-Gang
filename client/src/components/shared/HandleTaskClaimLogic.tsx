import { useState } from "react";
import { useClaimTaskRewardsMutation } from "../../redux/api/TaskEndpoint";
import { ITask } from "../../admin/TaskManagement";
import ReadClaimModal from "../modal/ReadClaimModal";
import toast from "react-hot-toast";


const HandleTaskClaimLogic = ({ item }: { item: ITask }) => {
    const [isClaim, setClaim] = useState(false);
    const [isProgressForClaim, setProgressForClaim] = useState(false);
    const [isReadClaim, setReadClaim] = useState(false);

    const [triggerClaimRewards] = useClaimTaskRewardsMutation();
    const Claim = async () => {
        setProgressForClaim(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = await triggerClaimRewards({ taskId: item?._id });

        await setProgressForClaim(false);
        await setClaim(false);

        if (item?.category === "invite" || item?.category === "boost" || item?.category === "earn") {
            if (data?.error?.data?.status === 400) {
                toast.error(data?.error?.data?.errorMessage)
            }
        }
    };

    return (
        <div>
            <ReadClaimModal readClaim={isReadClaim} setClaim={setReadClaim} item={item} />
            {
                isProgressForClaim ?
                    <div className="px-4 py-1 bg-white bg-opacity-10  rounded-2xl text-white">
                        <span className="loading loading-dots loading-md"></span>
                    </div> :
                    isClaim ?
                        <div className="px-4 py-1 bg-white bg-opacity-10  rounded-2xl text-white" onClick={Claim}>Claim</div> :
                        item?.category !== "read" ?
                            item?.category === "invite" ?
                                <button
                                    className="px-4 py-1 bg-white bg-opacity-10 rounded-2xl text-white line-clamp-1"
                                    onClick={Claim}
                                >Start</button>
                                :
                                item?.category === "earn" ?
                                    <button
                                        className="px-4 py-1 bg-white bg-opacity-10 rounded-2xl text-white line-clamp-1"
                                        onClick={Claim}
                                    >Check Income</button>
                                    :
                                    <a
                                        href={item?.link as string}
                                        className="px-4 py-1 bg-white bg-opacity-10 rounded-2xl text-white line-clamp-1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => {
                                            setProgressForClaim(true);
                                            setTimeout(() => {
                                                setProgressForClaim(false);
                                                setClaim(true);
                                            }, 10000);
                                        }}>
                                        Start
                                    </a>
                            :

                            <button
                                className="px-4 py-1 bg-white bg-opacity-10 rounded-2xl text-white line-clamp-1"
                                onClick={() => setReadClaim(true)}
                            >Start</button>
            }
        </div>
    );
};

export default HandleTaskClaimLogic;