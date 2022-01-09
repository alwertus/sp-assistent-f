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

export function getUserInfo(setFirstName, setLastName, setUserInfo) {
    sendMsg("api/user/myInfo",{},(rs) => {
        let newUser = {
            login : !!rs[API_RQ.LOGIN] ? rs[API_RQ.LOGIN] : "",
            firstName : !!rs[API_RQ.FIRST_NAME] ? rs[API_RQ.FIRST_NAME] : "",
            lastName : !!rs[API_RQ.LAST_NAME] ? rs[API_RQ.LAST_NAME] : "",
        }
        setFirstName(newUser.firstName)
        setLastName(newUser.lastName)
        setUserInfo(newUser)
    },()=>{})
}
export function register(user, password, setLoginStatus, setErrorText) {
    console.log("register with " + user + " - " + password)
    sendMsg("api/user/register", {
        login: user,
        password: password
    }, (rs) => {
        getToken(user, password, setLoginStatus, setErrorText)
        // setLoginStatus(LOGIN_STATUS.AUTHORIZED)
        // setLocalStorageValue(API_RQ.TOKEN, rs[API_RQ.TOKEN])
    },(err) => {
        setLoginStatus(LOGIN_STATUS.ERROR)
        // setLocalStorageValue(API_RQ.TOKEN, "")
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