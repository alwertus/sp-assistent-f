import React, {useEffect} from "react"
import style from "./Info.module.css"
import {SpacesComp} from "./components/Spaces/SpacesComp";
import {useSelector} from "react-redux";
import {PanelActionsComp} from "./components/PanelActions/PanelActionsComp";
import {MenuPagesComp} from "./components/MenuPages/MenuPagesComp";
import {PageComp} from "./components/Page/PageComp";
import {useParams} from "react-router-dom";
import {PageListObject} from "./PageListObject";
import {CurrentPageObject} from "./CurrentPageObject";


export const InfoComp = ({setHeader, setFooterText, location}) => {
    useSelector(state => state['currentLanguage']) // add this to refresh component when lang is changed
    const {id} = useParams()
    const pageList = PageListObject(setFooterText)
    const currentPage = CurrentPageObject(id)
    // const text = <ol>{Array(200).fill(<li key={Math.round(Math.random()*100000000+Math.random()*10000000)}>1</li>)}</ol>

    const refreshAll = () => {
        console.log("Refresh Data")
        pageList.refresh()
        currentPage.refresh()
    }

    useEffect(() => setHeader(<SpacesComp
        refreshData={refreshAll}
        location={location}
    />),[setHeader]) // eslint-disable-line react-hooks/exhaustive-deps

    return <div className={style.wrapper}>
        <div className={style.container}>

            {/* Draw panel actions */}
            <PanelActionsComp
                pageList={pageList}
                currentPage={currentPage}
                invokeRefreshData={refreshAll}
            />
            <div className={style.page}>

                {/* Draw menu */}
                {pageList.showMenu && <div className={style.menuContainer}>
                    <div className={style.menu}>
                        <div className={style.normalDirection}>
                            <MenuPagesComp
                                pageList={pageList}
                                currentPage={currentPage}
                                location={location}
                            />
                        </div>
                    </div>
                </div>}
                {/*<div>resizer</div>*/}

                {/* Draw page */}
                <div className={style.content}>
                    <PageComp
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    </div>
}