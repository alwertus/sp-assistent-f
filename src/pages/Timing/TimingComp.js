import React, {useEffect} from "react";
import style from "./TimingS.module.css";
import {ActionButtonComp} from "../../components/ActionButton/ActionButtonComp";

export const TimingComp = ({setHeader, setFooter}) => {

    useEffect(() => {
        setHeader("")
        setFooter("")
    }, [])

    return <div className={style.wrapper}>
        <ActionButtonComp text={"Add event"}
                          onClick={() => {console.log("123")}}
        />
    </div>
}