import style from './App.module.css';
import {Route, Routes, useLocation} from 'react-router-dom'
import {useEffect, useState} from "react";
import {LoginComp} from "../pages/Login/LoginComp";
import {useDispatch, useSelector} from "react-redux";
import {str} from "../common/Language";
import {MainComp} from "../pages/Main/MainComp";
import {InfoComp} from "../pages/Info/InfoComp";
import {CashComp} from "../pages/Cash/CashComp";
import {API_RQ, EMPTY_USER, LOGIN_STATUS} from "../common/Structures";
import {useNavigate} from "react-router";
import {MenuTabComp} from "../components/MenuTab/MenuTabComp";
import imgAccount from "../common/img/account.svg";
import {getLocalStorageValue} from "../common/LocalStorage";
import {getUserInfo} from "../pages/Login/LoginActions";
import {AccountConfirmComp} from "../pages/AccountConfirm/AccountConfirmComp";
import {FeedingComp} from "../pages/Feeding/FeedingComp";


const App = () => {
    // const text = Array(1000).fill("long text. ")
    const dispatch = useDispatch()
    const currentLang = useSelector(state => state['currentLanguage'])
    const history = useNavigate()
    const location = useLocation()

    const [userInfo, setUserInfo] = useState(EMPTY_USER)

    const [footerText, setFooterText] = useState("...")
    const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.UNAUTHORIZED)

    const [headerElement, setHeaderElement] = useState(str("header"))

    const mainComponent = <MainComp
        setHeader={setHeaderElement}/>

    const infoComponent = <InfoComp setHeader={setHeaderElement}
                                    setFooter={setFooterText}
                                    location={"info"}/>

    const pages = [
        {
            key:"",
            title:str("Main"),
            available:true,
            comp:mainComponent
        },
        {
            key:"info",
            title:str("Info"),
            available:false,
            comp:infoComponent,
        },
        {
            key:"info/:id",
            routeOnly:true,
            title:str("Info"),
            available:false,
            comp:infoComponent,
        },/*
        {
            key:"timing",
            title:str("Timing"),
            available:false,
            comp:<TimingComp setHeader={setHeaderElement}
                             setFooter={setFooterText}/>
        },*/
        {
            key:"feeding",
            title:str("Feeding"),
            available:false,
            comp:<FeedingComp setHeader={setHeaderElement}
                             setFooter={setFooterText}/>
        },
        {
            key:"cash",
            title:str("Cash"),
            available:false,
            comp:<CashComp setHeader={setHeaderElement}/>
        },
        {
            key:"login",
            available:true,
            title:userInfo.firstName,
            image: imgAccount,
            rightMenu: true,
            textFirst: true,
            comp:<LoginComp
                setHeader={setHeaderElement}
                setFooterText={setFooterText}
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                // setIsLoggedIn={setIsLoggedIn}
            />
        },
        {
            key:"emailConfirm/:secret",
            routeOnly:true,
            available:true,
            title:userInfo.firstName,
            image: imgAccount,
            rightMenu: true,
            textFirst: true,
            comp:<AccountConfirmComp/>
        },
    ]

    const updateLanguage = (lang) => {
        dispatch({type:"SET_LANGUAGE", newValue: lang})
    }
    const filterPageAuthorized = e => (loginStatus === LOGIN_STATUS.AUTHORIZED) ? e : e.available === true
    const filterPageStart = e => !e.rightMenu && !e.routeOnly
    const filterPageEnd = e => !!e.rightMenu && !e.routeOnly

    const loginCheck = () => {
        // setFooterText(loginStatus)

        if (loginStatus === LOGIN_STATUS.UNAUTHORIZED) {
            let token = getLocalStorageValue(API_RQ.TOKEN)
            if (!!token) {
                setLoginStatus(LOGIN_STATUS.WAITING)
                getUserInfo(() => {setLoginStatus(LOGIN_STATUS.AUTHORIZED)},null, null, setUserInfo)
            }
        }
    }

    useEffect(loginCheck,[loginStatus])

    const drawLangButton = (lang) =>
        <button
            className={
                currentLang === lang
                    ? style.footerButtonSelect
                    : ""}
            onClick={() => updateLanguage(lang)}
            >{str(lang)}
        </button>

    const drawMenuTab = (e) => <MenuTabComp
        key={e.key}
        onClick={() => history('/' + e.key)}
        text={e.title}
        image={e.image}
        textFirst={e.textFirst}
        selected={!!e.key ? location.pathname.startsWith("/" + e.key) : location.pathname === "/" + e.key}
    />

    return (
        <div className={style.app}>
            <div className={style.header}>
                <div className={style.headerStart}>
                    {pages
                        .filter(filterPageStart)
                        .filter(filterPageAuthorized)
                        .map(drawMenuTab)
                    }
                </div>
                <div className={style.headerCenter}>
                    {headerElement}
                </div>
                <div className={style.headerEnd}>
                    {pages
                        .filter(filterPageEnd)
                        .filter(filterPageAuthorized)
                        .map(drawMenuTab)
                    }
                </div>
            </div>
            <div className={style.content}>
                <Routes>
                    {pages
                        .filter(filterPageAuthorized)
                        .map((e) => <Route
                                    key={e.key}
                                    exact
                                    path={e.key}
                                    element={e.comp}
                                />)
                    }
                    {/* 404 page */}
                    <Route path={"/*"} element={mainComponent}/>
                </Routes>

            </div>
            {/*TODO: FOOTER вылезает на передний план НАД страницей контента*/}
            <div className={style.footer}>
                <div className={style.footerStart}>
                    {footerText}
                </div>
                <div className={style.footerEnd}>
                    {drawLangButton("en")}
                    {drawLangButton("ru")}
                </div>
            </div>
        </div>
    )
}

export default App;