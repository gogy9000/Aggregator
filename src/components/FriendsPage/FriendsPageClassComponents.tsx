import React from "react";
import {connect} from "react-redux";
import {getAllUsersApi, getProfileApi} from "../../Api/Api";
import {FriendsPage} from "./FriendsPage";




class FriendsPageClassComponents extends React.Component<any, any> {

    constructor(props: any) {
        super(props);


    }

    getUsersCallBack = (userName: string, isFollow:string) => {
        getAllUsersApi(this.props.dispatch, 1, userName,isFollow)

    }

    // getFollowUsers=(isFollow:string)=>{
    //     getAllUsersApi(this.props.dispatch, 1, '',isFollow)
    // }


    componentDidMount() {


        getAllUsersApi(this.props.dispatch,)
        // getProfileApi(this.props.dispatch,this.props.match.params)
        console.log(this.props)
    }

    render() {

        return (
            <FriendsPage state={this.props.state}
                         dispatch={this.props.dispatch}
                         getUsersCallBack={this.getUsersCallBack}
                         // getFollowUsers={this.getFollowUsers}
            />
        )
    }

}

const mapStateToProps = (state: any) => (

    {state: state.profilePage})



export default connect(mapStateToProps)(FriendsPageClassComponents)



