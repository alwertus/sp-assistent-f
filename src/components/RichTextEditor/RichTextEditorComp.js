import React, {useEffect, useRef, useState} from "react";
import style from "./RichTextEditor.module.css";
import {getCaretPosition, getTableUnderCaret, setCaretPosition} from "../../common/CaretOperations";
import {ActionButtonComp} from "../ActionButton/ActionButtonComp";
import {controls, createTableColumn, createTableRow} from "./RichTextEditorControls";
import {ICONS} from "../../common/Icons";
import {str} from "../../common/Language";

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
    const [showTablePopup, setShowTablePopup] = useState(false)

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

    const onBtnClick = {
        insertTable: () => {
            document.execCommand('insertHTML', false, '<table><tr><td><br></td></tr></table>')
            onInnerHtmlChangeHandler()
            refWorkSpace.current.focus()
        },
        insertLeft: () => {
            createTableColumn(refWorkSpace, onInnerHtmlChangeHandler, "before")
        },
        insertRight: () => {
            createTableColumn(refWorkSpace, onInnerHtmlChangeHandler, "after")
        },
        insertUp: () => {
            createTableRow(refWorkSpace, onInnerHtmlChangeHandler, "before")
        },
        insertDown: () => {
            createTableRow(refWorkSpace, onInnerHtmlChangeHandler, "after")
        },
        deleteRow: () => {
            let tbl = getTableUnderCaret()
            if (!tbl) return

            if (tbl.rowsArray.length === 1)
                tbl.table.remove()
            else
                tbl.table.deleteRow(tbl.currentRowIndex)

            onInnerHtmlChangeHandler()
        },
        deleteColumn: () => {
            let tbl = getTableUnderCaret()
            if (!tbl) return

            // find cell position in row
            let cellRowPosition = tbl.currentColIndex

            if (tbl.columnCount > 1) {
                for (let i = tbl.rowsArray.length - 1; i >= 0; i--)
                    tbl.rowsArray[i].deleteCell(cellRowPosition)
            } else {
                tbl.table.remove()
            }

            onInnerHtmlChangeHandler()
        },
        insertCodeBlock: () => {
            let selection = window.getSelection().anchorNode
            if (selection.nodeName === "#text")
                selection = selection.parentNode

            if (['TD', 'DIV'].includes(selection.nodeName)) {

                let position = getCaretPosition(refWorkSpace.current)

                let code = document.createElement("code")
                code.textContent = ""

                // remove empty <br>
                if (selection.childNodes.length === 1) {
                    selection.childNodes.forEach(e => {
                        if (e.nodeName === "BR")
                            e.remove()
                    })
                }

                selection.appendChild(code)

                setCaretPosition(refWorkSpace.current, position)
                onInnerHtmlChangeHandler()
            }

        }
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
                                <ActionButtonComp
                                    onClick={() => {
                                        document.execCommand(e.command, false, e.value)
                                        onInnerHtmlChangeHandler()
                                        refWorkSpace.current.focus()
                                    }}
                                    icon={e.title}
                                    tooltip={e.tooltip}
                                />
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

            {/* TABLE ACTIONS */}
            <div className={style.buttonGroup}
                 onMouseEnter={() => setShowTablePopup(true)}>
                <ActionButtonComp
                    icon={ICONS.table}
                />
                <div className={style.tablePopupWrapper}>
                    {
                        showTablePopup && <div className={style.tablePopup}
                                               onMouseLeave={(e) => {
                                                   if (['TABLE', 'TD'].includes(e.target['nodeName']))
                                                       setShowTablePopup(false)
                                               }}
                        >
                            <table>
                                <tbody>
                                <tr>
                                    <td/>
                                    <td><ActionButtonComp
                                        icon={ICONS.tableColumnInsertUp}
                                        onClick={onBtnClick.insertUp}
                                        tooltip={str("Insert line above")}
                                    /></td>
                                    <td><ActionButtonComp
                                        icon={ICONS.tableDeleteColumn}
                                        onClick={onBtnClick.deleteColumn}
                                        tooltip={str("Delete column")}
                                    /></td>
                                </tr>
                                <tr>
                                    <td><ActionButtonComp
                                        icon={ICONS.tableColumnInsertLeft}
                                        onClick={onBtnClick.insertLeft}
                                        tooltip={str("Insert column left")}
                                    /></td>
                                    <td><ActionButtonComp
                                        icon={ICONS.table}
                                        onClick={onBtnClick.insertTable}
                                        tooltip={str("Insert table")}
                                    /></td>
                                    <td><ActionButtonComp
                                        icon={ICONS.tableColumnInsertRight}
                                        onClick={onBtnClick.insertRight}
                                        tooltip={str("Insert column right")}
                                    /></td>
                                </tr>
                                <tr>
                                    <td/>
                                    <td><ActionButtonComp
                                        icon={ICONS.tableColumnInsertDown}
                                        onClick={onBtnClick.insertDown}
                                        tooltip={str("Insert row below")}
                                    /></td>
                                    <td><ActionButtonComp
                                        icon={ICONS.tableDeleteRow}
                                        onClick={onBtnClick.deleteRow}
                                        tooltip={str("Delete row")}
                                    /></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>

            <div className={style.buttonGroup}>
                <div className={style.button}>
                    <ActionButtonComp
                        icon={ICONS.codeBlock}
                        onClick={onBtnClick.insertCodeBlock}
                        tooltip={str("Code block")}
                    />

                </div>
            </div>

            {/* SHOW CODE button */}
            <div className={style.buttonGroupEndLine}>
                <div className={style.buttonGroup}>
                    <div className={style.button}>
                        <ActionButtonComp
                            icon={ICONS.showCode}
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