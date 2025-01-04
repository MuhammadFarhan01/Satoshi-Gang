import BaseApi from "./BaseApi";

const PointHouseEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        CreatePointHouse: builder.mutation({
            query: (arg) => ({
                url: '/point-house/create-mining-power',
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ["point_house"]
        }),
        PurchasePointHouse: builder.mutation({
            query: (arg) => ({
                url: '/point-house/purchase',
                method: 'POST',
                body: arg
            }),
            invalidatesTags: ["point_house"]
        }),
        DeletePointHouse: builder.mutation({
            query: (arg) => ({
                url: '/point-house/delete-mining-power',
                method: 'DELETE',
                params: {id:arg}
            }),
            invalidatesTags: ["point_house"]
        }),
        GetPointHouse: builder.query({
            query: () => ({
                url: '/point-house/get-mining-power',
                method: 'GET',
            }),
            providesTags: ["point_house"]
        }),
    })
});

export const {usePurchasePointHouseMutation, useDeletePointHouseMutation,useCreatePointHouseMutation, useGetPointHouseQuery } = PointHouseEndpoint;