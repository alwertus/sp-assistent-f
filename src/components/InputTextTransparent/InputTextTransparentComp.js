import React, {useEffect, useState} from "react";
import style from "./InputTextTransparent.module.css";
import {ActionButtonComp} from "../ActionButton/ActionButtonComp";
import {ICONS} from "../../common/Icons";

export const InputTextTransparentComp = ({   defaultText,
                                             acceptChanges = () => {},
                                             fontSize = "large",
                                             saveOnLeave = true,
                                             expressive,
                                             onChange = () => {},
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

    useEffect(() => {
        changeText(defaultText)
    }, [defaultText])


    return <div className={style.wrapper + " " + className}>
        <input style={calcStyle}
               className={style.input + expensiveStyle}
               value={text}
               onChange={(e) => changeText(e.target.value)}
               onBlur={() => {
                   if (saveOnLeave) acceptChangesHandler()
               }}
               onKeyDown={(e) => {
                   if (e.key === 'Enter')
                       acceptChangesHandler();
                   if (e.key === 'Escape')
                       changeText(defaultText);

               }}
        />
        <div className={style.title + expensiveStyle + " " + (placeholderRaise ? style.titleRaise : style.titleNormal)}>
            {title}
        </div>

        {!saveOnLeave && !!text && <div className={style.buttonWrapper}>
            <ActionButtonComp icon={ICONS.check}
                              onClick={acceptChangesHandler} />
        </div>}
    </div>
}