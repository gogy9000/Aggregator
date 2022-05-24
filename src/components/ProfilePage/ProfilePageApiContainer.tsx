import React, {useEffect, useState} from "react";
import {ProfilePage} from "./ProfilePage";

import {connect, useDispatch} from "react-redux";

import {useParams} from "react-router-dom";
import {actions} from "../../Redux/ProfilePage/ProfilePageReducer";
import {actionsApp} from "../../Redux/AppReducer/AppReducer";
import {profileApi} from "../../Api/Api";


const withRouter = (WrappedComponent: any) => (props: any) => {
    let [uId, setUId] = useState<number>(2)
    const params = useParams();
    let dispatch = useDispatch()

    let refresh = () => {
        dispatch(actionsApp.toggleIsFetching(true))
        setUId(uId = params.userId ? Number(params.userId) : 2)

        profileApi.getProfileApi(uId).then((data: any) => {
            dispatch(actions.getProfileAC(data))
            dispatch(actionsApp.toggleIsFetching(false))
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


export class ProfilePageApiContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }


    componentDidMount() {


        // getAllUsersApi(this.props.dispatch)

        // getProfileApi(this.props.dispatch,2)

    }

    render() {


        return (

            <ProfilePage />
        )
    }


}

const mapStateToProps = (state: any) => (

    {state: state.profilePage})


let withRouterDataUrl = withRouter(ProfilePageApiContainer)

export default connect(mapStateToProps)(withRouterDataUrl)


