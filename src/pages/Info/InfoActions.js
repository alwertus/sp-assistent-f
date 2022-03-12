import {INFO_STATUS} from "../../common/Structures";
import {sendMsg} from "../../common/SendMsg";

export function getPageList(setPagesHandler, setMenuStatus) {
    setMenuStatus(INFO_STATUS.WAITING)
    sendMsg("api/info/getPageList",{},
        rs => {
            setMenuStatus(INFO_STATUS.ACTUAL)
            setPagesHandler(rs['pages'])
        },
        err => setMenuStatus(INFO_STATUS.ERROR))
}

export function getHtml(id, setHtml, setTitle, setContentStatus) {
    setContentStatus(INFO_STATUS.WAITING)
    sendMsg("api/info/getHtml",{id: id},
        rs => {
            setContentStatus(INFO_STATUS.ACTUAL)
            setHtml(rs['html'])
            setTitle(rs['title'])
        },
        err => setContentStatus(INFO_STATUS.ERROR))
}

export function sendSaveHtml(id, html, setHtml) {
    sendMsg("api/info/saveHtml",{id: id, html: html}, () => setHtml(html))
}