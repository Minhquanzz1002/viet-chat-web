import {UserGroup} from "../../../components/Icons";
import {useAuth} from "../../../hooks/useAuth.ts";
import {useEffect, useState} from "react";
import {GroupDTO} from "../../../models/group.ts";
import GroupItem from "./GroupItem.tsx";

interface GroupsByLetter {
    [letter: string]: GroupDTO[];
}

const GroupList = () => {
    const {groups} = useAuth();

    const [groupsByLetter, setGroupsByLetter] = useState<GroupsByLetter>({});

    useEffect(() => {
        if (groups) {
            const sortedFriends = groups.sort((a, b) => {
                if (a.name.charAt(0) < b.name.charAt(0)) return -1;
                if (a.name.charAt(0) > b.name.charAt(0)) return 1;
                return 0;
            });
            const letters: GroupsByLetter = {};
            sortedFriends.forEach((friend) => {
                const firstLetter = friend.name.charAt(0).toUpperCase();
                if (!letters[firstLetter]) {
                    letters[firstLetter] = [];
                }
                letters[firstLetter].push(friend);
            });
            setGroupsByLetter(letters);
        }
    }, [groups]);

    return (
        <div className="h-screen flex-1 flex flex-col relative">
            <div className="flex flex-row items-center gap-x-2 px-4 h-16 bg-white border-b">
                <UserGroup/>
                <h2 className="font-semibold">Danh sách nhóm</h2>
            </div>
            {
                groups && groups.length > 0 ? (
                    <div className='bg-neutral-100 p-4 w-full overflow-auto flex-1'>
                        <div className='font-medium pb-4'>{`Bạn bè (${groups.length})`}</div>
                        <div className='bg-white h-fit rounded py-4'>
                            {
                                Object.entries(groupsByLetter).map(([letter, groupsArray]) => (
                                    <div key={letter}>
                                        <div className="px-4 my-3 font-semibold">{letter}</div>
                                        {
                                            groupsArray.map((group: GroupDTO, index: number) => (
                                                <GroupItem group={group} showDivider={index !== groupsArray.length - 1} key={index} />
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
                        <div className="mt-5 text-sm">Bạn tham gia bất kì nhóm nào</div>
                    </div>
                )
            }
        </div>
    );
};

export default GroupList;