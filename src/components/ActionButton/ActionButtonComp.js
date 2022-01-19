import React from "react";
import style from "./ActionButtonS.module.css";

export const ActionButtonComp = props => {
    const onClick = props['onClick']
    const icon = !!props['icon'] ? props['icon'] : null
    const size = !!props['size'] ? props['size'] : 'Normal'
    const isPressed = !!props['isPressed'] ? props['isPressed'] : false

    const styles = Array.of(
        style.wrapper,
        style['size' + size],
        isPressed ? style.isPressed : style.isNotPressed
    ).join(' ')

    return <div className={styles}
                onClick={onClick}

                // style={"width:16;"}
    >
        {icon}
        {/*{!!icon && <div></div>}*/}
        {/*<img src={icon} alt={"icon"}/>*/}

    </div>
}