import express from 'express';
// const express = require('express');

const PORT = 4000;
const app = express();
const handleHome = (req, res) => {
  return res.send('Home');
};
const handleLogin = (req, res) => {
  return res.send('Login here');
};
app.get('/', handleHome);
app.get('login', handleLogin);
const handleListening = () => console.log(`Server lstening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
