import {ICONS} from "../../common/Icons";
import {getTableUnderCaret} from "../../common/CaretOperations";

function createTableColumn(refWorkSpace, onInnerHtmlChangeHandler, insertPlace) {
    let tbl = getTableUnderCaret()
    if (!tbl) return

    // find cell position in row
    let insertIndex = tbl.currentColIndex + (insertPlace === "before" ? 0 : 1)

    for (let i = tbl.rowsArray.length - 1; i >= 0; i--) {
        tbl.rowsArray[i].insertCell(insertIndex)
    }

    onInnerHtmlChangeHandler()
}

function createTableRow(refWorkSpace, onInnerHtmlChangeHandler, insertPlace) {
    let tbl = getTableUnderCaret()
    if (!tbl) return

    // create new TABLE ROW
    let newRow = tbl.table.insertRow(tbl.currentRowIndex + (insertPlace === "before" ? 0 : 1))

    // fill row
    let newCell = null
    for (let i = 0; i < tbl.columnCount; i++) {
        newCell = newRow.insertCell(0)
        newCell.innerHTML = "<br>"
    }

    onInnerHtmlChangeHandler()
}

export const controls = [
    {   groupId: "g1",
        type: "exec",
        buttons: [
            {   key: 0,
                title:'clear',
                command: 'removeFormat',
                value: ''
            },
            {   key: 1,
                title:'U',
                command: 'underline',
                value: ''
            },
            {   key: 2,
                title:'B',
                command: 'bold',
                value: ''
            },
            {   key: 3,
                title:'I',
                command: 'italic',
                value: ''
            },
            {   key: 5,
                title:'<-',
                command: 'justifyLeft',
                value: ''
            },
            {   key: 6,
                title:'=',
                command: 'justifyCenter',
                value: ''
            },
            {   key: 7,
                title:'>',
                command: 'justifyRight',
                value: ''
            },
            {   key: 8,
                title:'normal',
                command: 'hea',
                value: ''
            },
            {   key: 9,
                title:'h2',
                command: 'formatBlock',
                value: 'h2'
            },
            {   key: 10,
                title:'h3',
                command: 'formatBlock',
                value: 'h3'
            },
            {   key: 11,
                title:'h3',
                command: 'formatBlock',
                value: 'h3'
            },
        ]
    },
    {   groupId: "g2",
        type: "actionButton",
        buttons: [
            {   key: 1,
                icon: ICONS.Table,
                onClick: (refWorkSpace, onInnerHtmlChangeHandler) => {
                    document.execCommand('insertHTML', false, '<table><tr><td><br></td></tr></table>')
                    onInnerHtmlChangeHandler()
                    refWorkSpace.current.focus()
                }
            },
            {   key: 2,
                icon: ICONS.TableColumnInsertLeft,
                onClick: (refWorkSpace, onInnerHtmlChangeHandler) =>
                    createTableColumn(refWorkSpace, onInnerHtmlChangeHandler, "before")
            },
            {   key: 3,
                icon: ICONS.TableDeleteColumn,
                onClick: (refWorkSpace, onInnerHtmlChangeHandler) => {
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
                }
            },
            {   key: 4,
                icon: ICONS.TableColumnInsertRight,
                onClick: (refWorkSpace, onInnerHtmlChangeHandler) =>
                    createTableColumn(refWorkSpace, onInnerHtmlChangeHandler, "after")
            },
            {   key: 5,
                icon: ICONS.TableColumnInsertUp,
                onClick: (refWorkSpace, onInnerHtmlChangeHandler) =>
                    createTableRow(refWorkSpace, onInnerHtmlChangeHandler, "before")
            },
            {   key: 6,
                icon: ICONS.TableDeleteRow,
                onClick: (refWorkSpace, onInnerHtmlChangeHandler) => {
                    let tbl = getTableUnderCaret()
                    if (!tbl) return

                    if (tbl.rowsArray.length === 1)
                        tbl.table.remove()
                    else
                        tbl.table.deleteRow(tbl.currentRowIndex)

                    onInnerHtmlChangeHandler()
                }
            },
            {   key: 7,
                icon: ICONS.TableColumnInsertDown,
                onClick: (refWorkSpace, onInnerHtmlChangeHandler) =>
                    createTableRow(refWorkSpace, onInnerHtmlChangeHandler, "after")
            },
        ]
    },
]