import React from "react";
import style from "./RichTextEditorS.module.css";
import JoditEditor from "jodit-react";

export const RichTextEditorComp = ({html, setHtml}) => {
    const config = {
        buttons: ["bold", "italic"]
    }
    return <div className={style.wrapper}>
        <JoditEditor
            value={html}
            onChange={setHtml}
            // config={config}
        />
    </div>
}