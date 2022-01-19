import {sendMsg} from "../../../../common/SendMsg";
import {INFO_STATUS} from "../../../../common/Structures";

export function getSpaces(setStatusHandler, setSpacesHandler) {
    sendMsg("api/info/getSpaces",{},(rs) => {
        setStatusHandler(INFO_STATUS.ACTUAL)
        setSpacesHandler(rs['spaces'])
    },()=>{setStatusHandler(INFO_STATUS.ERROR)})
}

export function createSpace(title, description, setStatusHandler) {
    sendMsg("api/info/createSpace",{title: title, description: description},(rs) => {
        setStatusHandler(INFO_STATUS.OUTDATED)
    },()=>{})
}