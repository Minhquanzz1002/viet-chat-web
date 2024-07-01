interface SearchProps {
    size?: number;
    strokeWidth?: number;
    className?: string;
}
const Search = ({size = 20, strokeWidth = 2, className = ""} : SearchProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
        </svg>
    );
};

export default Search;