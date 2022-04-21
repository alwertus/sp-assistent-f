import {INFO_STATUS, TEXT_MODE} from "../../common/Structures";
import {useEffect, useState} from "react";
import {getHtml, sendSaveHtml} from "./InfoActions";

export const CurrentPageObject = (id) => {
    const [contentStatus, setContentStatus] = useState(INFO_STATUS.OUTDATED)
    const [contentMode, setContentMode] = useState(TEXT_MODE.NORMAL)
    const [tmpHtml, setTmpHtml] = useState("")
    const [html, sHtml] = useState("")
    const [title, setTitle] = useState("")

    const setHtml = (newValue) => {
        sHtml(newValue)
        setTmpHtml(newValue)
    }

    const thisObj = {
        id: id,
        contentStatus: contentStatus,
        setContentStatus: setContentStatus,
        contentMode: contentMode,
        setContentMode: setContentMode,
        title: title,
        setTitle: setTitle,
        html: html,
        setHtml: setHtml,
        tmpHtml: tmpHtml,
        setTmpHtml: setTmpHtml,
        refresh: () => setContentStatus(INFO_STATUS.OUTDATED),
        save: (f) => sendSaveHtml(id, html, tmpHtml, setHtml, f),
        needToSave: html !== tmpHtml
    }

    useEffect(() => {
        getHtml(thisObj)
        setContentMode(TEXT_MODE.NORMAL)
    }, [contentStatus, id]) // eslint-disable-line react-hooks/exhaustive-deps

    return thisObj
}