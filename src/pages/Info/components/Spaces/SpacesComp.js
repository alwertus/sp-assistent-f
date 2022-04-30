import React, {useEffect, useState} from "react";
import style from "./Spaces.module.css";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import {ICONS} from "../../../../common/Icons";
import {createSpace, getSpaces, selectSpace} from "./SpacesActions";
import {InputTextComp} from "../../../../components/InputText/InputTextComp";
import {INFO_STATUS} from "../../../../common/Structures";
import {str} from "../../../../common/Language";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {SpaceOptionsWindowComp} from "../SpaceOptionsWindow/SpaceOptionsWindowComp";

export const SpacesComp = ({refreshData, location}) => {
    useSelector(state => state['currentLanguage']) // add this to refresh component if lang is changed
    const navigate = useNavigate()
    const [status, setStatus] = useState(INFO_STATUS.OUTDATED)
    const [spaces, setSpaces] = useState([])
    const [space, setSpace] = useState()
    const [addMode, setAddMode] = useState(false)
    const [spaceTitle, setSpaceTitle] = useState("")
    const [spaceDescription, setSpaceDescription] = useState("")
    const [showSpaceOptions, setShowSpaceOptions] = useState(false)

    const closeWindowHandler = () => {
        setShowSpaceOptions(false)
        // TODO: Тут вызвать событие, чтоб обновить список пространства (в случае переименования заголовка)
    }

    // button "space options"
    const drawButton_spaceOptions = () => <div className={style.buttonWrapper}>
        <ActionButtonComp
            icon={ICONS.options}
            onClick={()=>setShowSpaceOptions(!showSpaceOptions)}
            isPressed={showSpaceOptions}
        />
    </div>

    const refreshLocation = () => {
        navigate("/" + location)
    }

    useEffect(() => {if (status === INFO_STATUS.OUTDATED) {
        setStatus(INFO_STATUS.WAITING)
        getSpaces(setStatus, setSpaces, setSpace)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }},[status])

    return addMode
        ? <div className={style.wrapper}>
            <span>{str("New Space")}:</span>
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
            {showSpaceOptions &&
                <SpaceOptionsWindowComp
                    closeWindowHandler={closeWindowHandler}
                />
            }
            <span>{str("Space")}:</span>
            <select
                className={style.select}
                value={space}
                onClick={e => !space && console.log("CLICK ON NULL", e.target)}
                onChange={e => {
                    // if (space !== e.target.value)
                        selectSpace(e.target.value, setSpace, refreshData, refreshLocation)
                }}>
                {status === INFO_STATUS.ACTUAL
                && spaces.map(e => <option key={e.id} value={e.id}>{e.title}</option>)
                }
            </select>

            {drawButton_spaceOptions()}

            <ActionButtonComp
                icon={ICONS.plus}
                onClick={()=>{setAddMode(!addMode)}}
            />
        </div>
}