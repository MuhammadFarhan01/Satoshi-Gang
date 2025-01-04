import toast from "react-hot-toast";
import { useGetSettingAdminQuery, useUpdateSettingMutation } from "../redux/api/SettingEndpoint";
import { useForm } from "react-hook-form";

const Setting = () => {
    const { data } = useGetSettingAdminQuery(undefined);
    const [TriggerUpdateData] = useUpdateSettingMutation();
    const { register, handleSubmit, reset } = useForm();

    const HandleUpdateSetting = (e: any) => {
        toast.promise(
            TriggerUpdateData(e),
            {
                loading: 'loading',
                success: 'success',
                error: 'something went wrong!'
            }
        );
        reset();
    };

    return (
        <div className="min-h-screen">
            <form onSubmit={handleSubmit(HandleUpdateSetting)} className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 bg-white p-3 rounded-xl bg-opacity-10 font-poppins">

                {/* Secret Code */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">What is login code?</span>
                    </div>
                    <input
                        type="text"
                        {...register("SecretCode")}
                        defaultValue={data?.data?.SecretCode}
                        placeholder="Login Code"
                        required
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Refer Commission */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Refer Commission</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.ReferComission}
                        {...register("ReferComission")}
                        placeholder="Refer Commission"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Bot Token */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Bot Token</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.BotToken}
                        {...register("BotToken")}
                        placeholder="Bot Token"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Refer Reward */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Refer Reward (Reward given to the user who referred someone else)</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.ReferrerBonus}
                        {...register("ReferrerBonus")}
                        placeholder="Refer Reward"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Telegram Channel */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Telegram Channel</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.TelegramChannel}
                        {...register("TelegramChannel")}
                        placeholder="Telegram Channel"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* User joined through a referral from another user. */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Reward for the user who joined through a referral link</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.ReferredUserBonus}
                        {...register("ReferredUserBonus")}
                        placeholder="User joined through a referral from another user."
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Reward for a user upon successfully registering a new account */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Reward for a user upon successfully registering a new account</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.AccountCreationReward}
                        {...register("AccountCreationReward")}
                        placeholder="User joined through a referral from another user."
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Mining Time */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Mining Time</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.Mining_Time}
                        {...register("Mining_Time")}
                        placeholder="Mining Time in minutes"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Ton Transection Ton Amount */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">TON Amount (how much user need to pay if they want to complete ton transection)</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.TonTransectionTonAmount}
                        {...register("TonTransectionTonAmount")}
                        placeholder="Ton Amount"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Mining Rewards */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Mining Rewards</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.Mining_Rewards}
                        {...register("Mining_Rewards")}
                        placeholder="Mining Rewards"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Status Media */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Status Media (User will able to do a status)</span>
                    </div>
                    <input
                        type="url"
                        defaultValue={data?.data?.StatusMedia}
                        {...register("StatusMedia")}
                        placeholder="Status Media URL"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Mini App Link */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Mini App Link</span>
                    </div>
                    <input
                        type="url"
                        defaultValue={data?.data?.MiniAppLink}
                        {...register("MiniAppLink")}
                        placeholder="Mini App Link"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Bot Link */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Bot Link</span>
                    </div>
                    <input
                        type="url"
                        defaultValue={data?.data?.BotLink}
                        {...register("BotLink")}
                        placeholder="Bot Link"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Symbol */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Symbol</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.Symbol}
                        {...register("Symbol")}
                        placeholder="Symbol"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Project Name */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Project Name</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.ProjectName}
                        {...register("ProjectName")}
                        placeholder="Project Name"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Ton Address */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Ton Address</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.TonAddress}
                        {...register("TonAddress")}
                        placeholder="Ton Address"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Transaction Rewards */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Transaction Rewards (How much user get rewards when he dose ton transaction)</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.TransectionRewards}
                        {...register("TransectionRewards")}
                        placeholder="Transaction Rewards"
                        className="input input-bordered w-full"
                    />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Welcome Banner</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.WelcomeBanner}
                        {...register("WelcomeBanner")}
                        placeholder="Welcome Banner"
                        className="input input-bordered w-full"
                    />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Welcome Messgae</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.WelcomeMessage}
                        {...register("WelcomeMessage")}
                        placeholder="Welcome Message"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Maintenance */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Maintenance</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={data?.data?.Maintaince}
                        {...register("Maintaince")}
                        placeholder="Maintenance (yes or no)"
                        className="input input-bordered w-full"
                    />
                </label>

                {/* Update Button */}
                <button className="bg-white text-black p-3 rounded-xl font-poppins font-medium">Update</button>

            </form>
        </div>
    );
};

export default Setting;
