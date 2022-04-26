import {sendMsg} from "../../common/SendMsg";
import {LOGIN_STATUS, API_RQ} from "../../common/Structures";
import {setLocalStorageValue} from "../../common/LocalStorage";
import {str} from "../../common/Language";

export function getToken(user, password, setLoginStatus, setErrorText) {
    sendMsg("api/auth/login", {
        username: user,
        password: password
    }, (rs) => {
        setLoginStatus(LOGIN_STATUS.AUTHORIZED)
        setLocalStorageValue(API_RQ.TOKEN, rs[API_RQ.TOKEN])
        setLocalStorageValue(API_RQ.TOKEN_REFRESH, rs[API_RQ.TOKEN_REFRESH])
    },(err) => {
        setLoginStatus(LOGIN_STATUS.ERROR)
        setLocalStorageValue(API_RQ.TOKEN, "")
        setLocalStorageValue(API_RQ.TOKEN_REFRESH, "")
        setErrorText(str(err))
    })
}

export function getUserInfo(setLogin, setFirstName, setLastName, setUserInfo) {
    sendMsg("api/user/myInfo",{},(rs) => {
        let newUser = {
            login : !!rs[API_RQ.LOGIN] ? rs[API_RQ.LOGIN] : "",
            firstName : !!rs[API_RQ.FIRST_NAME] ? rs[API_RQ.FIRST_NAME] : "",
            lastName : !!rs[API_RQ.LAST_NAME] ? rs[API_RQ.LAST_NAME] : "",
        }
        if (!!setLogin) setLogin(newUser.login)
        if (!!setFirstName) setFirstName(newUser.firstName)
        if (!!setLastName) setLastName(newUser.lastName)
        if (!!setUserInfo) setUserInfo(newUser)
    },()=>{})
}
export function register(user, password, setLoginStatus, setErrorText, successRegisterHandler) {
    sendMsg("api/user/register", {
        login: user,
        password: password
    }, () => {
        successRegisterHandler()
    },(err) => {
        setLoginStatus(LOGIN_STATUS.ERROR)
        setErrorText(str(err))
    })
}
export function updateUser(firstName, lastName, userInfo, setUserInfo) {
    sendMsg("api/user/update", {
        firstName: firstName,
        lastName: lastName
    }, () => {
        let newUserInfo = { ...userInfo }
        newUserInfo.firstName = firstName
        newUserInfo.lastName = lastName
        setUserInfo(newUserInfo)
    })
}