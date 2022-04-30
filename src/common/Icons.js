import style from "./Icons.module.css"
import insertColumn from "./img/insert-column.svg"
import deleteColumn from "./img/delete-column.svg"
import tableIcon from "./img/Table.png"
import expand from "./img/chevron-expand.svg"
import loading from "./img/loading.svg"
import filePlus from "./img/file-plus.svg"
import editDocument from "./img/pencil-square.svg"
import typeBold from "./img/type-bold.svg"
import typeItalic from "./img/type-italic.svg"
import typeUnderline from "./img/type-underline.svg"
import textLeft from "./img/text-left.svg"
import textRight from "./img/text-right.svg"
import textCenter from "./img/text-center.svg"

export const ICONS = {
    menu: <svg
        focusable="false"
        // aria-hidden="true"
               viewBox="0 0 24 24" data-testid="MenuIcon">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>,
    plus: <svg
        focusable="false"
               viewBox="0 0 24 24" data-testid="MenuIcon">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>,
    check: <svg
        focusable="false"
               viewBox="0 0 24 24" data-testid="MenuIcon">
        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>,
    cancel: <svg
        focusable="false"
               viewBox="0 0 24 24" data-testid="MenuIcon">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM4 12c0-4.4 3.6-8 8-8 1.8 0 3.5.6 4.9 1.7L5.7 16.9C4.6 15.5 4 13.8 4 12zm8 8c-1.8 0-3.5-.6-4.9-1.7L18.3 7.1C19.4 8.5 20 10.2 20 12c0 4.4-3.6 8-8 8z"/>
    </svg>,
    save: <svg
        focusable="false"
               viewBox="0 0 24 24" data-testid="MenuIcon">
        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
    </svg>,
    AngleBracket: <svg
        focusable="false"
               viewBox="0 0 24 24" data-testid="MenuIcon">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>,
    options: <svg
        focusable="false"
        viewBox="0 0 24 24" data-testid="MenuIcon">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
    </svg>,
    star: <svg
        focusable="false"
        viewBox="0 0 24 24" data-testid="MenuIcon">
        <path d="m12 8.89.94 3.11h2.82l-2.27 1.62.93 3.01L12 14.79l-2.42 1.84.93-3.01L8.24 12h2.82L12 8.89M12 2l-2.42 8H2l6.17 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10h-7.58L12 2z"/>
    </svg>,
    empty: <svg
        focusable="false"
        viewBox="0 0 24 24" data-testid="MenuIcon">
        <path d=""/>
    </svg>,
    dot: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              focusable="false"
              viewBox="0 0 16 16">
        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
    </svg>,
    loading: <img className={style.image} src={loading} alt={"alt"}/>,
    filePlus: <img className={style.image} src={filePlus} alt={"alt"}/>,
    fileEdit: <img className={style.image} src={editDocument} alt={"alt"}/>,
    typeBold: <img className={style.image} src={typeBold} alt={"alt"}/>,
    typeItalic: <img className={style.image} src={typeItalic} alt={"alt"}/>,
    typeUnderline: <img className={style.image} src={typeUnderline} alt={"alt"}/>,
    textLeft: <img className={style.image} src={textLeft} alt={"alt"}/>,
    textRight: <img className={style.image} src={textRight} alt={"alt"}/>,
    textCenter: <img className={style.image} src={textCenter} alt={"alt"}/>,

    TableColumnInsertRight: <img className={style.image} src={insertColumn} alt={"alt"}/>,
    TableColumnInsertLeft: <img className={style.image} src={insertColumn} alt={"alt"} style={{transform:"rotate(180deg)"}}/>,
    TableColumnInsertUp: <img className={style.image} src={insertColumn} alt={"alt"} style={{transform:"rotate(-90deg)"}}/>,
    TableColumnInsertDown: <img className={style.image} src={insertColumn} alt={"alt"} style={{transform:"rotate(90deg)"}}/>,
    TableDeleteColumn: <img className={style.image} src={deleteColumn} alt={"alt"}/>,
    TableDeleteRow: <img className={style.image} src={deleteColumn} alt={"alt"} style={{transform:"rotate(-90deg)"}}/>,
    Table: <img className={style.image} src={tableIcon} alt={"alt"}/>,
    ShowCode: <img className={style.image} src={expand} alt={"alt"} style={{transform:"rotate(-90deg)"}}/>,


    menu2: <svg preserveAspectRatio="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z">
        </path>
    </svg>,
}
