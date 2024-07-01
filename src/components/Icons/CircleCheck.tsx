type CircleCheckProps = {
    size?: number;
    className?: string;
}
const CircleCheck = ({size = 24, className = ""}: CircleCheckProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="#0068FF"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <circle cx="12" cy="12" r="10" stroke="#0068FF"/>
            <path d="m9 12 2 2 4-4" stroke="#FFFFFF"/>
        </svg>
    );
};

export default CircleCheck;