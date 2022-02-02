import React from "react";
import style from "./MenuPages.module.css";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";

export const MenuPagesComp = props => {
    const pages = props['pages']

    return <div className={style.wrapper}>
        {pages.map(el => <ActionButtonComp
            key={el['id']}
            text={el['title']}
            onClick={() => console.log('Click on ' + el['title'])}
        />)}
    </div>
}