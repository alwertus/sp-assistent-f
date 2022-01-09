export function getLocalStorageValue(key, defaultValue = null) {
    return localStorage.getItem(key) == null
        ? defaultValue
        : localStorage.getItem(key)
}

export function setLocalStorageValue(key, value, removeIfEmpty = true) {
    if (removeIfEmpty && (!value || value === ""))
        localStorage.removeItem(key)
    else
        localStorage.setItem(key, value)
    return value
}