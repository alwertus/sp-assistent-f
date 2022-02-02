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