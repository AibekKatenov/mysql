Стили я сильно не корректировал, местами немного криво, релизовал Регистрацию, Вход и выход,
пароль хэшируется с помощью библиотеки bcrypt, чтобы настроить вход, сессию и выход использовал
библиотеку passport. В файле .env лежат необходимые данные для локальной mysql. Есть таблица юзеров и таблица 
фильмов. Таблица фильмов связана с таблицей юзеров, При входе в аккаунт в header в зависимости от входа в аккаунт
меняет кнопку на Войти/Выйти, если Выйти-> то привязывается через тег <a> стук в api для запуска функции signout.
У каждого юзера есть возможность добавлять фильмы после входа в аккаунт, и данные о фильме пушатся в таблицу films.
В таблице films хранятся все данные о фильме(Фото фильма это ссылка на его фото в папке public, а добавляется фото туда с помощью 
  библиотеки multer при создании нового фильма). В scripts.sql записаны скрипты которые пригодились при работе с mysql.
Для запуска: в корневой папке после клонирования прописать npm i -> npm start(нужен еще установленный mysql)
