import React, {useState} from "react";
import style from "./PanelActions.module.css";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import {ICONS} from "../../../../common/Icons";
import {InputTextComp} from "../../../../components/InputText/InputTextComp";
import {str} from "../../../../common/Language";
import {createPage} from "./PanelActionsActions";
import {TEXT_MODE} from "../../../../common/Structures";

export const PanelActionsComp = props => {
    const setShowMenu = props['setShowMenu']
    const showMenu = props['showMenu']
    const invokeRefreshData = props['refreshData']
    const contentMode = props['contentMode']
    const setContentMode = props['setContentMode']
    const [addMode, setAddMode] = useState(false)
    const [newTitle, setNewTitle] = useState("")
    const [path, setPath] = useState("~/pages/")

    const drawButton_showMenu = () =><ActionButtonComp
        icon={ICONS.menu}
        onClick={()=>setShowMenu(!showMenu)}
        isPressed={showMenu}/>

    const drawPath = () => <div className={style.path}>{path}</div>
    const drawButton_edit = () => <div className={style.buttonEditWrapper}>
        <ActionButtonComp
            text={"EDIT PAGE"}
            onClick={()=>setContentMode(contentMode === TEXT_MODE.EDIT ? TEXT_MODE.NORMAL : TEXT_MODE.EDIT)} />
    </div>

    return addMode
        ? <div className={style.wrapper}>
            {drawButton_showMenu()}
            {drawPath()}
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
                            createPage(newTitle, invokeRefreshData)
                            setNewTitle("")
                            setAddMode(false)
                        }
                    }}
                />
            </div>
            {drawButton_edit()}
        </div>

        : <div className={style.wrapper}>
            {drawButton_showMenu()}
            {drawPath()}
            <ActionButtonComp
                icon={ICONS.plus}
                text={str("New page")}
                onClick={()=>setAddMode(true)}
            />
            {drawButton_edit()}
        </div>
}