import React from 'react';

interface AvatarProps {
    alt?: string;
    src?: string;
    children?: React.ReactNode;
}

const Avatar = ({alt = "avatar", src, children}: AvatarProps) => {
    if (src) {
        return (
            <img className="w-11 h-11 rounded-full dark:ring-gray-500 cursor-pointer" src={src}
                 alt={alt}/>
        )
    } else {
        return (
            <div
                className="relative inline-flex items-center justify-center w-11 h-11 overflow-hidden bg-gray-100 cursor-pointer rounded-full">
                <span className="font-medium text-gray-600 dark:text-gray-300">{children}</span>
            </div>
        );
    }
};

export default Avatar;