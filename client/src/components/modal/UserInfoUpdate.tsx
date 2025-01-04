import { useForm } from "react-hook-form";
import { UserInfoAdminInterface } from "../../admin/UserManagement";
import { useUpdateSpacificUserMutation } from "../../redux/api/UserEndpoint";

const UserInfoUpdate = ({ item, setUpdateUserData }: { item: UserInfoAdminInterface, setUpdateUserData: React.Dispatch<React.SetStateAction<UserInfoAdminInterface | undefined>> }) => {

    const { register, handleSubmit } = useForm();
    const [TriggerUpdateUser] = useUpdateSpacificUserMutation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const HandleUpdateUserInfo = (e: any) => {
        TriggerUpdateUser({
            ...e,
            pointId: item?._id
        });
        setUpdateUserData(undefined);
    }
    return (
        <div>
            <dialog id="my_modal_1" className="modal" open={item?._id ? true : false}>
                <div className="modal-box bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-10">
                    <form onSubmit={handleSubmit(HandleUpdateUserInfo)} className="">
                        <h3 className="font-bold text-lg font-tektur">Changed User Info</h3>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-tektur">Name?</span>
                            </div>
                            <input type="text" placeholder="Type here" value={item?.userId?.Name} className="input input-bordered w-full font-tektur" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-tektur">Username?</span>
                            </div>
                            <input type="text" placeholder="Type here" value={item?.userId?.Username} className="input input-bordered w-full font-tektur" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-tektur">Telegram Uid?</span>
                            </div>
                            <input type="text" placeholder="Type here" value={item?.userId?.TgId} className="input input-bordered w-full font-tektur" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-tektur">Refer by?</span>
                            </div>
                            <input type="text" placeholder="Type here" value={item?.userId?.referBy} className="input input-bordered w-full font-tektur" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-tektur">Refer Code*</span>
                            </div>
                            <input type="text" placeholder="Refer code" {...register('ReferCode')} defaultValue={item?.userId?.ReferCode} className="input input-bordered w-full font-tektur" />
                        </label>

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-tektur">Point*</span>
                            </div>
                            <input type="text" placeholder="Type here" {...register('point')} defaultValue={item?.point} className="input input-bordered w-full font-tektur" />
                        </label>

                        <div className="flex justify-between items-center gap-3 mt-3">
                            <button type="submit" className="bg-white text-black font-bold font-tektur p-2 w-full rounded-lg flex-1">Save</button>
                            <button type="button" onClick={() => setUpdateUserData(undefined)} className="bg-white text-black font-bold font-tektur p-2 w-full rounded-lg flex-1">Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default UserInfoUpdate;