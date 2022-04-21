import {INFO_STATUS} from "../../common/Structures";
import {sendMsg} from "../../common/SendMsg";

export function getPageList(pageList) {
    if (pageList.menuStatus !== INFO_STATUS.OUTDATED) return

    pageList.setMenuStatus(INFO_STATUS.WAITING)
    sendMsg("api/info/getPageList",{},
        rs => {
            pageList.setMenuStatus(INFO_STATUS.ACTUAL)
            pageList.setPages(rs['pages'])
        },
        () => pageList.setMenuStatus(INFO_STATUS.ERROR))
}

export function getHtml(currentPage) {
    if (currentPage.contentStatus !== INFO_STATUS.OUTDATED || !currentPage.id) return
    currentPage.setContentStatus(INFO_STATUS.WAITING)
    sendMsg("api/info/getHtml",{id: currentPage.id},
        rs => {
            currentPage.setContentStatus(INFO_STATUS.ACTUAL)
            currentPage.setHtml(rs['html'])
            currentPage.setTitle(rs['title'])
        },
        () => currentPage.setContentStatus(INFO_STATUS.ERROR))
}

export function sendSaveHtml(id, html, tmpHtml, setHtml, runAfterSave = () => {}) {
    if (!id || tmpHtml === html) return
    sendMsg("api/info/saveHtml",
        {
            id: id,
            html: tmpHtml
        },
        () => {
            setHtml(tmpHtml)
            runAfterSave()
        })
}