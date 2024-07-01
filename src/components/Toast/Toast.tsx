import React from "react";

type ToastProps = {
    children: React.ReactNode;
}
const Toast = ({children}: ToastProps) => {
    return (
        <div
            className="fixed inset-0 z-30 h-full w-full contain-layout inline-flex items-center justify-center pointer-events-none">
            <div className="bg-gray-800 opacity-70 rounded px-5 py-3 text-white text-sm">
                {
                    children
                }
            </div>
        </div>
    );
};

export default Toast;