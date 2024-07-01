interface EllipsisProps {
    className?: string;
    size?: number;
}
const Ellipsis = ({className = "", size = 16} : EllipsisProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size} viewBox="0 0 24 24"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
        </svg>
    );
};

export default Ellipsis;