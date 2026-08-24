# Руководство для AI-агента — проект Card

Карточная настольная игра с React-фронтендом, Express-бэкендом и WebSocket-сервером.

## Структура репозитория

```
Card/
├── frontend-vite/     # React 19 + Vite + TypeScript (основной фронтенд)
├── backend/           # Express + MongoDB (REST API)
├── websocket/         # WebSocket-сервер
└── .cursor/rules/     # правила для Cursor Agent
```

---

## Feature-Sliced Design v2

Проект **мигрирует** на FSD. Часть кода уже следует архитектуре, часть — легаси.

### Слои (от верхнего к нижнему)

| Слой | Назначение | Примеры в проекте |
|------|------------|-------------------|
| **app** | Инициализация, роутинг, глобальные стили | `app/App.tsx`, `app/main.tsx` |
| **pages** | Страницы приложения | `pages/home/`, `pages/auth/` |
| **widgets** | Крупные самостоятельные блоки UI | `widgets/chat/`, `widgets/w-dice_roll/` |
| **features** | Пользовательские сценарии | `features/dice_roll/`, `features/select_player/` |
| **entities** | Бизнес-сущности | `entities/card/` |
| **shared** | Переиспользуемая инфраструктура | `shared/ui/`, `shared/api/`, `shared/lib/` |

Слой **processes** в FSD v2 **deprecated** — не использовать.

### Pages-first (FSD 2.1)

> Держите код ближе к странице, пока он не нужен в другом месте.

- UI и логика, используемые **только на одной странице** → слайс в `pages/<page>/`
- При переиспользовании на 2+ страницах → поднимать в `widgets/`, `features/` или `entities/`
- Widgets теперь могут содержать собственные `model/`, `api/` — не обязательно выносить всё в features

### Сегменты внутри слайса

| Сегмент | Содержимое |
|---------|------------|
| `ui/` | React-комponents, styled-components, стили |
| `api/` | HTTP/WS запросы, mappers |
| `model/` | types, hooks, store, бизнес-логика |
| `lib/` | Внутренние утилиты слайса |
| `config/` | Конфигурация слайса |

### Public API

Каждый слайс экспортирует наружу **только** через `index.ts`:

```ts
// entities/card/index.ts — эталон
export { Card } from "./ui/Card";
export type { ICard, ICardState } from "./model/types";
```

**Запрещено** импортировать из внутренних путей (`entities/card/ui/Card`) — только из `@/entities/card`.

### Правила импортов между слоями

```
app       → pages, widgets, features, entities, shared
pages     → widgets, features, entities, shared
widgets   → features, entities, shared
features  → entities, shared
entities  → shared (cross-import между entities — через @x, см. docs FSD)
shared    → shared (только внутри shared)
```

**Запрещено:**
- `shared` → `entities/features/widgets/pages`
- `entities` → `features`
- Импорт между слайсами одного слоя без явного cross-import

### Alias-пути

```ts
import { Card } from "@/entities/card";
import { Button } from "@/shared/ui/button";
```

Настроено в `vite.config.ts` и `tsconfig.app.json`.

---

## Легаси-код (миграция)

### `frontend-vite/src/components/` — устаревший слой

| Файл/папка | Рекомендуемый перенос |
|------------|----------------------|
| `components/rules/` | `widgets/rules/` или `pages/home/ui/rules/` |
| `components/hand_card/` | `entities/card/ui/` или `widgets/player_hand/` |
| `components/choice_deck/` | `features/select-deck/` |
| `components/card_in_create_deck/` | `pages/create_deck/ui/` |
| `components/card_list_in_create_deck/` | `pages/create_deck/ui/` |

**Правило для агента:** не добавлять новые файлы в `components/`. При изменении легаси — по возможности переносить в FSD-слой.

### Другие проблемы легаси

- **Дублирование типов:** `ICard` есть и в `@/shared/lib/types/types`, и в `@/entities/card/model/types` → единый источник: `entities/card/model/types.ts`
- **Смешанный naming:** `dice_roll` vs `player-hand` → новые слайсы в `kebab-case`
- **Fat pages:** `pages/home/home.tsx` (~200+ строк) — декомпозировать на widgets/features
- **Default exports:** предпочитать named exports (как в `entities/card`)

---

## SOLID

### S — Single Responsibility

- Компонент отвечает за отображение; side-effects — в hooks (`model/`)
- `shared/api/` — транспорт; domain-логика — в `entities/` / `features/`
- Backend: route → controller → (service) → model

### O — Open/Closed

- Расширять через новые слайсы и сегменты, не модифицировать internals чужих модулей
- Новые варианты кнопок/карт — через props, не копирование компонентов

### L — Liskov Substitution

- Общие интерфейсы props (`ICardProps`) должны работать для всех реализаций Card UI

### I — Interface Segregation

- Не раздувать props-интерфейсы; разделять `ICard`, `ICardTable`, `ICardState`

### D — Dependency Inversion

- UI зависит от hooks и api-функций, не от конкретных реализаций fetch/ws
- Центральные клиенты: `shared/api/fetchApi.ts`, `shared/api/wsClient.ts`

---

## DRY

1. **Перед написанием нового кода** — проверить `shared/`, `entities/`, существующие hooks
2. **API-запросы** — через `shared/api/`, domain-обёртки в `features/*/api/` или `entities/*/api/`
3. **Hooks** — общие в `shared/lib/hooks/`, специфичные в `features/*/model/` или `entities/*/model/`
4. **UI-kit** — `shared/ui/` (`Button`, `Spinner`); не дублировать MUI-обёртки
5. **Константы** — `shared/lib/constants/`

---

## Стек технологий

### Frontend (`frontend-vite/`)

- React 19, TypeScript 5.9, Vite 7
- React Router 7, Axios
- MUI 9 + Emotion, styled-components (легаси — постепенно унифицировать)
- WebSocket через `shared/api/wsClient.ts`

### Backend (`backend/`)

- Express, Mongoose, cookie-based auth
- Структура: `routes/` → `controllers/` → `models/`
- WebSocket инициализация в `websocket.js`

---

## Конвенции кода

### TypeScript / React

- Functional components, hooks
- Strict TypeScript (`strict: true`)
- Named exports для public API
- Типы: префикс `I` для interfaces (`ICard`), `T` для type aliases (`TButton`)
- Стили: styled-components или MUI `styled()` — следовать стилю окружающего файла

### Именование файлов

| Тип | Формат | Пример |
|-----|--------|--------|
| React component | `PascalCase.tsx` | `Card.tsx`, `DropMenu.tsx` |
| Hook | `useCamelCase.tsx` | `useDiceRoll.tsx` |
| API | `api.ts` или `<name>Api.ts` | `tableApi.ts` |
| Types | `types.ts` | `entities/card/model/types.ts` |
| Slice folder | `kebab-case` | `dice-roll/`, `player-hand/` |

### Backend (JavaScript)

- CommonJS (`require`/`module.exports`) — текущий стандарт проекта
- Controllers обрабатывают req/res; бизнес-логику выносить из routes

---

## Чеклист для агента при изменениях

- [ ] Код в правильном FSD-слое (не в `components/`)
- [ ] Public API обновлён в `index.ts`
- [ ] Импорты только из public API и нижележащих слоёв
- [ ] Нет дублирования типов/API/hooks
- [ ] Минимальный scope diff — без несвязанного рефакторинга
- [ ] Именование соответствует конвенциям проекта
- [ ] `npm run lint` и `npm run build` в `frontend-vite/` проходят

---

## Полезные ссылки

- [Feature-Sliced Design](https://feature-sliced.design/)
- [FSD v2.1 — Pages first](https://feature-sliced.design/docs/guides/migration/from-v2-0)
- [Steiger — FSD linter](https://github.com/feature-sliced/steiger)
