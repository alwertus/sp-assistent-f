import React, {useEffect, useState} from "react";
import style from "./Main.module.css";
import {str} from "../../common/Language.js";
import {InputTextTransparentComp} from "../../components/InputTextTransparent/InputTextTransparentComp";
import {ActionButtonComp} from "../../components/ActionButton/ActionButtonComp";
import {ICONS} from "../../common/Icons";

export const MainComp = props => {
    const setHeader = props['setHeader']
    const [text, setText] = useState("")
    const [text1, setText1] = useState("123")

    useEffect(() => setHeader(""), [])

    return <div className={style.wrapper}>
        <h2>{str("News")}</h2>
        <table className={style.tbl}>
            <tbody>
                <tr><td>TEXT1</td><td>{text}</td></tr>
                <tr><td>TEXT2</td><td>{text1}</td></tr>
            </tbody>
        </table>

        <div className={style.inputWrapper}>
            <InputTextTransparentComp
                defaultText={text}
                acceptChanges={setText}
                title={"empty1"}
            />
        </div>
        <div className={style.inputWrapper}>
            <InputTextTransparentComp
                defaultText={text1}
                acceptChanges={setText1}
                title={"Пусто2"}
            />
        </div>
        <div className={style.inputWrapper}>
            <ActionButtonComp
                icon={ICONS.plus}
                tooltip={"Help me"}
            />
        </div>

        <div className={style.inputWrapper}>
            <ActionButtonComp
                icon={ICONS.check}
                tooltip={"Keke koko"}
            />
        </div>


    </div>
}