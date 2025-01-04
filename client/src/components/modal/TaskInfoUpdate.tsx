import { useForm } from "react-hook-form";
import { useUpdateTaskAdminMutation } from "../../redux/api/TaskEndpoint";
import { ITask } from "../../admin/TaskManagement";

const TaskInfoUpdate = ({ item, setUpdateTaskData }: { item: ITask, setUpdateTaskData: React.Dispatch<React.SetStateAction<ITask | undefined>> }) => {

    const { register, handleSubmit } = useForm();
    const [TriggerUpdateUser] = useUpdateTaskAdminMutation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const HandleUpdateUserInfo = (e: any) => {
        TriggerUpdateUser({
            ...e,
            id: item?._id
        });
        setUpdateTaskData(undefined);
    }
    return (
        <div>
            <dialog id="my_modal_1" className="modal" open={item?.point ? true : false}>
                <div className="modal-box bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-10">
                    <form onSubmit={handleSubmit(HandleUpdateUserInfo)} className="">
                        <h3 className="font-bold text-lg font-tektur">Changed Task Info</h3>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-tektur">Title*</span>
                            </div>
                            <input type="text" placeholder="Type here" {...register("title")} defaultValue={item?.title} className="input input-bordered w-full font-tektur" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-tektur">Point*</span>
                            </div>
                            <input type="text" placeholder="Type here" {...register('point')} defaultValue={item?.point} className="input input-bordered w-full font-tektur" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-tektur">Category?</span>
                            </div>
                            <input type="text" placeholder="Type here" value={item?.category} className="input input-bordered w-full font-tektur" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-tektur">Status* (drift-publish)</span>
                            </div>
                            <input type="text" placeholder="Type here" {...register("status")} defaultValue={item?.status} className="input input-bordered w-full font-tektur" />
                        </label>
                        {
                            item?.category === 'read' ?
                                <>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-tektur">Context?</span>
                                        </div>
                                        <textarea value={item?.context} className="textarea textarea-bordered w-full font-tektur" />
                                    </label>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-tektur">Question?</span>
                                        </div>
                                        <textarea value={item?.question} className="textarea textarea-bordered w-full font-tektur" />
                                    </label>

                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-tektur">Answer?</span>
                                        </div>
                                        <textarea value={item?.answer} className="textarea textarea-bordered w-full font-tektur" />
                                    </label>
                                </>
                                :
                                <>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-tektur">Link?</span>
                                        </div>
                                        <input type="text" value={item?.link} className="input input-bordered w-full font-tektur" />
                                    </label>
                                </>
                        }

                        <div className="flex justify-between items-center gap-3 mt-3">
                            <button type="submit" className="bg-white text-black font-bold font-tektur p-2 w-full rounded-lg flex-1">Save</button>
                            <button type="button" onClick={() => setUpdateTaskData(undefined)} className="bg-white text-black font-bold font-tektur p-2 w-full rounded-lg flex-1">Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default TaskInfoUpdate;