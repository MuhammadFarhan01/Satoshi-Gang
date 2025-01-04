import { IoClose } from "react-icons/io5";
import React, { useContext } from "react";
import PointHouse from "../../types/PointHouse.interface";
import { CProvider } from "../../utils/ContextProvider";
import { useGetPointHouseQuery } from "../../redux/api/PointHouseEndpoint";

interface props {
    setBoostItem: React.Dispatch<PointHouse | undefined>,
    open: boolean,
    close: React.Dispatch<boolean>
}
const BuyPointItem = ({ setBoostItem, open, close }: props) => {
    const { data } = useGetPointHouseQuery(undefined);
    const setting_data = useContext(CProvider);

    return (
        <div>
            <dialog open={open} className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
                <div className="modal-box bg-slate-900 rounded-t-3xl border-t-2 border-yellow-500 shadow-yellow-500">
                    <div className="bg-white bg-opacity-10 rounded-full p-1 w-fit text-white text-3xl absolute right-6 top-3" onClick={()=> close(false)}>
                        <IoClose />
                    </div>

                    <div className="size-16 mx-auto my-5 border-2 rounded-full bg-white relative overflow-hidden border-white border-opacity-20">
                        <img src="https://doghousesclonev01.vercel.app/fan.webp" className="absolute flex justify-center items-center z-10 " alt="" />
                        <img src="https://doghousesclonev01.vercel.app/static/media/fanbg.eb7c4774e758e6bdbc8c.webp" className="flex justify-center items-center relative z-0" alt="" />
                    </div>

                    <p className="font-poppins text-white text-xl text-center font-medium">Get More {setting_data?.Setting?.Symbol} </p>

                    <div className="flex flex-col gap-3 my-3">
                        {
                            data?.data?.map((item: PointHouse, i: number) => (
                                <div
                                    onClick={() => {
                                        close(false);
                                        setBoostItem(item);
                                    }}
                                    key={i}
                                    className="bg-white bg-opacity-10 rounded-md p-3 flex items-center cursor-pointer">
                                    <div className="size-8 mx-auto border rounded-full relative overflow-hidden border-white border-opacity-20">
                                        <img src="https://doghousesclonev01.vercel.app/fan.webp" className="absolute flex justify-center items-center z-10 " alt="" />
                                        <img src="https://doghousesclonev01.vercel.app/static/media/fanbg.eb7c4774e758e6bdbc8c.webp" className="flex justify-center items-center relative z-0" alt="" />
                                    </div>
                                    <div className="w-full flex items-center justify-between pl-2 h-fit">
                                        <p className="font-poppins text-sm text-white">{item?.token} {setting_data?.Setting?.Symbol}</p>
                                        <p className="font-poppins text-sm text-yellow-500 font-bold">+{item?.price} TON</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default BuyPointItem;