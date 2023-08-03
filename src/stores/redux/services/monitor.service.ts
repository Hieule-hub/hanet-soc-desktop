import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Monitor, FormFieldValues } from '@/types/monitor.type';

const baseURL = 'http://localhost:4000/';

export const monitorApi = createApi({
    reducerPath: 'monitorApi',
    tagTypes: ['Monitors'],
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (build) => ({
        getMonitorList: build.query<Monitor[], void>({
            query: () => 'monitors',
            transformResponse: (reponse: Monitor[], meta) => {
                //                                                        ^
                // The optional `meta` property is available based on the type for the `baseQuery` used
                // The return value for `transformResponse` must match `ResultType`

                const result = reponse.map((item) => ({
                    ...item,
                    key: item.id
                }));

                return result;
            },
            providesTags(result) {
                if (result) {
                    const final = [
                        ...result.map(({ id }) => ({ type: 'Monitors' as const, id })),
                        { type: 'Monitors' as const, id: 'LIST' }
                    ];
                    return final;
                }
                return [{ type: 'Monitors', id: 'LIST' }];
            }
        }),
        addMonitor: build.mutation<Monitor, FormFieldValues>({
            query(body) {
                const createdAt = new Date().toISOString();
                const updatedAt = new Date().toISOString();
                const status = 1;
                return {
                    url: 'monitors',
                    method: 'POST',
                    body: {
                        ...body,
                        status,
                        createdAt,
                        updatedAt
                    }
                };
            },
            invalidatesTags: (result, error, body) => [{ type: 'Monitors', id: 'LIST' }]
        }),
        getMonitor: build.query<Monitor, string>({
            query: (id) => `monitors/${id}`
        }),
        // getMonitor: build.mutation<Monitor, string>({
        //     query(id) {
        //         return {
        //             url: 'monitors',
        //             method: 'POST',
        //             body: { id }
        //         };
        //     }
        // }),
        updateMonitor: build.mutation<Monitor, { id: string; body: FormFieldValues }>({
            query(arg) {
                const updatedAt = new Date().toISOString();
                return {
                    url: `monitors/${arg.id}`,
                    method: 'PATCH',
                    body: {
                        ...arg.body,
                        updatedAt
                    }
                };
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Monitors', id: arg.id }]
        }),
        deleteMonitor: build.mutation<Monitor, string>({
            query(id) {
                return {
                    url: `monitors/${id}`,
                    method: 'DELETE',
                    body: {
                        id
                    }
                };
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Monitors', id: 'LIST' }]
        })
    })
});

export const {
    useGetMonitorListQuery,
    useAddMonitorMutation,
    // useGetMonitorMutation,
    useGetMonitorQuery,
    useUpdateMonitorMutation,
    useDeleteMonitorMutation
} = monitorApi;
