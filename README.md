# Приложение "Мои финансы"

Данный проект представляет собой небольшое приложение для ведения домашнего бюджета.
Среди возможностей, помимо вывода статистики денежных затрат за год, или месяц,
присутствует подсчёт годовой инфляции (как общей, так и по отдельным товарам потребительской корзины),
вывод сравнительной характеристики доходов и расходов по годам, а также возможность дублирования
финансовых операций по счетам и картам.

## Стек технологий

| Инструмент | Описание |
| :--- | :--- |
| [Electron.JS](https://www.electronjs.org/) | Взаимодействие с ОС, связь с frontend и упаковка приложения производятся посредством фреймворка Electron.JS.  |
| [React](https://react.dev/) | Визуальные компоненты процесса рендеринга написаны на React. |
| [Redux](https://redux.js.org/) | В качестве менеджера состояний используется Redux. |
| [UIkit](https://getuikit.com/) | Для стилизации компонентов использован модульный CSS-фреймворк UIkit. |
| [Knex.js](https://knexjs.org/) | Данные хранятся в базе данных Sqlite. Запросы осуществляются с помощью построителя SQL запросов Knex.js. |


## Запуск

<b>ВНИМАНИЕ!!!</b> После запуска в домашней директории появится папка <i>my_finances_data</i>.
Там хранится файл базы данных, резервную копию которого можно куда-нибудь скопировать.

Установить необходимые зависимости:
```
npm ci
```

Запустить:
```
npm start
```

Запустить с фиктивными данными:
```
npm run start-seed
```

Упаковать приложение на Linux (находясь в Linux):
```
npm run dist:linux
```

Упаковать приложение на Windows (находясь в Windows):
```
npm run dist:win
```
