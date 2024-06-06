interface ChevronRightProps {
    stroke?: string;
}


const ChevronRight = ({stroke = "#ffffff"} : ChevronRightProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={stroke}
             strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
        </svg>
    );
};

export default ChevronRight;