import React, {memo, useMemo} from "react";
import {UserDataType} from "../../Api/Api";
import {MappedUsers} from "./MappedUsers";

type FriendListType = {
    users: Array<UserDataType>
}

export const FriendList: React.FC<FriendListType> = memo( ({users}) => {

    const mappedUsers = useMemo(()=>
        users.map((user: UserDataType) => <MappedUsers key={user.id} user={user}/>),[users])

    return <div>{mappedUsers}</div>
})


