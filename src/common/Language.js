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
        "Input new title":{                     "ru":"Введи новый заголовок"},
        "Description":{                         "ru":"Описание"},
        "New page":{                            "ru":"Новая страница"},
        "Select Page":{                         "ru":"Выбери страницу"},
        "Edit Page":{                           "ru":"Редактировать"},
        "Root":{                                "ru":"Корень"},
        "Topic":{                               "ru":"Тема"},
        "Space options":{                       "ru":"Настройки пространства"},
        "Name":{                                "ru":"Наименование"},
        "Close":{                               "ru":"Закрыть"},
        "Access":{                              "ru":"Доступ"},
        "Add":{                                 "ru":"Добавить"},
        "Add Login":{                           "ru":"Добавить логин"},
        "Hide menu":{                           "ru":"Скрыть меню"},
        "Show menu":{                           "ru":"Показать меню"},

// Rich editor
        "Underline":{                           "ru":"Подчёркивание"},
        "Bold":{                                "ru":"Жирный"},
        "Italic":{                              "ru":"Курсив"},
        "Align-Left":{                          "ru":"Выравнивание-Лево"},
        "Align-Center":{                        "ru":"Выравнивание-Центр"},
        "Align-Right":{                         "ru":"Выравнивание-Право"},
        "Normal text":{                         "ru":"Обычный текст"},
        "Header":{                              "ru":"Заголовок"},
        "Unordered list":{                      "ru":"Неупорядоченный список"},
        "Ordered list":{                        "ru":"Упорядоченный список"},
        "Clear format":{                        "ru":"Очистить формат"},
        "Insert row above":{                    "ru":"Вставить строку сверху"},
        "Insert row below":{                    "ru":"Вставить строку снизу"},
        "Insert column left":{                  "ru":"Вставить колонку слева"},
        "Insert column right":{                 "ru":"Вставить колонку справа"},
        "Insert table":{                        "ru":"Вставить таблицу"},
        "Delete row":{                          "ru":"Удалить строку"},
        "Delete column":{                       "ru":"Удалить колонку"},
        "Code block":{                          "ru":"Блок кода"},
        "Image":{                               "ru":"Изображение"},
        "Link":{                                "ru":"Ссылка"},

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