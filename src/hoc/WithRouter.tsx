import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {actionsApp} from "../Redux/AppReducer/AppReducer";
import {APIProfile} from "../Api/Api";
import {actionsProfile, thunkProfile} from "../Redux/ProfilePage/ProfilePageReducer";

export const withRouter = (WrappedComponent: any) => (props: any) => {
    let [uId, setUId] = useState<number>(2)
    const params = useParams();
    let dispatch = useDispatch()

    let refresh = () => {
        dispatch(actionsApp.toggleIsFetching(true))
        setUId(uId = params.userId ? Number(params.userId) : 2)

        APIProfile.getProfile(uId).then((data: any) => {
            dispatch(actionsProfile.getProfile(data))
            dispatch(actionsApp.toggleIsFetching(false))
            console.log(data)
        })
    }


    useEffect(() => {
        refresh()
    }, [params])

    // etc... other react-router-dom v6 hooks
    return (
        <WrappedComponent
            {...props}
            params={uId}
            // etc...
        />
    );
};