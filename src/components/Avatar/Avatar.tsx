import React from 'react';

interface AvatarProps {
    alt?: string;
    src?: string;
    children?: React.ReactNode;
    size?: number,
    className?: string;
    onClick?:  React.MouseEventHandler<HTMLImageElement> | undefined;
}

const Avatar = ({alt = "avatar", src, children, className = "w-11 h-11", onClick}: AvatarProps) => {
    if (src) {
        return (
            <img className={` rounded-full dark:ring-gray-500 cursor-pointer border ${className}`} src={src}
                 onClick={onClick}
                 alt={alt}/>
        )
    } else {
        return (
            <div
                className={`relative inline-flex items-center justify-center aspect-square overflow-hidden bg-gray-100 cursor-pointer rounded-full ${className}`} onClick={onClick}>
                <span className="font-medium text-gray-600 dark:text-gray-300">{children}</span>
            </div>
        );
    }
};

export default Avatar;