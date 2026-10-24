import { test as base, expect } from '@playwright/test';
import { ApiClient } from '../src/api-client.js';

type Fixtures = { apiClient: ApiClient };

export const test = base.extend<Fixtures>({
  apiClient: async ({ playwright }, use) => {
    const request = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL ?? 'https://automationexercise.com/api/',
      timeout: 15_000,
    });
    try {
      await use(new ApiClient(request));
    } finally {
      await request.dispose();
    }
  },
});

export { expect };
