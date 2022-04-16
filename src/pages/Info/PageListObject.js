import {useEffect, useState} from "react";
import {INFO_STATUS} from "../../common/Structures";
import {getPageList} from "./InfoActions";

export const PageListObject = (setFooterText) => {
    const [showMenu, setShowMenu] = useState(true)
    const [menuStatus, setMenuStatus] = useState(INFO_STATUS.OUTDATED)
    const [pages, setPages] = useState([])

    const thisObj = {
        pages: pages,
        setPages: setPages,
        menuStatus: menuStatus,
        setMenuStatus: setMenuStatus,
        showMenu: showMenu,
        setShowMenu: setShowMenu,
        refresh: () => setMenuStatus(INFO_STATUS.OUTDATED)
    }

    // update if menuStatus is outdated
    useEffect(() => {
        setFooterText(menuStatus) // SET FOOTER TEXT
        getPageList(thisObj)
    }, [menuStatus, setFooterText]) // eslint-disable-line react-hooks/exhaustive-deps


    return thisObj
}
