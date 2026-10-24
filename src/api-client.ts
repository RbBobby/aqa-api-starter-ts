import type { APIRequestContext, APIResponse } from '@playwright/test';

// Тонкая обёртка: общие настройки задаёт фикстура.
export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  get(path: string): Promise<APIResponse> {
    return this.request.get(path);
  }
}
