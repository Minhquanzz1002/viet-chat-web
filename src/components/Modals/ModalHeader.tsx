import {ChevronLeft} from "../Icons";

type ModalHeaderProps = {
    title: string;
    onClose: () => void;
    onBack?: () => void;
}
const ModalHeader = ({onClose, title, onBack}: ModalHeaderProps) => {
    return (
        <div className="inline-flex items-center px-2 h-12 min-h-12 relative border-b">
            {
                onBack && (
                    <button type="button" aria-label="Quay lại" onClick={onBack}>
                        <ChevronLeft stroke="#000000" size={25} strokeWidth={2}/>
                    </button>
                )
            }
            <div className="flex-1 font-medium" title={title}>
                {title}
            </div>
            <button type="button" className="text-right text-3xl" onClick={onClose}>&times;</button>
        </div>
    );
};

export default ModalHeader;