const { test, expect } = require('@playwright/test');

test('ajouter une tâche', async ({ page }) => {
  await page.goto('http://localhost:3000'); // URL de ton app

  // Remplir le formulaire pour ajouter une tâche
  await page.fill('#taskTitle', 'Nouvelle tâche');
  await page.click('#addTaskButton');

  // Vérifier que la tâche est bien ajoutée
  const task = await page.textContent('.task');
  expect(task).toContain('Nouvelle tâche');
});
