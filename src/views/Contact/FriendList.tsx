import React from 'react';
import {useAuth} from "../../hooks/useAuth.ts";
import {UserList} from "../../components/Icons";

const FriendList = () => {
    const {friends} = useAuth();

    return (
        <div className="h-screen flex-1 flex flex-col">
            <div className="flex flex-row items-center gap-x-2 px-4 h-16 bg-white border-b">
                <UserList/>
                <h2 className="font-semibold">Danh sách bạn bè</h2>
            </div>
            {
                friends && friends.length > 0 ? (
                    <div className='bg-neutral-100 p-4 w-full overflow-auto flex-1'>
                        <div className='font-medium pb-4'>Bạn bè</div>
                        <div className='bg-white h-fit rounded py-4'>
                            {/*<RenderItem/>*/}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center">
                        <img src="/empty.png" alt="empty" className="w-[128px] aspect-square mt-[15%]"/>
                        <div className="mt-5 text-sm">Bạn chưa có bạn bè nào</div>
                    </div>
                )
            }
        </div>
    );
};

export default FriendList;