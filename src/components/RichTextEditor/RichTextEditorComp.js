import React, {useEffect, useRef, useState} from "react";
import style from "./RichTextEditor.module.css";
import {getCaretPosition, setCaretPosition} from "../../common/CaretOperations";
import {ActionButtonComp} from "../ActionButton/ActionButtonComp";
import {controls} from "./RichTextEditorControls";
import {ICONS} from "../../common/Icons";

/**
 * EditableContent
 * example: https://codepen.io/saigowthamr/pen/OZmWqW
 * commands: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
 *
 * "range" manual https://javascript.info/selection-range
 */

export const RichTextEditorComp = ({currentPage}) => {

    const refWorkSpace = useRef(null)
    const [showCode, setShowCode] = useState(false)

    let isControlPressed = false

    const onKeyDown = (e) => {
        if (e.key === 'Control') isControlPressed = true
        if (isControlPressed && (['s', 'S', 'ы', 'Ы'].includes(e.key))) {
            e.preventDefault()
            let position = getCaretPosition(refWorkSpace.current)   // save current caret position
            currentPage.save(() => setCaretPosition(refWorkSpace.current, position))    // restore position after html reloaded from server
        }
    }

    const onKeyUp = (e) => {
        if (e.key === 'Control') isControlPressed = false
    }

    const onInnerHtmlChangeHandler = () => {
        currentPage.setTmpHtml(refWorkSpace.current.innerHTML)
    }

    useEffect(() => {
        refWorkSpace.current.innerHTML = currentPage.html
    }, [currentPage.html])

    return <div className={style.wrapper}>
        <div className={style.controlPanel}>
            {
                controls.map( group => <div key={group.groupId} className={style.buttonGroup}>
                    {
                        group.type === "exec" && group.buttons.map(e =>
                            <div key={group.groupId + e.key} className={style.button}>
                                <button onClick={() => {
                                    document.execCommand(e.command, false, e.value)
                                    onInnerHtmlChangeHandler()
                                    refWorkSpace.current.focus()
                                }}> {e.title}
                                </button>
                            </div>
                        )
                    }
                    {
                        group.type === "actionButton" && group.buttons.map(e =>
                            <div key={group.groupId + e.key} className={style.button}>
                                <ActionButtonComp
                                    icon={e.icon}
                                    onClick={() => e.onClick(refWorkSpace, onInnerHtmlChangeHandler)}
                                />
                            </div>
                        )
                    }
                </div>)
            }
            <div className={style.buttonGroup}>
                <div className={style.button}>
                    <ActionButtonComp
                        icon={ICONS.ShowCode}
                        isPressed={showCode}
                        onClick={() => {
                            if (showCode === true)
                                refWorkSpace.current.innerHTML = currentPage.tmpHtml
                            else
                                onInnerHtmlChangeHandler()
                            setShowCode(!showCode)
                        }}
                    />
                </div>
            </div>
        </div>

        <div className={[style.workSpace,
            (currentPage.needToSave ? (style.needToSave) : style.notNeedToSave),
            showCode ? style.hidden : ""
        ].join(" ")}
             contentEditable
             suppressContentEditableWarning
             onKeyDown={onKeyDown}
             onKeyUp={(e) => {
                 onKeyUp(e)
                 onInnerHtmlChangeHandler()
             }}
             ref={refWorkSpace}
        >
            <div>Default text</div>
        </div>

        <div className={[   style.workSpace,
                            (currentPage.needToSave ? (style.needToSave) : style.notNeedToSave),
                            showCode ? "" : style.hidden
                        ].join(" ")}
        >
            <textarea className={style.rawText}
                      onChange={(e) => currentPage.setTmpHtml(e.target.value)}
                      value={currentPage.tmpHtml}
                      onKeyDown={onKeyDown}
                      onKeyUp={onKeyUp}
            />
        </div>
    </div>
}