const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

module.exports = app; 
