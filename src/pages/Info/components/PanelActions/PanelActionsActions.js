import {sendMsg} from "../../../../common/SendMsg";

export function createPage(title, selectedPageId, invokeRefreshData) {
    sendMsg("api/info/createPage",{title: title, parentId: selectedPageId},() => { invokeRefreshData()

    },()=>{})
}

export function renamePage(id, newTitle, invokeRefreshData) {
    sendMsg("api/info/renamePage",{id: id, newTitle: newTitle},() => { invokeRefreshData()

    },()=>{})
}