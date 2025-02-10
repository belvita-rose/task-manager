const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

// Inscription d'un utilisateur
const register = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || password.length < 8) {
    return res.status(400).json({ message: "Email ou mot de passe invalide" });
  }

  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "L'utilisateur existe déjà" });
  }

  const newUser = { id: Date.now(), email, password };
  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
  res.status(201).json(newUser);
};

// Connexion de l'utilisateur
const login = (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: "Identifiants invalides" });
  }
  res.json({ message: "Connexion réussie", userId: user.id });
};

module.exports = { register, login };
