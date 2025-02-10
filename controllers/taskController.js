const fs = require('fs');
const path = require('path');
const tasksFilePath = path.join(__dirname, '../data/tasks.json');

// Ajouter une tâche
const addTask = (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Le titre est requis" });

  const newTask = {
    id: Date.now().toString(),
    userId: req.user.id,  // Utiliser l'utilisateur connecté
    title,
    completed: false
  };

  const tasks = JSON.parse(fs.readFileSync(tasksFilePath, 'utf8'));
  tasks.push(newTask);
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
  res.status(201).json(newTask);
};

// Consulter les tâches
const getTasks = (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(tasksFilePath, 'utf8'));
  const userTasks = tasks.filter(task => task.userId === req.user.id);  // Filtrer par utilisateur
  res.json(userTasks);
};

// Supprimer une tâche
const deleteTask = (req, res) => {
  const { id } = req.params;
  const tasks = JSON.parse(fs.readFileSync(tasksFilePath, 'utf8'));
  const taskIndex = tasks.findIndex(task => task.id === id && task.userId === req.user.id);

  if (taskIndex === -1) return res.status(404).json({ message: "Tâche non trouvée ou non autorisé" });

  tasks.splice(taskIndex, 1);
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf8');
  res.status(204).end();
};

module.exports = { addTask, getTasks, deleteTask };
