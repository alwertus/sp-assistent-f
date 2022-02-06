import React from "react";
import style from "./MenuPages.module.css";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import {useNavigate} from "react-router";

export const MenuPagesComp = ({pages, location, refreshPage}) => {
    const navigate = useNavigate()

    return <div className={style.wrapper}>
        {pages.map(el => <ActionButtonComp
            key={el['id']}
            text={el['title']}
            onClick={() => {
                navigate("/" + location + "/" + el['id'])
                refreshPage()
            }}
        />)}
    </div>
}