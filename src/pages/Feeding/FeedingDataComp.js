import React, {useEffect, useState} from "react";
import style from "./FeedingData.module.css";
import {ActionButtonComp} from "../../components/ActionButton/ActionButtonComp";
import {getData, newTimer, setNewInterval} from "./FeedingActions";
import {str} from "../../common/Language";
import {useCountdown} from "../../common/hooks/useCountdown";
import {ICONS} from "../../common/Icons";

function getDate(millis) {
    if (!millis) return null
    const date = new Date(parseInt(millis))

    const h = date.getHours()
    const m = ('0' + date.getMinutes()).slice(-2)

    return `${h}:${m}`
}

export const FeedingDataComp = () => {
    const [data, setData] = useState([])
    const [lastTimerId, setLastTimerId] = useState(undefined)

    const [endDate, setEndDate] = useState(undefined)
    const [isEnd, hours, minutes, seconds] = useCountdown(endDate)
    const [interval, setInterval] = useState("02:00")

    const updateData = () => getData(setData, setLastTimerId, setInterval)

    useEffect(updateData, [])

    useEffect(() => {
        if (!lastTimerId) return
        let lastTimer = data.find(e => e['id'] === lastTimerId)['stop']
        let newDate = new Date(lastTimer)
        setEndDate(newDate)

    }, [lastTimerId])

    return <div className={style.wrapper}>
        <div className={style.interval}>
            <span>{str("Interval")}</span>
            <input type="time"
                   required
                   value={interval}
                   onChange={(e) => {
                       setInterval(e.target.value)
                       setNewInterval(e.target.value)
                   }}/>
        </div>
        <div className={style.timer}>
            <div className={isEnd ? style.timerFinished : style.timerInProgress}>
                {(isEnd ? "- " : "") + hours + ":" + minutes + ":" + seconds}
            </div>
        </div>
        <div className={style.actions}>
            <ActionButtonComp
                className={style.actionsButton}
                size={"Big"}
                icon={ICONS.breastLeft}
                tooltip={str("Left")}
                onClick={() => newTimer("L", updateData)}
            />
            <ActionButtonComp
                className={style.actionsButton}
                size={"Big"}
                icon={ICONS.breastRight}
                tooltip={str("Right")}
                onClick={() => newTimer("R", updateData)}
            />
        </div>
        <div className={style.stat}>
            <table>
                <thead>
                <tr><td>{str("Start")}</td><td>{str("Stop")}</td><td>{str("Breast")}</td></tr>
                </thead>
                <tbody>
                {
                    data.sort((a, b) => parseInt(b['id']) - parseInt(a['id']))
                        .map(e =>
                            <tr key={e['id']} className={lastTimerId === e['id'] ? style.currentTimer : ""}>
                                <td>{getDate(e['start'])}</td>
                                <td>{getDate(e['stop'])}</td>
                                <td>{e['breast'] === 'L' ? str("Left") : str("Right")}</td>
                            </tr>)
                }
                </tbody>
            </table>
        </div>
    </div>
}