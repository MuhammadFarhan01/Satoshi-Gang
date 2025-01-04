import TMiningPower from "../../../types/Mining.Power.interface";

const ClientMiningBoostingCardItem = ({item}: {item: TMiningPower}) => {
    return (
        <div className="bg-white bg-opacity-10 rounded-md p-3 flex items-center cursor-pointer">
            <div className="size-8 mx-auto border rounded-full relative overflow-hidden border-white border-opacity-20">
                <img src="https://doghousesclonev01.vercel.app/fan.webp" className="absolute flex justify-center items-center z-10 " alt="" />
                <img src="https://doghousesclonev01.vercel.app/static/media/fanbg.eb7c4774e758e6bdbc8c.webp" className="flex justify-center items-center relative z-0" alt="" />
            </div>
            <div className="w-full flex items-center justify-between pl-2 h-fit">
                <p className="font-poppins text-sm text-white">{item?.power}x ring power</p>
                <p className="font-poppins text-sm text-yellow-500 font-bold">+{item?.pph} PPH</p>
            </div>
        </div>
    );
};

export default ClientMiningBoostingCardItem;