import React from "react";
const ModalBodyGroupMember = () => {
    return (
        <React.Fragment>
            <div className="h-full w-full flex flex-col">
                <div className="px-4 my-4 text-sm font-medium">Danh sách thành viên ({0})</div>
                <div className="flex-1 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-y-auto scrollbar-thin">
                        <div></div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ModalBodyGroupMember;