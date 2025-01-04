import { useForm } from "react-hook-form";
import { useCreateTaskAdminMutation } from "../../redux/api/TaskEndpoint";
import { useState } from "react";

const AdminTaskCreate = ({ NewTask, setNewTask }: { NewTask: boolean, setNewTask: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const { register, handleSubmit, reset } = useForm();
    const [TriggerUpdateUser] = useCreateTaskAdminMutation();
    const [categoryOnChange, setCategoryOnChange] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const HandleNewTask = (e: any) => {
        TriggerUpdateUser(e);
        setNewTask(false);
        reset();
    }

    return (
        <div>
            <dialog id="my_modal_1" className="modal" open={NewTask}>
                <div className="modal-box bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-10">
                    <form onSubmit={handleSubmit(HandleNewTask)} className="">
                        <h3 className="font-bold text-lg font-tektur">New Task!</h3>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-tektur">Title*</span>
                            </div>
                            <input type="text" required placeholder="title..." {...register("title")} className="input input-bordered w-full font-tektur" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-tektur">Point*</span>
                            </div>
                            <input type="number" required placeholder="point..." {...register('point')} className="input input-bordered w-full font-tektur" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Category*</span>
                            </div>
                            <select required {...register("category")} value={categoryOnChange} onChange={(e) => setCategoryOnChange(e.target.value)} className="select select-bordered">
                                {/* telegram */}
                                <option disabled value={""}>Pick one</option>
                                <option value={"invite"}>Invite</option>
                                <option value={"boost"}>Telegram Boost</option>
                                <option value={"visit"}>Visit</option>
                                <option value={"telegram"}>Telegram</option>
                                <option value={"youtube"}>Youtube</option>
                                <option value={"x"}>X (Twitter)</option>
                            </select>
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Status*</span>
                            </div>
                            <select required {...register("status")} defaultValue={""} className="select select-bordered">
                                <option disabled value={""}>Pick one</option>
                                <option value={"drift"}>Drift</option>
                                <option value={"publish"}>Publish</option>
                            </select>
                        </label>

                        {
                            categoryOnChange === 'read' ?
                                <>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-tektur">Context?</span>
                                        </div>
                                        <textarea required {...register("context")} placeholder="Write the Context here..." className="textarea textarea-bordered w-full font-tektur" />
                                    </label>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-tektur">Question?</span>
                                        </div>
                                        <textarea required {...register("question")} placeholder="Write the question here..." className="textarea textarea-bordered w-full font-tektur" />
                                    </label>

                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-tektur">Answer?</span>
                                        </div>
                                        <textarea required className="textarea textarea-bordered w-full font-tektur" {...register("answer")} placeholder="Write the answer here..." />
                                    </label>
                                </>
                                :
                                categoryOnChange === "invite" ?
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-tektur">Invite Friends?</span>
                                        </div>
                                        <input required type="number" className="input input-bordered w-full font-tektur" {...register("invite")} placeholder="invite" />
                                    </label>
                                    :
                                    categoryOnChange === "earn" ?
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text font-tektur">Earn?</span>
                                            </div>
                                            <input required type="number" className="input input-bordered w-full font-tektur" {...register("earn")} placeholder="Earn" />
                                        </label>
                                        :
                                        <>
                                            <label className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text font-tektur">Link?</span>
                                                </div>
                                                <input required type="url" className="input input-bordered w-full font-tektur" {...register("link")} placeholder="link" />
                                            </label>
                                        </>
                        }

                        <div className="flex justify-between items-center gap-3 mt-3">
                            <button type="submit" className="bg-white text-black font-bold font-tektur p-2 w-full rounded-lg flex-1">Save</button>
                            <button type="button" onClick={() => setNewTask(false)} className="bg-white text-black font-bold font-tektur p-2 w-full rounded-lg flex-1">Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default AdminTaskCreate;