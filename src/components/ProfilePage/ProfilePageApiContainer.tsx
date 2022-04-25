import React, {useEffect, useState} from "react";
import {ProfilePage} from "./ProfilePage";
import {getAllUsersApi, getProfileApi} from "../../Api/Api";
import {connect, useDispatch} from "react-redux";

import {useParams} from "react-router-dom";


const withRouter = (WrappedComponent: any) => (props: any) => {
    let [uId, setUId] = useState<number>(2)
    const params = useParams();
    let dispatch = useDispatch()

    let refresh = () => {
        setUId(uId = params.userId ? Number(params.userId) : 2)

        getProfileApi(dispatch, uId)
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


        getAllUsersApi(this.props.dispatch)
        // getProfileApi(this.props.dispatch,2)

    }

    render() {


        return (

            <ProfilePage callBack={() => {
            }}/>
        )
    }


}

const mapStateToProps = (state: any) => (

    {state: state.profilePage})


let withRouterDataUrl = withRouter(ProfilePageApiContainer)

export default connect(mapStateToProps)(withRouterDataUrl)


