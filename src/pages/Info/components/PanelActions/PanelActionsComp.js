import React, {useState} from "react";
import style from "./PanelActions.module.css";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import {ICONS} from "../../../../common/Icons";
import {InputTextComp} from "../../../../components/InputText/InputTextComp";
import {str} from "../../../../common/Language";
import {createPage, renamePage} from "./PanelActionsActions";
import {INFO_STATUS, TEXT_MODE} from "../../../../common/Structures";
import {InputTextTransparentComp} from "../../../../components/InputTextTransparent/InputTextTransparentComp";
import {SpaceOptionsWindowComp} from "../SpaceOptionsWindow/SpaceOptionsWindowComp";
import {sendSaveHtml} from "../../InfoActions";

export const PanelActionsComp = ({   pageList,
                                     currentPage,
                                     invokeRefreshData,
}) => {

    const [addMode, setAddMode] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [showSpaceOptions, setShowSpaceOptions] = useState(false)

    const closeWindowHandler = () => {
        setShowSpaceOptions(false)
        // TODO: Тут вызвать событие, чтоб обновить список пространства (в случае переименования заголовка)
    }

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

    // button "space options"
    const drawButton_spaceOptions = () => <div className={style.buttonWrapper}>
        <ActionButtonComp
            icon={ICONS.options}
            onClick={()=>setShowSpaceOptions(!showSpaceOptions)}
            isPressed={showSpaceOptions}
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
            currentPage.html !== currentPage.tmpHtml &&
            <ActionButtonComp   // button Save
                icon={ICONS.save}
                onClick={() => sendSaveHtml(currentPage)}
            />
        }
        {
            currentPage.contentStatus === INFO_STATUS.ACTUAL &&
            <ActionButtonComp   // button Edit Page
                text={str("Edit Page")}
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
            {showSpaceOptions &&
                <SpaceOptionsWindowComp
                    closeWindowHandler={closeWindowHandler}
                />
            }
            {drawButton_showMenu()}
            {drawButton_spaceOptions()}
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