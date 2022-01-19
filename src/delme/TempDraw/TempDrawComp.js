import React, {useState} from "react";
import style from "./TempDrawS.module.css";
import {ActionButtonComp} from "../../components/ActionButton/ActionButtonComp";
import {ICONS} from "../../common/Icons";
import {createSpace, getSpaces} from "../../pages/Info/InfoActions";
import {InputTextComp} from "../../components/InputText/InputTextComp";

export const TempDrawComp = () => {
    const [spaceTitle, setSpaceTitle] = useState("")
    const [spaceDescr, setSpaceDescr] = useState("")

    return <div className={style.wrapper}>
        {/*<table>
            <tr><td>GET</td>
                <td><ActionButtonComp
                    icon={ICONS.menu}
                    onClick={() => getSpaces()}
                /></td>
                <td/>
            </tr>
            <tr>
                <td>CREATE</td>
                <td><ActionButtonComp
                    icon={ICONS.menu}
                    onClick={() => createSpace(spaceTitle, spaceDescr)}
                /></td>
                <td>Title<InputTextComp
                    setText={setSpaceTitle}/>
                    Description<InputTextComp
                        setText={setSpaceDescr}/>
                </td>
            </tr>
        </table>*/}

    </div>
}