import React, {useEffect, useState} from "react";
import style from "./SpacesS.module.css";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import {ICONS} from "../../../../common/Icons";
import {createSpace, getSpaces, selectSpace} from "./SpacesActions";
import {InputTextComp} from "../../../../components/InputText/InputTextComp";
import {INFO_STATUS} from "../../../../common/Structures";
import {str} from "../../../../common/Language";

export const SpacesComp = () => {
    const [spaces, setSpaces] = useState([])
    const [space, setSpace] = useState()
    const [addMode, setAddMode] = useState(false)
    const [spaceTitle, setSpaceTitle] = useState("")
    const [spaceDescription, setSpaceDescription] = useState("")
    const [status, setStatus] = useState(INFO_STATUS.OUTDATED)

    useEffect(() => {if (status === INFO_STATUS.OUTDATED) {
        setStatus(INFO_STATUS.WAITING)
        getSpaces(setStatus, setSpaces, setSpace)
    }},[status])

    return addMode
        ? <div className={style.wrapper}>
            <div>
                {str("Title")}
                <InputTextComp setText={setSpaceTitle}/>
            </div>
            <div>
                {str("Description")}
                <InputTextComp setText={setSpaceDescription}/>
            </div>

            <ActionButtonComp
                icon={ICONS.cancel}
                onClick={()=>{setAddMode(!addMode)}}
            />

            <ActionButtonComp
                icon={ICONS.check}
                onClick={() => {
                    if (!!spaceTitle) {
                        createSpace(spaceTitle, spaceDescription, setStatus)
                        setSpaceTitle("")
                        setSpaceDescription("")
                    }
                    setAddMode(false)
                }}
            />
        </div>
        : <div className={style.wrapper}>
            <span>{str("Space")}:</span>
            <select
                className={style.select}
                value={space}
                onChange={e => {
                    if (space !== e.target.value)
                        selectSpace(e.target.value, setSpace)
                }}>
                {status === INFO_STATUS.ACTUAL
                && spaces.map(e => <option key={e.id} value={e.id}>{e.title}</option>)
                }
            </select>

            <ActionButtonComp
                icon={ICONS.plus}
                onClick={()=>{setAddMode(!addMode)}}
            />
        </div>
}