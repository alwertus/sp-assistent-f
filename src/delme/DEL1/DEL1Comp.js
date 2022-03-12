import React from "react";
import style from "./DEL1Styl.module.css";

export const НазваниеНовойКомпоненты = (props) => {
    const МойТекст = props.МойТекст

    return <div className={style.wrapper}>
        Какой-то текст
    </div>
}