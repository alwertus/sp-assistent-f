import React from "react";
import style from "./ActionButton.module.css";

export const ActionButtonComp = ({   onClick,
                                     className,
                                     icon,
                                     text,
                                     size = 'Normal',
                                     isPressed = false,
                                     tooltip,
                                     tooltipPosition = "Down",
}) => {

    const styles = Array.of(
        className ? className : "",
        style.wrapper,
        style['size' + size],
        isPressed ? style.isPressed : style.isNotPressed
    ).join(' ')

    return <div className={styles}
                onClick={onClick}
    >
        {!!text && <div className={style.text}>{text}</div>}
        {icon && <div className={style.img}>{icon}</div>}
        {/*{icon}*/}
        {tooltip && <span className={style.tooltip + " " + style['tooltip' + tooltipPosition]}>{tooltip}</span>}
    </div>
}