import React from "react";
import style from "./DEL1Styl.module.css";
import {sendTestMessage} from "./DEL1Actions";

export const DEL1Comp = props => {

    const successHandler = () => {
        console.log("zzz")
    }

    return <div className={style.wrapper}>
        <button onClick={()=>sendTestMessage(successHandler)}>Send Login</button>
    </div>
}