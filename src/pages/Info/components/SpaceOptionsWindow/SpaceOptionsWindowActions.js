import {sendMsg} from "../../../../common/SendMsg";

export function getCurrentSpaceInfo(setTitle = () => {},
                                    setDescription = () => {},
                                    setAccessList = () => {},
                                    setIsReadOnly) {
    sendMsg("api/info/getCurrentSpaceInfo",{},(rs) => {
        setTitle(rs['title'])
        setDescription(rs['description'])
        setAccessList(rs['accessList'])
        setIsReadOnly(!rs['currentUserCanWrite'])
    },() => {})
}

export function changeSpaceTitle(newValue) {
    sendMsg("api/info/changeSpaceInfo",
        {field: "title", newValue: newValue},
        () => {},
        () => {})
}

export function changeSpaceDescription(newValue) {
    sendMsg("api/info/changeSpaceInfo",
        {field: "description", newValue: newValue},
        () => {},
        () => {})
}

export function addUserToCurrentSpace(addLogin, refreshHandler) {
    sendMsg("api/info/addUserToSpace",
        {login: addLogin},
        refreshHandler,
        () => {})
}

export function changeUserAccess(userId, newAccess, refreshHandler) {
    sendMsg("api/info/changeUserAccess",
        {userId: userId, newAccess: newAccess},
        refreshHandler,
        () => {})
}
