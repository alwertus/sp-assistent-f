import React, {useEffect, useState} from "react";
import style from "./AccountConfirm.module.css";
import {useParams} from "react-router-dom";
import {ICONS} from "../../common/Icons";
import {confirmEmail} from "./AccountConfirmActions";
import {str} from "../../common/Language";

export const AccountConfirmComp = () => {
    const {secret} = useParams()
    const [step, setStep] = useState("waiting")

    const draw = {
        waiting: <div className={style.centerContainer}>
            <div className={style.line}>Please, wait</div>
            <div className={style.line}>
                <div className={style.loading}>{ICONS.loading}</div>
            </div>
        </div>,
        error: <div className={style.error}>{str("Error")}</div>,
        success: <div className={style.success}>{str("Success")}</div>,
    }

    useEffect(() => secret && confirmEmail(secret, setStep), [secret])

    return <div className={style.wrapper}>
        {draw[step]}
    </div>
}