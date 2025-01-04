
const TaskSkelaton = () => {
    return (
        <div className="relative py-4">
            <div className="flex items-center gap-3 justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-8 skeleton bg-white"></div>
                    <div className="">
                        <p className="font-ubuntu text-sm text-white capitalize font-medium skeleton w-28 h-5 bg-white"></p>
                        <p className="font-ubuntu text-xs text-white capitalize bg-opacity-60 mt-2 skeleton w-14 h-3 bg-white"></p>
                    </div>
                </div>

                <div className="w-16 h-6 skeleton bg-white">
                </div>
            </div>

            <div className="absolute bottom-0 w-[80vw] h-[1px] bg-[#EDFD5D80] bg-opacity-50 right-0"></div>
        </div>
    );
};

export default TaskSkelaton;