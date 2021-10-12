export function DEL1StateParamBool(state = false, action) {
    return action.type === 'CHANGE_ME'
        ? action.newValue
        : state;
}