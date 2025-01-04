import { FaCheckCircle } from 'react-icons/fa';
import { useGetRewardsTrackingQuery } from '../../../redux/api/TaskEndpoint';
import { useContext } from 'react';
import { CProvider } from '../../../utils/ContextProvider';
import { GiMining } from 'react-icons/gi';
import { GoTasklist } from 'react-icons/go';
import { FaPeopleGroup } from 'react-icons/fa6';

const RewardsTracking = () => {
    const { data } = useGetRewardsTrackingQuery(undefined);
    const setting_data = useContext(CProvider);
 
    return (
        <div className=''>
            <p className='mt-5 font-poppins text-white text-xl'>Your Rewards</p>
            <div className="mt-3 flex flex-col gap-2">
                <div className="flex items-center w-full gap-3">
                    <div className="bg-white bg-opacity-20 p-2 rounded-full">
                        <FaCheckCircle className='text-2xl text-white' />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className='font-poppins text-white font-medium'>Checkin Rewards</p>
                        <p className='font-poppins text-white font-bold text-opacity-50'>+{data?.data?.daily_checking} {setting_data?.Setting?.Symbol}</p>
                    </div>
                </div>
                <div className="flex items-center w-full gap-3">
                    <div className="bg-white bg-opacity-20 p-2 rounded-full">
                        <FaPeopleGroup className='text-2xl text-white' />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className='font-poppins text-white font-medium'>Refer Rewards</p>
                        <p className='font-poppins text-white font-bold text-opacity-50'>+{data?.data?.refer} {setting_data?.Setting?.Symbol}</p>
                    </div>
                </div>
                <div className="flex items-center w-full gap-3">
                    <div className="bg-white bg-opacity-20 p-2 rounded-full">
                        <GoTasklist className='text-2xl text-white' />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className='font-poppins text-white font-medium'>Task Rewards</p>
                        <p className='font-poppins text-white font-bold text-opacity-50'>+{data?.data?.task} {setting_data?.Setting?.Symbol}</p>
                    </div>
                </div>
                <div className="flex items-center w-full gap-3">
                    <div className="bg-white bg-opacity-20 p-2 rounded-full">
                        <GiMining className='text-2xl text-white' />
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <p className='font-poppins text-white font-medium'>Mining Rewards</p>
                        <p className='font-poppins text-white font-bold text-opacity-50'>+{data?.data?.mining} {setting_data?.Setting?.Symbol}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardsTracking;