import React, {useState} from "react";
import {/*useSelector, */useDispatch} from "react-redux";
import style from "./MainS.module.css";

export const MainComp = props => {
    const [count, setCount] = useState(0);
    // const server = useSelector(state => state.OptionsServerAddress); // Redux param
    const dispatch = useDispatch();

    return <div className={style.wrapper}>
        <h2>MAIN</h2>
        <ul>
            <li>{"Class=" + props.className}</li>
            <li>{"count=" + count}</li>
        </ul>

        <button onClick={()=>setCount(count + 1)}>Add +1</button>
        <button onClick={()=> dispatch({ type: "EVENT__CHANGE_ME", newValue: "CHANGE_ME" })}>change me button</button>

    </div>
}