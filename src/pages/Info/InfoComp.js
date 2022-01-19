import React, {useState} from "react"
import style from "./Info.module.css"
import {ActionButtonComp} from "../../components/ActionButton/ActionButtonComp"
import {ICONS} from "../../common/Icons";
// import {INFO_STATUS} from "../../common/Structures";
import {TempDrawComp} from "../../delme/TempDraw/TempDrawComp";
import {SpacesComp} from "./components/Spaces/SpacesComp";

export const InfoComp = () => {

    // const text = <ol>{Array(200).fill(<li key={Math.round(Math.random()*100000000+Math.random()*10000000)}>1</li>)}</ol>
    const text = "11"
    const [showMenu, setShowMenu] = useState(true)
    // const [menuStatus, setMenuStatus] = useState(INFO_STATUS.OUTDATED)
    // const [contentStatus, setContentStatus] = useState(INFO_STATUS.OUTDATED)

    // const [contentMode, setContentMode] = useState(EDIT, NORMAL)

    const draw = {
        actions: () => <div className={style.actions}>
            <ActionButtonComp
                icon={ICONS.menu}
                onClick={()=>setShowMenu(!showMenu)}
                isPressed={showMenu}
            />
            <SpacesComp/>
        </div>,
        menu: () => showMenu && <div className={style.menuContainer}>
            <div className={style.menu}>
                <div className={style.normalDirection}>
                    {text}
                </div>
            </div>
        </div>,
        context: () => <div className={style.content}>
            <TempDrawComp/>
            {text}
        </div>,
    }

    return <div className={style.wrapper}>
        <div className={style.container}>
            {draw.actions()}
            <div className={style.page}>
                {draw.menu()}
                {/*<div>resizer</div>*/}
                {draw.context()}
            </div>
        </div>
    </div>
}