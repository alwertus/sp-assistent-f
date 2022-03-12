import React, {useState} from "react";
import style from "./TempDrawS.module.css";
import {ICONS} from "../../common/Icons";

export const TempDrawComp = () => {
    const [tudom, setTudom] = useState(false)

    return <div className={style.wrapper}>
        <h4>Tudom={tudom.toString()}</h4>

        <div className={style.icon} onClick={() => setTudom(!tudom)}>{ICONS.AngleBracket}</div>
    </div>
}