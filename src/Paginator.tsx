import {getUsersACType, stateProfilePageType} from "./Redux/ProfilePage/ProfilePageReducer";
import React from "react";
import {getUsersApi} from "./Api/Api";
import {CustomButtonByPaginator} from "./CustomButtonByPaginator";


type PaginatorType = {
    state: stateProfilePageType
    dispatch: (getUsersAC: getUsersACType) => void
}
//это паджинатор...

export const Paginator: React.FC<PaginatorType> = (props) => {
    // это для удобства
    let currentPage = props.state.currentPage

// здесь происходит вся логика. clickPage слушает кнопку паджинатора и в соответсвии с тем значением, что
// выдает кнопа, отправляет откорректированый запрос на сервер посредством функции getUsersApi.
// усли в clickPage не совпадает не один из action, getUsersApi по дефолту будет отпралять запрос на
// первую страницу

    const clickPage = (action: string) => {
        action === 'next' ? getUsersApi(props.dispatch, props.state.currentPage + 1) :
            action === 'forward' ? getUsersApi(props.dispatch, props.state.currentPage + 3) :
                action === 'backForward' ? getUsersApi(props.dispatch, props.state.currentPage - 3) :
                    action === 'back' ? getUsersApi(props.dispatch, props.state.currentPage - 1) :
                        action === 'nextUp3Page' ? getUsersApi(props.dispatch, props.state.currentPage + 2) :
                            getUsersApi(props.dispatch, props.state.currentPage)
    }

    //в return два блока кнопок, первый блок рисуется только при стартовом значении паджинатора.
    //для работы кнопок нужен колбек который будет вызывать кнопка при нажатии,
    //  значение action на которое будет срабатывать логика clickPage
    // и название кнопки. визуальные эфекты прописаны в самой кнопке

    return (
        <div>
            {/*этот блок кнопок отображается только когда currentPage меньше или*/}
            {/* равно единицы(стартовая позиция паджинатора)*/}

            {currentPage <= 1 &&
                <div>
                    <CustomButtonByPaginator callBack={clickPage} action={'nothingToDo'}
                                             buttonName={currentPage}/>
                    <CustomButtonByPaginator callBack={clickPage} action={'next'}
                                             buttonName={currentPage + 1}/>
                    <CustomButtonByPaginator callBack={clickPage} action={'nextUp3Page'}
                                             buttonName={currentPage + 2}/>
                    <CustomButtonByPaginator callBack={clickPage} action={'forward'}
                                             buttonName={'>'}/>
                </div>
            }

            {/*этот блок кнопок отображается только когда currentPage больше единицы*/}

            {currentPage > 1 &&
                <div>
                    <CustomButtonByPaginator callBack={clickPage} action={'backForward'} buttonName={'<'}/>
                    <CustomButtonByPaginator callBack={clickPage} action={'back'}
                                             buttonName={currentPage - 1}/>
                    <CustomButtonByPaginator callBack={clickPage} action={'nothingToDo'}
                                             buttonName={currentPage}/>
                    <CustomButtonByPaginator callBack={clickPage} action={'next'}
                                             buttonName={currentPage + 1}/>
                    <CustomButtonByPaginator callBack={clickPage} action={'forward'} buttonName={'>'}/>
                </div>
            }
        </div>
    )

}

