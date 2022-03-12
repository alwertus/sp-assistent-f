import React, {useEffect} from "react";
import style from "./Main.module.css";
import {TempDrawComp} from "../../delme/TempDraw/TempDrawComp";

export const MainComp = props => {
    const setHeader = props['setHeader']

    useEffect(() => setHeader(""), [])

    return <div className={style.wrapper}>
        <h2>MAIN</h2>
        <TempDrawComp/>
    </div>
}