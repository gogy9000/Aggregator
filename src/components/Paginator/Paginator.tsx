import {actions, ActionsType, stateProfilePageType, UserObjectType} from "../../Redux/ProfilePage/ProfilePageReducer";
import React from "react";

import {CustomButtonByPaginator} from "./CustomButtonByPaginator";
import {ActionsAppType} from "../../Redux/AppReducer/AppReducer";
import {userApi} from "../../Api/Api";


type PaginatorApiContainerType = {
    state: stateProfilePageType
    dispatch: (actions: ActionsType | ActionsAppType) => void
    clickPageCallBack: (PageNumber: number) => void
    isFollowers: string
    userName: string
    page: number
    count: number
}
//это паджинатор...

const PaginatorApiContainer: React.FC<PaginatorApiContainerType> = ({count, page, clickPageCallBack, state}) => {

    const {currentPage, users} = state

    const clickPage = (action: string) => {
        const clicker = (num: number) => {
            clickPageCallBack(page + num)

        }
        switch (action) {
            case 'next':
                clicker(1)
                break
            case 'forward':
                clicker(3)
                break
            case 'backForward':
                clicker(-3)
                break
            case 'back':
                clicker(-1)
                break
            case 'nextUp3Page':
                clicker(2)
                break
            default :
                clicker(0)
        }

    }


    return (

        <Paginator clickPageCallBack={clickPage}
                   currentPage={currentPage}
                   users={users}
                   count={count}/>

    )

}
export default PaginatorApiContainer

type PaginatorPropsType = {

    currentPage: number
    clickPageCallBack: (action: string) => void
    users: Array<UserObjectType>
    count: number
}

const Paginator: React.FC<PaginatorPropsType> = ({clickPageCallBack, currentPage, users, count}) => {
    console.log(users.length)
    console.log(count)

    return (
        <div>
            {/*этот блок кнопок отображается только когда currentPage меньше или*/}
            {/* равно единицы(стартовая позиция паджинатора)*/}

            {currentPage <= 1 &&
                <div>
                    <CustomButtonByPaginator callBack={clickPageCallBack} action={'nothingToDo'}
                                             buttonName={currentPage}/>
                    <CustomButtonByPaginator callBack={clickPageCallBack} disabled={users.length < count}
                                             action={'next'}
                                             buttonName={currentPage + 1}/>
                    <CustomButtonByPaginator callBack={clickPageCallBack} disabled={users.length < count}
                                             action={'nextUp3Page'}
                                             buttonName={currentPage + 2}/>
                    <CustomButtonByPaginator callBack={clickPageCallBack} disabled={users.length < count}
                                             action={'forward'}
                                             buttonName={'>'}/>
                </div>
            }

            {/*этот блок кнопок отображается только когда currentPage больше единицы*/}

            {currentPage > 1 &&
                <div>
                    <CustomButtonByPaginator callBack={clickPageCallBack} action={'backForward'} buttonName={'<'}/>
                    <CustomButtonByPaginator callBack={clickPageCallBack} action={'back'}
                                             buttonName={currentPage - 1}/>
                    <CustomButtonByPaginator callBack={clickPageCallBack} action={'nothingToDo'}
                                             buttonName={currentPage}/>
                    <CustomButtonByPaginator callBack={clickPageCallBack} disabled={users.length < count}
                                             action={'next'}
                                             buttonName={currentPage + 1}/>
                    <CustomButtonByPaginator callBack={clickPageCallBack} disabled={users.length < count}
                                             action={'forward'} buttonName={'>'}/>
                </div>
            }
        </div>
    )

}
