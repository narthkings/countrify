'use client'
import Image from "next/image";
import React from 'react'
import { useFetchSingleCountry } from '@/services/getCountries';
import { useParams } from 'next/navigation';
import Link from "next/link";


const Cioc = () => {
    const { cioc } = useParams();
    const { data: country } = useFetchSingleCountry(cioc as string)
    return (
        <>
            <Link href="/">
                <button className="bg-gray-200 text-gray-800 px-4 py-2 my-5 rounded-xl hover:bg-gray-300 transition">
                    ← Back to Home
                </button>
            </Link>

            <section className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    {country?.[0] && <Image
                        src={country?.[0]?.flags?.png || country?.[0]?.flags?.svg as string}
                        alt={`image of ${country?.[0]?.name?.official as string}`}
                        width={320}
                        height={200}
                        className="rounded-lg shadow-md"
                        loading="lazy"
                    />}
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold mb-2">{country?.[0]?.name?.official}</h1>
                        <p className="text-gray-600 text-lg">{country?.[0]?.name?.common}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base">
                    <div className="space-y-2">
                        <p><span className="font-medium">Capital:</span> {country?.[0]?.capital?.join(", ") || "N/A"}</p>
                        <p><span className="font-medium">Region:</span> {country?.[0]?.region}</p>
                        <p><span className="font-medium">Subregion:</span> {country?.[0]?.subregion}</p>
                        <p><span className="font-medium">Population:</span> {country?.[0]?.population?.toLocaleString()}</p>
                        <p><span className="font-medium">Area:</span> {country?.[0]?.area?.toLocaleString()} km²</p>
                    </div>

                    <div className="space-y-2">
                        <p><span className="font-medium">Languages:</span> {Object.values(country?.[0]?.languages || {}).join(", ")}</p>

                        <h3 className="font-semibold mb-2">Border Countries:</h3>
                        <div className="flex flex-wrap gap-2">
                            {country?.[0]?.borders?.length ? (
                                country?.[0]?.borders?.map((code) => (
                                    <Link key={code} href={`/country/${code}`}>
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition">
                                            {code} {/* or just show the code if names aren't available */}
                                        </span>
                                    </Link>
                                ))
                            ) : (
                                <p>No bordering countries.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cioc