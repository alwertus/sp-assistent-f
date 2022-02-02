import {sendMsg} from "../../../../common/SendMsg";

export function createPage(title, invokeRefreshData) {
    sendMsg("api/info/createPage",{title: title},() => { invokeRefreshData()

    },()=>{})
}