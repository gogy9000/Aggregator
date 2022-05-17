import {ActionsType,  stateProfilePageType} from "../../Redux/ProfilePage/ProfilePageReducer";
import React from "react";
import {getAllUsersApi} from "../../Api/Api";
import {CustomButtonByPaginator} from "./CustomButtonByPaginator";
import {ActionsAppType} from "../../Redux/App/AppReducer";


type PaginatorApiContainerType = {
    state: stateProfilePageType
    dispatch: (actions: ActionsType|ActionsAppType) => void
    clickPageCallBack?: (setPageNumber: number) => void
}
//это паджинатор...

const PaginatorApiContainer: React.FC<PaginatorApiContainerType> = (props) => {
    // это для удобства
    let currentPage = props.state.currentPage

// здесь происходит вся логика. clickPage слушает кнопку паджинатора и в соответсвии с тем значением, что
// выдает кнопа, отправляет откорректированый запрос на сервер посредством функции getUsersApi.
// усли в clickPage не совпадает не один из action, getUsersApi по дефолту будет отпралять запрос на
// первую страницу


    const clickPage = (action: string) => {
        action === 'next' ? getAllUsersApi(props.dispatch, props.state.currentPage + 1) :
            action === 'forward' ? getAllUsersApi(props.dispatch, props.state.currentPage + 3) :
                action === 'backForward' ? getAllUsersApi(props.dispatch, props.state.currentPage - 3) :
                    action === 'back' ? getAllUsersApi(props.dispatch, props.state.currentPage - 1) :
                        action === 'nextUp3Page' ? getAllUsersApi(props.dispatch, props.state.currentPage + 2) :
                            getAllUsersApi(props.dispatch, props.state.currentPage)
    }

    //в return два блока кнопок, первый блок рисуется только при стартовом значении паджинатора.
    //для работы кнопок нужен колбек который будет вызывать кнопка при нажатии,-
    //  значение action на которое будет срабатывать логика clickPage
    // и название кнопки. визуальные эфекты прописаны в самой кнопке

    return (

        <Paginator clickPageCallBack={clickPage}
                   currentPage={currentPage}/>

    )

}
export default PaginatorApiContainer

type PaginatorPropsType = {

    currentPage: number
    clickPageCallBack: (action: string) => void
}

const Paginator: React.FC<PaginatorPropsType> = ({clickPageCallBack, currentPage}) => {

    return (
        <div>
            {/*этот блок кнопок отображается только когда currentPage меньше или*/}
            {/* равно единицы(стартовая позиция паджинатора)*/}

            {currentPage <= 1 &&
                <div>
                    <CustomButtonByPaginator callBack={clickPageCallBack} action={'nothingToDo'}
                                             buttonName={currentPage}/>
                    <CustomButtonByPaginator callBack={clickPageCallBack} action={'next'}
                                             buttonName={currentPage + 1}/>
                    <CustomButtonByPaginator callBack={clickPageCallBack} action={'nextUp3Page'}
                                             buttonName={currentPage + 2}/>
                    <CustomButtonByPaginator callBack={clickPageCallBack} action={'forward'}
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
                    <CustomButtonByPaginator callBack={clickPageCallBack} action={'next'}
                                             buttonName={currentPage + 1}/>
                    <CustomButtonByPaginator callBack={clickPageCallBack} action={'forward'} buttonName={'>'}/>
                </div>
            }
        </div>
    )

}
