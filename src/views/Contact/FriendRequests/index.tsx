import {useAuth} from "../../../hooks/useAuth.ts";
import {UserPlus} from "../../../components/Icons";
import {Friend} from "../../../models/profile.ts";
import RequestItem from "./RequestItem.tsx";
import SentRequestItem from "./SentRequestItem.tsx";

const FriendRequest = () => {
    const {requests, sentRequests} = useAuth();
    return (
        <div className="h-screen flex-1 flex flex-col">
            <div className="flex flex-row items-center gap-x-2 px-4 h-16 bg-white border-b">
                <UserPlus/>
                <h2 className="font-semibold">Lời mời kết bạn</h2>
            </div>
            <div className='bg-neutral-100 p-4 w-full overflow-auto flex-1'>
                <div className='font-medium'>{`Lời mời đã nhận (${requests?.length})`}</div>
                <div className='h-fit rounded py-4'>
                    {
                        (!requests || requests.length === 0) ? (
                            <div className="px-4 bg-white py-4 rounded">Bạn ko có lời mời nào</div>
                        ) : (
                            <div className="grid grid-cols-3 gap-3">
                                {
                                    requests.map((request: Friend, index: number) => (
                                        <RequestItem request={request} key={"request-" + index}/>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

                <div className='font-medium'>{`Lời mời đã gửi (${sentRequests?.length})`}</div>
                <div className='h-fit rounded py-4'>
                    {
                        (!sentRequests || sentRequests.length === 0) ? (
                            <div className="px-4 bg-white py-4 rounded">Bạn ko có lời mời nào</div>
                        ) : (
                            <div className="grid grid-cols-3 gap-3">
                                {
                                    sentRequests.map((request: Friend, index: number) => (
                                        <SentRequestItem request={request} key={"request-" + index}/>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default FriendRequest;