// import store from "../store/Store";
// import {logout} from "../pages/Login/LoginActions";

/*
    All requests must be use this method
 */

const DEBUG = true;

export function sendMsg(target, bodyObj, successHandler = () => {}, errorHandler = () => {}) {
    // const url = store.getState().OptionsServerAddress + "/api/v1/" + target;
    const url = "http://192.168.1.9:9000/auth"
    // const url = "http://localhost:9000/auth"

    if (DEBUG) console.log(">> Request to '" + target + "'. Body=", bodyObj);

    let headers = new Headers();
    // headers.append("Authorization", store.getState().UserToken);
    headers.append("Content-Type", "application/json")

    let rsStatus = 0;
    fetch(url,{
        method: "POST",
        headers: headers,
        body: JSON.stringify(bodyObj)
    }).then( (rs) => {
        rsStatus = rs.status;
        return rs.json();
    }).then(rs => {
        if (DEBUG) console.log("<< Response", rs);

        // if token outdated
        if (rsStatus === 500) {
            // logout();
            return;
        }
        if (rsStatus !== 200) {
            if (DEBUG) console.log("Status error (" + rsStatus + ")");
            errorHandler("Error status response = " + rsStatus);
            return;
        }
        if (!rs["Result"]) {
            errorHandler("Result is NULL")
            return;
        }

        if (rs["Result"] !== "Ok") {
            errorHandler(rs["Error"]);
            return;
        }
        successHandler(rs);

    }).catch( e => {
        console.log("4")
        if (DEBUG) console.error("ERROR", e)
        errorHandler();
    });
}