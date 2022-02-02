import React, {useState} from "react";
import style from "./Page.module.css";

export const PageComp = ({html, setHtml, isEditMode, contentStatus}) => {
    // const text = <ol>{Array(200).fill(<li key={Math.round(Math.random()*100000000+Math.random()*10000000)}>1</li>)}</ol>

    // const contentStatus = props['contentStatus']
    // const html = props['html']
    // const setHtml = props['setHtml']
    // const isEditMode = props['isEditMode']

    return <div className={style.wrapper}>
        <ul>
            <li>Select page</li>
            <li>{contentStatus}</li>
            <li>html={html}</li>
            <li>isEditMode={isEditMode.toString()}</li>
        {/*    https://www.kindacode.com/article/popular-open-source-wysiwyg-editors-for-react/*/}

        </ul>
        <a href="https://www.kindacode.com/article/popular-open-source-wysiwyg-editors-for-react/">link</a>
        <a href="https://www.youtube.com/watch?v=4pLWpfaMe4I">2</a>

        {isEditMode && <input/>}
    </div>
}