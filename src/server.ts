import 'reflect-metadata';
import 'express-async-errors';
import express, {Request, Response, NextFunction} from 'express';
import AppError from './errors/AppError';
import Cors from 'cors';
import Routes from './routes';
import './database';

const app = express();
const server = require('http').createServer(app);

app.use(express.json());
app.use(Cors());
app.use(Routes);
app.use(express.static('tmp'));

app.use((err:Error, request: Request, response:Response, next:NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.code).json({
            status: 'error',
            message: err.message
        })
    }

    console.log(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
});

server.listen(3333)
