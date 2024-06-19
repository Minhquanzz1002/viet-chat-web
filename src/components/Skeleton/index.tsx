const Skeleton = ({className}: { className?: string }) => {
    return (
        <div className={`animate-pulse bg-gray-300 w-full h-5 rounded ${className}`}></div>
    );
};

export default Skeleton;