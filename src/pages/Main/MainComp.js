import React, {useEffect} from "react";
import style from "./Main.module.css";
import {str} from "../../common/Language.js";


export const MainComp = props => {
    const setHeader = props['setHeader']

    useEffect(() => setHeader(""), [])

    return <div className={style.wrapper}>
        <h2>{str("News")}</h2>
    </div>
}