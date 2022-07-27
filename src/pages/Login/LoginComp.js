import React, {useEffect, useState} from "react"
import style from "./Login.module.css"
import {API_RQ, EMPTY_USER, LOGIN_STATUS} from "../../common/Structures"
import {setLocalStorageValue} from "../../common/LocalStorage"
import {getToken, getUserInfo, register, updateUser} from "./LoginActions"
import {str} from "../../common/Language";
import {InputTextComp} from "../../components/InputText/InputTextComp";
import {useDispatch, useSelector} from "react-redux";
import {InputTextTransparentComp} from "../../components/InputTextTransparent/InputTextTransparentComp";

export const LoginComp = ({setHeader, userInfo, loginStatus, setLoginStatus, setUserInfo}) => {
    // Set back url
    const dispatch = useDispatch()
    const serverURL = useSelector(state => state['serverAddress'])

    const [login, setLogin] = useState(userInfo.login)
    const [firstName, setFirstName] = useState(userInfo.firstName)
    const [lastName, setLastName] = useState(userInfo.lastName)
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [errorText, setErrorText] = useState("")
    const [isRegister, setIsRegister] = useState(false)
    const [refLogin, setRefLogin] = useState()
    const [refPassword, setRefPassword] = useState()
    const [btnSave_Active, setBtnSave_Active] = useState(true)

    const successRegisterHandler = () => {
        alert(str("Account success created. Check your email to confirm"))
        setIsRegister(false)
    }

    const onClickLogin = () => {
        setLoginStatus(LOGIN_STATUS.WAITING)
        getToken(login, password, setLoginStatus, setErrorText)
    }

    const onClickRegister = () => {
        if (password !== passwordConfirm) {
            setLoginStatus(LOGIN_STATUS.ERROR)
            setErrorText(str("password-confirmation-must-match"))
            return
        }
        setLoginStatus(LOGIN_STATUS.WAITING)
        register(login, password, setLoginStatus, setErrorText, successRegisterHandler)
    }

    const onClickLogout = () => {
        setLoginStatus(LOGIN_STATUS.UNAUTHORIZED)
        setLogin("")
        setFirstName("")
        setLastName("")
        setPassword("")
        setPasswordConfirm("")
        setErrorText("")
        setUserInfo(EMPTY_USER)
        setLocalStorageValue(API_RQ.TOKEN, "")
        setLocalStorageValue(API_RQ.TOKEN_REFRESH, "")
        setIsRegister(false)
    }

    const onClickSave = () => {
        // if (firstName !== userInfo.firstName || lastName !== userInfo.lastName)
        updateUser(firstName, lastName, userInfo, setUserInfo)
    }

    const onKeyPress = (event) => {
        if (event.key === "Enter") {
            if (login === "")
                refLogin['current'].focus()
            else if (password === "")
                refPassword['current'].focus()
            else
                isRegister ? onClickRegister() : onClickLogin()
        }
    }

    const drawServerURL = () =>
        <div className={style.serverUrlWrapper}>
            <div className={style.serverUrl}>
                <InputTextComp
                    key={4}
                    autoFocus={true}
                    text={serverURL}
                    setText={(newVal) => dispatch({type:"SET_SERVER", newValue: newVal})}
                    onChange={() => setErrorText("")}
                    onKeyPress={onKeyPress}
                />
            </div>
        </div>


    // "new account" mode
    useEffect(() => {setErrorText("")},[isRegister])

    useEffect(() => {
        if (loginStatus === LOGIN_STATUS.AUTHORIZED && !userInfo.login)
            getUserInfo(setLogin, setFirstName, setLastName, setUserInfo)
    }, [loginStatus, setUserInfo, userInfo.login])

    useEffect(() => {
        setBtnSave_Active(firstName !== userInfo.firstName || lastName !== userInfo.lastName)
    }, [firstName, lastName, userInfo])

    useEffect(() => setHeader(""), [])

    return loginStatus === LOGIN_STATUS.AUTHORIZED

        // if user authenticated
    ? <div className={style.wrapper}>
            {drawServerURL()}
            <div className={style.centerWindow}>
                <div className={style.titleLine}>
                    {str("Personal Data")}
                </div>
                <div className={style.inputSection}>
                    <div className={style.inputLine}>
                        <div className={style.inputLeftPart}>
                            {str("user")}
                        </div>
                        <div className={style.inputRightPart}>
                            <InputTextComp
                                key={1}
                                autoFocus
                                disabled
                                text={login}
                                setText={setLogin}
                                onChange={() => setErrorText("")}
                                onKeyPress={onKeyPress}
                            />
                        </div>
                    </div>

                    <div className={style.inputLine}>
                        <div className={style.inputLeftPart}>
                            {str("First name")}
                        </div>
                        <div className={style.inputRightPart}>
                            <InputTextComp
                                key={2}
                                autoFocus={true}
                                text={firstName}
                                setText={setFirstName}
                                onChange={() => setErrorText("")}
                                onKeyPress={onKeyPress}
                            />
                        </div>
                    </div>

                    <div className={style.inputLine}>
                        <div className={style.inputLeftPart}>
                            {str("Last name")}
                        </div>
                        <div className={style.inputRightPart}>
                            <InputTextComp
                                key={3}
                                autoFocus={true}
                                text={lastName}
                                setText={setLastName}
                                onChange={() => setErrorText("")}
                                onKeyPress={onKeyPress}
                                varRef={setRefLogin}
                            />
                        </div>
                    </div>

                </div>
                <div className={style.actionSection}>
                    <button
                        onClick={onClickLogout}
                    >{str("Log out")}</button>
                    <button
                        disabled={!btnSave_Active}
                        onClick={onClickSave}
                    >{str("Save")}</button>
                </div>
            </div>
        </div>

        // draw if user not authenticated
    : <div className={style.wrapper}>
            {drawServerURL()}
        <div className={style.centerWindow}>
            <div className={style.titleLine}>
                {str(isRegister ? "Register" : "Log in")}
            </div>
            <div className={style.inputSection}>
                <div className={style.inputLine}>
                    <InputTextTransparentComp
                        id={"login"}
                        key={4}
                        varRef={setRefLogin}
                        title={str("email")}
                        autoFocus
                        onChange={() => setErrorText("")}
                        acceptChanges={setLogin}
                        onKeyPress={onKeyPress}

                    />
                </div>
                <div className={style.inputLine}>
                    <InputTextTransparentComp
                        id={"password"}
                        key={5}
                        type={"password"}
                        varRef={setRefPassword}
                        title={str("password")}
                        onChange={() => setErrorText("")}
                        onKeyPress={onKeyPress}
                        acceptChanges={setPassword}
                    />
                </div>
                {isRegister && <div className={style.inputLine}>
                    <InputTextTransparentComp
                        id={"password"}
                        key={6}
                        type={"password"}
                        title={str("Confirm")}
                        onChange={() => setErrorText("")}
                        onKeyPress={onKeyPress}
                        acceptChanges={setPasswordConfirm}
                    />
                </div>}
                <div className={style.inputLine}>
                    <div className={style.errorText}>
                        {errorText}
                    </div>
                </div>
            </div>
            <div className={style.actionSection}>
                <button
                    // disabled={loginStatus === LOGIN_STATUS.WAITING}
                    onClick={isRegister ? onClickRegister : onClickLogin}
                >{str(isRegister ? "Create" : "Log in")}</button>
            </div>
        </div>
        <div className={style.links}>
            <div className={style.link}>{str("forgot-credentials")}</div>
            <div className={style.link} onClick={() => setIsRegister(!isRegister)}>{str(isRegister ? "have-account" : "no-account")}</div>
        </div>
    </div>
}