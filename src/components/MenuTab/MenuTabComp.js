import React from "react"
import style from "./MenuTab.module.css"

export const MenuTabComp = ({
    onClick,
    text = "",
    image = null,
    imageText = "",
    selected = false,
    textFirst = false, }) => {

    const styleWrappers = [style.wrapper, textFirst ? style.reverse : null, selected ? style.selected : null]
    const styleWrapper = styleWrappers.join(" ")

    return <div className={styleWrapper}
                onClick={onClick}>
        {!!image && <img src={image} alt={imageText}/>}
        {!!image && !! text && <div className={style.emptyBox}/>}
        {!!text && <div className={style.text}>{text}</div>}
    </div>
}