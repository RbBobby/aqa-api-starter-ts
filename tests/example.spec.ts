import { test, expect } from './fixtures.js';

// Локальный пример: работает без сети и показывает async/await.
test('основа проекта работает', async () => {
  const result: { status: string } = await Promise.resolve({ status: 'ok' });
  expect(result.status).toBe('ok');
});

// Снимите skip, чтобы выполнить запрос к живому API.
test.skip('API возвращает товары', async ({ apiClient }) => {
  const response = await apiClient.get('productsList');
  expect(response.status()).toBe(200);
  const body: unknown = await response.json();
  expect(body).toMatchObject({ responseCode: 200, products: expect.any(Array) });
});
