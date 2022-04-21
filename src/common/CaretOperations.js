/**
 * Example source: https://stackoverflow.com/questions/13949059/persisting-the-changes-of-range-objects-after-selection-in-html/13950376#13950376
 */

export function getCaretPosition(editableElement) {
    let range = window.getSelection().getRangeAt(0)
    let preSelectionRange = range.cloneRange()
    preSelectionRange.selectNodeContents(editableElement)
    preSelectionRange.setEnd(range.startContainer, range.startOffset)
    let start = preSelectionRange.toString().length
    let end = start + range.toString().length

    return {
        start: start,
        end: end,
    }
}

export function setCaretPosition(editableElement, position) {
    let charIndex = 0
    let range = document.createRange();
    range.setStart(editableElement, 0);
    range.collapse(true);
    let nodeStack = [editableElement], node, foundStart = false, stop = false;

    while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType === 3) {
            let nextCharIndex = charIndex + node.length;
            if (!foundStart && position.start >= charIndex && position.start <= nextCharIndex) {
                range.setStart(node, position.start - charIndex);
                foundStart = true;
            }
            if (foundStart && position.end >= charIndex && position.end <= nextCharIndex) {
                range.setEnd(node, position.end - charIndex);
                stop = true;
            }
            charIndex = nextCharIndex;
        } else {
            let i = node.childNodes.length;
            while (i--) {
                nodeStack.push(node.childNodes[i]);
            }
        }
    }

    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

export function selectElement(element) {
    let range = new Range()
    range.setStart(element, 0)
    range.setEndAfter(element)
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(range)
}

export function parentElementIs(element, name) {
    let par = element.parentElement
    if (par.nodeName !== name) {
        console.error(par.nodeName, "is not " + name + "!")
        return null
    }
    return par
}

export function getTableUnderCaret() {
    // check current cursor in TD -> TR -> TBODY -> TABLE
    let rangeCur = document.getSelection()

    if (rangeCur.getRangeAt(0).startContainer !== rangeCur.getRangeAt(0).endContainer) return

    let tableCell = parentElementIs(rangeCur.focusNode, "TD")

    let tableRow = parentElementIs(tableCell ? tableCell: rangeCur.focusNode, "TR")
    if (!tableRow) return

    let tableBody = parentElementIs(tableRow, "TBODY")

    let table = parentElementIs(!!tableBody ? tableBody : tableRow, "TABLE")
    if (!table) return

    let rowsArray = tableBody ? tableBody.children : table.children

    // table params
    let columnCount = tableRow.children.length
    let rowCount = !!tableBody ? tableBody.children.length : table.children.length

    // current indexes
    let currentColIndex = Array.from(tableRow.children).indexOf(tableCell)
    let currentRowIndex = Array.from(rowsArray).indexOf(tableRow)


    return {
        table: table,
        rowsArray: rowsArray,
        currentRow: tableRow,
        currentCell: tableCell,
        currentRowIndex: currentRowIndex,
        currentColIndex: currentColIndex,
        columnCount: columnCount,
        rowCount: rowCount,
    }
}