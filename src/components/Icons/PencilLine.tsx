const PencilLine = ({size = 24} : {size?: number}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-pencil-line">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            <path d="m15 5 3 3"/>
        </svg>
    );
};

export default PencilLine;