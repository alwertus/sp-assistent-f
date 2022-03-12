import React, {useState} from "react";
import style from "./MenuPages.module.css";
import {MenuItemComp} from "./MenuItem/MenuItemComp";
import {movePage} from "./MenuPagesActions";
import {str} from "../../../../common/Language";

export const MenuPagesComp = ({pages, location, refresh, setPages}) => {
    const [currentDraggableElement, setCurrentDraggableElement] = useState()
    const [currentDragOverElement, setCurrentDragOverElement] = useState()

    const params = {
        location: location,
        refreshPage: refresh.page,
        currentDraggableElement: currentDraggableElement,
        setCurrentDraggableElement: setCurrentDraggableElement,
        currentDragOverElement: currentDragOverElement,
        setCurrentDragOverElement: setCurrentDragOverElement,
        movePage: (from, to) => movePage(from['id'], to['id'], refresh.menu),
    }

    return <div className={style.wrapper}>
        <MenuItemComp
            element={{id: -1, title: str("Root"), parentId: null}}
            params={params}
        />
        {pages.map(el => <MenuItemComp
            key={el['id']}
            element={el}
            params={params}
        />)}
    </div>
}