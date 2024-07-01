import React from "react";

type ModalBodyProps = {
    children: React.ReactNode;
}
const ModalBody = ({children}: ModalBodyProps) => {
    return (
        <div className="flex-1 overflow-hidden relative flex flex-col">
            {children}
        </div>
    );
};

export default ModalBody;