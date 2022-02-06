import {sendMsg} from "../../../../common/SendMsg";
import {INFO_STATUS} from "../../../../common/Structures";

export function getSpaces(refreshData, setStatusHandler, setSpacesHandler, setSpaceHandler) {
    sendMsg("api/info/getSpaces",{},(rs) => {
        setStatusHandler(INFO_STATUS.ACTUAL)
        setSpacesHandler(rs['spaces'])
        !!rs['selectedSpace'] && setSpaceHandler(rs['selectedSpace'])
        refreshData()
    },()=>{setStatusHandler(INFO_STATUS.ERROR)})
}

export function createSpace(title, description, setStatusHandler) {
    sendMsg("api/info/createSpace",{title: title, description: description},() => {
        setStatusHandler(INFO_STATUS.OUTDATED)
    },()=>{})
}

export function selectSpace(newSpaceId, setSpaceHandler, refreshData, refreshLocation) {
    sendMsg("api/info/selectSpace",{spaceId: newSpaceId},() => {
        setSpaceHandler(newSpaceId)
        refreshLocation()
        refreshData()
    },()=>{})
}