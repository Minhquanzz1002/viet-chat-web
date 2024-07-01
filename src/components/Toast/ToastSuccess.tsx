import React from 'react';

type ToastSuccessProps = {
    children: React.ReactNode;
}
const ToastSuccess = ({children}: ToastSuccessProps) => {
    return (
        <div
            className="fixed inset-0 z-30 h-full w-full contain-layout inline-flex items-center justify-center pointer-events-none">
            <div
                className="bg-black opacity-80 rounded px-5 py-3 text-white text-sm max-w-60 flex flex-col items-center">
                <div className="mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-circle-check">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m9 12 2 2 4-4"/>
                    </svg>
                </div>
                <div className="text-center">
                    {
                        children
                    }
                </div>
            </div>
        </div>
    );
};

export default ToastSuccess;