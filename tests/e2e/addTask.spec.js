const { test, expect } = require('@playwright/test');

test('ajouter une tâche', async ({ page }) => {
  await page.goto('http://localhost:5000');
  await page.fill('#taskTitle', 'Nouvelle tâche');
  await page.click('#addTaskButton');
  await expect(page.locator('#taskList')).toContainText('Nouvelle tâche');
});
