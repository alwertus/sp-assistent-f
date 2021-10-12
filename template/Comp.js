import React, {useState} from "react";
import {/*useSelector, */useDispatch} from "react-redux";
import style from "./TmplStyl.module.css";

export const TmplComp = props => {
    const [count, setCount] = useState(0);
    // const server = useSelector(state => state.OptionsServerAddress); // Redux param
    const dispatch = useDispatch();

    return <div className={style.wrapper}>
        <ul>
            <li>{"Class=" + props.className}</li>
            <li>{"count=" + count}</li>
        </ul>

        <button onClick={()=>setCount(count + 1)}>Add +1</button>
        <button onClick={()=> dispatch({ type: "EVENT__CHANGE_ME", newValue: "CHANGE_ME" })}>change me button</button>

    </div>
}