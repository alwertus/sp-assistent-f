import {getLocalStorageValue, setLocalStorageValue} from "../common/LocalStorage";

export function currentLanguage(state = getLocalStorageValue("lang", "en"), action) {
    return action.type === "SET_LANGUAGE"
        ? setLocalStorageValue("lang", action.newValue)
        : state;
}