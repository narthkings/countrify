'use client'
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from "react";
import useDebounce from "@/utils/useDebounce";
import FlagSkeleton from "./components/FlagSkeleton";
import { Country, useFetchAllCountries, useFilterRegion, useSearchCountry } from "@/services/getCountries";

export default function Home() {
  const router = useRouter()
  const [value, setValue] = useState('');
  const [region, setRegion] = useState('');
  const search = useDebounce(value, 700);
  const [countries, setCountries] = useState<Country[]>();
  const { data: fetchAllCountries, isFetching: fetchingAllCountries } = useFetchAllCountries();
  const { data: searchedCountry, error, isFetching: fetchingSearchedCountry } = useSearchCountry(search);
  const { data: filteredRegion, isFetching: fetchingFilteredCountry } = useFilterRegion(region);

  const defaultCountries = useMemo(() => {
    return fetchAllCountries || []
  }, [fetchAllCountries]);

  useEffect(() => {
    if (search) {
      setCountries(searchedCountry);
    }
    else {
      setCountries(defaultCountries);
    }
  }, [defaultCountries, search, searchedCountry]);


  useEffect(() => {
    if (region) {
      setCountries(filteredRegion);
    }
    else {
      setCountries(defaultCountries);
    }

  }, [filteredRegion, region, defaultCountries]);


  return (
    <section>
      <h1 className="text-2xl font-bold text-center mt-4">Countries</h1>
      <p className="text-center text-gray-50 mb-4">Explore the flags of different countries</p>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

        <input
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Search for a country..."
          className="border border-gray-300 rounded-md p-2 my-4 w-full sm:max-w-md mx-auto"
        />
        {/* <Select options={options} /> */}

        <select
          onChange={(e) => setRegion(e.target.value)}
          className="dark:bg-[#1e293b] text-black dark:text-white border border-gray-300 rounded-md h-11 p-2 my-4 w-full sm:max-w-md mx-auto"
        >
          <option className="text-gray-900 dark:text-white" value="">Select a region</option>
          <option className="text-gray-900 dark:text-white" value="Africa">Africa</option>
          <option className="text-gray-900 dark:text-white" value="Americas">Americas</option>
          <option className="text-gray-900 dark:text-white" value="Asia">Asia</option>
          <option className="text-gray-900 dark:text-white" value="Europe">Europe</option>
          <option className="text-gray-900 dark:text-white" value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {
          fetchingSearchedCountry || fetchingFilteredCountry || fetchingAllCountries
            ? (
              <FlagSkeleton count={12} />
            ) :
            countries?.length ?
              countries?.map((country: Country, index: number) => (
                <div
                  onClick={() => router.push(`/country/${country?.cioc}`)}
                  key={index}
                  className="cursor-pointer bg-[navy] shadow rounded-2xl p-2 flex flex-col items-center justify-center text-white hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <Image
                    width={320}
                    height={200}
                    src={country?.flags?.png}
                    alt={country?.name?.official}
                    className="w-20 h-14 object-cover rounded-md"
                  />
                  <span className="mt-2 text-sm font-medium text-center">{country?.name?.official || country?.name?.common}</span>
                </div>
              )) :
              <p className="col-span-full text-center text-gray-400">
                No country found
              </p>
        }
        {error && (
          <p className="col-span-full text-center text-gray-400">
            {error?.response?.data?.message ?? "No country found with that name."}
          </p>
        )}
      </div>
    </section>
  );
}
