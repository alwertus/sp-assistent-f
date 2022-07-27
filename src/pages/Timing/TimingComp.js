import React, {useEffect} from "react";
import style from "./Timing.module.css";
import {InputTextTransparentComp} from "../../components/InputTextTransparent/InputTextTransparentComp";

export const TimingComp = ({setHeader, setFooter}) => {

    useEffect(() => {
        setHeader("")
        setFooter("")
    }, [])

    const drawItemLine = (f1, f2, f3, f4) => <tr>
        <td><input type="checkbox"/></td>
        <td>{f1}</td>
        <td><InputTextTransparentComp
            defaultText={f2}
        /></td>
        <td><InputTextTransparentComp
            defaultText={f3}
        /></td>
        <td>{f4}</td>
    </tr>

    return <div className={style.wrapper}>
        <div className={style.timeline}>
            timeline
        </div>
        <InputTextTransparentComp
            title={"Add event"}
            hideOkBtn={false}
            clearAfterAccept
            expressive
            acceptChanges={(newVal) => console.log(newVal)}
        />

        <div className={style.eventList}>
            <table>
                <thead>
                <tr>
                    <td>...</td>
                    <td>Color</td>
                    <td>Item</td>
                    <td>Speech text</td>
                    <td>Per day</td>
                </tr>
                </thead>
                <tbody>
                {drawItemLine("black", "Work","Work", "8h 5m")}
                {drawItemLine("green", "Relax", "Relax", "0h 3m")}
                </tbody>
            </table>
        </div>

    </div>
}