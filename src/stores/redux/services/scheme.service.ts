import { Scheme, SchemeFieldFormValues } from '@/types/scheme.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const baseURL = 'http://localhost:4000/';

export const schemeApi = createApi({
    reducerPath: 'schemeApi',
    tagTypes: ['Schemes'],
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        getSchemesList: builder.query<Scheme[], void>({
            query: () => '/schemes',
            transformResponse: (reponse: Scheme[], meta) => {
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
                        ...result.map(({ id }) => ({ type: 'Schemes' as const, id })),
                        { type: 'Schemes' as const, id: 'LIST' }
                    ];
                    return final;
                }
                return [{ type: 'Schemes', id: 'LIST' }];
            }
        }),
        getScheme: builder.query<Scheme, string>({
            query: (id) => `/schemes/${id}`
        }),
        addScheme: builder.mutation<Scheme, SchemeFieldFormValues>({
            query(arg) {
                const createdAt = new Date().toISOString();
                const updatedAt = new Date().toISOString();
                const { camsList, conditionalCamList, monitorConfigList, ...props } = arg;
                return {
                    url: 'schemes',
                    method: 'POST',
                    body: {
                        ...props,
                        details: {
                            camsList,
                            conditionalCamList,
                            monitorConfigList
                        },
                        createdAt,
                        updatedAt
                    }
                };
            }
        }),
        updateScheme: builder.mutation<Scheme, { id: string; body: SchemeFieldFormValues }>({
            query(arg) {
                const updatedAt = new Date().toISOString();
                const { camsList, conditionalCamList, monitorConfigList, ...props } = arg.body;
                return {
                    url: `schemes/${arg.id}`,
                    method: 'PATCH',
                    body: {
                        ...props,
                        details: {
                            camsList,
                            conditionalCamList,
                            monitorConfigList
                        },
                        updatedAt
                    }
                };
            },
            invalidatesTags: (result, error, arg) => [{ type: 'Schemes', id: arg.id }]
        })
    })
});

export const {
    useGetSchemesListQuery,
    useAddSchemeMutation,
    useGetSchemeQuery,
    useUpdateSchemeMutation
} = schemeApi;
