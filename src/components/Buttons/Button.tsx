import React from "react";

type ButtonProps = {
    variant: "gray" | "primary";
    onClick?: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}
const Button = ({variant, children, onClick, disabled = false}: ButtonProps) => {
    if (variant === "gray") {
        return (
            <button type="button" onClick={onClick}
                    disabled={disabled}
                    className="bg-gray-200 px-4 h-10 rounded hover:bg-gray-300 font-medium">
                {children}
            </button>
        );
    }
    return (
        <button type="button" onClick={onClick}
                disabled={disabled}
                className="bg-blue-600 hover:opacity-90 disabled:opacity-70 px-4 h-10 rounded font-medium text-white">
            {children}
        </button>
    );
};

export default Button;