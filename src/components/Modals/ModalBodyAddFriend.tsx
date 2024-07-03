import {OtherUserInfoDTO} from "../../models/profile.ts";
import {Avatar} from "../Avatar";
import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import userApi from "../../api/userApi.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import {ErrorResponse} from "../../models";
import Button from "../Buttons/Button.tsx";
import Modal from "./Modal.tsx";
import {formatPhone} from "../../utils/phoneUtils.ts";
import {Toast} from "../Toast";

const dataExample = [
    "Chuột",
    "Đạt",
    "Đinh Văn Toàn",
    "Hoàng Lộc",
    "Khoa Nguyên",
    "Kim Cương",
    "Lê Quốc Cường",
    "Lợi Hoàng",
    "Lữ Đạt",
    "Mỹ Linh",
    "Phạm Kiên"
]

type ModalBodyAddFriendProps = {
    onChangeTab: (tab: number) => void;
    onClose: () => void;
    onChangeSearchResult: (result: OtherUserInfoDTO) => void;
}
const ModalBodyAddFriend = ({onChangeTab, onClose, onChangeSearchResult}: ModalBodyAddFriendProps) => {

    const {token} = useAuth();
    const [searchHistory, setSearchHistory] = useState<OtherUserInfoDTO[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchError, setSearchError] = useState<string>("");

    const onClickRecentSearch = (recentSearch: OtherUserInfoDTO) => {
        onChangeSearchResult(recentSearch);
        onChangeTab(1);
    }

    useEffect(() => {
        if (searchError !== "") {
            const timer = setTimeout(() => {
                setSearchError("");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [searchError]);

    const searchMutation = useMutation({
        mutationFn: ({token, phone}: { token: string, phone: string }) => userApi.getUserInfoByPhone(token, phone),
        onSuccess: (response: OtherUserInfoDTO) => {
            onChangeSearchResult(response);
            onChangeTab(1);
        },
        onError: (error: ErrorResponse) => {
            setSearchError(error.detail);
        }
    });

    const searchProfile = () => {
        if (!searchValue || !/^0(?:3[2-9]|8[12345689]|7[06789]|5[2689]|9[2367890])\d{7}$/.test(searchValue)) {
            setSearchError("Số điện thoại không hợp lệ")
            return;
        }
        if (token !== "") {
            searchMutation.mutate({token: token, phone: searchValue});
        }
    }


    const onKeyDownSearchInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchProfile();
        }
    }

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (newValue === '' || /^\d+$/.test(newValue)) {
            setSearchValue(newValue);
        }
    }

    useQuery({
        queryKey: ['searchHistory'],
        queryFn: async () => {
            if (token !== '') {
                return await userApi.getSearchHistory(token).then((response) => {
                    console.log(response);
                    setSearchHistory(response);
                    return response;
                })
            }
        },
        enabled: token !== '',
    });

    return (
        <React.Fragment>
            {
                searchError && (<Toast>{searchError}</Toast>)
            }
            <div className="h-13 inline-flex items-center px-4 my-4">
                <input value={searchValue} onChange={onChangeSearchInput}
                       onKeyDown={onKeyDownSearchInput}
                       type="text" title="Vui lòng điền số điện thoại"
                       className="w-full outline-none border-b focus:border-blue-500 pb-2"
                       placeholder="Số điện thoại"/>
            </div>
            <div className="flex-1 relative overflow-hidden">
                <div className="absolute inset-0 overflow-y-auto scrollbar-thin">
                    <div className="px-4 text-xs text-gray-500 h-7.5 inline-flex items-center w-full">Kết
                        quả gần nhất
                    </div>
                    {
                        searchHistory.map((history: OtherUserInfoDTO) => (
                            <div
                                className="inline-flex items-center px-4 w-full gap-x-2 hover:bg-gray-100 cursor-pointer h-[54px]"
                                onClick={() => onClickRecentSearch(history)}>
                                <Avatar src={history.thumbnailAvatar} name={history?.displayName ? history.displayName : history.firstName} size="small"/>
                                <div className="flex-1 flex flex-col">
                                    <div
                                        className="text-sm">{history.firstName + " " + history.lastName}</div>
                                    <div className="text-xs text-gray-500">{formatPhone(history.phone)}</div>
                                </div>
                                <div className="self-start hover:text-blue-600 text-2xl">
                                    &times;
                                </div>
                            </div>
                        ))
                    }
                    <div className="px-4 text-xs text-gray-500 h-7.5 inline-flex items-center w-full">Có
                        thể bạn quen
                    </div>
                    {
                        dataExample.map((ex: string) => (
                            <div
                                className="inline-flex items-center px-4 w-full gap-x-2 hover:bg-gray-100 cursor-pointer h-[54px]">
                                <Avatar name={ex} size="small"/>
                                <div className="flex-1 flex flex-col">
                                    <div className="text-sm">{ex}</div>
                                    <div className="text-xs text-gray-500">Từ gợi ý kết bạn</div>
                                </div>
                                <div
                                    className="flex flex-col items-end justify-center h-full relative">
                                    <div
                                        className="text-xs text-end hover:text-blue-500 absolute top-0">&times;</div>
                                    <button type="button"
                                            className="font-medium border-blue-500 border text-blue-500 rounded text-sm px-3 hover:bg-blue-50">Kết
                                        bạn
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Modal.Footer>
                <Button variant="gray" onClick={onClose}>Hủy</Button>
                <Button variant="primary" onClick={searchProfile}>Tìm kiếm</Button>
            </Modal.Footer>
        </React.Fragment>
    );
};

export default ModalBodyAddFriend;