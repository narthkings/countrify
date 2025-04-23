
'use client'
import React from 'react'

const FlagCard = () => (
    <div className="bg-[navy] dark:bg-[#0d1b2a] shadow rounded-2xl p-2 flex flex-col items-center justify-center text-white animate-pulse">
        <div className="w-20 h-14 bg-gray-400 dark:bg-gray-600 rounded-md mb-2" />
        <div className="w-16 h-4 bg-gray-400 dark:bg-gray-600 rounded" />
    </div>
);

const FlagSkeleton = ({ count = 12 }: { count?: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, idx) => (
                <FlagCard key={idx} />
            ))}
        </>
    )
}

export default FlagSkeleton