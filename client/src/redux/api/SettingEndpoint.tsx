import BaseApi from "./BaseApi";

const SettingEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        LoginBySceret: builder.mutation({
            query: (arg) => ({
                url: "/setting/admin/login/auth/0/login",
                body: { secret: arg },
                method: "POST"
            }),
            invalidatesTags: ["setting"]
        }),
        UpdateSetting: builder.mutation({
            query: (arg) => ({
                url: "/setting/admin/code/update",
                body: arg,
                method: "PATCH"
            }),
            invalidatesTags: ['setting']
        }),
        Broadcast: builder.mutation({
            query: (arg) => ({
                url: "/broadcast",
                body: arg,
                method: "POST"
            }),
        }),
        OneMillionBroadcast: builder.mutation({
            query: (arg) => ({
                url: "/one-million-broadcast",
                body: arg,
                method: "POST"
            }),
        }),
        GetSettingAdmin: builder.query({
            query: () => ({
                url: '/setting/admin/code',
                method: "GET"
            }),
            providesTags: ["setting"]
        }),
        CheckChannnelJoin: builder.query({
            query: (arg) => ({
                url: '/channel-join',
                method: "GET",
                params: arg
            }),
            providesTags: ["setting"]
        }),
    })
});

export const { useOneMillionBroadcastMutation, useBroadcastMutation, useCheckChannnelJoinQuery, useLoginBySceretMutation, useGetSettingAdminQuery, useUpdateSettingMutation } = SettingEndpoint;