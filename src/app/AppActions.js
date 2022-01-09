import {sendMsg} from "../common/SendMsg";
import {LOGIN_STATUS} from "../common/Structures";
import {setLocalStorageValue} from "../common/LocalStorage";

export function verifyToken(token, setLoginStatus) {
    console.log("Verify saved token")
    sendMsg("verify", {
        token: token
    }, () => {
        setLoginStatus(LOGIN_STATUS.AUTHORIZED)
    },() => {
        setLocalStorageValue("token", "")
        setLoginStatus(LOGIN_STATUS.UNAUTHORIZED)
    })
}