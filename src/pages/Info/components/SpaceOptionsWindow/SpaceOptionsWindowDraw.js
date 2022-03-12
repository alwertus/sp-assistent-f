import style from "./SpaceOptionsWindowDraw.module.css";
import {ICONS} from "../../../../common/Icons";
import {ActionButtonComp} from "../../../../components/ActionButton/ActionButtonComp";
import React from "react";
import {changeUserAccess} from "./SpaceOptionsWindowActions";

export const SpaceOptionsWindowDraw_AccessLine = ({userId, name, access, refreshHandler, isReadOnly}) => {
    const isOwner = () => access === "OWNER"

    const onRadioChange = (e) => {
        changeUserAccess(userId, e.target.value, refreshHandler)
    }

    const drawRadio = (value) => <input
        type="radio"
        name={"access" + userId}
        value={value}
        defaultChecked={access === value}
        onChange={onRadioChange}
        disabled={isReadOnly}
    />

    return <div className={style.wrapper}>
        <div className={style.icon}>
            { isOwner() && <ActionButtonComp icon={ICONS.star}/> }
            { !isOwner() && <div><ActionButtonComp icon={ICONS.empty}/></div>}
        </div>
        <div className={style.text}>
            {name}
        </div>
        { !isOwner() &&
            <div className={style.access}>{access}
                {drawRadio("RW")}
                {drawRadio("RO")}
                {drawRadio("BAN")}
            </div>
        }
    </div>
}