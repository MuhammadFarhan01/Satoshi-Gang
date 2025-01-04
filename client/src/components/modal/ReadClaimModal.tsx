import { useForm } from "react-hook-form";
import { useClaimTaskRewardsMutation } from "../../redux/api/TaskEndpoint";
import { ITask } from "../../admin/TaskManagement";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

const ReadClaimModal = ({ setClaim, readClaim, item }: { setClaim: React.Dispatch<boolean>, readClaim: boolean, item: ITask }) => {

    const { register, handleSubmit } = useForm();
    const [TriggerTaskRewards, { status, isLoading, data, error }] = useClaimTaskRewardsMutation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const HandleUpdateUserInfo = (e: any) => {
        TriggerTaskRewards({
            ...e,
            taskId: item?._id
        });
        setClaim(false);
    };

    useEffect(() => {
        let toastId;

        if (isLoading === false) {
            if (status === "fulfilled") {
                toast.success(data?.message, { id: toastId })
            } else if (status === "rejected") {
                if ('data' in error) {
                    // Handle FetchBaseQueryError
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const fetchError: any = error as FetchBaseQueryError;
                    toast.error(fetchError.data?.errorMessage, { id: toastId });
                } else {
                    // Handle SerializedError or unknown cases
                    const serializedError = error as SerializedError;
                    toast.error(serializedError.message || "An error occurred", { id: toastId });
                }
            }
        }
    }, [status, isLoading])

    return (
        <div>
            <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle" open={readClaim}>
                <div className="modal-box bg-[#3f854c]">
                    <form onSubmit={handleSubmit(HandleUpdateUserInfo)} className="">
                        <h3 className="font-bold text-lg font-tektur text-black">Claim Rewards!</h3>
                        <div className="my-5">
                            <span className="label-text font-tektur text-black">Context?</span>
                            <p className="whitespace-pre-line font-poppins text-xs text-black">{item?.context}
                            </p>
                        </div>
                        <div className="my-5">
                            <span className="label-text font-tektur text-black ">Question?</span>
                            <p className="text-sm font-ubuntu text-black">{item?.question}</p>
                        </div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-tektur text-black">Answer*</span>
                            </div>
                            <textarea placeholder="write the answer..." {...register("answer")} className="textarea bg-transparent textarea-bordered w-full font-tektur text-black" />
                        </label>

                        <div className="flex justify-between items-center gap-3 mt-3">
                            <button type="submit" className="bg-white text-black font-bold font-tektur p-2 w-full rounded-lg flex-1">Submit</button>
                            <button type="button" onClick={() => setClaim(false)} className="bg-white text-black font-bold font-tektur p-2 w-full rounded-lg flex-1">Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ReadClaimModal;