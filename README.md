**English for kids** - приложение для изучения английских слов детьми.

## Структура приложения:
1. Главная страница
2. Страница категории 
3. Страница статистики 

![screenshot](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rslang/english-for.kids.data/img/screenshot.png)
### Demo
https://english-for-kids.netlify.com/ (версия без Hacker scope)

## Описание страниц
1. Главная страница приложения
- на главной странице приложения размещаются ссылки на страницы с категориями слов
- минимальное количество категорий - восемь
- каждая ссылка содержит тематическую картинку и название категории
- ссылки дублируются в выезжающем боковом меню, которое открывается и скрывается по клику на иконку в левом верхнем углу страницы
- на главной странице приложения и на страницах категорий есть переключатель Train/Play (тренировка/игра)
  
2. Страница категории 
- страница категории содержит название категории и карточки со словами соответствующей тематики 
- минимальное количество карточек со словами в каждой категории - восемь   
- каждая карточка содержит тематическую картинку и слово на английском языке  
- при клике по карточке звучит произношение слова на английском языке  
- на каждой карточке есть кнопка, при клике по которой карточка переворачивается. На оборотной стороне карточки размещается перевод слова
- обратный поворот карточки на лицевую сторону происходит автоматически, когда курсор мыши перемещается за её границы

3. Страница со статистикой 
- описание страницы находится в критериях оценивания (Hacker scope)

## Работа приложения
Приложение работает в режиме тренировки и в режиме игры.  
Описание работы приложения в данных режимах находится в критериях оценивания (Basic scope и Advanced scope соответственно).
При загрузке приложения или перезагрузке страницы приложение открывается в режиме тренировки.
Переключение между тренировкой и игрой происходит при клике по переключателю Train/Play. 

## Требования к репозиторию
- для разработки приложения используйте собственный приватный репозиторий
- название репозитория: **english-for-kids**, название ветки, в которой ведётся разработка - **develop**, ветка **master** пустая, содержит только README.md
- история коммитов должна отображать процесс разработки приложения. [Требования к коммитам](https://docs.rs.school/#/git-convention)
- демо-версия приложения размещается на `https://www.netlify.com/`, либо на другом подобном хостинге
- после окончания разработки или при наступлении дедлайна, создайте pull request из ветки develop в ветку master. [Требования к pull request](https://docs.rs.school/#/stage2?id=Описание-pull-request-должно-содержать-следующую-информацию). Мержить pull request не нужно.
- для проверки кода приложения ментором, вам нужно будет в настройках вашего приватного репозитория указать его в качесте collaborator
- для проверки приложения в ходе кросс-чека ссылку на демо-версию приложения необходимо будет добавить в rs-app

## Технические требования
- работа приложения проверяется в браузере Google Chrome последней версии
- использование jQuery не допускается
- нельзя использовать Angular/React/Vue 
- можно использовать bootstrap и любые другие css фреймворки
- можно использовать html и css препроцессоры

## Требования к оформлению приложения
- минимальная ширина, при которой приложение отображается корректно – 320 рх
- так как приложение предназначено для обучения детей, в том числе и тех, которые ещё не умеют читать, все надписи, если это возможно, необходимо продублировать картинками или иконками
- желательны плавная анимация, интересный и уместный дизайн, большие и удобные кнопки, красочные иконки, красивые картинки, светлые и яркие тона 
- позаботьтесь об интерактивности кликабельных элементов - изменение внешнего вида при наведении, разные стили для активного и неактивного состояния
- предложенный в демо дизайн приложения не является  обязательным, можно вносить в него свои изменения с целью улучшения

## Критерии оценки:
**Максимальный балл за задание: 170 баллов при кросс-чеке / 200 баллов при проверке ментором**   

### Basic scope +50/+80  

- **Вёрстка, дизайн, UI главной страницы приложения: (+10)**
  - [ ] присутствуют все указанные в задании элементы как на мобильной, так и на десктопной версии
  - [ ] выполнены требования к оформлению приложения
  
- **Вёрстка, дизайн, UI выезжающего меню: (+10)**
  - [ ] выполнены требования к оформлению приложения
  - [ ] ссылки в меню рабочие и ведут на страницы с категориями слов
  - [ ] ссылка на текущую страницу внешне отличается от остальных
  - [ ] выезжающее меню присутствует на всех страницах приложения
  - [ ] плавная анимация, меню закрывается как кликом по крестику, так и кликом на любом элементе приложения, и кликом по ссылке в самом меню

- **Вёрстка, дизайн, UI страницы категории: (+10)**
  - [ ] присутствуют все указанные в задании элементы как на мобильной, так и на десктопной версии
  - [ ] выполнены требования к оформлению приложения

- **Режим тренировки: (+20)**
  - [ ] при клике по карточке звучит произношение слова на английском языке: (+10)
  - [ ] на каждой карточке есть кнопка, при клике по которой карточка поворачивается, на обратной стороне указан перевод слова. Когда курсор мыши перемещается за границы карточки, она автоматически поворачивается на лицевую сторону: (+10)
  
- **Выполнены требования к качеству кода (+30)** (оценивает только ментор)
  - [ ] дублирование кода сведено к минимуму: (+10)
  - [ ] js-код разбит на модули: (+10)
  - [ ] подключены и используются webpack, eslint, eslint-config-airbnb-base, babel: (+10)

### Advanced scope +80

- **Режим игры: (+80)**
  - [ ] кликом по переключателю Train/Play включается режим игры. В режиме игры указанные выше возможности режима тренировки отключаются, кнопка, при клике по которой карточка переворачивалась, и текст на карточке скрываются. Появляется кнопка "Start game". На карточке остаётся только изображение, которое занимает всю её площадь (если это не противоречит вашему дизайну): (+10)  
  - [ ] после клика по кнопке "Start game" звучит английское произношение рандомного слова из тех, что находятся на странице. Для каждой страницы, и для каждой игры рандомные слова генерируются по-новой: (+10) 
  - [ ] после первого клика по кнопке "Start game" надпись на ней меняется на иконку "Repeat", меняется внешний вид кнопки. При клике по кнопке "Repeat" произношение слова звучит ещё раз: (+10)
  - [ ] если пользователь кликнул по активной карточке с неправильным ответом, раздаётся звуковой сигнал "error": (+10)
  - [ ] если пользователь кликнул по активной карточке с правильным ответом, раздаётся звуковой сигнал "correct" и после него звучит произношение рандомного слова из тех, которые ещё не звучали: (+10)
  - [ ] карточка с угаданным словом становится неактивной, при этом изменяется её внешний вид. Клики по неактивной карточке звуковыми эффектами не сопровождаются, на счёт игры не влияют: (+10)
  - [ ] после начала игры каждый клик по активной карточке является правильным или неправильным ответом. Эти ответы отображаются в виде звёздочек (или других символов) разного цвета в шкале с рейтингом, которая появляется в режиме игры. Если звёздочек слишком много и шкала заполнена ими полностью, предыдущие звёздочки скрываются, а новые продолжают добавляться: (+10)
  - [ ] когда угаданы все слова в категории: (+10) 
    - если все слова угаданы правильно, звучит сигнал "success", карточки со словами скрываются, на странице отображается радостный смайлик (или другая картинка)
    - если при угадывании слов были ошибки, звучит сигнал "failure", карточки со словами скрываются, на странице отображается грустный смайлик (или другая картинка) и количество допущенных ошибок.
    - приложение автоматически перенаправляет на главную страницу со списком категорий

### Hacker scope +40

- **Страница статистики: (+40)**
  - [ ]  страница со статистикой содержит перечень всех категорий, всех слов в каждой категории, перевод каждого слова. Минимальная ширина, при которой страница статистики отображается корректно – 320 рх: (+10)
  - [ ] возле каждого слова указывается статистика - сколько раз по карточки с данным словом кликали в режиме тренировки, сколько раз данное слово угадывали в режиме игры, сколько ошибок при этом допустили, процент ошибок по каждому слову. После перезагрузки приложения статистика сохраняется: (+10)
  - [ ] есть возможность сортировки данных по алфавиту, для числовых значений - по их величине. Сортировка может происходить в прямом и обратном порядке и должна охватывать весь диапазон данных: (+10)
  - [ ] на странице со статистикой размещены кнопки "Repeat difficult words" и "Reset". Кнопка "Reset" обнуляет статистику. При клике по кнопке "Repeat difficult words" открывается страница изучения слов с наибольшим процентом ошибок аналогичная странице категории. На странице "Repeat difficult words" может размещаться от нуля до восьми слов, в зависимости от того сколько слов угадывалось в режиме игры и при их угадывании были допущены ошибки. После нажатия на кнопку "Reset" количество слов на странице "Repeat difficult words" равно нулю: (+10)
  - [ ] реализован дополнительный, не предусмотренный заданием функционал. Не оценивается, но, если можете сделать лучше, почему бы и нет.

## Штрафные баллы
- [ ] меньше восьми категорий, меньше восьми слов в каждой категории: -10 баллов 
- [ ] ошибки в работе приложения: -10 баллов за каждую ошибку, но не больше общего количества баллов за реализацию пункта требований (обратите внимание на переключение режимов тренировки и игры, на переход между категориями вопросов в режиме игры, если реализована страница статистики, на корректный вывод результатов и т.д)
- [ ] не выполняются требования к pull request, репозиторию, названиям коммитов: -10 баллов (оценивает только ментор)

## Видео с разбором задания 
https://youtu.be/xXBce4ZLcCQ

## Материалы
- [Папка с данными](./english-for.kids.data) для шести категорий слов (используется американское произношение). Для двух недостающих категорий данные необходимо собрать и подготовить самостоятельно. Можно использовать подходящее API, если удастся его найти. 
- [Темы bootstrap](https://bootswatch.com/)
- [Material Design for Bootstrap](https://github.com/mdbootstrap/bootstrap-material-design)
- [Localstorage](https://learn.javascript.ru/localstorage)

### Информационные ресурсы
- [ru.forvo.com](https://ru.forvo.com/) - получить английское произношение слова (предлагается несколько вариантов произношения) 
- [dictionary.cambridge.org](https://dictionary.cambridge.org/) - получить английское произношение слова
- [wooordhunt.ru](https://wooordhunt.ru/word/welcome) - получить английское произношение слова

### Cross-check
- инструкция по проведению cross-check: [docs.rs.school/#/cross-check-flow](https://docs.rs.school/#/cross-check-flow)
- форма для проверки: [cross-check-english-for-kids.netlify.com](https://cross-check-english-for-kids.netlify.com/)

### Документ для вопросов
- документ для вопросов, связанных с выполнением задания: [ссылка](https://docs.google.com/spreadsheets/d/1AZXNZvSq8ZK1KF85S-RYJEqbVtTVCVQ7cj9l4fZ2rxc/edit#gid=0)
- ссылки на лучшие работы с оригинальным дизайном, и/или реализованными дополнительными возможностями добавьте, пожалуйста, в эту форму: [ссылка](https://forms.gle/d3MM1rRaLU2WU9Hs9)