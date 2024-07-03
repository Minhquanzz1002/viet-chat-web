import {useState} from 'react';
import Modal from "./Modal.tsx";
import {OtherUserInfoDTO} from "../../models/profile.ts";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import ModalBodyAddFriend from "./ModalBodyAddFriend.tsx";
import ModalBodyFriendProfile from "./ModalBodyFriendProfile.tsx";


type ModalAddFriendProps = {
    onClose: () => void;
}

const ModalAddFriend = ({onClose}: ModalAddFriendProps) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [searchResult, setSearchResult] = useState<OtherUserInfoDTO | null>(null);
    const titles : string[] = ["Thêm bạn", "Thông tin tài khoản", "Đặt tên gợi nhớ"];

    const onBackTab = () => {
        if (activeTab === 1) {
            setActiveTab(0);
        }
    }

    const renderContent = () => {
        switch (activeTab) {
            case 0:
                return (
                    <ModalBodyAddFriend onChangeTab={(tab: number) => setActiveTab(tab)} onClose={onClose}
                                        onChangeSearchResult={(result: OtherUserInfoDTO) => setSearchResult(result)}/>
                )
            case 1:
                return (
                    <ModalBodyFriendProfile onClose={onClose} profile={searchResult} updateProfile={(newValue) => setSearchResult(newValue)}/>
                )
        }
    }

    return (
        <Modal width={400} onClose={onClose}>
            <Modal.Header title={titles[activeTab]} onClose={onClose} onBack={activeTab === 0 ? undefined : onBackTab}/>
            <Modal.Body>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={activeTab}
                        classNames="slide"
                        timeout={250}
                    >
                        {
                            renderContent()
                        }
                    </CSSTransition>
                </SwitchTransition>
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddFriend;