import {stateProfilePageType} from "./Redux/ProfilePage/ProfilePageReducer";
import React, {useState} from "react";
import s from './Paaginator.module.css'
import {log} from "util";

type PaginatorType = {
    state: stateProfilePageType
    callBack: (action: string) => void
}
export const Paginator: React.FC<PaginatorType> = (props) => {
    let [onMouse, setOnMouse] = useState(false)
    let currentPage = props.state.currentPage

    const clickPage = (action: string) => {
        props.callBack(action)
    }
    debugger
    const onMouseHandler = () =>

        onMouse ? setOnMouse(false) : setOnMouse(true)

    //короче надо доделать динапику кнопок паджинатора(сделать кастомную кнопку и за мапить ее чтобы не
    //мучаться

    return (
        <div>
            <span onMouseEnter={onMouseHandler}
                  onMouseLeave={onMouseHandler}
                  className={onMouse ? s.mouseEnter : s.mouseLeave}>{'<'}</span>

            {currentPage > 1 &&
                <span onClick={() => clickPage("back")}
                      onMouseEnter={onMouseHandler}
                      onMouseLeave={onMouseHandler}
                      className={onMouse ? s.mouseEnter : s.mouseLeave}>{currentPage - 1}</span>}

            <span onMouseEnter={onMouseHandler}
                  onMouseLeave={onMouseHandler}
                  className={onMouse ? s.mouseEnter : s.mouseLeave}>{currentPage}</span>

            <span onClick={() => clickPage("next")}
                  onMouseEnter={onMouseHandler}
                  onMouseLeave={onMouseHandler}
                  className={onMouse ? s.mouseEnter : s.mouseLeave}>{currentPage + 1}</span>

            <span onMouseEnter={onMouseHandler}
                  onMouseLeave={onMouseHandler}
                  className={onMouse ? s.mouseEnter : s.mouseLeave}>{'>'}</span>
        </div>
    )

}