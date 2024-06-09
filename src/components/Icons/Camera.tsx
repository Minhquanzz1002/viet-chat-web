
const Camera = ({stroke = "#FFFFFF"} : {stroke?: string}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-camera">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
        </svg>
    );
};

export default Camera;