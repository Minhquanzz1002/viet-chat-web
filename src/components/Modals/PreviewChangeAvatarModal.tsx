import Cropper from "react-easy-crop";
import {useState} from "react";

interface PreviewChangeAvatarModalProps {
    onBackTab: () => void;
    image: string;
}

const PreviewChangeAvatarModal = ({onBackTab, image}: PreviewChangeAvatarModalProps) => {
    const [crop, setCrop] = useState<{ x: number, y: number }>({x: 0, y: 0});
    const [zoom, setZoom] = useState<number>(1);

    const onZoomChange = (zoom: number) => {
        setZoom(zoom)
    }

    const onCropChange = (crop: { x: number; y: number; }) => {
        setCrop(crop)
    }

    return (
        <div className="w-full px-4 py-3">
            <div className="relative h-80 mb-3">
                <Cropper onCropChange={onCropChange} crop={crop} image={image} zoom={zoom} aspect={1} cropShape="round"
                         showGrid={false} onZoomChange={onZoomChange}
                />
            </div>
            <div className="mb-5">
                <input id="default-range" type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => onZoomChange(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/>
            </div>

            <div className="flex flex-row justify-end gap-3">
                <button type="button"
                        className="hover:bg-gray-200 rounded font-semibold bg-[#DFE2E7] py-2 px-4"
                        onClick={onBackTab}>Hủy
                </button>
                <button type="button"
                        className="hover:opacity-90 rounded font-semibold bg-blue-600 py-2 px-4 text-white disabled:opacity-80"
                        disabled={true}
                >
                    Cập nhật
                </button>
            </div>
        </div>
    );
};

export default PreviewChangeAvatarModal;