import {INFO_STATUS, TEXT_MODE} from "../../common/Structures";
import {useEffect, useState} from "react";
import {getHtml} from "./InfoActions";

export const CurrentPageObject = (id) => {
    const [contentStatus, setContentStatus] = useState(INFO_STATUS.OUTDATED)
    const [contentMode, setContentMode] = useState(TEXT_MODE.NORMAL)
    const [tmpHtml, setTmpHtml] = useState("")
    const [html, sHtml] = useState("")
    const [title, setTitle] = useState("")

    const thisObj = {
        id: id,
        contentStatus: contentStatus,
        setContentStatus: setContentStatus,
        contentMode: contentMode,
        setContentMode: setContentMode,
        title: title,
        setTitle: setTitle,
        html: html,
        setHtml: (newValue) => {
            sHtml(newValue)
            setTmpHtml(newValue)
        },
        tmpHtml: tmpHtml,
        setTmpHtml: setTmpHtml,
        refresh: () => setContentStatus(INFO_STATUS.OUTDATED)
    }

    useEffect(() => { getHtml(thisObj) }, [contentStatus, id]) // eslint-disable-line react-hooks/exhaustive-deps

    return thisObj
}