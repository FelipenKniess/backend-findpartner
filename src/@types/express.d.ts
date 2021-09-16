declare namespace Express {
  import {UserData} from '../routes/users.routes';

  export interface Request {
      user: UserData | undefined;
  }
}
