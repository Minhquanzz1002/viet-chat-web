import {Image} from "../Icons";
import {Avatar} from "../Avatar";
import {useAuth} from "../../hooks/useAuth.ts";

interface ChangeAvatarModalProps {
    onChangeImage:  (image: string) => void;
}

const ChangeAvatarModal = ({onChangeImage}: ChangeAvatarModalProps) => {
    const {profile} = useAuth();

    return (
        <div className="w-full px-4 py-3 stack-page-slide-in-left-appear-active">
            <label
                className="bg-[#C7E0FF] rounded py-1.5 w-full text-blue-600 font-semibold cursor-pointer hover:opacity-90 flex items-center justify-center"
                htmlFor="avatarUpload"
            >
                <Image/>
                Tải lên từ máy tính
                <input className="sr-only" type="file" id="avatarUpload" accept=".png, .jpg, .jpeg"
                       onChange={(e) => onChangeImage(URL.createObjectURL(e.target.files![0]))}/>
            </label>
            <div className="my-5 font-semibold">
                Ảnh đại diện của tôi
            </div>
            <div className="min-h-80">
                <div className="grid grid-cols-4 gap-3">
                    {
                        profile?.thumbnailAvatar &&
                        <Avatar src={profile.thumbnailAvatar} className="w-16 h-16"
                                onClick={() => {
                                    if (profile?.thumbnailAvatar) {
                                        onChangeImage(profile.thumbnailAvatar);
                                    }
                                }}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default ChangeAvatarModal;