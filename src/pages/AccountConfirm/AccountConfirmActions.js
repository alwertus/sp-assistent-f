import {sendMsg} from "../../common/SendMsg";

export function confirmEmail(string, setStep) {
    sendMsg("api/user/emailConfirm", {
        "confirmString": string,
    },
        () => {setStep("success")},
        () => {setStep("error")}
    )
}