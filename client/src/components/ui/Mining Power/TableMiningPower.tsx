import { useEffect } from 'react';
import { useDeleteMiningPowerMutation, useGetMiningPowerQuery } from '../../../redux/api/MiningPowerEndpoint';
import TMiningPower from '../../../types/Mining.Power.interface';
import toast from 'react-hot-toast';

const TableMiningPower = () => {
    const { data } = useGetMiningPowerQuery(undefined);
    const [TrigerDelete, { status }] = useDeleteMiningPowerMutation();
    console.log(data);
    useEffect(() => {
        switch (status) {
            case "fulfilled":
                toast.dismiss();
                toast.success('Power House Deleted');
                break;

            case "pending":
                toast.dismiss();
                toast.loading('Deleting Power House...');
                break;

            case "rejected":
                toast.dismiss();
                toast.error('Failed to Delete Power House');
                break;

            default:
                toast.dismiss();
                break;
        }
    }, [status]);
    return (
        <div className='grid mt-5 lg:grid-cols-4 md:grid-cols-3 gap-4'>
            {
                data?.data?.map((item: TMiningPower, i: number) =>
                    <div className='bg-white bg-opacity-10 relative p-3 overflow-hidden rounded-md text-white'>
                        <p>INDEX: {i + 1}</p>
                        <p>POWER: {item?.power}</p>
                        <p>PPH {item?.pph}</p>
                        <p>PRICE: {item?.price}</p>
                        <div onClick={() => TrigerDelete(item?._id)} className='bg-red-500 px-4 mx-auto w-fit  cursor-pointer h-fit rounded-full text-black'>Delete</div>
                    </div>
                )
            }
        </div>
    );
};

export default TableMiningPower;