import Modal from "./Modal.tsx";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {useState} from "react";
import ModalBodyGroupMember from "./ModalBodyGroupMember.tsx";

type ModalGroupMemberProps = {
    onClose: () => void;
}
const ModalGroupMember = ({onClose}: ModalGroupMemberProps) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const titles : string[] = ["Danh sách thành viên", "Thông tin tài khoản", "Đặt tên gợi nhớ"];

    const onBackTab = () => {
        if (activeTab === 1) {
            setActiveTab(0);
        }
    }

    return (
        <Modal width={400}>
            <Modal.Header title={titles[activeTab]} onClose={onClose} onBack={activeTab === 0 ? undefined : onBackTab}/>
            <Modal.Body>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={activeTab}
                        classNames="slide"
                        timeout={250}
                    >
                        <div>
                            {
                                activeTab === 0 && <ModalBodyGroupMember onClose={onClose}/>
                            }
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </Modal.Body>
        </Modal>
    );
};

export default ModalGroupMember;