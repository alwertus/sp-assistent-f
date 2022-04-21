import React, {useState} from "react";
import style from "./PanelActions.module.css";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import {ICONS} from "../../../../common/Icons";
import {InputTextComp} from "../../../../components/InputText/InputTextComp";
import {str} from "../../../../common/Language";
import {createPage, renamePage} from "./PanelActionsActions";
import {INFO_STATUS, TEXT_MODE} from "../../../../common/Structures";
import {InputTextTransparentComp} from "../../../../components/InputTextTransparent/InputTextTransparentComp";

export const PanelActionsComp = ({   pageList,
                                     currentPage,
                                     invokeRefreshData,
}) => {

    const [addMode, setAddMode] = useState(false)
    const [newTitle, setNewTitle] = useState("")

    const renamePageTitleHandler = (newTitle) => {
        renamePage(currentPage.id, newTitle, () => {currentPage.setTitle(newTitle); invokeRefreshData()})
    }

    // button "show/hide menu"
    const drawButton_showMenu = () => <div className={style.buttonWrapper}>
        <ActionButtonComp
            icon={ICONS.menu}
            onClick={()=>pageList.setShowMenu(!pageList.showMenu)}
            isPressed={pageList.showMenu}
        />
    </div>

    const drawTitle = () => <div className={style.titleWrapper}>
        {currentPage.id && !addMode && <InputTextTransparentComp
            defaultText={currentPage.title}
            acceptChanges={renamePageTitleHandler}
        />}
    </div>

    const drawRightPart = () => <div className={style.rightPanelPart}>
        {
            currentPage.needToSave &&
            <ActionButtonComp   // button Save
                icon={ICONS.save}
                onClick={() => currentPage.save()}
            />
        }
        {
            currentPage.contentStatus === INFO_STATUS.ACTUAL &&
            <ActionButtonComp   // button Edit Page
                text={str("Edit Page")}
                isPressed={currentPage.contentMode === TEXT_MODE.EDIT}
                onClick={ () => currentPage.setContentMode(
                    currentPage.contentMode === TEXT_MODE.EDIT
                        ? TEXT_MODE.NORMAL
                        : TEXT_MODE.EDIT) }
            />
        }
    </div>

    return addMode
        ? <div className={style.wrapper}>
            {drawButton_showMenu()}
            <div className={style.newPageWrapper}>
                <div className={style.newTitle}>
                    <InputTextComp  // input text (new page title)
                        setText={setNewTitle}
                        autoFocus={true}
                    />
                </div>

                <div className={style.buttonWrapper}>
                    <ActionButtonComp   // button Cancel
                        icon={ICONS.cancel}
                        onClick={()=>setAddMode(false)}
                    />
                </div>

                <div className={style.buttonWrapper}>
                    <ActionButtonComp   // button OK
                        icon={ICONS.check}
                        onClick={()=>{
                            if (!!newTitle) {
                                createPage(newTitle, currentPage.id, invokeRefreshData)
                                setNewTitle("")
                                setAddMode(false)
                            }
                        }}
                    />
                </div>
            </div>

            {drawTitle()}
            {drawRightPart()}
        </div>

        : <div className={style.wrapper}>

            {drawButton_showMenu()}
            <div className={style.newPageWrapper}>
                <ActionButtonComp
                    icon={ICONS.plus}
                    text={str("New page")}
                    onClick={() => setAddMode(true)}
                />
            </div>
            {drawTitle()}
            {drawRightPart()}
        </div>
}