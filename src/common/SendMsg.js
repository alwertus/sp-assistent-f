/*
    All requests must be use this method
 */

import {getLocalStorageValue, setLocalStorageValue} from "./LocalStorage";
import {API_RQ} from "./Structures";

const DEBUG = true;
// const URL = store.getState().OptionsServerAddress + "/api/v1/"
// const URL = "http://192.168.1.9:9000/auth/"
const URL = "http://localhost:9000/"

export function sendMsg(
    target,
    bodyObj,
    successHandler = () => {},
    errorHandler = () => {},
    isResending = false,
    isRefreshToken = false) {

    const url = URL + target
    const token = getLocalStorageValue(isRefreshToken ? API_RQ.TOKEN_REFRESH : API_RQ.TOKEN)

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

/*



        // if (DEBUG) console.log("<< Response (" + rsStatus + ")", rs)
        try {
            json = rs.json();
        } catch (e) {
            if (DEBUG) console.error("<< Error convert to json msg: ", rs)
        }
        console.warn("TYPE=", typeof json, json)
        // return rs.json();
        return json;*/

    })/*.then(rs => {
        console.warn("ZZZZ 1")
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

        } else if (rsStatus === 410 && !isResending) {  // if token is expired
            console.log("Refresh token")
            sendMsg("refresh",
                {token: token,
                refresh: "2"},
                () => console.log("refresh success"),
                () => console.log("refresh error"))
            // repeat send
            sendMsg(target, bodyObj, successHandler, errorHandler, true)

        } else {
            errorHandler(!!rsError ? rsError : rsResult)
        }

    })*/.catch( e => {
        if (DEBUG) console.error("<< ERROR", e)
        errorHandler();
    });
}