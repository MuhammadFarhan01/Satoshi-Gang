import BaseApi from "./BaseApi";

const FarmingEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        StartFarming: builder.mutation({
            query: () => ({
                url: '/farm/start-farming',
                method: 'POST',
            }),
            invalidatesTags: ["Farming"]
        }),
        ClaimFarming: builder.mutation({
            query: (arg) => ({
                url: '/farm/claim-farming-rewards',
                body: {
                    farmId: arg
                }, method: 'POST'
            }),
            invalidatesTags: ["Farming", "User"]
        }),
        GetFarmingStatus: builder.query({
            query: () => ({
                url: '/farm/get-farming-status',
                method: 'GET',
            }),
            providesTags: ["Farming"]
        }),
    })
});

export const { useStartFarmingMutation, useClaimFarmingMutation, useGetFarmingStatusQuery } = FarmingEndpoint;