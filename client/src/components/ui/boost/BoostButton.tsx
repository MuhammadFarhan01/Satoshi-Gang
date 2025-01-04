import toast from "react-hot-toast";
import { useBoostingMiningMutation } from "../../../redux/api/UserEndpoint";

const BoostButton = ({ tokenAmount, balance }: { tokenAmount: number, balance: number }) => {

    const [triggerBoost] = useBoostingMiningMutation();

    const Boost = async () => {
        if (tokenAmount as number > 0) {
            toast.promise(
                triggerBoost({ ton: tokenAmount }),
                {
                    loading: 'Request Send!',
                    error: 'Request Decline!',
                    success: 'Request Accepted!'
                }
            )
        }
    };

    return (
        <div className="flex justify-center items-center">
            {
                tokenAmount as number > 0 && balance >= tokenAmount ?
                    < button onClick={Boost} className="bg-yellow-500 text-black font-poppins text-xl px-10 rounded-xl py-2 mt-2">Boost</button> :
                    <button className="bg-white bg-opacity-10 text-white text-opacity-40 font-poppins text-xl px-10 rounded-xl py-2 mt-2">Boost</button>
            }
        </div>
    );
};

export default BoostButton;