import React from "react"
import style from "./MenuTab.module.css"

export const MenuTabComp = props => {
    const onClick = props['onClick']
    const text = !!props['text'] ? props['text'] : ""
    const image = !!props['image'] ? props['image'] : null
    const imageText = !!props['imageText'] ? props['imageText'] : ""
    const selected = !!props['selected']
    const textFirst = !!props['textFirst']
    const styleWrappers = [style.wrapper, textFirst ? style.reverse : null, selected ? style.selected : null]
    const styleWrapper = styleWrappers.join(" ")

    return <div className={styleWrapper}
                onClick={onClick}>
        {!!image && <img src={image} alt={imageText}/>}
        {!!image && !! text && <div className={style.emptyBox}/>}
        {!!text && <div className={style.text}>{text}</div>}
    </div>
}