import { useContext, useState } from "react";
import { useAllUserListQuery } from "../redux/api/UserEndpoint";
import { TUser } from "../types/type";
import UserInfoUpdate from "../components/modal/UserInfoUpdate";
import { FaEdit } from "react-icons/fa";
import { CProvider } from "../utils/ContextProvider";

export interface UserInfoAdminInterface {
    userId: TUser,
    point: number,
    createdAt: string,
    updatedAt: string,
    task_solved: number,
    refer_count: number,
    _id: string,
}
const UserManagement = () => {
    const { data: Userlist, isLoading } = useAllUserListQuery(undefined);
    const [UpdateUserData, setUpdateUserData] = useState<UserInfoAdminInterface | undefined>(undefined);
    const setting_data = useContext(CProvider);

    function timeSince(date: string | number | Date): string {
        const createAt = new Date(date);  // Convert the input to a Date object
        const now = new Date();
        const seconds = Math.floor((now.getTime() - createAt.getTime()) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }

    return (
        <div>
            <UserInfoUpdate item={UpdateUserData as UserInfoAdminInterface} setUpdateUserData={setUpdateUserData} />
            <div className="overflow-x-auto max-w-5xl mx-auto  bg-opacity-10 rounded-2xl border-opacity-10">
                {
                    isLoading &&
                    <span className="loading loading-spinner loading-lg absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"></span>
                }

                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mx-2">
                    {
                        Userlist?.data?.map((item: UserInfoAdminInterface, index: number) => (
                            <div className="bg-white bg-opacity-10 p-3 rounded-lg pb-14 relative border border-white border-opacity-20" key={index}>
                                <p className="capitalize font-ubuntu text-white font-medium">name: {item?.userId?.Name}</p>
                                <p className="capitalize font-ubuntu text-white text-opacity-50">ID: {item?.userId?.TgId}</p>
                                <p className="capitalize font-ubuntu text-white text-opacity-50">username: @{item?.userId?.Username}</p>
                                <p className="capitalize font-ubuntu text-white text-opacity-50">balance: {item?.point} {setting_data?.Setting?.Symbol}</p>
                                <p className="capitalize font-ubuntu text-white text-opacity-50">total refer: {item?.refer_count}</p>
                                <p className="capitalize font-ubuntu text-white text-opacity-50">total task completed: {item?.task_solved}</p>
                                <p className="capitalize font-ubuntu text-white text-opacity-50">User since: {timeSince(item?.createdAt)}</p>
                                <div
                                    onClick={() => setUpdateUserData(item)}
                                    className="absolute -translate-x-[50%] left-[50%] bg-white bg-opacity-10 p-3 rounded-full bottom-2 flex justify-center items-center cursor-pointer">
                                    <FaEdit className="text-xl text-white" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default UserManagement;