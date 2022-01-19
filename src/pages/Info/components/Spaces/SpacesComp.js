import React, {useEffect, useState} from "react";
import style from "./SpacesS.module.css";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import {ICONS} from "../../../../common/Icons";
import {createSpace, getSpaces} from "./SpacesActions";
import {InputTextComp} from "../../../../components/InputText/InputTextComp";
import {INFO_STATUS} from "../../../../common/Structures";
import {str} from "../../../../common/Language";

export const SpacesComp = () => {
    const [spaces, setSpaces] = useState([{id: 0, title: 'Private'}, {id: 1, title: 'Public'}])
    const [space, setSpace] = useState(3)
    const [addMode, setAddMode] = useState(false)
    const [spaceTitle, setSpaceTitle] = useState("")
    const [spaceDescr, setSpaceDescr] = useState("")
    const [status, setStatus] = useState(INFO_STATUS.OUTDATED)

    useEffect(() => {if (status === INFO_STATUS.OUTDATED) {
        setStatus(INFO_STATUS.WAITING)
        getSpaces(setStatus, setSpaces)
    }},[status])

    return <div className={style.wrapper}>
        <span>{str("Space")}:</span>
        <select value={space} onChange={e => setSpace(e.target.value)}>
            {status===INFO_STATUS.ACTUAL && spaces.map(e => <option key={e.id} value={e.id}>{e.title}</option>)}
        </select>

        {addMode && <div>
            {str("Title")}<InputTextComp
            setText={setSpaceTitle}/>
        </div>}
        {addMode && <div>
            {str("Description")}<InputTextComp
            setText={setSpaceDescr}/>
        </div>}

        <ActionButtonComp
            icon={addMode ? ICONS.cancel : ICONS.plus}
            onClick={()=>{setAddMode(!addMode)}}
        />

        {addMode && <ActionButtonComp
            icon={ICONS.check}
            onClick={() => {
                if (!!spaceTitle) {
                    createSpace(spaceTitle, spaceDescr, setStatus)
                    setSpaceTitle("")
                    setSpaceDescr("")
                }
                setAddMode(false)
            }}
        />}
        {/*<div>{status}</div>*/}
    </div>
}