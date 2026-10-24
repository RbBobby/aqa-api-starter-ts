import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';

test('TC1: регистрация и удаление пользователя', async ({ page }) => {
  test.setTimeout(90_000);
  const user = {
    name: 'Alex Tester',
    email: `aqa-${randomUUID()}@example.com`,
    password: 'TestPassword123!',
  };

  await test.step('Открыть главную страницу и форму регистрации', async () => {
    await page.goto('https://automationexercise.com/');
    await expect(page.locator('#slider')).toBeVisible();
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    await page.locator('[data-qa="signup-name"]').fill(user.name);
    await page.locator('[data-qa="signup-email"]').fill(user.email);
    await page.locator('[data-qa="signup-button"]').click();
  });

  await test.step('Заполнить данные аккаунта и адрес', async () => {
    await expect(page.getByText('Enter Account Information', { exact: true })).toBeVisible();
    await page.locator('#id_gender1').check();
    await page.locator('[data-qa="name"]').fill(user.name);
    await expect(page.locator('[data-qa="email"]')).toHaveValue(user.email);
    await page.locator('[data-qa="password"]').fill(user.password);
    await page.locator('[data-qa="days"]').selectOption('15');
    await page.locator('[data-qa="months"]').selectOption('6');
    await page.locator('[data-qa="years"]').selectOption('1995');
    await page.locator('#newsletter').check();
    await page.locator('#optin').check();
    await page.locator('[data-qa="first_name"]').fill('Alex');
    await page.locator('[data-qa="last_name"]').fill('Tester');
    await page.locator('[data-qa="company"]').fill('Test Company');
    await page.locator('[data-qa="address"]').fill('123 Test Street');
    await page.locator('[data-qa="address2"]').fill('Apartment 5');
    await page.locator('[data-qa="country"]').selectOption({ label: 'Canada' });
    await page.locator('[data-qa="state"]').fill('Ontario');
    await page.locator('[data-qa="city"]').fill('Toronto');
    await page.locator('[data-qa="zipcode"]').fill('M5V 2T6');
    await page.locator('[data-qa="mobile_number"]').fill('4165550123');
    await page.locator('[data-qa="create-account"]').click();
  });

  await test.step('Проверить создание аккаунта и вход', async () => {
    await expect(page.locator('[data-qa="account-created"]')).toHaveText('Account Created!');
    await page.locator('[data-qa="continue-button"]').click();
    await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();
  });

  await test.step('Удалить аккаунт и вернуться на главную', async () => {
    await page.getByRole('link', { name: 'Delete Account' }).click();
    await expect(page.locator('[data-qa="account-deleted"]')).toHaveText('Account Deleted!');
    await page.locator('[data-qa="continue-button"]').click();
    await expect(page).toHaveURL('https://automationexercise.com/');
    await expect(page.locator('#slider')).toBeVisible();
  });
});
