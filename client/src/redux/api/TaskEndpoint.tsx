import BaseApi from "./BaseApi";

const TaskEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        CreateTaskAdmin: builder.mutation({
            query: (arg) => ({
                url: "/task/create-new-task",
                method: "POST",
                body: arg
            }),
            invalidatesTags: ["admin_task"]
        }),
        UpdateTaskAdmin: builder.mutation({
            query: (arg) => ({
                url: "/task/update-task-admin",
                method: "PUT",
                body: arg
            }),
            invalidatesTags: ["admin_task"]
        }),
        DeleteTaskAdmin: builder.mutation({
            query: (arg) => ({
                url: "/task/delete-task-admin",
                method: "DELETE",
                body: { id: arg }
            }),
            invalidatesTags: ["admin_task"]
        }),
        GetAllTaskAdmin: builder.query({
            query: () => ({
                url: "/task/get-all-task",
                method: "GET"
            }),
            providesTags: ["admin_task"]
        }),
        GetRewardsTracking: builder.query({
            query: () => ({
                url: "/task/reward-tracking",
                method: "GET"
            }),
            providesTags: ["task"]
        }),
        GetIncompleteTaskList: builder.query({
            query: () => ({
                url: "/task/get-incomplete-task",
                method: "GET"
            }),
            providesTags: ["task"]
        }),
        ClaimTaskRewards: builder.mutation({
            query: (arg) => ({
                url: "/task/claim_task-rewards",
                method: "POST",
                body: arg
            }),
            invalidatesTags: ["task"]
        }),
    })
});

export const { useGetRewardsTrackingQuery, useGetIncompleteTaskListQuery, useClaimTaskRewardsMutation, useCreateTaskAdminMutation, useGetAllTaskAdminQuery, useDeleteTaskAdminMutation, useUpdateTaskAdminMutation } = TaskEndpoint;