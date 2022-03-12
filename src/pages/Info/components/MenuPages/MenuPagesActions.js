import {sendMsg} from "../../../../common/SendMsg";

export function movePage(from, to, refreshData) {
    if (to < 0) to = null
    sendMsg("api/info/movePage",{from: from, to: to},
        () => {refreshData()}
    )
}