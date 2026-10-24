# AQA TypeScript Starter

Минимальная основа API-тестов: TypeScript + Playwright Test. Браузеры для этих тестов не нужны.

```sh
npm ci
npm run typecheck
npm test
```

`tests/example.spec.ts` содержит локальный пример и отключённый пример живого API. Для API снимите `skip`; нужен интернет. Адрес можно задать переменной `API_BASE_URL` (с завершающим `/`). `.env` автоматически не загружается.

- `src/api-client.ts` — тонкий HTTP-клиент.
- `tests/fixtures.ts` — создание клиента для каждого теста и освобождение ресурсов.
- `playwright.config.ts` — настройки запуска.
- `tsconfig.json` — строгая проверка типов.

Паттерны: Arrange–Act–Assert, API Client, dependency injection через фикстуры. Добавляйте сервисы предметной области, когда появится повторяющаяся логика; пока достаточно клиента.

TypeScript: `type` описывает форму данных; `private readonly` ограничивает доступ и переназначение поля; `Promise<T>` описывает асинхронный результат; `async/await` позволяет дождаться запроса. Типы не проверяют JSON во время выполнения: для внешних данных используйте `unknown`, проверки или схему валидации. Playwright исполняет TypeScript, но проверка типов запускается отдельно командой `npm run typecheck`.
