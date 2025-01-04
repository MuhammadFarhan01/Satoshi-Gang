import { MdAttachMoney, MdGeneratingTokens } from "react-icons/md";
import { useContext, useState } from "react";
import { useGetFarmingStatusQuery } from "../../../redux/api/FarmingEndpoint";
import BoostButton from "./BoostButton";
import { CProvider } from "../../../utils/ContextProvider";

const BoostDetailsCard = ({balance}: {balance: string}) => {
    const [tokenAmount, setTokenAmount] = useState<number>();
    const { data: FarmingDataStatus } = useGetFarmingStatusQuery(undefined);
    const [miningReward, setMiningReward] = useState<number>(0);
    const setting_data = useContext(CProvider);
    return (
        <div>
            <div className="bg-white bg-opacity-10 rounded-3xl  w-full p-3 mt-5">
                <p className="text-xl font-poppins text-white text-center mt-0">Boost mining</p>
                <p className="text-sm font-poppins text-white text-opacity-70 text-center">Boost your mining to earn more from every mine!</p>

                <div className="bg-white bg-opacity-10 flex gap-3 items-center justify-between rounded-xl mt-2 p-3">
                    <div className="flex items-center font-ubuntu">
                        <MdAttachMoney className="text-white text-xl" />
                        <p className="text-white text-xs font-poppins capitalize line-clamp-1">estimated mining speed:</p>
                    </div>

                    <p className="font-poppins text-xl text-white w-20 text-end relative overflow-hidden">{
                        Number(FarmingDataStatus?.data?.setting?.Mining_Rewards) === 0 ?
                            Number(miningReward).toFixed(2) :
                            (Number(FarmingDataStatus?.data?.setting?.Mining_Rewards) +
                                Number(miningReward)).toFixed(2)
                    }</p>
                </div>

                <div className="bg-white bg-opacity-10 flex gap-3 items-center justify-between rounded-xl mt-2 p-3">
                    <div className="flex items-center  gap-1">
                        <MdGeneratingTokens className="text-xl" />
                        <p className="text-white text-xs font-poppins">{setting_data?.Setting?.Symbol} Amount</p>
                    </div>

                    <input
                        value={tokenAmount}
                        onChange={(e) => {
                            const value = e.target.value;
                            const numberValue = Number(value);
                            if (!isNaN(numberValue)) {
                                setTokenAmount(numberValue);
                                const tenPercentage = 10 / 100 * (Number(FarmingDataStatus?.data?.setting?.Mining_Rewards) + numberValue);
                                setMiningReward(tenPercentage);
                            }

                        }}
                        type="text"
                        className="bg-transparent outline-none font-poppins text-white w-20 text-end"
                        placeholder="0.0" />
                </div>
                <BoostButton tokenAmount={Number(tokenAmount)} balance={Number(balance)}/>
            </div>
        </div>
    );
};

export default BoostDetailsCard;