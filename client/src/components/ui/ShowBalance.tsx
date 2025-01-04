import { useContext } from "react";
import { CProvider } from "../../utils/ContextProvider";

const ShowBalance = ({ amount }: { amount: string }) => {
    const setting_data = useContext(CProvider);

    return (
        <div className="bg-white px-4 py-1 w-fit rounded-full bg-opacity-10 text-white">
            <p className="font-tektur">
                {Number(amount).toFixed(2)} <span className="font-ubuntu">{setting_data?.Setting?.Symbol}</span>
            </p>
        </div>
    );
};

export default ShowBalance;