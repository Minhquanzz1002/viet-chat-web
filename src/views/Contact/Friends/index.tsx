import {useAuth} from "../../../hooks/useAuth.ts";
import {UserList} from "../../../components/Icons";
import FriendItem from "./FriendItem.tsx";
import {Friend} from "../../../models/profile.ts";
import {useEffect, useState} from "react";

interface FriendsByLetter {
    [letter: string]: Friend[];
}

const FriendList = () => {
    const {friends} = useAuth();
    const [friendsByLetter, setFriendsByLetter] = useState<FriendsByLetter>({});

    useEffect(() => {
        if (friends) {
            const sortedFriends = friends.sort((a, b) => {
                if (a.profile.firstName.charAt(0) < b.profile.firstName.charAt(0)) return -1;
                if (a.profile.firstName.charAt(0) > b.profile.firstName.charAt(0)) return 1;
                return 0;
            });
            const letters: FriendsByLetter = {};
            sortedFriends.forEach((friend) => {
                const firstLetter = friend.profile.firstName.charAt(0).toUpperCase();
                if (!letters[firstLetter]) {
                    letters[firstLetter] = [];
                }
                letters[firstLetter].push(friend);
            });
            setFriendsByLetter(letters);
        }
    }, [friends]);

    return (
        <div className="h-screen flex-1 flex flex-col">
            <div className="flex flex-row items-center gap-x-2 px-4 h-16 bg-white border-b">
                <UserList/>
                <h2 className="font-semibold">Danh sách bạn bè</h2>
            </div>
            {
                friends && friends.length > 0 ? (
                    <div className='bg-neutral-100 p-4 w-full overflow-auto flex-1'>
                        <div className='font-medium pb-4'>{`Bạn bè (${friends.length})`}</div>
                        <div className='bg-white h-fit rounded py-4'>
                            {
                                Object.entries(friendsByLetter).map(([letter, friendsArray]) => (
                                    <div key={letter}>
                                        <div className="px-4 my-3 font-semibold">{letter}</div>
                                        {
                                            friendsArray.map((friend: Friend, index: number) => (
                                                <FriendItem friend={friend} showDivider={index !== friendsArray.length - 1} key={index}/>
                                            ))
                                        }
                                    </div>
                                ))
                            }
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