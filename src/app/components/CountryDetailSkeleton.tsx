'use client'

const CountryDetailSkeleton = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse text-white">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="w-full h-64 bg-gray-400 dark:bg-gray-600 rounded-xl" />

                <div className="flex flex-col gap-4">
                    <div className="h-6 w-3/4 bg-gray-400 dark:bg-gray-600 rounded" />
                    <div className="h-4 w-1/2 bg-gray-400 dark:bg-gray-600 rounded" />
                    <div className="h-4 w-1/3 bg-gray-400 dark:bg-gray-600 rounded" />
                    <div className="h-4 w-1/2 bg-gray-400 dark:bg-gray-600 rounded" />
                    <div className="h-4 w-2/3 bg-gray-400 dark:bg-gray-600 rounded" />
                </div>
            </div>

            <div className="mt-10">
                <div className="h-6 w-1/3 bg-gray-400 dark:bg-gray-600 rounded mb-4" />
                <div className="flex flex-wrap gap-3">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-8 w-24 bg-gray-400 dark:bg-gray-600 rounded-md"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CountryDetailSkeleton;
