import {sendMsg} from "../../common/SendMsg";

export function sendTestMessage(successHandler) {
    sendMsg("auth", {
        username: "user",
        password: "user"
    }, () => {
        successHandler();
    })
}