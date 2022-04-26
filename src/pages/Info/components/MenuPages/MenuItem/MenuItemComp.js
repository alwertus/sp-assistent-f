import React, {useState} from "react";
import style from "./MenuItem.module.css";
import {useNavigate} from "react-router";
import {ICONS} from "../../../../../common/Icons";
import {useParams} from "react-router-dom";

export const MenuItemComp = ({element, params}) => {
    const childList = element['childList']
    const title = element['title']
    const currentId = element['id']
    const refreshPage = params['refreshPage']
    const location = params['location']
    const movePage = params['movePage']
    const currentDraggableElement = params['currentDraggableElement']
    const setCurrentDraggableElement = params['setCurrentDraggableElement']
    const currentDragOverElement = params['currentDragOverElement']
    const setCurrentDragOverElement = params['setCurrentDragOverElement']
    const {id} = useParams()

    const navigate = useNavigate()
    const [showChild, setShowChild] = useState(true)
    const hasChild = !!childList && childList.length > 0

    const showHideChildrenElements = () => {
        setShowChild(!showChild)
    }

    const getCollapseIconClass = () => {
        return [style.prefixContainer, style.collapseIcon].join(' ')
    }

    const getTitleClass = () => {
        let allowDrag = !!currentDraggableElement && !isChild(currentDraggableElement)
        return [
            style.title,
            (id === currentId.toString()) && style.thisPageSelect,
            allowDrag && style.dragAllow,
            allowDrag && (currentDragOverElement === currentId) && style.onDragOver
        ].join(' ')
    }

    function isChild(el) {
        if (el['id'] === currentId) return true
        const checkChild = (child) => isChild(child)
        return el['childList'].some(checkChild)
    }

    const onClick_Title = () => {
        if (currentId < 0)
            navigate("/" + location)
        else
            navigate("/" + location + "/" + currentId)
        refreshPage()
    }
    function onDragStartHandler() {
        setCurrentDraggableElement(element)
    }
    function onDragLeaveHandler(e) {

    }
    function onDragEndHandler() {
        setCurrentDraggableElement(null)
        setCurrentDragOverElement(null)
    }
    function onDragOverHandler(event) {
        event.preventDefault()
        setCurrentDragOverElement(currentId)
    }
    function onDropHandler(event) {
        event.preventDefault()
        if (currentDraggableElement['id'] === currentId || isChild(currentDraggableElement)) return
        movePage(currentDraggableElement, element)
    }

    const drawFolderPrefix = () => {
        if (hasChild) {
            return <div className={getCollapseIconClass()}
                        onClick={showHideChildrenElements}>
                {ICONS.AngleBracket}
            </div>
        } else {
            return <div className={style.prefixContainer}>{ICONS.dot}</div>
        }
    }

    return <div className={style.wrapper}
                key={currentId}>
        <div className={style.titleContainer}>
            {(currentId > 0) && drawFolderPrefix()}
            <div className={getTitleClass()}
                 onClick={onClick_Title}
                 draggable={currentId > 0}
                 onDragStart={onDragStartHandler} // момент, когда взяли элемент
                 onDragLeave={onDragLeaveHandler} // срабатывает, если вышли за пределы другого элемента
                 onDragEnd={onDragEndHandler} // срабатывает, если отпустили перемещение
                 onDragOver={onDragOverHandler} // срабатывает, если находимся над каким-то другим объектом
                 onDrop={onDropHandler} // отпустили элемент, расчитываем, что произойдёт какое-то действие
            >
                {title}
            </div>
        </div>
        {hasChild && showChild && <div>
            {childList.map(
                el => <MenuItemComp
                    key = {el['id']}
                    element = {el}
                    params = {params}/>
            )}
        </div>}
    </div>
}