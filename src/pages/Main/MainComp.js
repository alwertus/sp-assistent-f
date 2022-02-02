import React, {useEffect} from "react";
import style from "./MainS.module.css";

export const MainComp = props => {
    const setHeader = props['setHeader']

    useEffect(() => setHeader(""), [])

    return <div className={style.wrapper}>
        <h2>MAIN</h2>


    </div>
}