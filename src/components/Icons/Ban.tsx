type BanProps = {
    className?: string;
}
const Ban = ({className = "text-gray-600"} : BanProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <circle cx="12" cy="12" r="10"/>
            <path d="m4.9 4.9 14.2 14.2"/>
        </svg>
    );
};

export default Ban;