import React from "react";

import { useSelector} from "react-redux";
import {FriendsPage} from "./FriendsPage";
import {AppStateType} from "../../Redux/Redux-store";
import {Redirect} from "../../hoc/Redirect";
import {compose} from "redux";


export const FriendsPageFunctionalComponent = compose(Redirect, React.memo) (() => {

        const state = useSelector((state: AppStateType) => state.profilePage)
        const initState = useSelector((state: AppStateType) => state.AppReducer)


        return (
            <>{initState.isFetching ?
                <div>load!!!</div>
                : <FriendsPage state={state}/>}
            </>
        )


    }
)


