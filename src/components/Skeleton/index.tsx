const Skeleton = ({className}: { className?: string }) => {
    return (
        <div className={`animate-pulse bg-gray-300 min-w-30 w-28 h-5 rounded ${className}`}></div>
    );
};

export default Skeleton;