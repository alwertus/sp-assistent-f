import React, {useEffect, useState} from "react";
import style from "./SpaceOptionsWindow.module.css";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import {InputTextTransparentComp} from "../../../../components/InputTextTransparent/InputTextTransparentComp";
import {
    addUserToCurrentSpace,
    changeSpaceDescription,
    changeSpaceTitle,
    getCurrentSpaceInfo
} from "./SpaceOptionsWindowActions";
import {str} from "../../../../common/Language";
import {SpaceOptionsWindowDraw_AccessLine} from "./SpaceOptionsWindowDraw";

export const SpaceOptionsWindowComp = ({closeWindowHandler = () => {}}) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [accessList, setAccessList] = useState([])

    //TODO: Сделать этот параметр глобальный на уровне страницы "Инфо", и запрещать всякое, если нет доступа
    const [isReadOnly, setIsReadOnly] = useState(true)

    const refreshHandler = () => getCurrentSpaceInfo(setTitle, setDescription, setAccessList, setIsReadOnly)

    const onClickOutTheWindow = (e) => {
        if (e.target.id === "OuterArea")
            closeWindowHandler()
    }
    const onAcceptChangesHandler_title = (newValue) => {
        setTitle(newValue)
        changeSpaceTitle(newValue)
    }
    const onAcceptChangesHandler_description = (newValue) => {
        setDescription(newValue)
        changeSpaceDescription(newValue)
    }
    const onAcceptChangesHandler_addLogin = (addLogin) => {
        addUserToCurrentSpace(addLogin, refreshHandler)
    }

    useEffect(refreshHandler ,[])

    const drawOptionLine = (title, value) => <div className={style.line}>
        <div className={style.columnSizeX1}>{title}</div>
        <div className={style.columnSizeX3}>{value}</div>
    </div>

    return <div id={"OuterArea"}
                className={style.wrapper}
                onClick={onClickOutTheWindow}>
        <div className={style.windowFreeSpace}/>
        <div className={style.window}>
            <div className={style.top}>
                {str("Space options")}
            </div>
            <div className={style.center}>

                {drawOptionLine(str("Title"), <InputTextTransparentComp
                    defaultText={title}
                    acceptChanges={onAcceptChangesHandler_title}
                />)}

                {drawOptionLine(str("Description"), <InputTextTransparentComp
                    defaultText={description}
                    acceptChanges={onAcceptChangesHandler_description}
                />)}

                {drawOptionLine(<b>{str("Access")}</b>, <div/>)}

                {!isReadOnly && drawOptionLine(str("Add Login") + ":", <div className={style.lineInputWrapper}>
                    <InputTextTransparentComp
                        defaultText={""}
                        acceptChanges={onAcceptChangesHandler_addLogin}
                        saveOnLeave={false}
                        expressive
                        clearAfterAccept
                    />
                </div>)}
                <div className={style.accessListWrapper}>
                    {accessList.map(e => <SpaceOptionsWindowDraw_AccessLine
                        key={e['userId']}
                        userId={e['userId']}
                        name={e['userName']}
                        access={e['access']}
                        refreshHandler={refreshHandler}
                        isReadOnly={isReadOnly}
                    />)}
                </div>
            </div>
            <div className={style.down}>
                <ActionButtonComp
                    text={str("Close")}
                    onClick={closeWindowHandler}
                />
            </div>
        </div>
        <div className={style.windowFreeSpace}/>

    </div>
}