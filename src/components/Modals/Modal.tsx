import React, {useRef} from "react";
import ModalHeader from "./ModalHeader.tsx";
import ModalBody from "./ModalBody.tsx";
import ModalFooter from "./ModalFooter.tsx";
import useOnClickOutside from "../../hooks/useOnClickOutside.ts";

interface ModalProps {
    className?: "";
    children: React.ReactNode;
    width?: number;
    onClose: () => void;
}
const Modal = ({children, width, onClose} : ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside<HTMLDivElement>(modalRef, onClose);
    return (
        <div className={`contain-layout fixed flex flex-col items-stretch inset-0 overflow-hidden bg-[rgba(0,0,0,0.5)] h-full w-full z-10 animate-fade-in`}>
            <div className="flex justify-center items-center flex-row flex-nowrap grow shrink overflow-hidden basis-0">
                <div ref={modalRef} className={`relative ${width ? `w-[${width}px]` : 'w-[520px]'} max-h-[calc(100%_-_40px)] h-[calc(100%_-_20px)] self-center bg-white flex flex-col overflow-hidden rounded animate-zoom-in`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;