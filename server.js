const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const app = express();

app.use(express.json());


// Sert les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

