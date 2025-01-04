import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useOneMillionBroadcastMutation } from "../redux/api/SettingEndpoint";

interface form {
    img: File[],
    text: string
}
const BroadcastOneMillion = () => {
    const { register, handleSubmit } = useForm<form>();
    const [triggerBroadcast, { status }] = useOneMillionBroadcastMutation();

    const HandleFrom = async (e: form) => {
        const formBody = new FormData();
        formBody.append("image", e?.img[0]);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB}`, {
                body: formBody,
                method: "POST"
            });

            const data = await res.json();

            if (res.ok && data?.data?.display_url) {
                await triggerBroadcast({
                    img: data?.data?.display_url,
                    text: e?.text
                });

            } else {
                throw new Error('Image upload failed'); // Handle failure cases
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error: ${error.message}`); // Show error toast
            }
        }
    };

    useEffect(() => {
        switch (status) {
            case "fulfilled":
                toast.dismiss();
                toast.success('Broadcast send!');
                break;

            case "pending":
                toast.dismiss();
                toast.loading('broadcasting...');
                break;

            case "rejected":
                toast.dismiss();
                toast.error('Broadcast Faild!');
                break;

            default:
                toast.dismiss();
                break;
        }
    }, [status]);

    return (
        <div className="bg-black min-h-screen p-3">
            <form onSubmit={handleSubmit(HandleFrom)} className="relative overflow-hidden flex justify-center items-center flex-col p-5 gap-5 bg-white bg-opacity-10 rounded-xl ">
                <input type="file" {...register("img")} className="file-input" />
                <textarea {...register("text")} className="border w-full outline-none bg-transparent rounded-xl border-opacity-10 border-white p-2 h-40"></textarea>
                <button type="submit" className="btn bg-white text-white bg-opacity-10 font-roboto">Send Broadcast</button>
            </form>
        </div>
    );
};

export default BroadcastOneMillion;