import {getLocalStorageValue, setLocalStorageValue} from "../common/LocalStorage";

export function currentLanguage(state = getLocalStorageValue("lang", "en"), action) {
    return action.type === "SET_LANGUAGE"
        ? setLocalStorageValue("lang", action.newValue)
        : state;
}
export function serverAddress(state = getLocalStorageValue("server", "http://alwertus.zapto.org:9000"), action) {
    return action.type === "SET_SERVER"
        ? setLocalStorageValue("server", action.newValue)
        : state;
}