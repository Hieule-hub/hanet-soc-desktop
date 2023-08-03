import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Place, RankType, Region } from '@/types/region.type';
import { Cam } from '@/types/cam.type';
import _ from 'lodash';

const baseURL = process.env.NEXT_PUBLIC_SOC_SERVER_URL + '/api';

const filterPlaces = (list: Place[], keyword: string) => {
    const _places = _.filter(list, (o) => _.includes(_.toLower(o.OfficeName), _.toLower(keyword)));
    return _places;
};

export const regionApi = createApi({
    reducerPath: 'regionApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (build) => ({
        getProvinces: build.query<Region[], string>({
            query: (code) =>
                `/vendor/getListProvince?ParentCode=${code}&Status=Active&PageSize=1000`,
            transformResponse: (response: { socData: Region[] }, meta) => {
                //                                                        ^
                // The optional `meta` property is available based on the type for the `baseQuery` used
                // The return value for `transformResponse` must match `ResultType`

                return response.socData;
            }
        }),
        getDistrict: build.query<Region[], string>({
            query: (code) =>
                `/vendor/getListDistrict?ProvinceCode=${code}&Status=Active&PageSize=1000`,
            transformResponse: (response: { socData: Region[] }, meta) => {
                //                                                        ^
                // The optional `meta` property is available based on the type for the `baseQuery` used
                // The return value for `transformResponse` must match `ResultType`

                return response.socData;
            }
        }),
        getListPlace: build.query<
            Place[],
            { provinceCode: string; districtCode: string; address: string }
        >({
            query: (params) =>
                `/vendor/getListPlaceDevice?ProvinceCode=${params.provinceCode}&DistrictCode=${params.districtCode}`,
            transformResponse: (response: { socData: Place[] }, meta, params) => {
                const { address } = params;
                const data = response.socData || [];
                const newDataAfterFilter = filterPlaces(data, address);
                return newDataAfterFilter;
            }
        }),
        getDevices: build.mutation<Cam[], string>({
            query: (placeId) => {
                return {
                    url: '/partner/getListDeviceByPlace',
                    method: 'POST',
                    body: {
                        placeID: placeId
                    }
                };
            },
            transformResponse: (
                response: { socData: Cam[]; socCode: number; socMessage: string },
                meta
            ) => {
                if (response.socCode === 0) {
                    return response.socData || [];
                }
                console.log('getDevices ERROR:', response);
                return [];
            }
        }),
        getListRankType: build.query<RankType[], void>({
            query: () => '/vendor/getListRankType',
            transformResponse: (reponse: { socData: RankType[] }, meta, params) => {
                const data = reponse.socData || [];
                return data;
            }
        })
    })
});

export const {
    useGetProvincesQuery,
    useGetDistrictQuery,
    useGetListPlaceQuery,
    useGetDevicesMutation,
    useGetListRankTypeQuery
} = regionApi;
