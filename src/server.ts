import 'reflect-metadata';
import 'express-async-errors';
import express, {Request, Response, NextFunction} from 'express';
import AppError from './errors/AppError';
import Cors from 'cors';
import Routes from './routes';
import './database';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket: any) => {
    console.log('[IO] Connection => Server has a new connection')
    socket.on('sendMessage', (data: any) => {
        console.log('[SOCKET] Chat.message => ', data)
        // io.emit('chat.message', data)
    })
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => A connection was disconnected')
    })
})

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
