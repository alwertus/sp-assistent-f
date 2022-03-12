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

export const InputTextComp = ({   setText,
                                  text,
                                  disabled = false,
                                  type = "text",
                                  onChange = ()=>{},
                                  autoFocus = false,
                                  onKeyPress = ()=>{},
                                  varRef,
                                  onPressEnter = () => {}
}) => {
    const ref = useRef()

    useEffect(() => {
        if (!!varRef)
            varRef(ref)
    }, [varRef])

    return <input
        ref={ref}
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
        onKeyDown={(e) => {
            if (e.key === 'Enter')
                onPressEnter()
            /*if (e.key === 'Escape')
                cancelChangesHandler();*/

        }}
    />
}