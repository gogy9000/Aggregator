import React, {useState} from "react";
import s from "./Paginator.module.css";

type CustomButtonByPaginatorType = {
    callBack: (action: string) => void
    action: string
    buttonName: string | number
    disabled?: boolean
}

// это кнопка для паджинатора, но в принципе может быть использована и в других блоках кода 
export const CustomButtonByPaginator: React.FC<CustomButtonByPaginatorType> = ({
                                                                                   disabled,
                                                                                   callBack,
                                                                                   action,
                                                                                   buttonName
                                                                               }) => {

    //здесь хранится значение на коеорое реагируют стили кнопки
    let [onMouse, setOnMouse] = useState(false)

    // это функция реагирует на клик и вызывает колбек со значением action в качестве аргумена
    const onClickPage = (action: string) => {
        callBack(action)
    }
    // это слушальщики поведения мыши они переключают значение в хуке на который
    // реагируют стили отрисовки кнопки
    const onMouseEnterHandler = () => setOnMouse(true)
    const onMouseLeaveHandler = () => setOnMouse(false)

    return (

        <button onClick={() => onClickPage(action)}
                disabled={disabled}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
            // если onMouse false то один стиль, если onMouse true то другой стиль)))
                className={onMouse ? s.mouseEnter : s.mouseLeave}>{buttonName}</button>

    )
}