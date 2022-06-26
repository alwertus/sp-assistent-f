import React, {useEffect, useRef, useState} from "react";
import style from "./InputTextTransparent.module.css";
import {ActionButtonComp} from "../ActionButton/ActionButtonComp";
import {ICONS} from "../../common/Icons";
import {str} from "../../common/Language";

export const InputTextTransparentComp = ({   id = "",
                                             type = "text",
                                             defaultText = "",
                                             acceptChanges = () => {},
                                             cancelChanges = () => {},
                                             autoFocus = false,
                                             onChange = () => {},
                                             onKeyPress = () => {},
                                             varRef,
                                             fontSize = "large",
                                             hideOkBtn = true,
                                             expressive,
                                             clearAfterAccept = false,
                                             title = "",
                                             className = "",
                                         }) => {

    const expensiveStyle = !!expressive ? " " + style.expressive : ""
    const [text, setText] = useState(defaultText)
    const [focus, setFocus] = useState(false)
    const [placeholderStyle, setPlaceholderStyle] = useState("")
    const ref = useRef()

    const calcStyle = {
        fontSize: fontSize,
    }

    const changeText = (newVal) => {
        setText(newVal)
        onChange(newVal)
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
        if (!!varRef)
            varRef(ref)
    }, [varRef])

    useEffect(() => {
        changeText(defaultText)
    }, [defaultText])

    // calc placeholder style
    useEffect(() => {
        setPlaceholderStyle(style.title + expensiveStyle + " " + ((text !== "" || focus) ? style.titleRaise : style.titleNormal))
    }, [text, focus])


    return <div className={style.wrapper + " " + className}>
        <input style={calcStyle}
               type={type}
               id={id}
               ref={ref}
               autoFocus={autoFocus}
               className={style.input + expensiveStyle}
               onFocus={() => setFocus(true)}
               value={text}
               onChange={(e) => changeText(e.target.value)}
               onBlur={() => {
                   setFocus(false)
                   if (hideOkBtn) acceptChangesHandler()
               }}
               onKeyDown={(e) => {
                   if (e.key === 'Enter')
                       acceptChangesHandler();
                   if (e.key === 'Escape')
                       cancelChangesHandler();
               }}
               onKeyPress={onKeyPress}
        />

        <div className={placeholderStyle}>
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