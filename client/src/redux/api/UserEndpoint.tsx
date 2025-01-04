import BaseApi from "./BaseApi";

const UserEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        NewUser: builder.mutation({
            query: (arg) => ({ url: '/user/create-user', body: arg, method: 'POST' })
        }),
        SplashSeen: builder.mutation({
            query: () => ({
                url: '/user/splash-seen',
                method: 'PUT'
            })
        }),
        BoostingMining: builder.mutation({
            query: (arg) => ({
                url: '/user/boost-mining',
                body: arg,
                method: 'POST',
            }),
            invalidatesTags: ["User", "Farming"]
        }),
        PointTable: builder.query({
            query: (arg) => ({ url: '/point/point-table', body: arg, method: 'GET' }),
            providesTags: ["User", "task", "extra_task"]
        }),
        Leaderboard: builder.query({
            query: (arg) => ({ url: '/point/leaderboard', body: arg, method: 'GET' }),
            // providesTags: ["User", "task"]
        }),
        MinersLeaderboard: builder.query({
            query: (arg) => ({
                url: '/user/miners-leaderboard',
                body: arg,
                method: 'GET'
            }),
        }),
        FindReferer: builder.query({
            query: () => ({ url: '/user/ReferList', method: 'GET' }),
            providesTags: ["User"]
        }),
        AllUserList: builder.query({
            query: () => ({ url: '/user/all-user-admin', method: 'GET' }),
            providesTags: ["admin_user"]
        }),
        UpdateSpacificUser: builder.mutation({
            query: (arg) => ({
                url: "/user/update-user-from-admin",
                method: "PUT",
                body: arg
            }),
            invalidatesTags: ["admin_user"]
        })
    })
});

export const { useMinersLeaderboardQuery, useSplashSeenMutation, useLeaderboardQuery, useBoostingMiningMutation, useUpdateSpacificUserMutation, useNewUserMutation, useAllUserListQuery, usePointTableQuery, useFindRefererQuery } = UserEndpoint;