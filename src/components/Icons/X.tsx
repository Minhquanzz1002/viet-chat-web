interface Props {
    className?: string;
    size?: number;
    strokeWidth?: number;
}
const X = ({className = "", strokeWidth = 2, size = 24}: Props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
             stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
             className={className}>
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    );
};

export default X;