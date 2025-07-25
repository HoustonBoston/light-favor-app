export default function Loading() {
    return (
        <div className="flex-wrap flex gap-1 pl-4">
            {[...Array(20).keys()].map((_, idx) => (
                <div
                    key={idx}
                    className="border p-4 rounded shadow-2xl w-[50%] max-w-[500px]"
                >
                    <div className="relative h-60 mb-4 flex justify-center items-center bg-gray-300 animate-pulse">
                        <svg
                            className="w-10 h-10 text-gray-200 dark:text-gray-600"
                            fill="currentColor"
                        >
                        <path d="M0 0h20v18H0z" />
                        </svg>
                    </div>
                </div>
            ))}
        </div>
    );
}