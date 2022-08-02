import React, {useEffect, useState} from "react";
import style from "./Feeding.module.css";
import {InputTextTransparentComp} from "../../components/InputTextTransparent/InputTextTransparentComp";
import {ActionButtonComp} from "../../components/ActionButton/ActionButtonComp";
import {createAccess, getAccessStatus, setInviteString} from "./FeedingActions";
import {FeedingDataComp} from "./FeedingDataComp";
import {str} from "../../common/Language";

export const FeedingComp = ({setHeader, setFooter}) => {
    const [isPageCreated, setIsPageCreated] = useState(false)

    useEffect(() => !isPageCreated && getAccessStatus(setIsPageCreated), [isPageCreated])

    useEffect(() => {
        setHeader("")
        setFooter("")
    }, [])

    if (isPageCreated)
        return <FeedingDataComp/>
    else
        return <div className={style.wrapper}>
            <h2>{str("First run")}</h2>

            <div className={style.createNewButton}>
                <ActionButtonComp
                    text={str("Create new")}
                    onClick={() => createAccess(setIsPageCreated)}
                />
            </div>
            {str("or")}
            <InputTextTransparentComp
                title={str("Use access string")}
                hideOkBtn={false}
                acceptChanges={(newVal) => setInviteString(newVal, setIsPageCreated)}
            />

        </div>
}