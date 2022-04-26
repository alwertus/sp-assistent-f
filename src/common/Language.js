import store from "../store/Store";

const structure = {

    // separate on big parts
    "common" : {
        "":{                                    "ru":""},
        "News":{                                "ru":"Новости"},
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
        "Cash":{                                "ru":"Финансы"},
        "Info":{                                "ru":"Инфо"},
        "Main":{                                "ru":"Главная"},
        "header":{                              "ru":"верхушка"},
        "Login":{                               "ru":"Вход"},
        "Success":{                             "ru":"Успех"},
        "Error":{                               "ru":"Ошибка"},
        "Log in":{                              "ru":"Вход"},
        "Log out":{                             "ru":"Выход"},
        "user":{                                "ru":"логин",
                                                "en":"login"},
        "password":{                            "ru":"пароль"},
        "email":{                               "ru":"почта"},
        "en":{                                  "ru":"анг"},
        "ru":{                                  "ru":"рус"},
        "Login is busy":{                       "ru":"Указанный логин уже занят"},
        "User email not verified":{             "ru":"Почта пользователя не подтверждена"},
        "Account success created. Check your email to confirm":{
                                                "ru":"Аккаунт успешно создан. Проверьте свою почту для подтверждения"},
        "Bad credentials":{                     "en":"Incorrect username or password",
                                                "ru":"Неверные логин или пароль"},
//  Page INFO
        "Space":{                               "ru":"Пространство"},
        "New Space":{                           "ru":"Новое Пространство"},
        "Title":{                               "ru":"Заголовок"},
        "Description":{                         "ru":"Описание"},
        "New page":{                            "ru":"Новая страница"},
        "Select Page":{                         "ru":"Выбери страницу"},
        "Edit Page":{                           "ru":"Редактировать"},
        "Root":{                                "ru":"Корень"},
        "Space options":{                       "ru":"Настройки пространства"},
        "Name":{                                "ru":"Наименование"},
        "Close":{                               "ru":"Закрыть"},
        "Access":{                              "ru":"Доступ"},
        "Add":{                                 "ru":"Добавить"},
        "Add Login":{                           "ru":"Добавить логин"},
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