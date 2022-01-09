function fillStruct(prefix, obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === "string")
                obj[key] = prefix + "__" + key;
            else fillStruct(prefix + "__" + key, obj[key])
        }
    }
    return obj
}

export const LOGIN_STATUS = fillStruct("LOGIN_STATUS", {
    UNAUTHORIZED : "",
    WAITING: "",
    AUTHORIZED: "",
    ERROR: "",
})

export const API_RQ = {
    RESULT : "result",
    TOKEN : "accessToken",
    TOKEN_REFRESH : "refreshToken",
    ERROR : "error",
    FIRST_NAME : "firstName",
    LAST_NAME : "lastName",
    LOGIN : "login",
}
export const EMPTY_USER = {
    login : "",
    firstName : "",
    lastName : ""
}