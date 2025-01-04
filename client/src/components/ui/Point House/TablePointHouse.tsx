import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDeletePointHouseMutation, useGetPointHouseQuery } from '../../../redux/api/PointHouseEndpoint';
import PointHouse from '../../../types/PointHouse.interface';

const TablePointHouse = () => {
    const { data } = useGetPointHouseQuery(undefined);
    const [TrigerDelete, { status }] = useDeletePointHouseMutation();
    console.log(data);
    useEffect(() => {
        switch (status) {
            case "fulfilled":
                toast.dismiss();
                toast.success('Point House Deleted');
                break;

            case "pending":
                toast.dismiss();
                toast.loading('Deleting Point House...');
                break;

            case "rejected":
                toast.dismiss();
                toast.error('Failed to Delete Point House');
                break;

            default:
                toast.dismiss();
                break;
        }
    }, [status]);
    return (
        <div className='grid mt-5 lg:grid-cols-4 md:grid-cols-3 gap-4'>
            {
                data?.data?.map((item: PointHouse, i: number) =>
                    <div className='bg-white bg-opacity-10 relative p-3 overflow-hidden rounded-md text-white'>
                        <p>INDEX: {i + 1}</p>
                        <p>Token: {item?.token}</p>
                        <p>PRICE: {item?.price}</p>
                        <div onClick={() => TrigerDelete(item?._id)} className='bg-red-500 px-4 mx-auto w-fit  cursor-pointer h-fit rounded-full text-black'>Delete</div>
                    </div>
                )
            }
        </div>
    );
};

export default TablePointHouse;