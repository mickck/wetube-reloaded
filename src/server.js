import express from 'express';
// const express = require('express');
import morgan from 'morgan';
import globalRouter from './routers/globalRouter';
import videoRouter from './routers/videoRouter';
import userRouter from './routers/userRouter';

const PORT = 4000;

const app = express();
const logger = morgan('dev');
app.use(logger);

app.use('/', globalRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

const handleListening = () => console.log(`Server lstening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
