interface PanelRightProps {
    expand?: boolean;
}
const PanelRight = ({expand= false} : PanelRightProps) => {
    if (!expand) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2"/>
                <path d="M15 3v18"/>
            </svg>
        );
    } else {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="#005AE0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2"/>
                <defs>
                    <clipPath id="clip">
                        <rect width="18" height="18" x="3" y="3" rx="2"/>
                    </clipPath>
                </defs>
                <rect x="15" y="3" width="6" height="18" fill="#005AE0" clipPath="url(#clip)"/>
                <path d="M15 3v18"/>
            </svg>
        )
    }
};

export default PanelRight;