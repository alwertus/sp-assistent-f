export function TmplStateParamBool(state = false, action) {
    return action.type === 'CHANGE_ME'
        ? action.newValue
        : state;
}