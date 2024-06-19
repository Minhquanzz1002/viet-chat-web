interface ChevronLeftProps {
    stroke?: string;
    size?: number;
    strokeWidth?: number;
}
const ChevronLeft = ({stroke = "#ffffff", size = 40, strokeWidth = 1} : ChevronLeftProps) => {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke}
         strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
    <path d="m15 18-6-6 6-6"/>
        </svg>
    );
};

export default ChevronLeft;