
const Circle = ({className = ""} : {className?: string}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"
             fill="currentColor"
             className={className}
             viewBox="0 0 512 512">
            <path
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
        </svg>
    );
};

export default Circle;