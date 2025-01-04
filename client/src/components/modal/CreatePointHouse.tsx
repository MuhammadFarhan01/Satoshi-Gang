import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PointHouse from "../../types/PointHouse.interface";
import { useCreatePointHouseMutation } from "../../redux/api/PointHouseEndpoint";

interface props {
    open: boolean,
    close: React.Dispatch<React.SetStateAction<boolean>>
}
const CreatePointHouse = ({ open, close }: props) => {
    const { register, handleSubmit, reset } = useForm<PointHouse>();
    const [TriggerCreatePower, { status }] = useCreatePointHouseMutation();

    const HandleForm = (e: PointHouse) => {
        TriggerCreatePower(e);
        reset();
        close(false);
    }

    useEffect(() => {
        switch (status) {
            case "fulfilled":
                toast.dismiss();
                toast.success('New Point House Created');
                break;
    
            case "pending":
                toast.dismiss();
                toast.loading('Creating Point House...');
                break;
    
            case "rejected":
                toast.dismiss();
                toast.error('Failed to Create Point House');
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
                                <span className="label-text font-poppins">token is the rate or unit price of each token (price per token)</span>
                            </div>
                            <input type="number" {...register("token", { valueAsNumber: true })} placeholder="289" className="input input-bordered w-full" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-poppins">price is the amount of money spent.</span>
                            </div>
                            <input type="text" {...register("price", { valueAsNumber: true })} placeholder="470" className="input input-bordered w-full" />
                        </label>

                        <div className="grid items-center grid-cols-2 lg:grid-cols-4 gap-3">
                            <button
                                type="submit"
                                className="font-poppins lg:col-span-3 relative overflow-hidden text-black line-clamp-1 p-3 font-bold text-center w-full my-4 rounded-xl bg-white">Add Point</button>
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

export default CreatePointHouse;