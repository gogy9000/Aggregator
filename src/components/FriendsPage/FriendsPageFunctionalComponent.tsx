import React from "react";

import {useDispatch, useSelector} from "react-redux";
import {FriendsPage} from "./FriendsPage";
import {getUserTC} from "../../Redux/ProfilePage/ProfilePageReducer";
import {AppStateType} from "../../Redux/Redux-store";
import {Redirect} from "../../hoc/Redirect";
import {compose} from "redux";


export const FriendsPageFunctionalComponent = compose(Redirect, React.memo) (() => {

        const state = useSelector((state: AppStateType) => state.profilePage)
        const initState = useSelector((state: AppStateType) => state.AppReducer)


        // const getUsersCallBack = (page: number, userName: string, isFollow: string, count: number) => {
        //     dispatch(getUserTC(page, userName, isFollow, count))
        // }


        return (
            <>{initState.isFetching ?
                <div>load!!!</div>
                : <FriendsPage state={state}/>}
            </>
        )


    }
)


