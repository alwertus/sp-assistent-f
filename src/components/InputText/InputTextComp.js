import React, {useEffect, useRef} from "react"
import style from "./InputText.module.css"

/*
    ----- vars -----
    text        - current text
    type        - number | text | password (default = text)
    autoFocus   - (default = false)

    ----- handlers -----
    setText     - setText handler
    onChange    - onChange handler
    onKeyPress  - keyPress handler
    varRef      - ref variable setter

 */

export const InputTextComp = props => {
    const setText = props['setText']
    const text = props['text']
    const disabled = !!props['disabled'] ? props['disabled'] : false
    const type = !!props['type'] ? props['type'] : "text"
    const onChange = !!props['onChange'] ? props['onChange'] : ()=>{}
    const autoFocus = !!props['autoFocus'] ? props['autoFocus'] : false
    const onKeyPress = !!props['onKeyPress'] ? props['onKeyPress'] : ()=>{}
    const varRef = useRef()

    useEffect(() => {
        if (!!props['varRef'])
            props['varRef'](varRef)
    }, [props])

    return <input
        ref={varRef}
        type={type}
        className={style.input}
        autoFocus={autoFocus}
        defaultValue={text}
        disabled={disabled}
        onChange={(e) => {
            setText(e.target.value)
            onChange(e.target.value)
        } }
        onKeyPress={(e) => onKeyPress(e)}
    />
}