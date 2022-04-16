import React, {useState} from "react";
import style from "./MenuPages.module.css";
import {MenuItemComp} from "./MenuItem/MenuItemComp";
import {movePage} from "./MenuPagesActions";
import {str} from "../../../../common/Language";

export const MenuPagesComp = ({   pageList,
                                  currentPage,
                                  location,
}) => {
    const [currentDraggableElement, setCurrentDraggableElement] = useState()
    const [currentDragOverElement, setCurrentDragOverElement] = useState()

    const params = {
        location: location,
        refreshPage: currentPage.refresh,
        currentDraggableElement: currentDraggableElement,
        setCurrentDraggableElement: setCurrentDraggableElement,
        currentDragOverElement: currentDragOverElement,
        setCurrentDragOverElement: setCurrentDragOverElement,
        movePage: (from, to) => movePage(from['id'], to['id'], pageList.refresh),
    }

    return <div className={style.wrapper}>
        <MenuItemComp
            element={{id: -1, title: str("Root"), parentId: null}}
            params={params}
        />
        {pageList.pages.map(el => <MenuItemComp
            key={el['id']}
            element={el}
            params={params}
        />)}
    </div>
}