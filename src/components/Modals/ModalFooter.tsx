import React from "react";

type ModalFooterProps = {
    children?: React.ReactNode;
}
const ModalFooter = ({children}: ModalFooterProps) => {
    return (
        <div className="h-[68px] border-t inline-flex items-center justify-end gap-x-3.5 px-4">
            {children}
        </div>
    );
};

export default ModalFooter;