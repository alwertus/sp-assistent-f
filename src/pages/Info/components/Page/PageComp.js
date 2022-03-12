import React from "react";
import style from "./Page.module.css";
import {RichTextEditorComp} from "../../../../components/RichTextEditor/RichTextEditorComp";
import {INFO_STATUS} from "../../../../common/Structures";
import {str} from "../../../../common/Language";

export const PageComp = ({html, setHtml, isEditMode, contentStatus, id}) => {

    if (!id)
        return <div className={style.innerWrapper}>{str("Select Page")}</div>

    if (contentStatus === INFO_STATUS.ACTUAL && !!id)
        return <div className={style.wrapper}>
            {isEditMode && <RichTextEditorComp
                html={html}
                setHtml={setHtml}
            />}
            {!isEditMode && <div className={style.innerWrapper} dangerouslySetInnerHTML={{__html: html}}/>}
        </div>

    else
        return <div className={style.innerWrapper}/>
}