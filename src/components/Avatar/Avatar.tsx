import React from 'react';

interface AvatarProps {
    alt?: string;
    src?: string;
    name?: string;
    size?: 'small' | 'large' | 'extra-large' | 'very-small';
    onClick?: React.MouseEventHandler<HTMLImageElement> | undefined;
}

const getBackgroundColor = (name?: string): string => {
    switch (name) {
        case 'A':
        case 'B':
        case 'C':
            return 'linear-gradient(0deg,#f31bc8,#fbadeb)';
        case 'D':
        case 'E':
        case 'F':
            return 'linear-gradient(0deg,#37b361,#88d7a3)';
        case 'G':
        case 'H':
        case 'I':
            return 'linear-gradient(0deg,#eb5e00,#ffc70f)';
        case 'J':
        case 'K':
        case 'L':
            return 'linear-gradient(0deg,#37b361,#88d7a3)';
        case 'M':
        case 'N':
        case 'O':
            return 'linear-gradient(0deg,#6f3fcf,#1f78ff)';
        case 'P':
        case 'Q':
        case 'R':
            return 'linear-gradient(0deg,#5a2db4,#a385e0)';
        case 'S':
        case 'T':
        case 'U':
            return 'linear-gradient(0deg,#ff3838,#fbadeb)';
        case 'Y':
        case 'W':
        case 'X':
            return 'linear-gradient(90deg,#0fc3ff,#4bc377)';
        default:
            return 'linear-gradient(0deg,#06f,#529aff)';
    }
}

const sizeClasses = {
    'very-small': 'size-6 min-h-6 min-w-6 text-xs',
    small: 'size-10 min-h-10 min-w-10 text-sm',
    large: 'size-12 min-h-12 min-w-12 text-xl',
    'extra-large': 'size-20 min-h-20 min-w-20 text-2xl'
}

const Avatar = ({alt = "Avatar", src, name, onClick, size = 'large'}: AvatarProps) => {
    if (src) {
        return (
            <div className='size-auto'>
                <div className={`${sizeClasses[size]} overflow-hidden relative`}>
                    <img className={`object-cover ${sizeClasses[size]} rounded-full  border border-white`}
                         draggable={false}
                         src={src}
                         onClick={onClick}
                         alt={alt}/>
                </div>
            </div>
        )
    } else {
        if (!name) {
            return (
                <div className='size-auto'>
                    <div className={`${sizeClasses[size]} overflow-hidden relative`}>
                        <div
                            className={`object-cover ${sizeClasses[size]} bg-gray-200 animate-pulse rounded-full border border-white uppercase inline-flex items-center justify-center font-medium text-white`}
                        />
                    </div>
                </div>
            );
        } else {
            const bgColor: string = getBackgroundColor(name?.charAt(0));
            return (
                <div className='size-auto'>
                    <div className={`${sizeClasses[size]} overflow-hidden relative`}>
                        <div
                            className={`object-cover ${sizeClasses[size]} rounded-full border border-white uppercase inline-flex items-center justify-center font-medium text-white`}
                            style={{background: bgColor}}
                            onClick={onClick}
                        >
                            {name?.charAt(0)}
                        </div>
                    </div>
                </div>
            );
        }
    }
};

export default Avatar;