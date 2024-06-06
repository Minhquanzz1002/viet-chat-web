interface ChevronLeftProps {
    stroke?: string;
}
const ChevronLeft = ({stroke = "#ffffff"} : ChevronLeftProps) => {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={stroke}
         strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
    <path d="m15 18-6-6 6-6"/>
        </svg>
    );
};

export default ChevronLeft;