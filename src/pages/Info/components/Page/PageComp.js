import React from "react";
import style from "./Page.module.css";
import {RichTextEditorComp} from "../../../../components/RichTextEditor/RichTextEditorComp";
import {INFO_STATUS, TEXT_MODE} from "../../../../common/Structures";
import {str} from "../../../../common/Language";

export const PageComp = ({currentPage}) => {
    const isEditMode = currentPage.contentMode === TEXT_MODE.EDIT

    if (!currentPage.id)
        return <div className={style.innerWrapper}>{str("Select Page")}</div>

    if (currentPage.contentStatus === INFO_STATUS.ACTUAL && !!currentPage.id)
        return <div className={style.wrapper}>
            {isEditMode && <RichTextEditorComp
                html={currentPage.html}
                setHtml={currentPage.setHtml}
            />}
            {!isEditMode && <div className={style.innerWrapper} dangerouslySetInnerHTML={{__html: currentPage.html}}/>}
        </div>

    else
        return <div className={style.innerWrapper}/>
}