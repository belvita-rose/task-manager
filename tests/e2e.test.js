const { test, expect } = require('@playwright/test');

test('add task', async ({ page }) => {
  await page.goto('http://localhost:5000');
  await page.fill('input[name="title"]', 'Test Task');
  await page.click('button[type="submit"]');
  const task = await page.textContent('.task');
  expect(task).toContain('Test Task');
});
