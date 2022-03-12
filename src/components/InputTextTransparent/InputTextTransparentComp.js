import React, {useEffect, useState} from "react";
import style from "./InputTextTransparent.module.css";
import {str} from "../../common/Language";
import {ActionButtonComp} from "../ActionButton/ActionButtonComp";
import {ICONS} from "../../common/Icons";

export const InputTextTransparentComp = ({   defaultText,
                                             acceptChanges = () => {},
                                             fontSize = "large",
                                             saveOnLeave = true,
                                             expressive,
                                             onChange = () => {},
                                             clearAfterAccept = false,
                                         }) => {
    const [text, setText] = useState(defaultText)

    const calcStyle = {
        fontSize: fontSize,
    }

    const onChangeHandler = (e) => {
        setText(e.target.value)
        onChange(e.target.value)
    }

    const acceptChangesHandler = () => {
        if (defaultText !== text)
            acceptChanges(text)
        if (clearAfterAccept) {
            setText("")
            onChange("")
        }
    }
    const cancelChangesHandler = () => {
        setText(defaultText)
        onChange(defaultText)
    }

    useEffect(() => {
        setText(defaultText)
    }, [defaultText])


    return <div className={style.wrapper}>
        <input style={calcStyle}
               className={style.input + (!!expressive ? " " + style.expressive : "")}
               value={text}
               onChange={onChangeHandler}
               onBlur={() => {
                   if (saveOnLeave) acceptChangesHandler()
               }}
               onKeyDown={(e) => {
                   if (e.key === 'Enter')
                       acceptChangesHandler();
                   if (e.key === 'Escape')
                       cancelChangesHandler();

               }}
        />
        {!saveOnLeave && !!text && <div className={style.buttonWrapper}>
            <ActionButtonComp icon={ICONS.check}
                              onClick={acceptChangesHandler} />
        </div>}
    </div>
}