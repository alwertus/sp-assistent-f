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

    const renamePageTitleHandler = (newTitle) => {
        renamePage(currentPage.id, newTitle, () => {currentPage.setTitle(newTitle); invokeRefreshData()})
    }

    // button "show/hide menu"
    const drawButton_showMenu = () => <div className={style.buttonWrapper}>
        <ActionButtonComp
            icon={ICONS.menu}
            onClick={()=>pageList.setShowMenu(!pageList.showMenu)}
            isPressed={pageList.showMenu}
            tooltip={str(pageList.showMenu ? "Hide menu" : "Show menu")}
        />
    </div>

    const drawTitle = () => <div className={style.titleWrapper}>
        <div className={style.titleContainer}>
            {currentPage.id && !addMode && <InputTextTransparentComp
                title={str("Topic")}
                defaultText={currentPage.title}
                acceptChanges={renamePageTitleHandler}
                expressive
            />}
        </div>
    </div>

    const drawRightPart = () => <div className={style.rightPanelPart}>
        {
            // currentPage.needToSave &&
            <ActionButtonComp   // button Save
                className={currentPage.needToSave ? "" : style.hidden}
                icon={ICONS.save}
                tooltip={str("Save")}
                tooltipPosition={"DownLeft"}
                onClick={() => currentPage.save()}
            />
        }

    </div>

    return addMode
        ? <div className={style.wrapper}>

            {drawButton_showMenu()}

            <div className={style.newPageWrapper}>
                <InputTextTransparentComp
                    title={str("Input new title")}
                    autoFocus={true}
                    defaultText={""}
                    acceptChanges={(text)=>{
                        if (!!text) {
                            createPage(text, currentPage.id, invokeRefreshData)
                            setAddMode(false)
                        }
                    }}
                    cancelChanges={() => setAddMode(false)}
                    hideOkBtn={false}
                />
            </div>

            {drawTitle()}

            {drawRightPart()}

        </div>

        : <div className={style.wrapper}>
            {drawButton_showMenu()}
            <div className={style.newPageWrapper}>
                <ActionButtonComp
                    icon={ICONS.filePlus}
                    tooltip={str("New page")}
                    onClick={() => setAddMode(true)}
                />
            </div>
            {
                currentPage.contentStatus === INFO_STATUS.ACTUAL &&
                <ActionButtonComp   // button Edit Page
                    icon={ICONS.fileEdit}
                    tooltip={str("Edit Page")}
                    // tooltipPosition={"DownLeft"}
                    isPressed={currentPage.contentMode === TEXT_MODE.EDIT}
                    onClick={ () => currentPage.setContentMode(
                        currentPage.contentMode === TEXT_MODE.EDIT
                            ? TEXT_MODE.NORMAL
                            : TEXT_MODE.EDIT) }
                />
            }
            {drawTitle()}
            {drawRightPart()}
        </div>
}