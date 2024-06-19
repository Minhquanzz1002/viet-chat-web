import React from 'react';

interface AvatarProps {
    alt?: string;
    src?: string;
    children?: React.ReactNode;
    size?: number,
    className?: string;
    onClick?: React.MouseEventHandler<HTMLImageElement> | undefined;
}

const getBackgroundColor = (children: React.ReactNode): string => {
    if (typeof children === "string") {
        switch (children) {
            case 'A':
                return 'bg-gradient-to-r from-fuchsia-300 to-fuchsia-600';
            case 'T':
                return 'bg-gradient-to-r from-pink-300 to-pink-600';
            case 'H':
                return 'bg-gradient-to-r from-rose-300 to-rose-600';
            default:
                return 'bg-gradient-to-r from-blue-300 to-blue-600';
        }
    }
    return 'bg-gradient-to-r from-blue-300 to-blue-600';
}

const Avatar = ({alt = "avatar", src, children, className = "w-11 h-11", onClick}: AvatarProps) => {
    if (src) {
        return (
            <div className={className}>
                <img className={` rounded-full dark:ring-gray-500 object-fill cursor-pointer border ${className}`} src={src}
                     onClick={onClick}
                     alt={alt}/>
            </div>
        )
    } else {
        const bgColor: string = getBackgroundColor(children);
        return (
            <div
                className={`relative inline-flex items-center justify-center aspect-square overflow-hidden ${bgColor} cursor-pointer rounded-full ${className}`}
                onClick={onClick}>
                <span className="font-medium text-white text-xl dark:text-gray-300">{children}</span>
            </div>
        );
    }
};

export default Avatar;