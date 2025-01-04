import BaseApi from "./BaseApi";

const ExtraTaskEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        Ton_Transection: builder.mutation({
            query: (arg) => ({
                url: '/extra-task/ton-transection',
                method: 'POST', 
                body: arg
            }),
            invalidatesTags: ["extra_task"]
        }),
        Invite: builder.mutation({
            query: (arg) => ({
                url: '/extra-task/invites',
                method: 'POST',
                body: {
                    refer_count: arg
                }
            }),
            invalidatesTags: ["extra_task"]
        }),
        DailyChecking: builder.mutation({
            query: () => ({
                url: '/extra-task/daily-checking',
                method: 'POST',
            }),
            invalidatesTags: ["extra_task"]
        }),
        ExtraList: builder.query({
            query: () => ({
                url: '/extra-task/extra-list',
            }),
            providesTags: ["extra_task"]
        }),
        AllAirdrop: builder.query({
            query: () => ({
                url: '/extra-task/airdrop',
            }),
            providesTags: ["extra_task"]
        }),
        DailyCheckingStatus: builder.query({
            query: () => ({
                url: '/extra-task/daily-checking-status',
            }),
            providesTags: ["extra_task"]
        }),
        StoryChecking: builder.mutation({
            query: () => ({
                url: '/extra-task/story-checking',
                method: 'POST',
            }),
            invalidatesTags: ["extra_task"]
        }),
        StoryCheckingStatus: builder.query({
            query: () => ({
                url: '/extra-task/story-checking-status',
            }),
            providesTags: ["extra_task"]
        }),
        PointTracking: builder.query({
            query: () => ({
                url: '/extra-task/point-tracking',
            }),
            providesTags: ["extra_task"]
        })
    })
});

export const { useAllAirdropQuery ,usePointTrackingQuery, useStoryCheckingMutation, useStoryCheckingStatusQuery, useDailyCheckingStatusQuery, useDailyCheckingMutation, useTon_TransectionMutation, useInviteMutation, useExtraListQuery } = ExtraTaskEndpoint;