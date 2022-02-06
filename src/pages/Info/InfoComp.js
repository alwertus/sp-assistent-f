import React, {useEffect, useState} from "react"
import style from "./Info.module.css"
import {SpacesComp} from "./components/Spaces/SpacesComp";
import {useSelector} from "react-redux";
import {PanelActionsComp} from "./components/PanelActions/PanelActionsComp";
import {MenuPagesComp} from "./components/MenuPages/MenuPagesComp";
import {INFO_STATUS, TEXT_MODE} from "../../common/Structures";
import {getHtml, getPageList, sendSaveHtml} from "./InfoActions";
import {PageComp} from "./components/Page/PageComp";
import {useParams} from "react-router-dom";

export const InfoComp = ({setHeader, setFooterText, location}) => {
    useSelector(state => state['currentLanguage']) // add this to refresh component when lang is changed

    // const text = <ol>{Array(200).fill(<li key={Math.round(Math.random()*100000000+Math.random()*10000000)}>1</li>)}</ol>
    const [showMenu, setShowMenu] = useState(true)
    const [menuStatus, setMenuStatus] = useState(INFO_STATUS.ACTUAL)
    const [pages, setPages] = useState([])
    const [contentStatus, setContentStatus] = useState(INFO_STATUS.OUTDATED)
    const [tmpHtml, setTmpHtml] = useState("")
    const [html, sHtml] = useState("")
    const [contentMode, setContentMode] = useState(TEXT_MODE.NORMAL)
    const {id} = useParams()

    const setHtml = (newVal) => {
        sHtml(newVal)
        setTmpHtml(newVal)
    }

    const refreshPage = () => {
        setContentStatus(INFO_STATUS.OUTDATED)
    }

    const refreshData = () => {
        setMenuStatus(INFO_STATUS.OUTDATED)
        refreshPage()
    }

    const saveHtml = () => {
        if (!id || tmpHtml === html) return
        sendSaveHtml(id, tmpHtml, setHtml)
    }

    useEffect(() => setHeader(<SpacesComp
        refreshData={refreshData}
        location={location}
    />),[setHeader]) // eslint-disable-line react-hooks/exhaustive-deps

    // update if menuStatus is outdated
    useEffect(()=> {
        setFooterText(menuStatus)
        if (menuStatus === INFO_STATUS.OUTDATED) {
            getPageList(setPages, setMenuStatus)
        }
    }, [menuStatus, setFooterText])

    // update if contentStatus is outdated
    useEffect(() => {

        if (contentStatus === INFO_STATUS.OUTDATED && !!id) {
            getHtml(id, setHtml, setContentStatus)
        }
    }, [contentStatus, id])

    const draw = {
        menu: () => showMenu && <div className={style.menuContainer}>
            <div className={style.menu}>
                <div className={style.normalDirection}>
                    <MenuPagesComp
                        menuStatus={menuStatus}
                        setMenuStatus={setMenuStatus}
                        refreshPage={refreshPage}
                        pages={pages}
                        location={location}
                    />
                </div>
            </div>
        </div>,
        context: () => <div className={style.content}>
            <PageComp
                id={id}
                contentStatus={contentStatus}
                html={html}
                setHtml={setTmpHtml}
                isEditMode={contentMode === TEXT_MODE.EDIT}
            />
        </div>,
    }

    return <div className={style.wrapper}>
        <div className={style.container}>
            <PanelActionsComp
                showMenu={showMenu}
                setShowMenu={setShowMenu}
                refreshData={refreshData}
                contentMode={contentMode}
                setContentMode={setContentMode}
                editButtonAvailable={contentStatus === INFO_STATUS.ACTUAL && !!id}
                saveHtml={saveHtml}
                saveHtmlAvailable={html !== tmpHtml}
            />
            <div className={style.page}>
                {draw.menu()}
                {/*<div>resizer</div>*/}
                {draw.context()}
            </div>
        </div>
    </div>
}