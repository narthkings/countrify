/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/utils/axios"
import { useQuery } from "@tanstack/react-query"

export type Country = {
    name: {
        official: string;
        common: string;
    }
    flags: {
        png: string
        svg?: string
    }
    cioc?: string
    population?: number
    region?: string
    subregion?: string
    area?: number
    capital?: string[]
    languages?: {
        [key: string]: string
    }
    borders?: string[]
};

export const useFetchAllCountries = () => {
    return useQuery({
        queryKey: ['fetch_countries'],
        queryFn: async () => {
            const res = await axiosClient.get(`/all`)
            return res.data
        },
    })
}

export const useSearchCountry = (nameOfCountry: string) => {
    return useQuery<Country[], { response: any }>({
        queryKey: ['search_country', nameOfCountry],
        queryFn: async () => {
            const res = await axiosClient.get(`/name/${nameOfCountry}`)
            return res.data
        },
        enabled: !!nameOfCountry,
    })
}

export const useFetchSingleCountry = (cioc: string) => {
    return useQuery<Country[], { response: any }>({
        queryKey: ['single_country', cioc],
        queryFn: async () => {
            const res = await axiosClient.get(`/alpha/${cioc}`)
            return res.data
        },
        enabled: !!cioc,
    })
}

export const useFilterRegion = (region: string) => {
    return useQuery<Country[], { response: any }>({
        queryKey: ['filter_region', region],
        queryFn: async () => {
            const res = await axiosClient.get(`/region/${region}`)
            return res.data
        },
        enabled: !!region,
    })
}