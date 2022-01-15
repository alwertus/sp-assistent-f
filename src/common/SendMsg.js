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

    console.log(url)

    if (DEBUG) console.log(">> Request to '" + target + "'. Body=", bodyObj);

    let headers = new Headers();
    headers.append("Authorization", token);
    headers.append("Content-Type", "application/json")

    let rsStatus = 0;
    fetch(url,{
        method: "POST",
        headers: headers,
        body: JSON.stringify(bodyObj)

    }).then( (response) => {
        rsStatus = response.status;
        let rsContentType = response.headers.get("content-type")
        if (rsContentType && rsContentType.indexOf("application/json") !== -1) {

            // ----- ----- ----- ----- ----- ----- response is JSON ----- ----- ----- ----- ----- -----
            return response.json().then( rs => {
                if (DEBUG) console.log("<< Response JSON (" + rsStatus + ")", rs)
                let rsResult = rs[API_RQ.RESULT]
                let rsError = rs[API_RQ.ERROR]

                if (rsStatus === 200) {

                    if (!rsResult)
                        errorHandler("Result is null")

                    else if (rsResult !== "Ok") {
                        errorHandler(!!rsError ? rsError : rsResult)

                    } else
                        successHandler(rs)


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
                        () => console.error("Refresh token error"),
                        true,
                        true)

                } else {
                    errorHandler(!!rsError ? rsError : rsResult)
                }
            })
        } else {

            // ----- ----- ----- ----- ----- ----- response is TEXT ----- ----- ----- ----- ----- -----
            return response.text().then( text => {
                if (DEBUG) console.error("<< Response TEXT (" + rsStatus + ")", text)
                errorHandler(text)
            })
        }

    }).catch( e => {
        if (DEBUG) console.error("<< ERROR", e)
        errorHandler();
    });
}