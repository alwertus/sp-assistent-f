import React, {useEffect, useState} from "react"
import style from "./Info.module.css"
import {SpacesComp} from "./components/Spaces/SpacesComp";
import {useSelector} from "react-redux";
import {PanelActionsComp} from "./components/PanelActions/PanelActionsComp";
import {MenuPagesComp} from "./components/MenuPages/MenuPagesComp";
import {INFO_STATUS, TEXT_MODE} from "../../common/Structures";
import {getPageList} from "./InfoActions";
import {PageComp} from "./components/Page/PageComp";

export const InfoComp = (props) => {
    useSelector(state => state['currentLanguage']) // add this to refresh component when lang is changed
    const setHeader = props['setHeader']
    const setFooterText = props['setFooterText']

    // const text = <ol>{Array(200).fill(<li key={Math.round(Math.random()*100000000+Math.random()*10000000)}>1</li>)}</ol>
    const [showMenu, setShowMenu] = useState(true)
    const [menuStatus, setMenuStatus] = useState(INFO_STATUS.ACTUAL)
    const [pages, setPages] = useState([])
    const [contentStatus, setContentStatus] = useState(INFO_STATUS.OUTDATED)
    const [page, setPage] = useState("Default Page Content")
    const [contentMode, setContentMode] = useState(TEXT_MODE.NORMAL)

    const refreshData = () => {
        setMenuStatus(INFO_STATUS.OUTDATED)
    }

    useEffect(() => setHeader(<SpacesComp refreshData={refreshData}/>),[setHeader])

    useEffect(()=> {
        setFooterText(menuStatus)
        if (menuStatus === INFO_STATUS.OUTDATED) {
            getPageList(setPages, setMenuStatus)
        }
    }, [menuStatus, setFooterText])

    const draw = {
        menu: () => showMenu && <div className={style.menuContainer}>
            <div className={style.menu}>
                <div className={style.normalDirection}>
                    <MenuPagesComp
                        menuStatus={menuStatus}
                        setMenuStatus={setMenuStatus}
                        refreshData={refreshData}
                        pages={pages}
                    />
                </div>
            </div>
        </div>,
        context: () => <div className={style.content}>
            <PageComp
                contentStatus={contentStatus}
                html={page}
                setHtml={setPage}
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
            />
            <div className={style.page}>
                {draw.menu()}
                {/*<div>resizer</div>*/}
                {draw.context()}
            </div>
        </div>
    </div>
}