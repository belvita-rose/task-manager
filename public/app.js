const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
let userId = null; // Variable pour stocker l'ID de l'utilisateur connecté

// Fonction pour enregistrer un utilisateur
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (response.ok) {
    alert('Inscription réussie');
  } else {
    alert('Erreur : ' + data.message);
  }
});

// Fonction pour connecter un utilisateur
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (response.ok) {
    userId = data.userId;
    alert('Connexion réussie');
    loadTasks(); // Charger les tâches après la connexion
  } else {
    alert('Erreur : ' + data.message);
  }
});

// Fonction pour ajouter une tâche
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!userId) {
    alert('Vous devez être connecté pour ajouter une tâche');
    return;
  }

  const title = document.getElementById('taskTitle').value;

  const response = await fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userId}`
    },
    body: JSON.stringify({ title })
  });

  const data = await response.json();
  if (response.ok) {
    alert('Tâche ajoutée');
    loadTasks(); // Recharger les tâches après l'ajout
  } else {
    alert('Erreur : ' + data.message);
  }
});

// Fonction pour charger les tâches
async function loadTasks() {
  const response = await fetch('/tasks', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${userId}` }
  });

  const tasks = await response.json();
  taskList.innerHTML = ''; // Effacer la liste existante
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    taskList.appendChild(li);
  });
}
