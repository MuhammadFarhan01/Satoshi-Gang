import BaseApi from "./BaseApi";

const ExtraTaskEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        CreateMiningPower: builder.mutation({
            query: (arg) => ({
                url: '/mining-power/create-mining-power',
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ["mining_power"]
        }),
        DeleteMiningPower: builder.mutation({
            query: (arg) => ({
                url: '/mining-power/delete-mining-power',
                method: 'DELETE',
                params: {id:arg}
            }),
            invalidatesTags: ["mining_power"]
        }),
        GetMiningPower: builder.query({
            query: () => ({
                url: '/mining-power/get-mining-power',
                method: 'GET',
            }),
            providesTags: ["mining_power"]
        }),
    })
});

export const { useDeleteMiningPowerMutation,useCreateMiningPowerMutation, useGetMiningPowerQuery } = ExtraTaskEndpoint;