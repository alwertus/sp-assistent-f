import React, {useEffect, useState} from "react";
import {/*useSelector, */useDispatch} from "react-redux";
import style from "./Cash.module.css";

export const CashComp = props => {
    const setHeader = props['setHeader']

    const [count, setCount] = useState(0);
    // const server = useSelector(state => state.OptionsServerAddress); // Redux param
    const dispatch = useDispatch();

    useEffect(() => setHeader(""), [])

    return <div className={style.wrapper}>
        <h2>CASH</h2>
        <ul>
            <li>{"Class=" + props.className}</li>
            <li>{"count=" + count}</li>
        </ul>

        <button onClick={()=>setCount(count + 1)}>Add +1</button>
        <button onClick={()=> dispatch({ type: "EVENT__CHANGE_ME", newValue: "CHANGE_ME" })}>change me button</button>

    </div>
}