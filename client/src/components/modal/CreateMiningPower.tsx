import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import TMiningPower from "../../types/Mining.Power.interface";
import { useCreateMiningPowerMutation } from "../../redux/api/MiningPowerEndpoint";
import toast from "react-hot-toast";

interface props {
    open: boolean,
    close: React.Dispatch<React.SetStateAction<boolean>>
}
const CreateMiningPower = ({ open, close }: props) => {
    const { register, handleSubmit, reset } = useForm<TMiningPower>();
    const [TriggerCreatePower, { status }] = useCreateMiningPowerMutation();

    const HandleForm = (e: TMiningPower) => {
        TriggerCreatePower(e);
        reset();
        close(false);
    }

    useEffect(() => {
        switch (status) {
            case "fulfilled":
                toast.dismiss();
                toast.success('New Power House Created');
                break;
    
            case "pending":
                toast.dismiss();
                toast.loading('Creating Power House...');
                break;
    
            case "rejected":
                toast.dismiss();
                toast.error('Failed to Create Power House');
                break;
    
            default:
                toast.dismiss();
                break;
        }
    }, [status]);
    return (
        <div>
            <dialog open={open} className="modal backdrop-blur-md">
                <div className="modal-box relative bg-white bg-opacity-10 border border-white border-opacity-50">
                    <p className="font-poppins absolute top-2 left-[50%] -translate-x-[50%] text-center text-white text-xl">Create Mining Power</p>
                    <form onSubmit={handleSubmit(HandleForm)} className="lg:mt-5 mt-10">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-poppins">How much should x Power be?</span>
                            </div>
                            <input type="number" {...register("power", { valueAsNumber: true })} placeholder="1X" className="input input-bordered w-full" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-poppins">How much should the rewards be at the end of the cycle?</span>
                            </div>
                            <input type="number" {...register("pph", { valueAsNumber: true })} placeholder="470" className="input input-bordered w-full" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-poppins">How much does a user need to pay to buy this boost?</span>
                            </div>
                            <input type="text" {...register("price")} placeholder="0.1" className="input input-bordered w-full" />
                        </label>

                        <div className="grid items-center grid-cols-2 lg:grid-cols-4 gap-3">
                            <button
                                type="submit"
                                className="font-poppins lg:col-span-3 relative overflow-hidden text-black line-clamp-1 p-3 font-bold text-center w-full my-4 rounded-xl bg-white">Add Power</button>
                            <button
                                type="button"
                                onClick={() => close(false)}
                                className="font-poppins col-span-1 text-white p-3 text-center w-full my-4 rounded-xl border border-white relative overflow-hidden">Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default CreateMiningPower;