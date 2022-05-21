import {ICONS} from "../../common/Icons";
import {getTableUnderCaret} from "../../common/CaretOperations";
import {str} from "../../common/Language";

export function createTableColumn(refWorkSpace, onInnerHtmlChangeHandler, insertPlace) {
    let tbl = getTableUnderCaret()
    if (!tbl) return

    // find cell position in row
    let insertIndex = tbl.currentColIndex + (insertPlace === "before" ? 0 : 1)

    for (let i = tbl.rowsArray.length - 1; i >= 0; i--) {
        tbl.rowsArray[i].insertCell(insertIndex)
    }

    onInnerHtmlChangeHandler()
}

export function createTableRow(refWorkSpace, onInnerHtmlChangeHandler, insertPlace) {
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
    {groupId: "g0",
    type: "exec",
    buttons: [
        {   key: 0,
            title: ICONS.erase,
            command: 'removeFormat',
            value: '',
            tooltip: str("Clear format"),
        },
    ]},
    {   groupId: "g1",
        type: "exec",
        buttons: [
            {   key: 1,
                title: ICONS.typeUnderline,
                command: 'underline',
                value: '',
                tooltip: str('Underline') + ' (Ctrl+U)',
            },
            {   key: 2,
                title: ICONS.typeBold,
                command: 'bold',
                value: '',
                tooltip: str('Bold') + ' (Ctrl+B)',
            },
            {   key: 3,
                title: ICONS.typeItalic,
                command: 'italic',
                value: '',
                tooltip: str('Italic') + ' (Ctrl+I)',
            },
            {   key: 5,
                title: ICONS.textLeft,
                command: 'justifyLeft',
                value: '',
                tooltip: str('Align-Left'),
            },
            {   key: 6,
                title: ICONS.textCenter,
                command: 'justifyCenter',
                value: '',
                tooltip: str('Align-Center'),
            },
            {   key: 7,
                title: ICONS.textRight,
                command: 'justifyRight',
                value: '',
                tooltip: str('Align-Right'),
            },
            {   key: 8,
                title: ICONS.typeNormal,
                command: 'formatBlock',
                value: 'div',
                tooltip: str("Normal text"),
            },
            {   key: 9,
                title: ICONS.typeH1,
                command: 'formatBlock',
                value: 'h1',
                tooltip: str("Header") + " 1",
            },
            {   key: 10,
                title: ICONS.typeH2,
                command: 'formatBlock',
                value: 'h2',
                tooltip: str("Header") + " 2",
            },
            {   key: 11,
                title: ICONS.typeH3,
                command: 'formatBlock',
                value: 'h3',
                tooltip: str("Header") + " 3",
            },
            {   key: 12,
                title: ICONS.listUl,
                command: 'insertUnorderedList',
                value: '',
                tooltip: str("Unordered list"),
            },
            {   key: 13,
                title: ICONS.listOl,
                command: 'insertOrderedList',
                value: '',
                tooltip: str("Ordered list"),
            },
        ]
    },
]