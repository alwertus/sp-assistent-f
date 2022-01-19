import store from "../store/Store";

const structure = {

    // separate on big parts
    "common" : {
        "":{                                    "ru":""},
        "Personal Data":{                       "ru":"Личные данные"},
        "Save":{                                "ru":"Сохранить"},
        "First name":{                          "ru":"Имя"},
        "Last name":{                           "ru":"Фамилия"},
        "User already exists" : {               "en":"Such user already exists",
                                                "ru":"Такой пользователь уже существует"},
        "password-confirmation-must-match" : {  "ru":"Пароль и подтверждение должны совпадать",
                                                "en":"Password and confirmation must match"},
        "Confirm" : {                           "ru":"Подтвердить"},
        "Create": {                             "ru":"Создать"},
        "Register":{                            "ru":"Регистрация"},
        "forgot-credentials":{                  "en":"I forgot my credentials",
                                                "ru":"Я забыл свои данные"},
        "no-account":{                          "en":"I have not account",
                                                "ru":"У меня нет аккаунта"},
        "have-account":{                        "en":"I already have account",
                                                "ru":"У меня уже есть аккаунт"},
        "Cash":{                                "ru":"Деньги"},
        "Info":{                                "ru":"Инфо"},
        "Main":{                                "ru":"Главная"},
        "header":{                              "ru":"верхушка"},
        "Login":{                               "ru":"Вход"},
        "Log in":{                              "ru":"Вход"},
        "Log out":{                             "ru":"Выход"},
        "user":{                                "ru":"логин",
                                                "en":"login"},
        "password":{                            "ru":"пароль"},
        "en":{                                  "ru":"анг"},
        "ru":{                                  "ru":"рус"},
        "Bad credentials":{                     "en":"Incorrect username or password",
                                                "ru":"Неверные логин или пароль"},
//  Page INFO
        "Space":{                               "ru":"Пространство"},
        "Title":{                               "ru":"Заголовок"},
        "Description":{                         "ru":"Описание"},
    }
}

export function str(key, part = "common") {
    const lang = store.getState()['currentLanguage'];

    let multiLangString = structure[part][key]
    if (!multiLangString)
        return key
    let str = multiLangString[lang]
    return !!str ? str : key;
}