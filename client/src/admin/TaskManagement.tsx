import { useState } from "react";
import { useDeleteTaskAdminMutation, useGetAllTaskAdminQuery } from "../redux/api/TaskEndpoint";
import TaskInfoUpdate from "../components/modal/TaskInfoUpdate";
import AdminTaskCreate from "../components/modal/AdminTaskCreate";

export interface ITask {
    _id: string,
    title: string;
    point: string;
    category: string;
    completed: boolean,
    status: string;
    context?: string;  // Optional
    question?: string;  // Optional
    answer?: string;    // Optional
    link?: string;      // Optional
}


const TaskManagement = () => {
    const { data: TaskList } = useGetAllTaskAdminQuery(undefined);
    const [UpdateTaskData, setUpdateTaskData] = useState<ITask | undefined>(undefined);
    const [NewTask, setNewTask] = useState(false);
    const [TriggerDeleteTask] = useDeleteTaskAdminMutation();
    return (
        <div className="min-h-screen max-w-5xl  mx-auto p-3">
            <AdminTaskCreate NewTask={NewTask} setNewTask={setNewTask}/>
            <TaskInfoUpdate item={UpdateTaskData as ITask} setUpdateTaskData={setUpdateTaskData} />
            <div className="flex items-center gap-4 my-5">
                <p>Totak Task: {TaskList?.data?.length}</p>
                <button onClick={()=> setNewTask(true)} className="p-2 text-white px-5 bg-white bg-opacity-10 border-white border-opacity-10 rounded-xl">Add New</button>
            </div>
            
            <div className="overflow-x-auto bg-white bg-opacity-10 rounded-2xl border border-white border-opacity-10">
                <table className="table text-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Point</th>
                            <th>Category</th>
                            <th>Link</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            TaskList?.data?.map((item: ITask, index: number) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{item?.title}</td>
                                    <td>{item?.point} </td>
                                    <td>{item?.category}</td>
                                    <td>{item?.link}</td>
                                    <td>{item?.status}</td>
                                    <td className="flex items-center gap-3">
                                        <button className="btn btn-xs" onClick={() => setUpdateTaskData(item)}>Edit</button>
                                        <button className="btn btn-xs" onClick={() => TriggerDeleteTask(item?._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskManagement;