import React, {useEffect, useState} from "react";
import style from "./InputTextTransparent.module.css";
import {ActionButtonComp} from "../ActionButton/ActionButtonComp";
import {ICONS} from "../../common/Icons";
import {str} from "../../common/Language";

export const InputTextTransparentComp = ({   defaultText,
                                             acceptChanges = () => {},
                                             cancelChanges = () => {},
                                             autoFocus = false,
                                             onChange = () => {},
                                             fontSize = "large",
                                             hideOkBtn = true,
                                             expressive,
                                             clearAfterAccept = false,
                                             title = "",
                                             className = "",
                                         }) => {

    const expensiveStyle = !!expressive ? " " + style.expressive : ""
    const [text, setText] = useState(defaultText)
    const [placeholderRaise, setPlaceholderRaise] = useState(defaultText !== "")

    const calcStyle = {
        fontSize: fontSize,
    }

    const changeText = (newVal) => {
        setText(newVal)
        onChange(newVal)
        setPlaceholderRaise(newVal !== "")
    }

    const acceptChangesHandler = () => {
        if (defaultText !== text)
            acceptChanges(text)

        if (clearAfterAccept)
            changeText("")
    }
    const cancelChangesHandler = () => {
        changeText(defaultText)
        cancelChanges()
    }

    useEffect(() => {
        changeText(defaultText)
    }, [defaultText])


    return <div className={style.wrapper + " " + className}>
        <input style={calcStyle}
               autoFocus={autoFocus}
               className={style.input + expensiveStyle}
               value={text}
               onChange={(e) => changeText(e.target.value)}
               onBlur={() => {
                   if (hideOkBtn) acceptChangesHandler()
               }}
               onKeyDown={(e) => {
                   if (e.key === 'Enter')
                       acceptChangesHandler();
                   if (e.key === 'Escape')
                       cancelChangesHandler();

               }}
        />
        <div className={style.title + expensiveStyle + " " + (placeholderRaise ? style.titleRaise : style.titleNormal)}>
            {title}
        </div>

        {!hideOkBtn && !!text && <div className={style.buttonWrapper}>
            <ActionButtonComp icon={ICONS.check}
                              onClick={acceptChangesHandler}
                              tooltip={str("Ok")}
            />
        </div>}
    </div>
}