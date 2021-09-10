import express, {Request, Response, NextFunction} from 'express';
import AppError from './errors/AppError';
import Cors from 'cors';
import Routes from './routes';

const app = express();

app.use(express.json());
app.use(Cors())
app.use(Routes);

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

  app.listen(3333, () => {
    console.log('Server started on port 3333');
})
