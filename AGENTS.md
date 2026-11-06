# Portfolio Website — Даниил Лешаков

## Описание
Одностраничный сайт-портфолио UX/UI дизайнера. Чистый HTML/CSS/JS, без фреймворков.

## Правила работы
- Коммит и пуш — строго по просьбе пользователя
- Общение — неформальное, на «ты», без рамок

## Структура
- `index.html` — английская версия сайта (открывается по умолчанию на `/`)
- `ru/index.html` — русская версия на `/ru/`
- `en/index.html` — редирект `/en/` → `/`
- `cv/index.html`, `cv/en/index.html` — просмотрщики PDF-резюме
- `styles.css` — стили (общие для обеих версий)
- `script.js` — интерактивность (общая)
- `img/case/**`, `files/*.pdf` — ассеты
- `.github/workflows/pages.yml` — деплой на GitHub Pages

## Деплой
Сайт: https://kotolaser.github.io/daniilleshakov/
Ветка `main` → workflow `Pages` собирает `_site` по белому списку (`index.html`, `en/`, `ru/`, `cv/`, `img/`, `files/`, `styles.css`, `script.js`) и публикует. Файлы вне списка (например `AGENTS.md`) на сайт не попадают.
При переносе файлов между `index.html` и `ru/index.html` помни про относительные пути: в корне ассеты без префикса, в `ru/` — с `../`.
Перезапуск — только новым прогоном (`gh workflow run pages.yml`). `gh run rerun --failed` на Pages ломает деплой: повторный job заливает второй артефакт `github-pages`, и `deploy-pages` падает на `Multiple artifacts named "github-pages"`. Таймаут `deploy-pages` не сокращать: у экшена максимум 10 минут, а очередь Pages иногда стоит 4–9 минут, поэтому меньше дефолта ставить нельзя. Если Pages отвечает `Deployment failed, try again later` — это его backend, подожди пару минут и перезапусти.

## Секции
1. **Навигация** — fixed top, якорные ссылки, мобильное меню
2. **Hero** — имя, роль, описание, CTA
3. **Обо мне** — подход к работе
4. **Проекты** — сетка карточек, раскрывающиеся кейсы
5. **Навыки** — теги компетенций
6. **Контакты** — резюме, Telegram, email, телефон
7. **Футер** — копирайт

## Проекты
- **Приложение инспектора** — развёрнутый кейс (полная структура: overview, goal, role, task, user flow, IA, scenarios, UX decisions, outcome)
- **Мобильный конструктор условий** — краткий кейс. В разговоре может называться «фильтр», «конструктор фильтра» или «конструктор условий» — это одно и то же.
- **Дизайн-система "Helios 3"** — краткий кейс
- **Inderoom** — краткий кейс

## Дизайн
- Светлая тема, минимализм
- Фон: #FAFAFA, текст: #1A1A1A, акцент: #2563EB
- Системный шрифт (Inter-like stack)
- Анимации: fade-in при скролле (Intersection Observer)
- Адаптивность: mobile-first, breakpoints 768px / 1024px

## Контакты
- Email: daemory@yandex.ru
- Telegram: t.me/kotolaser

## Замена плейсхолдеров на изображения

### Подготовка
Положи файлы изображений в корень сайта (рядом с `index.html`) или создай папку `images/`.

### Обложки проектов (без скругления)
Найди в `index.html` блоки с классом `placeholder--cover` и замени:

```html
<!-- Было -->
<div class="placeholder placeholder--wide placeholder--cover">
  <span>Обложка проекта</span>
</div>

<!-- Стало -->
<img src="images/project-cover.jpg" alt="Проект">
```

Скругления не будет — класс `placeholder--cover` убирает `border-radius`.

### Изображения внутри кейсов (со скруглением)
Найди в `index.html` блоки с классом `placeholder--wide` (без `--cover`) внутри `.project-card__case` и замени:

```html
<!-- Было -->
<div class="placeholder placeholder--wide">
  <span>Общий вид приложения</span>
</div>

<!-- Стало -->
<img src="images/screenshot.jpg" alt="Общий вид приложения">
```

Скругление `20px` добавится автоматически через CSS-правило `.case__block img`.

### CSS (уже есть, ничего менять не надо)
```css
img {
  max-width: 100%;
  display: block;        /* резиновые, без отступа снизу */
}

.case__block img {
  width: 100%;
  border-radius: 20px;  /* скругление внутри кейсов */
}

.placeholder--cover {
  border-radius: 0;      /* без скругления у обложек */
}
```

### Контакты
- Email: daemory@yandex.ru
- Telegram: t.me/kotolaser
- Телефон: +7 951 669-42-10

## Контент
Тексты для кейсов — из файлов `source/Inspector case.md` и `source/Portfolio structure.md`.
Анализ текущего портфолио — `source/current analysis.md`.
Артефакты кейса инспектора — `source/inspector artifacts.md`.
Исходные PDF и изображения — в папке `source/`.
