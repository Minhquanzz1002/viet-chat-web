import Modal from "./Modal.tsx";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {useState} from "react";
import ModalBodyGroupMember from "./ModalBodyGroupMember.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import {useQuery} from "@tanstack/react-query";
import {GroupMemberDTO} from "../../models/group.ts";
import groupApi from "../../api/groupApi.ts";

type ModalGroupMemberProps = {
    onClose: () => void;
    groupId: string;
}
const ModalGroupMember = ({onClose, groupId}: ModalGroupMemberProps) => {
    const {token} = useAuth();
    const [members, setMembers] = useState<GroupMemberDTO[]>([]);
    const [activeTab, setActiveTab] = useState<number>(0);
    const titles: string[] = ["Danh sách thành viên", "Thông tin tài khoản", "Đặt tên gợi nhớ"];

    const onBackTab = () => {
        if (activeTab === 1) {
            setActiveTab(0);
        }
    }

    useQuery({
        queryKey: ['groupMembers', groupId],
        queryFn: async () => {
            if (token !== '') {
                return await groupApi.getAllMembers(token, groupId).then((response) => {
                    setMembers(response)
                    return response;
                })
            }
        },
        enabled: token !== '',
    });

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
                        <div className="h-full w-full">
                            {
                                activeTab === 0 && <ModalBodyGroupMember members={members} groupId={groupId}/>
                            }
                        </div>
                    </CSSTransition>
                </SwitchTransition>
            </Modal.Body>
        </Modal>
    );
};

export default ModalGroupMember;