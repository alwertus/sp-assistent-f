/*
    All requests must be use this method
 */

import {getLocalStorageValue, setLocalStorageValue} from "./LocalStorage";
import {API_RQ} from "./Structures";
import store from "../store/Store";

const DEBUG = true;

export function sendMsg(
    target,
    bodyObj,
    successHandler = () => {},
    errorHandler = () => {},
    isResending = false,
    isRefreshToken = false) {
    const server = store.getState()['serverAddress']
    const url = server + '/' + target
    const token = getLocalStorageValue(isRefreshToken ? API_RQ.TOKEN_REFRESH : API_RQ.TOKEN)
    const resultErr = errorText => {
        errorHandler(errorText)
        if (DEBUG) console.error(errorText)
    }

    if (DEBUG) console.log(">> Request to '" + url + "'. Body=", bodyObj);

    let headers = new Headers();
    headers.append("Authorization", token);
    headers.append("Content-Type", "application/json")

    const jsonHandler = (rs) => {
        if (DEBUG) console.log("<< Response JSON (" + rsStatus + ")", rs)
        let rsResult = rs[API_RQ.RESULT]
        let rsError = rs[API_RQ.ERROR]

        if (rsStatus === 200) {

            if (!rsResult)
                resultErr("Result is null")


            else if (rsResult !== "Ok") {
                resultErr(!!rsError ? rsError : rsResult)

            } else {
                try {
                    successHandler(rs)
                } catch (e) {
                    console.error("Error while processing successHandler: " + e)
                }

            }



        } else if (rsStatus === 401
            && !isResending
            && rsError.startsWith("The Token has expired")) {
            // if token is expired

            sendMsg("api/token/refresh",
                {},
                (rsToken) => {
                    setLocalStorageValue(API_RQ.TOKEN, rsToken[API_RQ.TOKEN])
                    setLocalStorageValue(API_RQ.TOKEN_REFRESH, rsToken[API_RQ.TOKEN_REFRESH])
                    // repeat sending
                    sendMsg(target, bodyObj, successHandler, errorHandler, true, false)
                },
                () => {
                //TODO: Тут должен сбрасываться статус логина, а логин статус должен быть глобальным состоянием
                    console.error("Refresh token error")
                    setLocalStorageValue(API_RQ.TOKEN, '')
                    setLocalStorageValue(API_RQ.TOKEN_REFRESH, '')
                },
                true,
                true)

        } else {
            resultErr(!!rsError ? rsError : rsResult)
        }
    }
    const textHandler = (text) => {
        if (DEBUG) console.error("<< Response TEXT (" + rsStatus + ")", text)
        errorHandler(text)
    }

    let rsStatus = 0;
    fetch(url,{
        method: "POST",
        headers: headers,
        body: JSON.stringify(bodyObj)

    })
        .then((response) => {
            rsStatus = response.status
            return response.text()})
        .then((response) => {
            try {
                const data = JSON.parse(response)
                jsonHandler(data)
            } catch (err) {
                textHandler(response)
            }
    }).catch( e => {
        resultErr("<< ERROR" + e)
    });
}