import { ITask } from "../admin/TaskManagement";
import ExtraTaskCard from "../components/shared/ExtraTaskCard";
import NormalTaskCard from "../components/shared/NormalTaskCard";
import TaskSkelaton from "../components/ui/home/TaskSkelaton";
import { useExtraListQuery } from "../redux/api/ExtraTaskEndpoint";
import { useGetIncompleteTaskListQuery } from "../redux/api/TaskEndpoint";

const Earn = () => {
    const { data, isLoading } = useGetIncompleteTaskListQuery(undefined);
    const { data: extraTask } = useExtraListQuery(undefined);
    return (
        <div className="p-3">
            <p className="font-poppins text-white text-4xl">TASKS</p>
            <p className="font-poppins text-white text-2xl font-medium">GET REWARDS <span className="text-white text-opacity-40">FOR COMPLETING QUESTS</span></p>

            <div className="">
                <ExtraTaskCard data={extraTask} />
            </div>
            {
                isLoading ?
                    <div className="flex flex-col gap-3">
                        <TaskSkelaton />
                        <TaskSkelaton />
                    </div> :
                    data?.data?.length > 0 &&
                    data?.data?.map((item: ITask, index: number) => (
                        <NormalTaskCard item={item} key={index} />
                    ))
            }
        </div>
    );
};

export default Earn;