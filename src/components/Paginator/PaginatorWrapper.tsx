import { stateProfilePageType, UserObjectType} from "../../Redux/ProfilePage/ProfilePageReducer";
import React, {memo, useReducer} from "react";

import {CustomButtonByPaginator} from "./CustomButtonByPaginator";
import {UserDataType, UsersDataType} from "../../Api/Api";



type PaginatorApiContainerType = {

    users:UserDataType[]
    currentPage:number
    clickPageCallBack: (PageNumber: number) => void
    page: number
    count: number
}
//это паджинатор...

export const PaginatorWrapper: React.FC<PaginatorApiContainerType> = memo(  (props) => {
const {count, page, clickPageCallBack,currentPage,users}=props




    const clickPage = (action: string) => {

        const clicker = (num: number) => {
            let sum=page + num
            if(sum<1){sum=1}
            clickPageCallBack(sum)

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

})


type PaginatorPropsType = {

    currentPage: number
    clickPageCallBack: (action: string) => void
    users: Array<UserDataType>
    count: number
}

const Paginator: React.FC<PaginatorPropsType> = memo( ({clickPageCallBack, currentPage, users, count}) => {

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

})
