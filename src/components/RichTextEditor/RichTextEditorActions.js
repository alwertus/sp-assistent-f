import {sendMsg} from "../../common/SendMsg";

export function uploadImage(pageId, file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        sendMsg("api/info/uploadImage",{
            pageId: pageId,
            base64content: reader.result,
            extension: file.name.split('.').pop()
        })
    }

}